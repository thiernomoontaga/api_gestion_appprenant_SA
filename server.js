import express from 'express';
import competenceRouter from "./dist/modules/competence/competence.routes.js";

const portDefault = 3000;

const app = express();

app.use(express.json());

app.use("/competences", competenceRouter);

const PORT = process.env.PORT || portDefault;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
