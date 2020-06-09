import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-edit-comment',
  templateUrl: './edit-comment.component.html',
  styleUrls: ['./edit-comment.component.css']
})
export class EditCommentComponent implements OnInit {

  public editCommentForm: FormGroup
  public PUT_URL: string;
  private errorMessages = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<EditCommentComponent>,
    private http: HttpClient,
    private router: Router,
  ) { }

  initializeFormControls(): void {
    this.editCommentForm = new FormGroup({
      id: new FormControl(this.data.comment.id),
      text: new FormControl(this.data.comment.text),
      important: new FormControl(this.data.comment.important)
    })
  }

  editComment(): void {
    const editedComment = this.editCommentForm.value as Comment
    this.http.put(this.PUT_URL, editedComment)
      .subscribe(_ => { 
        this.router.navigateByUrl('expenses/' + this.data.expenseId); 
        this.dialogRef.close()
      }, err => this.errorMessages = err.error.errors)
  }

  ngOnInit() {
    this.initializeFormControls()
    this.PUT_URL = 'https://localhost:5001/api/expenses/' + this.data.expenseId + '/comments/' + this.data.comment.id
  }

}

export interface Comment {
  id: number,
  text: string,
  important: boolean
}