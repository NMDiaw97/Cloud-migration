import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../class/user';
import { ConfirmationDialogComponent } from '../dialog/confirmation-dialog/confirmation-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '../services/auth.service';
import { RecoveryMailComponent } from '../reset-password/recovery-mail/recovery-mail.component';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  formGroup!: FormGroup;
  spinner = false;
  test!: boolean;
  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loginForm();
  }

    loginForm(): void {
    this.formGroup = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.maxLength, Validators.minLength]]
    });
  }

  reset(form: FormGroup): void {
    form.reset();
  }


  // tslint:disable-next-line:typedef
  get f() {
    return this.formGroup.controls;
  }

  loginConfirmation(user: User): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '400px',
      data: {
          message: 'Confirm Pour se loguer !'
      }
    });
    dialogRef.afterClosed().subscribe( result => {
      if (result) {
        this.spinner = true;
        this.authService.loginUser(user).then( data => {
          localStorage.setItem('token', data.accesToken);
          this.spinner = false;
          this.router.navigate(['/rules-management']);
        })
        .catch(e => {
          console.log(e);
          this.spinner = false;
          return this.loginForm();
        });
      }
    });
  }

  submit(): void {
    if (this.formGroup.invalid) {
      return;
    }
    const userData = new User();
    userData.username = this.f.username.value;
    userData.password = this.f.password.value ;
    console.log(userData.password);

    this.loginConfirmation(userData);
  }

  forgetPassword(): void {
    const dialogRef = this.dialog.open(RecoveryMailComponent, {
      width: '400px'
    });
    dialogRef.afterClosed().subscribe( result => {
      console.log(result);
    });
  }
}
