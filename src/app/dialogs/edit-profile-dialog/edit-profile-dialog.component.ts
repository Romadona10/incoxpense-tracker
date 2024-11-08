import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-profile-dialog',
  templateUrl: './edit-profile-dialog.component.html',
  styleUrls: ['./edit-profile-dialog.component.scss']
})
export class EditProfileDialogComponent {

  editProfileForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<EditProfileDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    
    this.editProfileForm = this.fb.group({
      fullName: [data.name, Validators.required],
      email: [data.email, [Validators.required, Validators.email]]
    });
  }

  onSubmit() {
    if (this.editProfileForm.valid) {
      // Close the dialog and pass back the form data
      this.dialogRef.close(this.editProfileForm.value);
    }
  }

}
