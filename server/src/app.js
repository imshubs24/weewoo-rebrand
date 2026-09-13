const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const errorMiddleware = require("./middleware/error.middleware");

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}));


// test route for connection
app.get("/api/test", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Test API Success",
    });
});

// routes
app.use("/api/auth", require("./routes/auth.routes"));

app.use("/api/category", require("./routes/category.routes"));

app.use("/api/food", require("./routes/food.routes"));

app.use("/api/order", require("./routes/order.routes"));

app.use("/api/payment", require("./routes/payment.routes"));

app.use(errorMiddleware);

module.exports = app;