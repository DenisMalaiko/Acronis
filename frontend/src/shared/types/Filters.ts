import { DealStatus } from "../enums/DealStatus.js";

export type Range = {
  min: number | null
  max: number | null
}

export type DateRange = {
  from: string | null
  to: string | null
}

export type Filters = {
  statuses: DealStatus[]
  amount: Range
  date: DateRange
}