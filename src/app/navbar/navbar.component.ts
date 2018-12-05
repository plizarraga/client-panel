import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService, SettingsService } from "../_services/";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isAuth: boolean = false;
  currentUser;
  showRegister: boolean;

  constructor(
    private authService: AuthService,
    private settingsService: SettingsService,
    private router: Router) { }

  ngOnInit() {

    this.showRegister = this.settingsService.getSettings().allowRegistration;

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
