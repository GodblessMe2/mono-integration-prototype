import axios from "axios";
import prisma from "../prisma";
import { MONO_API_KEY, MONO_BASE_URL } from "../config/env.config";

export const MonoService = {
  async linkAccount(code: string, userId: string) {
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

    return monoAccountId;
  },

  async fetchFinancialData(monoAccountId: string) {
    const { data } = await axios.get(
      `${MONO_BASE_URL}/${monoAccountId}/transactions`,
      { headers: { "mono-sec-key": MONO_API_KEY } }
    );

    return data;
  },
};
