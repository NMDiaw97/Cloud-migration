import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../class/user';
import { ConfirmationDialogComponent } from '../criteria-management/confirmation-dialog/confirmation-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  showBar: boolean | undefined;
  formGroup!: FormGroup;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.registerForm();
  }

  registerForm(): void {
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


  registerConfirmation(user: User): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '200px',
      data: {
          message: 'Confirm Registration !?'
      }
    });
    dialogRef.afterClosed().subscribe( result => {
      if (result) {
        this.authService.registerUser(user).then( data => {
          console.log(data);
          this.router.navigate(['/login']);
        })
        .catch(e => {
          console.log(e);
          return this.registerForm();
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
    this.registerConfirmation(userData);
  }

}
