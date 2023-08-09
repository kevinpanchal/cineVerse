const router = require("express").Router();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const response = require("../../../utils/response");
const { authenticateUser } = require("../../../middleware/authmiddleware");
const PaymentsModel = require("../../../models/PaymentsModel");
const sendEmail = require("../../../utils/nodemail");

router.use(authenticateUser);

router.post("/createSesssion", async (req, res) => {
  const { user } = req;
  const { items } = req.body;
  const session = await stripe.checkout.sessions.create({
    customer: user.stripeCustomerId,
    payment_method_types: ["card"],
    line_items: items.map((item) => ({
      quantity: item.count,
      price_data: {
        currency: "cad",
        product_data: {
          name: item.type === "movie" ? "Movie" : item.name,
        },
        unit_amount: Math.round(item.price * 100),
      },
    })),
    mode: "payment",
    success_url: `${process.env.FRONTEND_URL}/paymentSuccess?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.FRONTEND_URL}/paymentFail`,
  });
  const paymentObj = new PaymentsModel({
    user_id: user._id,
    session_id: session.id,
    total_price: session.amount_total / 100,
    items: items.map((item) => ({
      name: item.type === "movie" ? "Movie" : item.name,
      id: item.type === "movie" ? item.movieId : item._id,
      quantity: item.count,
      price: item.price,
      type: item.type === "movie" ? "movie" : "food",
    })),
  });
  await paymentObj.save();
  return response(res, 200, true, { link: session.url });
});

router.post("/success", async (req, res) => {
  const { user } = req;
  const { sessionId } = req.body;
  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    if (session.status !== "complete") {
      return response(res, 400, false, { message: "Payment not successfull." });
    }

    const paymentData = await PaymentsModel.findOne({
      user_id: user._id,
      session_id: sessionId,
    });
    paymentData.paymentSuccess = true;
    await paymentData.save();
    await sendEmail(
      user.email,
      "Booking Confirmation",
      `<b>Dear customer,</b> <br/> <p>Your booking is confirmed, your ticket number is:<b> ${paymentData._id}</b>.</p><p>Payment of $ ${paymentData.total_price} is successfull.</p>`
    );
    return response(res, 200, true, {
      message: "Payment successfull.",
      paymentData,
    });
  } catch (error) {
    return response(res, 400, false, {
      message: "Payment failed.",
    });
  }
});

module.exports = router;
