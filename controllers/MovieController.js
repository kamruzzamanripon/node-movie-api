import fs from "fs";
import { v4 } from "uuid";
import Movie from '../models/Movie.js';

class MovieController{
  //find a movie by  id
  static movieById = async (req, res, next, id) => {
    const movie = await Movie.findById(id);
    console.log('movie info', movie)
    if (!movie) {
      return res.status(404).json({
        code: 404,
        message: "Movie not found.",
      });
    }

    req.movie = movie;
    // console.log('cat result', req.category)
    next();
  };

  //all Movie
  static allMovie = async (req, res) => {
    try {
      const imageBaseURL = process.env.IMAGE_BASE_URL;
      const allMovie = await Movie.find().populate('category_id');

      // Update the image URL for each category
      const updatedMovieList = allMovie.map((movie) => {
      
        return {
            ...movie._doc,
            image: `${imageBaseURL}/${movie.image}`,
            category_id: {
              ...movie.category_id._doc,
              image: `${imageBaseURL}/${movie.category_id.image}`,
            },
          };
      });

      res.status(200).json({
        message: "All Movie",
        data: updatedMovieList,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        code: 500,
        message: "Internal server error.",
      });
    }
  };

  //Top Movie
  static topMovie = async (req, res) => {
    try {
      const imageBaseURL = process.env.IMAGE_BASE_URL;
      const topMovies = await Movie.find()
        .sort({ createdAt: -1 }) 
        .populate('category_id')
        .limit(8); 

      // Update the image URL for each movie
      const updatedTopMovies = topMovies.map((movie) => {
        return {
          ...movie._doc,
          image: `${imageBaseURL}/${movie.image}`,
          category_id: {
            ...movie.category_id._doc,
            image: `${imageBaseURL}/${movie.category_id.image}`,
          },
        };
      });

      res.status(200).json({
        message: "Top 8 Movies",
        data: updatedTopMovies,
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
  static singleMovie = async (req, res) => {
    const imageBaseURL = process.env.IMAGE_BASE_URL;
    const movie = req.movie;
    await movie.populate('category_id');
    movie.image = `${imageBaseURL}/${movie.image}`;
    movie.category_id.image = `${imageBaseURL}/${movie.category_id.image}`;
    res.status(200).json({
      message: "Single movie",
      data: movie,
    });
  };

   //store Movie
   static store = async (req, res) => {
    const { title, discription, category_id } = req.body;
    const image = req.files.image[0].filename;

    try {
        const movieInfo = await Movie.create({
        title,
        discription,
        category_id,
        image: image,
      });

      res.status(200).json({
        message: "Movie Create Successfully",
        data: movieInfo,
      });
    } catch (err) {
      res.status(500).json({
        code: 500,
        message: "Internal server error.",
      });
    }
  };

  //Ai movie store
  static aiStore = async (req, res) => {
   
    const { title, category_id, description, image } = req.body;
    
    console.log('node-1', req.body)
    
    
    // Convert the base64 image data to a buffer
    const imageBuffer = Buffer.from(image, 'base64');
    
    // Generate a unique filename for the image using UUID
    const imageName = `${v4()}.jpg`;
  
    try {
      // Save the image to a directory (you can change the path as needed)
      fs.writeFileSync(`./public/uploads/movie/${imageName}`, imageBuffer);
  
      // Save the movie information to the database
      const movieInfo = await Movie.create({
        title,
        description,
        category_id,
        image: imageName,
      });
  
      res.status(200).json({
        message: "Movie Create Successfully",
        data: movieInfo,
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
    const { title, discription, category_id } = req.body;
    const imageBaseURL = process.env.IMAGE_BASE_URL;
    let image = null; // Initialize image as null
    let existingMovie = req.movie;
    try {
      if (req.files && req.files.image) {
        // If a new image then delete the old image
        if (existingMovie && existingMovie.image) {
          fs.unlinkSync(`public/uploads/movie/${existingMovie.image}`);
        }
        // Save the new image
        image = req.files.image[0].filename;
      }
      console.log('movie data', title, discription, category_id)
      existingMovie.title = title ? title : existingMovie.title;
      existingMovie.discription = discription ? discription : existingMovie.discription;
      existingMovie.category_id = category_id ? category_id : existingMovie.category_id;
      existingMovie.image = image ? image : existingMovie.image;
      existingMovie.save();

      console.log("existingMovie", existingMovie)
      // Update the image URL with the base URL
      const updateMovie = await Movie.findById(existingMovie._id);
      updateMovie.image = `${imageBaseURL}/${updateMovie.image}`;

      res.status(200).json({
        message: "Movie updated successfully.",
        data: updateMovie,
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
    try {
      // Find the category by ID
      const movie = req.movie;

      // Delete the category's image file if it exists
      if (movie.image) {
        fs.unlinkSync(`public/uploads/movie/${movie.image}`);
      }

      // Delete the category from the database
      await movie.deleteOne({ _id: movie._id });

      res.status(200).json({
        message: "movie deleted successfully.",
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

export default MovieController

