import { TransactionStatus } from "@prisma/client";

export interface CreateTransactionResponse {
  id: string;
  status: TransactionStatus;
  amount: number;
  description: string;
  confirmationUrl: string;
  metadata?: unknown;
}

export interface CreateTransactionRequest {
  amount: number;
  description: string;
  returnUrl: string;
  metadata?: unknown;
}
