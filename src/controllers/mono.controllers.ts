import { Request, Response } from "express";
import { MonoService } from "../service/mono.service";
import ResponseHandler from "../utils/response-handler";
import { HTTP_CODES } from "../config/constants";
import prisma from "../prisma";

export const MonoController = {
  async linkBankAccount(req: Request, res: Response) {
    const { code, userId } = req.body;

    try {
      const monoAccountId = await MonoService.linkAccount(code, userId);

      return ResponseHandler.sendSuccessResponse({
        res,
        code: HTTP_CODES.CREATED,
        message: "Request completed successfully",
        data: monoAccountId,
      });
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

      const financialData = await MonoService.fetchFinancialData(
        user.monoAccountId
      );

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
    } catch (error: any) {
      return ResponseHandler.sendErrorResponse({
        res,
        code: HTTP_CODES.INTERNAL_SERVER_ERROR,
        error,
      });
    }
  },
};
