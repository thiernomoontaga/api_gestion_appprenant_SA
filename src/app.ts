import express from "express";
import cookieParser from "cookie-parser";
import userRoutes from "./modules/users/user.routes";
import profilSortieRoutes from "./modules/profilsorties/profilsortie.routes";
import swaggerDoc from "./middlewares/swagger";
import competenceRouter from "./modules/competence/competence.routes.js";
import authRoutes from "./modules/auth/auth.routes";
import { protectRoute } from "./modules/auth/auth.middleware";

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(swaggerDoc);

app.use("/auth", authRoutes);

app.use((req, res, next) => {
  if (req.path.startsWith("/auth")) return next();
  protectRoute(req, res, next);
});

app.use("/utilisateurs", userRoutes);
app.use("/profilsorties", profilSortieRoutes);
app.use("/competences", competenceRouter);
export default app;

