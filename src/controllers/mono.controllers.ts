import { Request, Response } from "express";
import { MonoService } from "../service/mono.service";
import ResponseHandler from "../utils/response-handler";
import { HTTP_CODES } from "../config/constants";
import prisma from "../prisma";

export const MonoController = {
  async linkBankAccount(req: Request, res: Response) {
    const { code, userId } = req.body;

    try {
      await MonoService.linkAccount(
        code,
        userId,
        async (error: any, body: any) => {
          if (error) {
            return ResponseHandler.sendErrorResponse({
              res,
              code: HTTP_CODES.INTERNAL_SERVER_ERROR,
              error,
            });
          }

          const monoAccountId = body.monoAccountId;
          return ResponseHandler.sendSuccessResponse({
            res,
            code: HTTP_CODES.CREATED,
            message: "Request completed successfully",
            data: monoAccountId,
          });
        }
      );
    } catch (error: any) {
      return ResponseHandler.sendErrorResponse({
        res,
        code: HTTP_CODES.INTERNAL_SERVER_ERROR,
        error,
      });
    }
  },

  async getFinancialData(req: Request, res: Response) {
    const { userId } = req.params;

    try {
      const user = await prisma.user.findUnique({ where: { id: userId } });

      if (!user || !user.monoAccountId) {
        return ResponseHandler.sendErrorResponse({
          res,
          code: HTTP_CODES.BAD_REQUEST,
          error: "User or account not found",
        });
      }

      await MonoService.fetchFinancialData(
        user.monoAccountId,
        async (error: any, body: any) => {
          if (error) {
            return ResponseHandler.sendErrorResponse({
              res,
              code: HTTP_CODES.INTERNAL_SERVER_ERROR,
              error,
            });
          }

          const financialData = body.data;

          await prisma.financialData.create({
            data: {
              userId: user.id,
              data: financialData,
            },
          });

          return ResponseHandler.sendSuccessResponse({
            res,
            message: "Fetch successfully and saved",
            data: financialData,
          });
        }
      );
    } catch (error: any) {
      return ResponseHandler.sendErrorResponse({
        res,
        code: HTTP_CODES.INTERNAL_SERVER_ERROR,
        error,
      });
    }
  },

  async getIncomeData(req: Request, res: Response) {
    const { userId } = req.params;

    try {
      const user = await prisma.user.findUnique({ where: { id: userId } });

      if (!user || !user.monoAccountId) {
        return ResponseHandler.sendErrorResponse({
          res,
          code: HTTP_CODES.BAD_REQUEST,
          error: "User or account not found",
        });
      }

      await MonoService.fetchIncome(
        user.monoAccountId,
        async (error: any, body: any) => {
          if (error) {
            return ResponseHandler.sendErrorResponse({
              res,
              code: HTTP_CODES.INTERNAL_SERVER_ERROR,
              error,
            });
          }

          const incomeData = body.data;

          return ResponseHandler.sendSuccessResponse({
            res,
            message: "Fetch successfully",
            data: incomeData,
          });
        }
      );
    } catch (error: any) {
      return ResponseHandler.sendErrorResponse({
        res,
        code: HTTP_CODES.INTERNAL_SERVER_ERROR,
        error,
      });
    }
  },

  async getAccountBalance(req: Request, res: Response) {
    const { userId } = req.params;

    try {
      const user = await prisma.user.findUnique({ where: { id: userId } });

      if (!user || !user.monoAccountId) {
        return ResponseHandler.sendErrorResponse({
          res,
          code: HTTP_CODES.BAD_REQUEST,
          error: "User or account not found",
        });
      }

      await MonoService.fetchAccountBalance(
        user.monoAccountId,
        async (error: any, body: any) => {
          if (error) {
            return ResponseHandler.sendErrorResponse({
              res,
              code: HTTP_CODES.INTERNAL_SERVER_ERROR,
              error,
            });
          }

          const balanceData = body.data;

          return ResponseHandler.sendSuccessResponse({
            res,
            message: "Fetch successfully",
            data: balanceData,
          });
        }
      );
    } catch (error: any) {
      return ResponseHandler.sendErrorResponse({
        res,
        code: HTTP_CODES.INTERNAL_SERVER_ERROR,
        error,
      });
    }
  },

  async getCustomerAccount(req: Request, res: Response) {
    const { userId } = req.params;

    try {
      const user = await prisma.user.findUnique({ where: { id: userId } });

      if (!user || !user.monoAccountId) {
        return ResponseHandler.sendErrorResponse({
          res,
          code: HTTP_CODES.BAD_REQUEST,
          error: "User or account not found",
        });
      }

      await MonoService.fetchCustomerAccounts(async (error: any, body: any) => {
        if (error) {
          return ResponseHandler.sendErrorResponse({
            res,
            code: HTTP_CODES.INTERNAL_SERVER_ERROR,
            error,
          });
        }

        const customerAccounts = body.data;

        return ResponseHandler.sendSuccessResponse({
          res,
          message: "Fetch successfully",
          data: customerAccounts,
        });
      });
    } catch (error: any) {
      return ResponseHandler.sendErrorResponse({
        res,
        code: HTTP_CODES.INTERNAL_SERVER_ERROR,
        error,
      });
    }
  },

  async getAccountIdentity(req: Request, res: Response) {
    const { userId } = req.params;

    try {
      const user = await prisma.user.findUnique({ where: { id: userId } });

      if (!user || !user.monoAccountId) {
        return ResponseHandler.sendErrorResponse({
          res,
          code: HTTP_CODES.BAD_REQUEST,
          error: "User or account not found",
        });
      }

      await MonoService.fetchAccountIdentity(
        user.monoAccountId,
        async (error: any, body: any) => {
          if (error) {
            return ResponseHandler.sendErrorResponse({
              res,
              code: HTTP_CODES.INTERNAL_SERVER_ERROR,
              error,
            });
          }

          const accountIdentity = body.data;

          return ResponseHandler.sendSuccessResponse({
            res,
            message: "Fetch successfully",
            data: accountIdentity,
          });
        }
      );
    } catch (error: any) {
      return ResponseHandler.sendErrorResponse({
        res,
        code: HTTP_CODES.INTERNAL_SERVER_ERROR,
        error,
      });
    }
  },
};
