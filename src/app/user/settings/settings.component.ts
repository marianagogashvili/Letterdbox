import { Input, EventEmitter, Component, OnInit, Output, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { NgForm } from '@angular/forms';
import { UserService } from "../user.service";
import { FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  // settingsState = 'hidden';
  // settingsState;
  // @Input() openSettingsTab;
  // @ViewChild('userForm', {static: false}) userForm: NgForm;
  userForm: FormGroup;
  user = JSON.parse(localStorage.getItem('userData'));
  error;

  constructor(private userService: UserService,
              private router: Router) { }

  ngOnInit() {
    this.userForm = new FormGroup({
      'userData': new FormGroup({
        'username': new FormControl(this.user.username, [Validators.required]),
        'email': new FormControl(this.user.email, [Validators.required, Validators.email]),
        'oldPassword': new FormControl(null),  
        'password': new FormControl(null),  
      })
    });
    // this.userForm.patchValue({
    //   'userData': {
    //     'username' : 'Max',
    //     'email' : 'max@test.com'
    //   }
    // });
  	// console.log(this.openSettingsTab);
  	// this.settingsState = this.openSettingsTab;
  }

  saveUser(form: NgForm) {
  	console.log("save");
  	// console.log(form.value.username, form.value.password, form.value.oldPassword, form.value.email);
    if (this.userForm.value.userData.email === this.user.email && 
      this.userForm.value.userData.username === this.user.username &&
      this.userForm.value.userData.password === null) {
      this.error = "You haven't changed anything";
      // console.log("You haven't changed anything");
    } else {
      if ((this.userForm.value.userData.oldPassword !== null) &&
          (this.userForm.value.userData.password !== null) && 
          (this.userForm.value.userData.oldPassword ===
                this.userForm.value.userData.password)) {
        this.error = "Password is the same";
        // console.log("Password is the same");
      } else {
        this.userService.editUser({id: this.user.id, 
                   email: this.userForm.value.userData.email,
                   username: this.userForm.value.userData.username,
                   old_password: this.userForm.value.userData.oldPassword,
                   password: this.userForm.value.userData.password}).subscribe(result => {
          console.log(result);   
          if (result === "wrong pass") {
            this.error = "Password is wrong";             
          } else {
            localStorage.removeItem('userData');
                
            let date = new Date();
            let store = {id: this.user.id, 
                         username: this.userForm.value.userData.username, 
                         email: this.userForm.value.userData.email, 
                         date: date};
            localStorage.setItem('userData', JSON.stringify(store));         
            
            this.userService.findUserById({id: this.user.id}).subscribe(result => {
              this.userService.sendNewUser(result);
            });

            this.router.navigate(["/user"]);
          }
        });
      }
      
    }
  	
  }
  // saveUser() {
  //   console.log("save");
  //   console.log(this.userForm.value.userData.username);
  // }
  
}
