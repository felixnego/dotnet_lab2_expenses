import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ExpenseDetail } from '../Models/ExpenseDetail';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { AuthService } from '../services/auth.service';
import { EditCommentComponent } from '../edit-comment/edit-comment.component';


@Component({
  selector: 'app-expense-detail',
  templateUrl: './expense-detail.component.html',
  styleUrls: ['./expense-detail.component.css']
})
export class ExpenseDetailComponent implements OnInit {

  expenseId: string;
  public GET_DETAILS_URL = 'https://localhost:5001/api/expenses/';
  public currentExpense: ExpenseDetail;
  private errorMessages = [];
  public isLoggedIn: boolean;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private _authService: AuthService,
    private dialog: MatDialog
  ) { }

  getExpenseDetails(): void {
    this.http.get<ExpenseDetail>(this.GET_DETAILS_URL + this.expenseId)
      .subscribe(expense => this.currentExpense = expense);
  }

  addComment(form: any): void {
    this.http.post(this.GET_DETAILS_URL + this.expenseId + '/comments', { text: form.value.text, important: form.value.important })
      .subscribe(_ => { this.getExpenseDetails(); form.resetForm() }, err => { this.errorMessages = err.error.errors; console.log(err.error.errors)});
  }

  deleteComment(commentId: string): void {
    this.http.delete(this.GET_DETAILS_URL + this.expenseId + '/comments/' + commentId)
      .subscribe(_ => this.getExpenseDetails());
  }

  testPopUp(comment) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true; // closes on ESC or clickng outside
    dialogConfig.autoFocus = true;
    // dialogConfig.width = "60%";
    let ref = this.dialog.open(EditCommentComponent, { data: { comment: comment, expenseId: this.expenseId}});
    ref.afterClosed().subscribe(_ => this.getExpenseDetails())
  }

  ngOnInit() {
    this.expenseId = this.route.snapshot.paramMap.get('id');
    this.getExpenseDetails();
    this.isLoggedIn = this._authService.isLoggedIn();
  }

}
