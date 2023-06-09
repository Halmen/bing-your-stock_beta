import { z } from "zod";

export const StockQuoteSchema = z.object({
  c: z.number().optional(),
  h: z.number().optional(),
  l: z.number().optional(),
  o: z.number().optional(),
  pc: z.number().optional(),
  t: z.number().optional(),
  error: z.string().optional(),
});

export const StockCandleSchema = z.object({
  c: z.array(z.number()),
  h: z.array(z.number()),
  l: z.array(z.number()),
  o: z.array(z.number()),
  s: z.string(),
  t: z.array(z.number()),
  v: z.array(z.number()),
});

export const StockSchema = z.object({
  description: z.string().optional(),
  displaySymbol: z.string(),
  symbol: z.string(),
  type: z.string().optional(),
});

export const SymbolLookUpSchema = z.object({
  count: z.number(),
  result: z.array(StockSchema),
});

export type StockQuoteModel = z.infer<typeof StockQuoteSchema>;
export type StockCandleModel = z.infer<typeof StockCandleSchema>;
export type SymbolLookUpModel = z.infer<typeof SymbolLookUpSchema>;
export type StockSchemaModel = z.infer<typeof StockSchema>;
