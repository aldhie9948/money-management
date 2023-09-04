export interface ITransactionRequest {
  nominal: number;
  name: string;
  status: string;
  createdAt: string;
}

export interface ITransactions {
  id: number;
  nominal: number;
  name: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}
