import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ExpenseDetail } from '../Models/ExpenseDetail';
import { FormControl, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-edit-expense',
  templateUrl: './edit-expense.component.html',
  styleUrls: ['./edit-expense.component.css']
})
export class EditExpenseComponent implements OnInit {

  expenseId: string;
  public GET_DETAILS_URL = 'https://localhost:5001/api/expenses/';
  public currentExpense: ExpenseDetail;
  public editExpenseForm: FormGroup;
  private errorMessages = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private http: HttpClient
  ) { }

  getExpenseDetails(): void {
    this.http.get<ExpenseDetail>(this.GET_DETAILS_URL + this.expenseId)
      .subscribe(expense => { this.currentExpense = expense; this.initializeFormControls(); });
  }

  initializeFormControls(): void {
    this.editExpenseForm = new FormGroup({
      id: new FormControl(this.currentExpense.id),
      description: new FormControl(this.currentExpense.description),
      sum: new FormControl(this.currentExpense.sum),
      currency: new FormControl(this.currentExpense.currency),
      location: new FormControl(this.currentExpense.location),
      date: new FormControl(this.currentExpense.date),
      type: new FormControl(this.currentExpense.type)
    })
  }

  editExpense(): void {
    const editedExpense = this.editExpenseForm.value as ExpenseDetail;

    this.http.put(this.GET_DETAILS_URL + this.expenseId, editedExpense)
      .subscribe(_ => this.router.navigateByUrl('expenses'), err => this.errorMessages = err.error.errors);
  }

  ngOnInit() {
    this.expenseId = this.activatedRoute.snapshot.paramMap.get('id');
    this.getExpenseDetails();
  }

}
