const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors());


// test route for connection
app.get("/api/test", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Test API Success",
    });
});

// routes
app.use("/api/auth", require("./Routes/auth.routes"));
app.use("/api/food", require("./Routes/food.routes"));
app.use("/api/order", require("./Routes/order.routes"));
app.use("/api/payment", require("./Routes/payment.routes"));

module.exports = app;