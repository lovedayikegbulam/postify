import bcrypt from 'bcrypt';
import User from "../database/schema/user.schema.js";

export const createUser = async (name, email, password) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword });
    return await newUser.save();
};

