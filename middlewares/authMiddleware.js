import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const preventAuthenticatedAccess = (req, res, next) => {
    const token = req.cookies.token;
  
    if (token) {
      try {
        jwt.verify(token, process.env.SECRET_KEY);
        return res.status(403).json({message : "Already authenticated",success : true })
      } catch (error) {
        next();
      }
    } else {
      next();
    }
  };


  export default preventAuthenticatedAccess;