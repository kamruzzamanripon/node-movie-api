import fs from "fs";
import Category from "../models/Category.js";
const baseURL = process.env.IMAGE_BASE_URL;

class CategoryController {
  //find a product by  id
  static categoryById = async (req, res, next, id) => {
    const category = await Category.findById(id);

    if (!category) {
      return res.status(404).json({
        code: 404,
        message: "Category not found.",
      });
    }

    req.category = category;
    // console.log('cat result', req.category)
    next();
  };

  //all Category
  static allCategory = async (req, res) => {
    try {
      const allCategory = await Category.find();

      // Update the image URL for each category
      const updatedCategoryList = allCategory.map((category) => {
        return {
          ...category._doc,
          image: `${baseURL}/${category.image}`,
        };
      });

      res.status(200).json({
        message: "All Category",
        data: updatedCategoryList,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        code: 500,
        message: "Internal server error.",
      });
    }
  };

  //singel Category
  static singleCategory = async (req, res) => {
    return res.json(req.category);
  };

  //store category
  static store = async (req, res) => {
    const { name } = req.body;
    const image = req.files.image[0].filename;

    try {
      // const categoryInfo = await new Category({
      //     name,
      //     image: image ?? ''
      // }).save()
      console.log("controller req", image);

      const categoryInfo = await Category.create({
        name,
        image: image,
      });

      res.status(200).json({
        message: "Category Create Successfully",
        data: categoryInfo,
      });
    } catch (err) {
      res.status(500).json({
        code: 500,
        message: "Internal server error.",
      });
    }
  };

  //Category update or edit
  static update = async (req, res) => {
    const { name } = req.body;
    let image = null; // Initialize image as null
    let existingCategory = req.category;
    const imageBaseURL = process.env.IMAGE_BASE_URL;
    try {
      if (req.files && req.files.image) {
        // If a new image then delete the old image
        if (existingCategory && existingCategory.image) {
          fs.unlinkSync(`public/uploads/category/${existingCategory.image}`);
        }
        // Save the new image
        image = req.files.image[0].filename;
      }

      existingCategory.name = name ? name : existingCategory.name;
      existingCategory.image = image ? image : existingCategory.image;
      existingCategory.save();

      // Update the image URL with the base URL
      const updateCategory = await Category.findById(existingCategory._id);
      updateCategory.image = `${imageBaseURL}/${updateCategory.image}`;

      res.status(200).json({
        message: "Category updated successfully.",
        data: updateCategory,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        code: 500,
        message: "Internal server error.",
      });
    }
  };

  //delete category
  static delete = async (req, res) => {
    const categoryId = req.params.id;

    try {
      // Find the category by ID
      const category = req.category;

      if (!category) {
        return res.status(404).json({
          code: 404,
          message: "Category not found.",
        });
      }

      // Delete the category's image file if it exists
      if (category.image) {
        fs.unlinkSync(`public/uploads/category/${category.image}`);
      }

      // Delete the category from the database
      await Category.deleteOne({ _id: category._id });

      res.status(200).json({
        message: "Category deleted successfully.",
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        code: 500,
        message: "Internal server error.",
      });
    }
  };
}

export default CategoryController;
