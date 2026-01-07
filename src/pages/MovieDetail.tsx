import { useParams } from "react-router-dom";
import { formatDate } from "../helpers/date";
import { useEffect, useState } from "react";
import { getMovieByIdV1, Movie } from "../services/MovieService";
import { Loading } from "../components/Loading";
import { Layout } from "../components/Layout";

const MovieDetail = () => {
    const { id } = useParams();
    const [movie, setMovie] = useState<Movie | null>(null);
    const [loading, setLoading] = useState(true);

    const fetchMovieDetail = async (id: string) => {
        try {
            setLoading(true);

            const res = await getMovieByIdV1(id);
            setMovie(res.data);
        } catch (error) {
            console.error("Failed to fetch movie detail:", error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (id) {
            fetchMovieDetail(id);
        }
    }, [id]);

    if (loading || !movie) {
        return <Loading />;
    }

    return (
        <Layout title={movie.title} showBackButton={true}>
            <div className="space-y-8">
                <div className="relative overflow-hidden rounded-2xl">
                    <img
                        src={movie.backdropPath}
                        alt={movie.title}
                        className="h-[300px] w-full object-cover md:h-[400px]"
                    />

                    <div className="absolute inset-0 bg-black/50" />

                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                        <h1 className="text-3xl font-bold">{movie.title}</h1>

                        <div className="mt-2 flex items-center gap-4 text-sm">
                            <span>⭐ {movie.voteAverage}</span>
                            <span>📅 {formatDate(movie.releaseDate)}</span>
                        </div>
                    </div>
                </div>

                <div className="grid gap-8 md:grid-cols-[200px_1fr]">
                    <img
                        src={movie.posterPath}
                        alt={movie.title}
                        className="w-full rounded-xl shadow-md"
                    />

                    <div>
                        <h2 className="text-xl font-semibold">Overview</h2>
                        <p className="mt-3 text-gray-700 leading-relaxed">
                            {movie.overview}
                        </p>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default MovieDetail;
