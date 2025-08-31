import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";
import { Router } from "express";
import path from "path";

const router = Router();
const swaggerDocument = YAML.load(path.join(process.cwd(), "openapi.yaml"));

router.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

export default router;
