import { errorHandler } from "$lib/server/middleware.js";
import prisma from "$lib/server/prisma.js";
import type { ITransactionRequest } from "$lib/types.js";
import { json } from "@sveltejs/kit";

export async function GET({ url }) {
  try {
    const status = url.searchParams.get("status") || undefined;
    const start = url.searchParams.get("start") || undefined;
    const end = url.searchParams.get("end") || undefined;

    const transactions = await prisma.transactions.findMany({
      where: {
        status,
        AND: [{ createdAt: { gte: start } }, { createdAt: { lte: end } }],
      },
      orderBy: { createdAt: "desc" },
    });
    return json(transactions);
  } catch (error) {
    errorHandler(error);
  }
}

export async function POST({ request }) {
  try {
    const data = await (<Promise<ITransactionRequest>>request.json());
    const addedTransaction = await prisma.transactions.create({ data });
    return json(addedTransaction);
  } catch (error) {
    errorHandler(error);
  }
}

export async function PUT({ request }) {
  try {
    const data = await (<Promise<{ id: number & ITransactionRequest }>>(
      request.json()
    ));
    const { id } = data;
    const updatedTransaction = await prisma.transactions.update({
      data,
      where: { id },
    });
    return json(updatedTransaction);
  } catch (error) {
    errorHandler(error);
  }
}

export async function DELETE({ url }) {
  try {
    const id = url.searchParams.get("id");
    if (!id) throw new Error("query string missing");
    const deletedTransaction = await prisma.transactions.delete({
      where: { id: parseInt(id) },
    });
    return json(deletedTransaction);
  } catch (error) {
    errorHandler(error);
  }
}
