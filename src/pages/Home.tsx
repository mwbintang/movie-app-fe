import { useCallback, useEffect, useRef, useState } from "react";
import { Card } from "../components/Card/Card";
import { CardItem } from "../components/Card/CardItem";

import { formatDate } from "../helpers/date";
import { getMoviesV1, Movie } from "../services/MovieService";
import { Loading } from "../components/Loading";
import { useNavigate } from "react-router-dom";

const Home = () => {
    const navigate = useNavigate();
    const [movies, setMovies] = useState<Movie[]>([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const firstLoad = useRef(true); // <--- track first fetch

    const fetchMovies = useCallback(async () => {
        if (loading || !hasMore) return;

        setLoading(true);
        try {
            const res = await getMoviesV1(page);
            if (res.data.length === 0) {
                setHasMore(false);
            } else {
                setMovies((prev) => [...prev, ...res.data]);
                setPage((prev) => prev + 1);
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    }, [page, loading, hasMore]);

    // Fetch first page only once
    useEffect(() => {
        if (firstLoad.current) {
            firstLoad.current = false;
            fetchMovies();
        }
    }, [fetchMovies]);

    // Infinite scroll
    useEffect(() => {
        const handleScroll = () => {
            if (
                window.innerHeight + document.documentElement.scrollTop + 50 >=
                document.documentElement.scrollHeight
            ) {
                fetchMovies();
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [fetchMovies]);

    if (movies.length === 0 && loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <Loading text="Loading movies..." />
            </div>
        );
    }

    return (
        <div className="p-6 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-4">
            {movies.map((movie) => (
                <Card
                    key={movie.id}
                    className="cursor-pointer hover:shadow-lg transition"
                    onClick={() => navigate(`/movies/${movie.id}`)}
                >
                    <CardItem
                        image={movie.posterPath}
                        title={movie.title}
                        description={movie.overview}
                        vote={movie.voteAverage}
                        releaseDate={formatDate(movie.releaseDate)}
                    />
                </Card>
            ))}

            {loading && movies.length > 0 && (
                <div className="col-span-full flex justify-center py-6">
                    <Loading text="Loading more movies..." />
                </div>
            )}
        </div>
    );
};

export default Home;