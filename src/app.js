import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import router from "./routes/routes.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

app.use(router)

app.listen(port, (error) => {
  if (error) return console.log("Unable to listen server");
  console.log(`server is running on port ${port}`);
});
