//services
import User from "../../Services/user";


export default (db) => {

    return {
        
        login: async (req, res) => {

            const { email, password } = req.body;
            const user = new User({ email, password });
            const response = await user.login(db);

            res.status(response.status).json(response);

        },

        register: async (req, res) => {
            console.log("body:", req.body);
            const user = new User(req.body);
            const response = await user.register(db);

            res.status(response.status).json(response);

        },

        getUser: async (req, res) => {
            //TODO to be implemented
            res.json({ success: true });
        }
    }
}