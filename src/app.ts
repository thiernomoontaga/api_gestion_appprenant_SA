// Initialisation d’Express
import express from "express";
import userRoutes from "./modules/users/user.routes";
import profilSortieRoutes from "./modules/profilsorties/profilsortie.routes";
import swaggerDoc from "./middlewares/swagger";
import competenceRouter from "./modules/competence/competence.routes.js";


const app = express();

app.use(express.json());
app.use(swaggerDoc);

app.use("/utilisateurs", userRoutes);
app.use("/profilsorties", profilSortieRoutes);
app.use("/competences", competenceRouter);

export default app;



