export interface ExpenseDetail {
  id: number,
  description: string,
  sum: number,
  location: string,
  date: Date,
  currency: string,
  type: string,
  comments: any[]
}
