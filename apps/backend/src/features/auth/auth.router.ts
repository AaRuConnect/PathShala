import { Router } from "express";
import { registerUser } from "./auth.service";

export const authRouter = Router();

authRouter.post("/register", async (req, res) => {
  try {
    const user = await registerUser(req.body);
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Registration failed", error });
  }
});
