import app from "./server.js";
import "dotenv/config";
import connectDB from "./config/database.js";

if (!process.env.PORT) throw new Error("Ambiance variable PORT is not found");

connectDB();

app.listen(process.env.PORT, () => {
  console.log("Server is running on port", process.env.PORT);
});