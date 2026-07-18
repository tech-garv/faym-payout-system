const express = require("express");

const userRoutes = require("./routes/userRoutes");
const saleRoutes = require("./routes/saleRoutes");
const payoutRoutes = require("./routes/payoutRoutes");
const app = express();
const withdrawalRoutes = require("./routes/withdrawalRoutes");
app.use(express.json());

app.use("/users", userRoutes);

app.use("/sales", saleRoutes);

app.use("/payouts", payoutRoutes);

app.use("/withdrawals", withdrawalRoutes);

app.get("/", (req, res) => {

    res.json({
        message: "Faym Payout Management API"
    });

});

module.exports = app;