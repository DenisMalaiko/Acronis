import { DealStatus } from "../enums/DealStatus";

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