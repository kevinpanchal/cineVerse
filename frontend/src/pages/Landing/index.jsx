import React, { useEffect, useState } from "react";
import axios from "axios";
import { CircularProgress } from "@mui/material";
import CurrentMovieBanner from "../../components/Landing/CurrentMovieBanner";
import MovieList from "../../components/Landing/MovieList";

export default function Landing() {
  const [currentMovies, setCurrentMovies] = useState([]);
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(null);

  useEffect(() => {
    getMovies();
  }, []);

  const getMovies = async () => {
    try {
      setIsLoading(true);
      const currentMoviesData = await axios.get(
        `${process.env.REACT_APP_BACKEND_BASE_URL}/landing/current`
      );
      const upcomingMoviesData = await axios.get(
        `${process.env.REACT_APP_BACKEND_BASE_URL}/landing/upcoming`
      );

      setCurrentMovies(currentMoviesData.data);
      setUpcomingMovies(upcomingMoviesData.data);
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
        <div>
          <div>
            <CurrentMovieBanner movies={currentMovies} />
            <MovieList title="Current Movies" movies={currentMovies} />
            <MovieList title="Upcoming Movies" movies={upcomingMovies} />
          </div>
        </div>
      )}
    </>
  );
}
