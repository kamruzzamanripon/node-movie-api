import express from "express";
import CategoryController from "../controllers/CategoryController.js";
import auth from "../middleware/auth.js";
import fileFolderName from "../middleware/fileFolderName.js";
import storage from "../middleware/fileUpload.js";
import { categoryStoreValidator } from "../middleware/validator/categoryStoreValidator.js";

const router = express.Router();

router.get("/all-category", CategoryController.allCategory);
router.get("/category-wise-movies", CategoryController.categoryWiseMovie);
router.get("/single-category/:categoryId", CategoryController.singleCategory);

router.post(
  "/category-store",
  //auth,
  categoryStoreValidator,
  fileFolderName("category"),
  storage.fields([{ name: "image", maxCount: 1 }]),
  CategoryController.store
);

router.put(
  "/category-update/:categoryId",
  auth,
  categoryStoreValidator,
  fileFolderName("category"),
  storage.fields([{ name: "image", maxCount: 1 }]),
  CategoryController.update
);

router.delete(
  "/category-delete/:categoryId",
  auth,
  categoryStoreValidator,
  fileFolderName("category"),
  storage.fields([{ name: "image", maxCount: 1 }]),
  CategoryController.delete
);

//find product by id
router.param("categoryId", CategoryController.categoryById);

export default router;
