import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-add-expense',
  templateUrl: './add-expense.component.html',
  styleUrls: ['./add-expense.component.css']
})
export class AddExpenseComponent implements OnInit {

  public POST_NEW_URL: string = 'https://localhost:5001/api/expenses';

  @Output() public onSubmit: EventEmitter<any> = new EventEmitter<any>();
  @Output() public toggleHide: EventEmitter<any> = new EventEmitter<any>();
  
  newExpenseForm = new FormGroup({
    description: new FormControl(''),
    sum: new FormControl(''),
    currency: new FormControl(''),
    location: new FormControl(''),
    date: new FormControl(''),
    type: new FormControl('')
  })

  constructor(private http: HttpClient) { }

  addOrUpdateExpense(): void {
    let newExpense = this.newExpenseForm.value as NewExpense;

    this.http.post<any>(this.POST_NEW_URL, newExpense)
      .subscribe(_ => {
        this.onSubmit.emit(null);
        this.toggleHide.emit(null);
      });
  }

  toggleHideForm(): void {
    this.toggleHide.emit(null);
  }

  ngOnInit() {
  }

}

interface NewExpense {
  description: string,
  sum: number,
  currency: string,
  location: string,
  date: Date,
  type: string,
}