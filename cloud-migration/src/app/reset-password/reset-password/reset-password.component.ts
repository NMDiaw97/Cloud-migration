import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertDialogComponent } from 'src/app/dialog/alert-dialog/alert-dialog.component';
import { PasswordResetService } from 'src/app/services/password-reset.service';
@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  token: string | null | undefined;
  formGroup!: FormGroup;
  validToken = false;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog,
    private formBuilder: FormBuilder,
    private resetPasswordService: PasswordResetService
  ) { }

  ngOnInit(): void {
    this.validToken = this.verifyResetToken();
    this.resetPasswordForm();
  }

  verifyResetToken(): boolean {
    const token = this.route.snapshot.paramMap.get('reset-token');
    this.token = localStorage.getItem('reset-password-token');
    if (token === this.token) {
      return true;
     }
    else {
      return false;
    }
  }

  resetPasswordForm(): void {
    this.formGroup = this.formBuilder.group({
      password: ['', [Validators.required, Validators.maxLength, Validators.minLength]],
      confirmPassword: ['', [Validators.required, Validators.maxLength, Validators.minLength]]
    });
  }

  reset(form: FormGroup): void {
    form.reset();
  }

  // tslint:disable-next-line:typedef
  get f() {
    return this.formGroup.controls;
  }

  submit(): void {
    if (this.formGroup.invalid || (this.f.password.value !== this.f.confirmPassword.value)) {
      return ;
    }
    const passwordForm = this.f.password.value;
    this.resetPasswordService.resetPassword(passwordForm, this.token).then( data => {
      console.log(data);
      this.mailConfirmation(data.message);
    })
    .catch( error => {
      console.log(error);
    });
    console.log(passwordForm);
  }

  mailConfirmation(message: string): void {
      const dialogRef = this.dialog.open(AlertDialogComponent, {
        width: '200px',
        data: {
          message
        }
      });
      dialogRef.afterClosed().subscribe( result => {
        if (result) {
          localStorage.removeItem('reset-password-token');
          this.router.navigate(['/login']);
        }
      });
  }

}
