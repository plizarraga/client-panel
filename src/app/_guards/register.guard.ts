import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { SettingsService } from "../_services";

@Injectable({
  providedIn: 'root'
})
export class RegisterGuard implements CanActivate {

  constructor(private router: Router, private settingsService: SettingsService) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
      if(this.settingsService.getSettings().allowRegistration) {
        return true;
      } else {
        this.router.navigate(['/login']);
        return false
      }
  }
}
