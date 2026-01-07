import ApiClient from "../lib/ApiClient";

export interface Movie {
    id: number;
    title: string;
    overview: string;
    releaseDate: string;
    posterPath: string;
    backdropPath: string;
    voteAverage: number;
}

export interface MoviesResponse {
    data: Movie[];
}

export interface MovieDetailResponse {
    data: Movie;
}

export const getMoviesV1 = async (page: number = 1, search: string = ""): Promise<MoviesResponse> => {
    const url = search ? `v1/movies?page=${page}&title=${search}` : `v1/movies?page=${page}`;
    return ApiClient<MoviesResponse>(url, 'GET');
};

export const getMovieByIdV1 = async (id: number | string): Promise<MovieDetailResponse> => {
    return ApiClient<MovieDetailResponse>(`v1/movies/${id}`, 'GET');
};