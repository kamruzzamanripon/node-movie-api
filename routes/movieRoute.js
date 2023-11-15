import express from "express";
import MovieController from "../controllers/MovieController.js";
import auth from "../middleware/auth.js";
import fileFolderName from "../middleware/fileFolderName.js";
import storage from "../middleware/fileUpload.js";
import { movieStoreValidator } from "../middleware/validator/movieStoreValidator.js";

const router = express.Router();

router.get("/all-movies", MovieController.allMovie);
router.get("/top-movies", MovieController.topMovie);
router.get("/single-movie/:movieId", MovieController.singleMovie);

  router.post(
    "/movie-store",
    //auth,
    movieStoreValidator,
    fileFolderName("movie"),
    storage.fields([{ name: "image", maxCount: 1 }]),
    MovieController.store
  );

  router.post(
    "/ai-movie-store",
    //auth,
    fileFolderName("movie"),
    storage.fields([{ name: "image", maxCount: 1 }]),
    MovieController.aiStore
  );
  
  router.put(
    "/movie-update/:movieId",
    auth,
    fileFolderName("movie"),
    storage.fields([{ name: "image", maxCount: 1 }]),
    MovieController.update
  );
  
  router.delete(
    "/movie-delete/:movieId",
    auth,
    MovieController.delete
  );
  
  //find product by id
  router.param("movieId", MovieController.movieById);

  export default router;
  