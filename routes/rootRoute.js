import express from "express";
import multer from "multer";
import authRoute from "./authRoute.js";
import categoryRoute from "./categoryRoute.js";
import movieRoute from "./movieRoute.js";

const route = (app) => {
  app.use(express.static("public/uploads/category"));
  app.use(express.static("public/uploads/movie"));

  app.use("/api", authRoute);
  app.use("/api", categoryRoute);
  app.use("/api", movieRoute);

  //Multer Error File Handling
  app.use((err, req, res, next) => {
    if (err instanceof multer.MulterError) {
      // Multer-specific errors
      return res.status(418).json({
        err_code: err.code,
        err_message: err.message,
      });
    } else {
      // Handling errors for any other cases from whole application
      return res.status(500).json({
        err_code: 409,
        err_message: "Something went wrong!",
      });
    }
  });
  
  app.use("*", (req, res) =>
    res.status(404).json({ status: "fail", data: "Route does not exist" })
  );
};

export default route;
