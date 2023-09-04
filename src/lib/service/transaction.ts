import axios from "axios";
import type { ITransactionRequest, ITransactions } from "$lib/types.js";
import moment from "moment";
function date2utc(date: string) {
  return moment(date).utc().format();
}
export async function getTransactions(
  status?: string,
  start?: string,
  end?: string
): Promise<ITransactions[]> {
  try {
    if (!start) start = moment().startOf("week").format("YYYY-MM-DD");
    if (!end) end = moment().endOf("week").format("YYYY-MM-DD");
    const url = "/api/transaction?";
    if (typeof status === "string") status = status.toLowerCase();
    let params: URLSearchParams = new URLSearchParams({
      start: date2utc(start),
      end: date2utc(end),
    });
    if (status === "income" || status === "outcome")
      params.append("status", status);
    const { data } = await (<Promise<{ data: ITransactions[] }>>(
      axios.get(url + params.toString())
    ));
    return data;
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
    }
    return Promise.reject([]);
  }
}

export async function addTransaction(
  data: ITransactionRequest
): Promise<ITransactions> {
  try {
    const { data: result } = await (<Promise<{ data: ITransactions }>>(
      axios.post("/api/transaction", data)
    ));
    return result;
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
    }
    return Promise.reject([]);
  }
}
