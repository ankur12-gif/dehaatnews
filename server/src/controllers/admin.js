import { TryCatch } from "../middleware/error.js";
import { User } from "../models/admin.js";

const createUser = TryCatch(async (req, res) => {
    const { name, email } = req.body;

    const createdUser = await User.create({ name, email, role: "user" });

    return res.status(200).json({ success: true, createdUser });
});


export { createUser };
