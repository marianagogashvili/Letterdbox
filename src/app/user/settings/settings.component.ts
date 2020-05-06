import { Input, Component, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  // settingsState = 'hidden';
  // settingsState;
  // @Input() openSettingsTab;
  constructor() { }

  ngOnInit() {
  	// console.log(this.openSettingsTab);
  	// this.settingsState = this.openSettingsTab;
  }

  saveList(form: NgForm) {
  	console.log("save");
  	console.log(form.value.username, form.value.password, form.value.oldPassword, form.value.email);
  }
}
