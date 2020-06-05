export interface ExpenseSummary {
  id: number,
  sum: number,
  description: string,
  date: Date,
  type: string,
  comments: any[],
  noComments: number;
}