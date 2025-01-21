import express from "express";
import indexRouter from "./routes/indexRouter.js";

const app = express();
const port = process.env.PORT || 3000;

app.set("views", "./views");
app.set("view engine", "ejs");
app.use(express.static("./public"));
app.use(express.urlencoded({ extended: true }));

app.use("/", indexRouter);

// Every thrown error in the application or the previous middleware function calling `next` with an error as an argument will eventually go to this middleware function
app.use((err, req, res, next) => {
  console.error(err);
  // We can now specify the `err.statusCode` that exists in our custom error class and if it does not exist it's probably an internal server error
  res.status(err.statusCode || 500).send(err.message);
});

app.listen(port, () => {
  console.log(`Inventory Application - listening on PORT ${port}`);
});
