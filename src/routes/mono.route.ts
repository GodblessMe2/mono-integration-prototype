import express from "express";
import { MonoController } from "../controllers/mono.controllers";

const router = express.Router();

router.post("/linkAccount", MonoController.linkBankAccount);
router.get("/financialTransaction/:userId", MonoController.getFinancialData);
router.get("/getAccountIdentity/:userId", MonoController.getAccountIdentity);
router.get("/getUserAccountBalance/:userId", MonoController.getAccountBalance);
router.get("/getIncome/:userId", MonoController.getIncomeData);
router.get("/getAllCustomerAccount", MonoController.getCustomerAccount);

export default router;
