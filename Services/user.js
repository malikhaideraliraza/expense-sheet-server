import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

//Enums
import { ERROR_LABELS, DB_COLLECTION_NAMES } from '../utills/enums';

//services
import ErrorFactory from './ErrorFactory';

class User {

    constructor (userObj) {
        this.user = userObj;
    }

    async login (db) {

      try {

        //Collections
        const User = db.collection(DB_COLLECTION_NAMES.USER);          
          const { email, password } = this.user;
      
          // Validate user input
          if (!(email && password)) {
            //this responce is common verify for others in case of any change
            throw new Error(ERROR_LABELS.MISSING_INPUTS)
          }

          const user = await User.findOne({ email });
      
          if (user && (await bcrypt.compare(password, user.password))) {
            // Create token
            const token = jwt.sign(
              { userId: user._id.toString(), email },
              process.env.JWT_SECRET_KEY,
              {
                expiresIn: "20h",
              }
            );
      
            // save user token
            user.token = token;
      
            // user
            return {
              success: true,
              status: 200,
              user
            }
          }
          
          throw new Error(ERROR_LABELS.INVALID_CREDS);
      } catch (error) {
        return new ErrorFactory(error.message).getResponse();
      }
    }

  async register (db) {
      // Our register logic starts here
    try {

      //Collections
      const User = db.collection(DB_COLLECTION_NAMES.USER);

      const { email, password, name } = this.user;
      
      // Validate user input
      if (!(email && password && name)) {
        throw new Error(ERROR_LABELS.MISSING_INPUTS);
      }
  
      // check if user already exist
      const oldUser = await User.findOne({ email });
  
      if (oldUser) {

        return {
          success: false,
          status: 409,
          message: "User already existed!"
        };
      }
  
      //Encrypt user password
      const encryptedPassword = await bcrypt.hash(password, 10);
  
      // Create user in our database
      const user = await User.insertOne({
        name,
        email: email,
        password: encryptedPassword,
      });

      return {
        success: true,
        status: 201,
        message: "User created successfully!"
      }
    } catch (error) {
      return new ErrorFactory(error.message).getResponse();
    }
  }
}

export default User;