//services
import Expense from "../../Services/Expense";
import Category from "../../Services/Category";

export default (db) => {

    return {
        
        addExpense: async (req, res) => {

            const { catId, catName, amount } = req.body;
            const { userId } = req.user;

            let categoryId = catId;

            if (!catId && catName) {
                const category = new Category({ userId, name: catName });
                const addCatResponse = await category.addCategory(db);

                if (addCatResponse.success === true && addCatResponse.status === 201) {
                    categoryId = addCatResponse.catId
                } else {
                    return res.status(addCatResponse.status).json(addCatResponse);
                }

            }

            const expense = new Expense({ userId, catId: categoryId, amount });

            const addExresponse = await expense.addExpense(db);

            res.status(addExresponse.status).json(addExresponse);

        },

        getExpensesOfUser: async (req, res) => {

            const { userId } = req.user;
            const expense = new Expense({ userId });
            const response = await expense.getExpenses(db);

            res.status(response.status).json(response);
            
        },

        deleteExpenseById: async (req, res) => {

            const { exId } = req.params;
            const expense = new Expense({ exId });
            const response = await expense.removeExpense(db);

            res.status(response.status).json(response);

        }
    }
}