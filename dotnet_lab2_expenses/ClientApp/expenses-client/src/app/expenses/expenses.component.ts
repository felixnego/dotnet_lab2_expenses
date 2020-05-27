import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.css']
})
export class ExpensesComponent implements OnInit {

  public expenses: Expense[];
  public GET_ALL_URL: string = 'https://localhost:5001/api/expenses';

  constructor(private http: HttpClient) { }

  /* Get list of expenses from Server */
  getExpenses(): void {
    this.http.get<Expense[]>(this.GET_ALL_URL)
      .subscribe(expenses => this.expenses = expenses);
  }

  ngOnInit() {
    this.getExpenses();
  }

}

interface Expense {
  sum: number,
  description: string,
  date: Date,
  type: string,
  comments: any[],
  noComments: number;
}