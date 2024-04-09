export * as Todo from "./todo";
import crypto from "crypto";
import { RDS } from "sst/node/rds";

export async function create() {
  const id = crypto.randomUUID();
  // write to database
}

export function list() {
  return Array(50)
    .fill(0)
    .map((_, index) => ({
      id: crypto.randomUUID(),
      title: "Todo #" + index,
    }));
}
