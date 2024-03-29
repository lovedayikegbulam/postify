import * as authService from "../services/auth.service.js";

export const registerUser = async (req, res) => {
  try {
    const { name, email, password, confirmPassword } = req.body;
    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    const newUser = await authService.createUser(name, email, password);
     
    // Omit the 'password' field from the 'newUser' object
    // const { password: _, ...userData } = newUser.toObject();

    res
      .status(201)
      .json({ message: "User registered successfully", data: newUser });
  } catch (err) {
    res
      .status(400)
      .json({ message: "Registration failed", error: err.message });
  }
};
