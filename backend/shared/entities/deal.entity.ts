import { DealStatus } from "../enums/DealStatus.js";

export type DealBase = {
  name: string;
  accountName: string;
  status: DealStatus;
  amount: number;
}

export type Deal = DealBase & {
  id: string,
  createdAt: Date,
};