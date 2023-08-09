const Movie = require("../../models/movieModel");

const getCurrentMovies = async (req, res) => {
  try {
    const movies = await Movie.find();
    const currentDate = new Date();

    const currentMovies = movies.filter((movie) => {
      const releaseDate = new Date(movie.releaseDate);
      return releaseDate <= currentDate;
    });

    if (!currentMovies || currentMovies.length === 0) {
      return res.status(404).json({ error: "No current movies found" });
    }

    return res.json(currentMovies);
  } catch (err) {
    return res.status(500).json({ error: err });
  }
};

const getUpcomingMovies = async (req, res) => {
  try {
    const movies = await Movie.find();
    const currentDate = new Date();

    const upcomingMovies = movies.filter((movie) => {
      const releaseDate = new Date(movie.releaseDate);
      return releaseDate > currentDate;
    });

    if (!upcomingMovies || upcomingMovies.length === 0) {
      return res.status(404).json({ error: "No upcoming movies found" });
    }

    return res.json(upcomingMovies);
  } catch (err) {
    return res.status(500).json({ error: err });
  }
};

module.exports = {
  getCurrentMovies,
  getUpcomingMovies,
};
