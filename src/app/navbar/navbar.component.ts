import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from "../_services/";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isAuth: boolean = false;
  currentUser;
  constructor(
    private authService: AuthService,
    private router: Router) { }

  ngOnInit() {
    this.authService.isAuth()
    .subscribe(auth => {
      if (auth) {
       this.isAuth = true
       this.currentUser = auth.email;
      } else {
        this.isAuth = false;
      }
    });
  }

  onLogout() {
    this.authService.logout();
    this.router.navigate(['/login'])
  }
}
