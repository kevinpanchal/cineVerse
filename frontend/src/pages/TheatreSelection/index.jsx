import React, { useState, useEffect } from "react";
import TheatreCard from "../../components/TheatreSelection/TheatreCard";
import { Container, Typography, CircularProgress } from "@mui/material";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import theme from "../../theme";
import DateStrip from "../../components/TheatreSelection/DateCard";
import { useDispatch, useSelector } from "react-redux";
import ConfirmationModal from "../../components/ConfirmationModal";
import { clearCartAction } from "../../store/Cart/actionTypes";

export default function TheatreSelection() {
  const [searchParams] = useSearchParams();
  const movieId = searchParams.get("id");
  const [movie, setMovie] = useState({});
  const [theatres, setTheatres] = useState([]);
  const [isLoading, setIsLoading] = useState(null);
  const [showConfirmationModal, setShowConfirmationModal] = useState({
    open: false,
    time: "",
    theatreId: "",
  });

  const { items } = useSelector((state) => state.cartReducer);
  const dispatch = useDispatch();

  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);
  const dayAfterTomorrow = new Date(today);
  dayAfterTomorrow.setDate(today.getDate() + 2);

  const dates = [today, tomorrow, dayAfterTomorrow];

  const formatDate = (date) => {
    const options = { month: "short", day: "numeric" };
    return date.toLocaleDateString("en-US", options);
  };

  const [selectedDate, setSelectedDate] = useState(formatDate(today));

  const navigate = useNavigate();
  useEffect(() => {
    getMovie();
  }, [movieId]);

  const handleDateSelect = (date) => {
    setSelectedDate(date);
  };

  const getMovie = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.get(
        `${process.env.REACT_APP_BACKEND_BASE_URL}/movie/${movieId}`
      );
      const movieName = data.data.name;
      setMovie(movieName);
      const { data: tData } = await axios.get(
        `${process.env.REACT_APP_BACKEND_BASE_URL}/theatre/${movieId}`
      );
      setTheatres(tData.data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching movie:", error);
      setIsLoading(false);
    }
  };

  const handleClick = (time, id) => {
    const isALreadyinCart =
      items.length > 0 &&
      !!items.find(
        (item) =>
          item.movieId !== movieId ||
          item.theatreId !== id ||
          item.date !== selectedDate ||
          item.showTime !== time
      );
    if (isALreadyinCart) {
      setShowConfirmationModal({
        open: true,
        time: time,
        theatreId: id,
      });
    } else {
      navigate(`/booking?movieId=${movieId}&showTime=${time}&date=${selectedDate}&theatreId=${id}`);
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
          <ConfirmationModal
            open={showConfirmationModal.open}
            onClose={() =>
              setShowConfirmationModal({
                open: false,
                time: "",
                theatreId: "",
              })
            }
            onCompleteTransaction={() => {
              navigate("/summary");
            }}
            onContinue={() => {
              dispatch(clearCartAction());
              navigate(
                `/booking?movieId=${movieId}&showTime=${showConfirmationModal.time}&date=${selectedDate}&theatreId=${showConfirmationModal.theatreId}`
              );
              setShowConfirmationModal({
                open: false,
                time: "",
                theatreId: "",
              });
            }}
          />
          <Container
            sx={{
              padding: "3rem",
              display: "flex",
              flexDirection: "column",
              justifyContent: "centre",
              width: "70%",
              minHeight: "68.6vh",
              "@media (max-width: 1000px)": {
                width: "80%",
              },
              "@media (max-width: 700px)": {
                width: "90%",
              },
              "@media (max-width: 600px)": {
                width: "100%",
              },
            }}>
            <Typography
              variant="h1"
              sx={{
                fontWeight: "bold",
                textAlign: "center",
                color: theme.palette.darkBlue,
                padding: "25px",
              }}>
              {movie}
            </Typography>
            <DateStrip
              dates={dates}
              selectedDate={selectedDate}
              onSelectDate={handleDateSelect}
              formatDate={formatDate}
            />
            {theatres.length === 0 ? (
              <Typography
                variant="subtitle1"
                sx={{
                  fontWeight: "bold",
                  textAlign: "center",
                  color: theme.palette.darkBlue,
                  marginTop: "25px",
                }}>
                No theatres found for this movie.
              </Typography>
            ) : (
              theatres.map((theatre, index) => {
                const { showTimes } = theatre.movieDetails.find((m) => m.movie._id === movieId);
                return (
                  <TheatreCard
                    key={index}
                    theatreName={theatre.name}
                    showTimes={showTimes || []}
                    theatreId={theatre._id}
                    handleClick={handleClick}
                  />
                );
              })
            )}
          </Container>
        </>
      )}
    </>
  );
}
