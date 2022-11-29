//Enums
import { ERROR_LABELS, DB_COLLECTION_NAMES } from '../utills/enums';

//services
import ErrorFactory from './ErrorFactory';

class Category {

    constructor (catObj) {
        this.category = catObj;
    }

    async addCategory (db) {

      try {

        //Collections
        const Category = db.collection(DB_COLLECTION_NAMES.CATEGORY);   
          const { name, userId } = this.category;
      
          if (!(name && userId)) {
            throw new Error(ERROR_LABELS.MISSING_INPUTS)
          }

          const cat = await Category.findOne({ name, userId });
      
          if (cat) {
            return {
                success: false,
                status: 409,
                message: "Category already existed!",
            };
          }

          const { insertedId } = await Category.insertOne({ name, userId });
          
          return {
            success: true,
            status: 201,
            message: "Category created!",
            catId: insertedId.toString()
           };
      } catch (error) {
        return new ErrorFactory(error.message).getResponse();
      }
    }

  async getCategories (db) {
    try {

      //Collections
      const Category = db.collection(DB_COLLECTION_NAMES.CATEGORY);        
      const { userId } = this.category;
  
      if (!(userId)) {
        throw new Error(ERROR_LABELS.MISSING_INPUTS)
      }

      const categories = await Category.find({  userId: userId.toString() }).toArray();

      return {
        success: true,
        status: 200,
        categories
      }
    } catch (error) {
      return new ErrorFactory(error.message).getResponse();
    }
  }
}

export default Category;