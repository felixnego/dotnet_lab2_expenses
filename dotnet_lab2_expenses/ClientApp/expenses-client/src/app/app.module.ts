import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { ExpensesComponent } from './expenses/expenses.component';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { ExpenseDetailComponent } from './expense-detail/expense-detail.component';
import { AddExpenseComponent } from './add-expense/add-expense.component';
import { ReactiveFormsModule } from '@angular/forms';
import { EditExpenseComponent } from './edit-expense/edit-expense.component';
import { EditCommentComponent } from './edit-comment/edit-comment.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavMenuComponent,
    ExpensesComponent,
    ExpenseDetailComponent,
    AddExpenseComponent,
    EditExpenseComponent,
    EditCommentComponent
  ],
  imports: [
    HttpClientModule,
    MatDialogModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'expenses', component: ExpensesComponent },
      { path: 'expenses/:id', component: ExpenseDetailComponent },
      { path: 'expenses/:id/edit', component: EditExpenseComponent }
    ], { onSameUrlNavigation: 'reload' }),
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [EditCommentComponent]
})
export class AppModule { }
