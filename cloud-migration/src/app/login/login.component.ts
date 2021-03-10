import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../class/user';
import { ConfirmationDialogComponent } from '../criteria-management/confirmation-dialog/confirmation-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '../services/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  showBar: boolean | undefined;
  formGroup!: FormGroup;
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
      width: '200px',
      data: {
          message: 'Confirm Registration !?'
      }
    });
    dialogRef.afterClosed().subscribe( result => {
      if (result) {
        this.authService.loginUser(user).then( data => {
          console.log(data);
          localStorage.setItem('token', data.token);
          this.router.navigate(['/rules-management']);
        })
        .catch(e => {
          console.log(e);
        });
        this.router.navigate(['']);
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
    this.loginConfirmation(userData);
  }

}
