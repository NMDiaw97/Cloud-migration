import { Component, OnInit } from '@angular/core';
import { SidenavService } from '../services/sidenav.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  constructor(
    private sidenavService: SidenavService, private router:Router
  ) { }

  ngOnInit(): void {
  }

  clickMenu(): void {
   this.sidenavService.toggle();
  }
  LoginPage(){
    this.router.navigate(['/login'])
    
  }
  RegisterPage(){
    this.router.navigate(['/register'])
  }
}
