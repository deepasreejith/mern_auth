import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";



export const signin = async (req, res, next) => {
  const { email, password } = req.body;
  try {

    const validAdmin = await User.findOne({ email,isAdmin: true })
    if(!validAdmin) return next(errorHandler(404, "Admin not found"));

    const validUser = await User.findOne({ email });
    if (!validUser) return next(errorHandler(404, "Admin not found"));
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) return next(errorHandler(401, "wrong credentials"));
    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
    const { password: hashedPassword, ...rest } = validUser._doc;
    const expiryDate = new Date(Date.now()+3600000); //1 hour
    res
      .cookie("access_token", token, { httpOnly: true ,expires:expiryDate})
      .status(200)
      .json(rest);
  } catch (error) {
    next(error);
  }
};


export const signout = (req,res) =>{
  res.clearCookie('access_token').status(200).json('Signout success');
}
