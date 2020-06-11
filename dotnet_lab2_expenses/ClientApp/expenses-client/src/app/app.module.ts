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
import { AuthService } from './services/auth.service';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavMenuComponent,
    ExpensesComponent,
    ExpenseDetailComponent,
    AddExpenseComponent,
    EditExpenseComponent,
    EditCommentComponent,
    RegisterComponent,
    LoginComponent
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
      { path: 'expenses/:id/edit', component: EditExpenseComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'login', component: LoginComponent }
    ], { onSameUrlNavigation: 'reload' }),
    BrowserAnimationsModule
  ],
  providers: [AuthService],
  bootstrap: [AppComponent],
  entryComponents: [EditCommentComponent]
})
export class AppModule { }
