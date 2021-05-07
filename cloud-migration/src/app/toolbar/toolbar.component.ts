import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { SidenavService } from '../services/sidenav.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  constructor(
    private sidenavService: SidenavService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {

    const test = this.authService.loggedIn();
    console.log('result ', test);
  }

  clickMenu(): void {
   this.sidenavService.toggle();
  }

  logOut(): void {
    this.authService.logOut();
    this.router.navigate(['/login']);
  }
}
