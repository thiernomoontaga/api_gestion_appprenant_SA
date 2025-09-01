import { Router } from "express";

const router = Router();

// Routes utilisateurs seront ajoutées plus tard
router.get("/", (req, res) => {
  res.json({ message: "Routes utilisateurs à implémenter" });
});

export default router;
