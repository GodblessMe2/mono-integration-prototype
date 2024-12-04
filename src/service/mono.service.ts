import axios from "axios";
import prisma from "../prisma";
import { MONO_API_KEY, MONO_BASE_URL } from "../config/env.config";

export const MonoService = {
  async linkAccount(code: string, userId: string, callback: any) {
    try {
      const { data } = await axios.post(
        `${MONO_BASE_URL}/auth`,
        { code },
        { headers: { "mono-sec-key": MONO_API_KEY } }
      );

      const monoAccountId = data.id;

      await prisma.user.update({
        where: { id: userId },
        data: { monoAccountId },
      });

      callback(null, monoAccountId);
    } catch (error) {
      callback(error, null);
    }
  },

  async fetchFinancialData(monoAccountId: string, callback: any) {
    try {
      const { data } = await axios.get(
        `${MONO_BASE_URL}/${monoAccountId}/transactions`,
        { headers: { "mono-sec-key": MONO_API_KEY } }
      );
      callback(null, data);
    } catch (error) {
      callback(error, null);
    }
  },

  async fetchAccountIdentity(monoAccountId: string, callback: any) {
    try {
      const { data } = await axios.get(
        `${MONO_BASE_URL}/${monoAccountId}/identity`,
        {
          headers: { "mono-sec-key": MONO_API_KEY },
        }
      );

      callback(null, data);
      return data;
    } catch (error) {
      callback(error, null);
    }
  },

  async fetchAccountBalance(monoAccountId: string, callback: any) {
    try {
      const { data } = await axios.get(
        `${MONO_BASE_URL}/${monoAccountId}/balance`,
        {
          headers: { "mono-sec-key": MONO_API_KEY },
        }
      );
      callback(null, data);
      return data;
    } catch (error) {
      callback(error, null);
    }
  },

  async fetchIncome(monoAccountId: string, callback: any) {
    try {
      const { data } = await axios.get(
        `${MONO_BASE_URL}/${monoAccountId}/income`,
        {
          headers: { "mono-sec-key": MONO_API_KEY },
        }
      );
      callback(null, data);
      return data;
    } catch (error) {
      callback(error, null);
    }
  },

  async fetchCustomerAccounts(callback: any) {
    try {
      const { data } = await axios.get(`${MONO_BASE_URL}`, {
        headers: { "mono-sec-key": MONO_API_KEY },
      });
      callback(null, data);
      return data;
    } catch (error) {
      callback(error, null);
    }
  },
};
