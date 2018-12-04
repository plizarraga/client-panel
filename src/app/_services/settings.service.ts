import { Injectable } from '@angular/core';
import { Settings } from '../_models/Settings';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  settings: Settings = {
    allowRegistration: true,
    disableBalanceOnAdd: false,
    disableBalanceOnEdit: false
  }
  constructor() { }

  getSettings(): Settings{
    return this.settings;
  }
}
