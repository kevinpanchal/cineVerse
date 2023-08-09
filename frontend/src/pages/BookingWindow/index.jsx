import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Grid, CircularProgress } from "@mui/material";
import { styled } from "@mui/system";
import { Tabs } from "react-tabs";
import Screen from "../../components/BookingWindow/Screen";
import theme from "../../theme";
import CustomButton from "../../components/UI/CustomButton";
import axios from "axios";
import { addItemAction, updateItemAction } from "../../store/Cart/actionTypes";
import { useDispatch, useSelector } from "react-redux";

const TabsContainer = styled(Tabs)({
  width: "80%",
  minHeight: "350px",
  background: "#F3F3F3",
  margin: "0.5rem auto 1.5rem",
  color: "#E8F0F2",
  boxShadow: "0px 5px 5px 0px black",
});

// const CustomTabList = styled(TabList)({
//   display: "flex",
//   alignItems: "center",
//   background: "#FFFFFF",
//   justifyContent: "space-between",
//   paddingLeft: "0px",
//   color: "#000000",
//   fontSize: "1.25rem",
//   marginTop: "0",
// });

// const CustomTab = styled(Tab)(({ isSelected }) => ({
//   width: "50%",
//   padding: "0.75rem",
//   listStyle: "none",
//   textAlign: "center",
//   color: isSelected ? "black" : "gray",
//   cursor: "pointer",
//   boxShadow: isSelected ? "0px 5px 5px 0px black" : "none",
//   "&:hover": {
//     background: "rgba(50, 224, 196, 0.15)",
//     color: "black",
//   },
// }));

const BookingWindow = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const movieId = searchParams.get("movieId");
  const theatreId = searchParams.get("theatreId");
  const date = searchParams.get("date");
  const showTime = searchParams.get("showTime");
  const [bookedSeates, setBookedSeates] = useState([]);
  const [movie, setMovie] = useState({});
  const [theatre, setTheatre] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [selectedSeats, handleSelectedSeats] = useState([]);
  const [ticketData, setTicketData] = useState({
    movieId: movieId,
    theatreId: theatreId,
    date: date,
    showTime: showTime,
    price: 0,
    count: 0,
    seatNumbers: [],
    type: "movie",
    imageUrl: "",
  });

  const { items } = useSelector((state) => state.cartReducer);

  useEffect(() => {
    getBookedSeats();
  }, [dispatch]);

  useEffect(() => {
    const currentShow = items.find(
      (item) =>
        item.movieId === movieId &&
        item.theatreId === theatreId &&
        item.date === date &&
        item.showTime === showTime
    );
    handleSelectedSeats(currentShow?.seatNumbers || []);
  }, [items]);

  const getBookedSeats = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.get(
        `${process.env.REACT_APP_BACKEND_BASE_URL}/screen/${movieId}/${theatreId}/?date=${date}&showTime=${showTime}`
      );

      setBookedSeates(data.data.bookingDetail);
      setMovie(data.data.movie);
      setTheatre(data.data.theatre);
      setTicketData({
        ...ticketData,
        price: data.data.price,
        imageUrl: data.data.movie.image,
      });
      setIsLoading(false);
    } catch (error) {
      if (error.response.status === 404) {
        await axios.post(
          `${process.env.REACT_APP_BACKEND_BASE_URL}/screen/${movieId}/${theatreId}/booking`,
          { date: date, showTime: showTime }
        );

        try {
          const { data } = await axios.get(
            `${process.env.REACT_APP_BACKEND_BASE_URL}/screen/${movieId}/${theatreId}/?date=${date}&showTime=${showTime}`
          );

          setBookedSeates(data.data.bookingDetail);
          setMovie(data.data.movie);
          setTheatre(data.data.theatre);
          setTicketData({ ...ticketData, price: data.data.price });
          setIsLoading(false);
        } catch (error) {
          console.error("Error fetching seats:", error);
          setIsLoading(false);
        }
      } else {
        console.error("Error fetching seats:", error);
        setIsLoading(false);
      }
    }
  };

  const handleProceed = () => {
    navigate("/food");
  };

  const handleSeatClick = (seatNo) => {
    if (selectedSeats.includes(seatNo)) {
      handleSelectedSeats(selectedSeats.filter((seat) => seat !== seatNo));
      setTicketData({
        ...ticketData,
        count: ticketData.count - 1,
        seatNumbers: ticketData.seatNumbers.filter((seat) => seat !== seatNo),
      });
      dispatch(
        updateItemAction({
          ...ticketData,
          count: ticketData.count - 1,
          seatNumbers: ticketData.seatNumbers.filter((seat) => seat !== seatNo),
        })
      );
    } else {
      if (selectedSeats.length === 0) {
        dispatch(addItemAction(ticketData));
      }
      handleSelectedSeats([...selectedSeats, seatNo]);
      setTicketData({
        ...ticketData,
        count: ticketData.count + 1,
        seatNumbers: [...ticketData.seatNumbers, seatNo],
      });
      dispatch(
        updateItemAction({
          ...ticketData,
          count: ticketData.count + 1,
          seatNumbers: [...ticketData.seatNumbers, seatNo],
        })
      );
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
          <Grid container justifyContent="center" marginTop={"50px"} display={"flex"}>
            <TabsContainer>
              <div
                style={{
                  alignContent: "right",
                  color: theme.palette.brown,
                  display: "flex",
                  justifyContent: "end",
                }}>
                <ul style={{ listStyleType: "none", width: "200px", overflowWrap: "break-word" }}>
                  <li>
                    <b>Movie</b>: {movie?.name}
                  </li>
                  <li>
                    <b>Theatre</b>: {theatre?.name}
                  </li>
                  <li>
                    <b>Date</b>: {date}
                  </li>
                  <li>
                    <b>Show Time</b>: {showTime}
                  </li>
                </ul>
              </div>
              <Screen
                selectedSeats={selectedSeats}
                bookedSeates={bookedSeates}
                handleSeatClick={handleSeatClick}
              />
              <Grid item xs={12} sx={{ textAlign: "center", marginBottom: "20px" }}>
                <CustomButton
                  type="submit"
                  variant="contained"
                  disabled={selectedSeats.length === 0}
                  onClick={() => handleProceed()}>
                  PROCEED
                </CustomButton>
              </Grid>
            </TabsContainer>
          </Grid>
        </>
      )}
    </>
  );
};

export default BookingWindow;
