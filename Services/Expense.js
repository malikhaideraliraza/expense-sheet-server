import { ObjectID } from 'mongodb';

//enums
import { DB_COLLECTION_NAMES, ERROR_LABELS } from '../utills/enums';

//services
import ErrorFactory from './ErrorFactory';

class Expense {

  constructor (exObj) {
    this.expense = exObj;
  }

    async addExpense (db) {

        try {
             //Collections
        const Expense = db.collection(DB_COLLECTION_NAMES.EXPENSE);        
        const { amount, catId, userId } = this.expense;
    
        if (!(amount && catId && userId)) {
          throw new Error(ERROR_LABELS.MISSING_INPUTS)
        }

        await Expense.insertOne({ amount, catId, userId });
        
        return {
          success: true,
          status: 201,
          message: "Expense added!",
         };
        } catch (err) {
          return new ErrorFactory(error.message).getResponse();
        }
    }

    async getExpenses (db) {
      try {
  
        //Collections
        const Expense = db.collection(DB_COLLECTION_NAMES.EXPENSE);       
        const { userId } = this.expense;
    
        if (!(userId)) {
          throw new Error(ERROR_LABELS.MISSING_INPUTS)
        }
  
        const expenses = await Expense.find({  userId: userId.toString() }).toArray();
  
        return {
          success: true,
          status: 200,
          expenses
        }
      } catch (error) {
        return new ErrorFactory(error.message).getResponse();
      }
    }

    async removeExpense (db) {
      try {
  
        //Collections
        const Expense = db.collection(DB_COLLECTION_NAMES.EXPENSE);       
        const { exId } = this.expense;
    
        if (!(exId)) {
          throw new Error(ERROR_LABELS.MISSING_INPUTS)
        }
  
        await Expense.deleteOne({  _id: ObjectID(exId) });
  
        return {
          success: true,
          status: 200,
          message: "Expense Deleted!"
        }
      } catch (error) {
        return new ErrorFactory(error.message).getResponse();
      }
    }
  }
  
  export default Expense;