import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { SettingsService } from '../_services';
import { Settings } from '../_models';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  settings: Settings;
  settingsForm: FormGroup;
  submitted: boolean = false;
  loading: boolean = false;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private flashMessage: FlashMessagesService,
    private settingsService: SettingsService
  ) { }

  ngOnInit() {
    this.settings = this.settingsService.getSettings();
    this.settingsForm = this.fb.group({
      allowRegistration: [false],
      disableBalanceOnAdd: [false],
      disableBalanceOnEdit: [false]
    });
  }

  onSubmit() {
    this.settingsService.changeSettings(this.settingsForm.value);
    this.flashMessage.show('Settings saved', { cssClass: 'alert-success', timeout: 4000 });
  }
}
