export type TickerStatus = "valid" | "invalid" | null;
interface MittomProps {
  stockValues?: {
    [key: string]: string;
  }[];
}
