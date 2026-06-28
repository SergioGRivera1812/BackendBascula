import express from "express";
import { transaccionController } from "../controllers/transaccionController.js";

const router = express.Router();

router.get("/", transaccionController.obtenerTodas);

export default router;
