const Screen = require("../../models/screenModel");
const response = require("../../utils/response");

// Add a new screen
const addScreen = async (req, res) => {
  try {
    const { movie, theatre, price } = req.body;

    const screen = new Screen({
      movie,
      theatre,
      price,
    });

    await screen.save();
    response(res, 200, true, { message: "Screen added successfully" });
  } catch (err) {
    response(res, 500, false, { error: err.message });
  }
};

const addBooking = async (req, res) => {
  try {
    const { movie, theatre } = req.params;
    const bookingBody = req.body;

    if (bookingBody.date === null || bookingBody.showTime === null) {
      throw new Error("Showtime fields cannot be null");
    }

    const updatedScreen = await Screen.findOneAndUpdate(
      { movie: movie, theatre: theatre },
      { $push: { bookingDetails: bookingBody } },
      { new: true }
    );

    if (!updatedScreen) {
      return response(res, 404, false, { error: "Screen not found" });
    }

    response(res, 200, true, { message: "Screen added successfully" });
  } catch (err) {
    response(res, 500, false, { error: err.message });
  }
};

// Update a screen
const updateScreen = async (req, res) => {
  try {
    const screenId = req.params.id;
    const updates = req.body;
    const screen = await Screen.findByIdAndUpdate(screenId, updates, {
      new: true,
    });

    if (!screen) {
      return response(res, 404, false, { error: "Screen not found" });
    }

    response(res, 200, true, screen);
  } catch (err) {
    response(res, 500, false, { error: "Failed to update the screen" });
  }
};

// Delete a screen
const deleteScreen = async (req, res) => {
  try {
    const screenId = req.params.id;
    const screen = await Screen.findByIdAndDelete(screenId);

    if (!screen) {
      return response(res, 404, false, { error: "Screen not found" });
    }

    response(res, 200, true, { message: "Screen deleted successfully" });
  } catch (err) {
    response(res, 500, false, { error: "Failed to delete the screen" });
  }
};

// Get all screens
const getAllScreens = async (req, res) => {
  try {
    const screens = await Screen.find({}).populate(["movie", "theatre"]);;
    response(res, 200, true, screens);
  } catch (err) {
    response(res, 500, false, { error: err.message });
  }
};

// Get all booked seats for a specific screen
const getBookedSeats = async (req, res) => {
  try {
    const { movie, theatre } = req.params;
    const { date, showTime } = req.query;
    const screen = await Screen.findOne({
      movie: movie,
      theatre: theatre,
      "bookingDetails.date": date,
      "bookingDetails.showTime": showTime,
    }).populate(["movie", "theatre"]);

    if (!screen) {
      return response(res, 404, false, { error: "Screen not found" });
    }

    const { bookingDetails } = screen;
    const bookedSeats = bookingDetails.filter(
      (detail) => detail.date === date && detail.showTime === showTime
    );

    response(res, 200, true, {
      bookingDetail: bookedSeats[0].bookedSeats,
      movie: screen.movie,
      theatre: screen.theatre,
      price: screen.price,
    });
  } catch (err) {
    response(res, 500, false, { error: "Failed to get available seats" });
  }
};

// Book multiple seats for a specific screen
const bookSeats = async (req, res) => {
  try {
    const { movie, theatre } = req.params;
    const { seatNumbers, date, showTime } = req.body;
    const screen = await Screen.findOne({
      movie: movie,
      theatre: theatre,
      "bookingDetails.date": date,
      "bookingDetails.showTime": showTime,
    });

    if (!screen) {
      return response(res, 404, false, { error: "Screen not found" });
    }

    const { bookingDetails } = screen;
    bookingDetails.forEach((detail) => {
      if (detail.date === date && detail.showTime === showTime) {
        detail.bookedSeats = [...detail.bookedSeats, ...seatNumbers];
      }
    });

    await screen.save();

    response(res, 200, true, { message: "Seats booked successfully" });
  } catch (err) {
    response(res, 500, false, { error: err.message });
  }
};

module.exports = {
  addScreen,
  updateScreen,
  deleteScreen,
  getAllScreens,
  getBookedSeats,
  bookSeats,
  addBooking,
};
