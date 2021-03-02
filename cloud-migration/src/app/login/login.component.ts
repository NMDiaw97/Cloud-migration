import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { User } from '../models/user.model';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user = new User()

  constructor(private auth:AuthService) { }

  ngOnInit(): void {
  }
  
  loginUser(){
    this.auth.loginUser(this.user).subscribe(
      data => {console.log(data.token)
        localStorage.setItem('token',JSON.stringify(data))
      },
      
       
     

    )
  }

}
