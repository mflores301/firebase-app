// external imports
import * as cors from "cors";
import * as express from "express";
import * as functions from "firebase-functions";

// internal imports
import userRouter from "./functions/routes/user.routes";

const app = express();

app.use(cors());
app.use(express.json({ limit: "20mb" }));
app.use(express.urlencoded({ limit: "20mb", extended: true }));
app.use("/user", userRouter);

export const api = functions.https.onRequest(app);
