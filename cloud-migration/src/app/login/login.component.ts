import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { User } from '../models/user.model';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user = new User()
  errorMsg=""
  constructor(private auth:AuthService, private router:Router) { }

  ngOnInit(): void {
  }
  
  loginUser(){
    this.auth.loginUser(this.user).subscribe(
      data => {
        console.log(data.token)
        localStorage.setItem('token',data.token);
        this.router.navigate(['/cloud-criteria-manager'])

      },
      error=>{
        this.errorMsg="il faut d'abord s'inscrire"
      }
      
      
       
     

    )
  }

}
