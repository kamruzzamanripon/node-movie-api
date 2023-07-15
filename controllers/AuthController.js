import { hashMaker, matchData } from "../helpers/bcryp.js";
import { createToken } from "../helpers/jwt.js";
import User from "../models/User.js";


class UserController {

  static registration = async (req, res) => {
    try {
      const { name, email, password, password_confirmation } = req.body;
      const existEmail = await User.findOne({ email }).lean().exec();
      if (existEmail) {
        return res.status(413).json({
          code: 201,
          message: "This Email is already used.",
        });
      }

      const hashPassword = hashMaker(password);
      const registerUser = await new User({
        name: name,
        email: email,
        password: hashPassword,
      }).save();
      console.log("userEmail", hashPassword);

      res.status(201).json({
        code: 201,
        message: "User registration Successfully.",
        payload: registerUser,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        code: 500,
        message: "Internal server error.",
      });
    }
  }

  static login = async (req, res) =>{
    try {
        const { email, password } = req.body;
        const existEmail = await User.findOne({ email }).lean().exec();
        //mail check
        if (!existEmail) {
          return res.status(413).json({
            code: 201,
            message: "crediential didn't match",
          });
        }
  
        const hashPassword = matchData(password, existEmail.password);
        //password check
        if(!hashPassword){
            return res.status(413).json({
                code: 201,
                message: "crediential didn't match",
              });
        } 
       
       const {_id, name} = existEmail
        const payload ={
            name,
            email,
            token: "Bearer " + createToken({ _id, email })
        }

        res.status(200).json({
            code: 200,
            message: "User Login Successfully.",
            payload
        });
      } catch (err) {
        console.log(err);
        res.status(500).json({
          code: 500,
          message: "Internal server error.",
        });
      }
  }

  static logout = (req, res)=>{
      try {
        // Clear the token from the cookie
        res.clearCookie('token');
    
        res.status(200).json({
          code: 200,
          message: 'User logged out successfully.',
        });
      } catch (err) {
        console.log(err);
        res.status(500).json({
          code: 500,
          message: "Internal server error.",
        });
      }
   
  }

  static changePassword = async(req, res)=>{
    const {password, password_confirmation } = req.body;
    try{
      const {_id} = req.user;
      if (password !== password_confirmation) {
        return res.status(413).json({
          code: 201,
          message: "crediential didn't match",
        });
      }
      const userInfo = await User.findById(_id);
      const hashPassword = hashMaker(password);
      userInfo.password = hashPassword;
      await userInfo.save();
      console.log(userInfo)
      //await User.updateOne({ _id: _id }, { $set: payload }, { upsert: false });

      res.status(200).json({
        code: 200,
        message: "passwrod Change Successfully.",
        
    });

    }catch(err){
      console.log(err);
      res.status(500).json({
        code: 500,
        message: "Internal server error.",
      });
    }
  }





  
}




export default UserController;
