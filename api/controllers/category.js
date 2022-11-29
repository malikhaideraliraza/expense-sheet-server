//services
import Category from "../../Services/Category";


export default (db) => {

    return {
        
        getCategories: async (req, res) => {

            const { userId } = req.user;
            const category = new Category({ userId });
            const response = await category.getCategories(db);

            res.status(response.status).json(response);

        }
    }
}