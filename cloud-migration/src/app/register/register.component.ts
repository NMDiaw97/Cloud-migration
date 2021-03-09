import { Component, OnInit } from '@angular/core';
import {AuthService} from '../services/auth.service';
import {User} from '../models/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  user = new User()
  showBar = false;



  constructor(private auth: AuthService, private route:Router) { }

  ngOnInit(): void {
  }

  registerUser(){
   this.auth.registerUser(this.user).subscribe(
     data => {console.log(data)
      this.showBar = true
      this.route.navigate(['/login'])
    }

      
   )
  }
  goToLoginPage(){

  }

}
