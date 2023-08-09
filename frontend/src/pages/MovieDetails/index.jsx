import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import { CircularProgress } from "@mui/material";

import MovieOverview from "../../components/MovieDetails/MovieOverview";
import AboutMovie from "../../components/MovieDetails/AboutMovie";
import TopReviews from "../../components/MovieDetails/TopReviews";
import RelatedMovies from "../../components/MovieDetails/RelatedMovies";

const MovieDetail = () => {
  const [searchParams] = useSearchParams();
  const [movie, setMovie] = useState({});
  const [relatedMovies, setRelatedMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(null);
  const movieId = searchParams.get("id");

  useEffect(() => {
    getMovie();
  }, [movieId]);

  const updateMovie = (updatedMovie) => {
    let movieRating = 0;
    if (updatedMovie.topReviews.length === 0) {
      setMovie({ ...updatedMovie, movieRating: 0 });
      return;
    }
    updatedMovie.topReviews.forEach((movie) => {
      movieRating += movie.rating;
    });
    setMovie({ ...updatedMovie, movieRating: movieRating / updatedMovie.topReviews.length });
  };

  const getMovie = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.get(
        `${process.env.REACT_APP_BACKEND_BASE_URL}/movie/${movieId}`
      );
      const movieData = data.data;
      const resp = await axios.get(
        `${process.env.REACT_APP_BACKEND_BASE_URL}/movie/genre/${movieData.genre}`
      );
      const relatedMovieData = resp.data.data;
      const relatedMovieDataFiltered = relatedMovieData.filter((movie) => movie._id !== movieId);
      let movieRating = 0;
      if (movieData.topReviews.length === 0) {
        setMovie({ ...movieData, movieRating: 0 });
      } else {
        movieData.topReviews.forEach((movie) => {
          movieRating += movie.rating;
        });
        setMovie({ ...movieData, movieRating: movieRating / movieData.topReviews.length });
      }
      setRelatedMovies(relatedMovieDataFiltered);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching movie:", error);
      setIsLoading(false);
    }
  };

  return (
    <>
      {isLoading || isLoading === null ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}>
          <CircularProgress />
        </div>
      ) : (
        <>
          <MovieOverview data={movie} />
          <AboutMovie description={movie?.description} />
          <TopReviews reviews={movie?.topReviews} id={movie._id} updateMovie={updateMovie} />
          <RelatedMovies relatedMovies={relatedMovies} />
        </>
      )}
    </>
  );
};

export default MovieDetail;
