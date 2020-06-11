import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ExpenseSummary } from '../Models/ExpenseSummary';
import { AuthService } from '../services/auth.service';
import { FormGroup, FormArray, Validators, FormControl, NgForm } from '@angular/forms';

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.css']
})
export class ExpensesComponent implements OnInit {

  public expenses: ExpenseSummary[];
  public add: boolean = false;
  public GET_ALL_URL: string = 'https://localhost:5001/api/expenses';
  public DELETE_URL: string = 'https://localhost:5001/api/expenses/';
  public isLoggedIn: boolean;

  constructor(
    private http: HttpClient,
    private _authService: AuthService
    ) { }

  /* Get list of expenses from Server */
  getExpenses(validate?: NgForm): void {
    if (validate) {
      if (validate.value.from || validate.value.to) {
        this.GET_ALL_URL += '?';
      }

      if (validate.value.from) {
        this.GET_ALL_URL += `from=${validate.value.from}`;
      }

      if (validate.value.to && validate.value.from) {
        this.GET_ALL_URL += `&to=${validate.value.to}`;
      } else if (validate.value.to) {
        this.GET_ALL_URL += `to=${validate.value.to}`;
      }
    }
    
    this.http.get<ExpenseSummary[]>(this.GET_ALL_URL)
      .subscribe(expenses => this.expenses = expenses);

    this.GET_ALL_URL = 'https://localhost:5001/api/expenses';

  }

  /* Toggle the Add Expense component */
  toggleAdd(): void {
    this.add = true;
  }

  reloadData(action: any): void {
    this.getExpenses();
  }

  hideAddForm(action: any): void {
    this.add = false;
  }

  /* Delete an Expense */
  deleteExpense(id: string): void {
    this.http.delete(this.DELETE_URL + id)
      .subscribe(_ => this.getExpenses());
  }


  
  ngOnInit() {
    this.getExpenses();
    this.isLoggedIn = this._authService.isLoggedIn();
  }

}
