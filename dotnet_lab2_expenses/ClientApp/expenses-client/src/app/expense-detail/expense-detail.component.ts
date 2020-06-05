import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ExpenseDetail } from '../Models/ExpenseDetail';

@Component({
  selector: 'app-expense-detail',
  templateUrl: './expense-detail.component.html',
  styleUrls: ['./expense-detail.component.css']
})
export class ExpenseDetailComponent implements OnInit {

  expenseId: string;
  public GET_DETAILS_URL = 'https://localhost:5001/api/expenses/';
  public currentExpense: ExpenseDetail;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient
  ) { }

  getExpenseDetails(): void {
    this.http.get<ExpenseDetail>(this.GET_DETAILS_URL + this.expenseId)
      .subscribe(expense => this.currentExpense = expense);
  }

  addComment(form: any): void {
    this.http.post(this.GET_DETAILS_URL + this.expenseId + '/comments', { text: form.value.text, important: form.value.important })
      .subscribe(_ => { this.getExpenseDetails(); form.resetForm() });
  }

  deleteComment(commentId: string): void {
    this.http.delete(this.GET_DETAILS_URL + this.expenseId + '/comments/' + commentId)
      .subscribe(_ => this.getExpenseDetails());
  }

  ngOnInit() {
    this.expenseId = this.route.snapshot.paramMap.get('id');
    this.getExpenseDetails();
  }

}
