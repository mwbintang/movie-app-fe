import { useCallback, useEffect, useRef, useState } from "react";
import { Card } from "../components/Card/Card";
import { CardItem } from "../components/Card/CardItem";

import { formatDate } from "../helpers/date";
import { getMoviesV1, Movie } from "../services/MovieService";
import { Loading } from "../components/Loading";
import { useNavigate } from "react-router-dom";
import { SearchBar } from "../components/SearchBar";
import { Layout } from "../components/Layout";
import { useDebounce } from "../hooks/useDebounce";

const Home = () => {
    const navigate = useNavigate();
    const [movies, setMovies] = useState<Movie[]>([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const firstLoad = useRef(true);
    const [search, setSearch] = useState("");
    const debouncedSearch = useDebounce(search, 500);

    const fetchMovies = useCallback(
        async (reset = false) => {
            if (loading || (!hasMore && !reset)) return;

            setLoading(true);
            try {
                const currentPage = reset ? 1 : page;
                const res = await getMoviesV1(currentPage, search);

                if (res.data.length === 0) {
                    setHasMore(false);
                } else {
                    setMovies((prev) =>
                        reset ? res.data : [...prev, ...res.data]
                    );
                    setPage((prev) => (reset ? 2 : prev + 1));
                }
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        },
        [page, loading, hasMore, debouncedSearch]
    );


    useEffect(() => {
        if (firstLoad.current) {
            firstLoad.current = false;
            fetchMovies();
        }
    }, [fetchMovies]);

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

    useEffect(() => {
        setMovies([]);
        setPage(1);
        setHasMore(true);

        if (!firstLoad.current) {
            fetchMovies(true);
        }
    }, [debouncedSearch]);

    return (
        <Layout title="Popular Movies" showSearchBar={true} value={search} onChange={setSearch} placeholder="Search movies...">
            <div className="p-6">
                {movies.length === 0 && loading ? (
                    <div className="flex items-center justify-center min-h-screen">
                        <Loading text="Loading movies..." />
                    </div>
                ) : movies.length === 0 && !loading ? (
                    <div className="flex min-h-screen flex-col items-center justify-center px-4 text-center">
                        <h2 className="text-2xl font-semibold text-gray-800">
                            No movies found
                        </h2>
                        <p className="mt-2 text-gray-500">
                            {search
                                ? `No results for "${search}". Try another keyword.`
                                : "There are no movies to display."}
                        </p>
                    </div>
                ) : (
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
                    </div>
                )}
            </div>
        </Layout>
    );
};

export default Home;