const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db.js");

// Routes
const authRouter = require("./routes/authRoutes.js");
const productRouter = require("./routes/producrRoutes.js");
const orderRouter = require("./routes/orderRoutes.js");
const analysisRouter = require("./routes/analyticsRoutes.js");

connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/products", productRouter);
app.use('/api/orders',orderRouter );
// app.use("/api/payment",);
app.use("/api/analytics", analysisRouter);





app.listen(4000, () => {
  console.log("Server is running at 5000");
});