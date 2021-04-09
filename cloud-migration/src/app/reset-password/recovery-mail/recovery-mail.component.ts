import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PasswordResetService } from 'src/app/services/password-reset.service';

@Component({
  selector: 'app-recovery-mail',
  templateUrl: './recovery-mail.component.html',
  styleUrls: ['./recovery-mail.component.css']
})
export class RecoveryMailComponent implements OnInit {
  formGroup!: FormGroup;
  constructor(
    private passwordResetService: PasswordResetService,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.emailForm();
  }

  emailForm(): void {
    this.formGroup = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
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
    if (this.formGroup.invalid) {
      return;
    }
    const email  = this.f.email.value;
    console.log(' Email Addresse', email);
    this.passwordResetService.sendEmail(email).then( data => {
      console.log(data);
      localStorage.setItem('reset-password-token', data.resetPasswordToken);
    })
    .catch( error => {
      console.log( error);
    });
  }
}
