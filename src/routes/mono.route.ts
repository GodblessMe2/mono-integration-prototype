import express from "express";
import  {MonoController} from "../controllers/mono.controllers";

const router = express.Router();

router.post("/linkAccount", MonoController.linkBankAccount);
router.get("/financialData/:userId", MonoController.getFinancialData);

export default router;
