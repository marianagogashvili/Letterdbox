import { Output, Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
// import { trigger, state, style, animate, transition } from '@angular/animations';
import { AuthService } from '../auth.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  // animations: [
  // 	trigger('register', [
  // 		state('hidden', style({
  // 			opacity: 0
  // 		})),
  // 		state('shown', style({
  // 			opacity: 1
  // 		})),
  // 		transition('hidden <=> shown', animate(8000))
  // 	])
  // ]
})
export class RegisterComponent implements OnInit {
  // @Input() registerState = 'hidden';
  @Output() close = new Subject<void>();
  isLoginMode = false;
  loginError;

  constructor(private authService: AuthService,
  			  private router: Router) { }

  ngOnInit() {
  }

  onSubmit(form: NgForm) {
  	if (!form.valid) {
  		return;
  	}
  	const username = form.value.username;
  	const email = form.value.email;
  	const password = form.value.password;

  	const user = {username: username, email: email, password: password};
  	// console.log(form.value);
  	this.authService.signup(user).subscribe(result => {
  		// cookies and authentication
  		if (result === 1) {
  			console.log('good');
  			this.close.next();
  		} else {
  			console.log(result);
  		}
  		
  	});
  }

  onLogin(form: NgForm) {
  	if (!form.valid) {
  		return;
  	}
  	const email = form.value.email;
  	const password = form.value.password;
  	const user = {email: email, password: password};
  	this.authService.login(user).subscribe(result => {
  		// if (result === 1) {
  		// 	console.log('success');
  		// 	localStorage.setItem('userData', JSON.stringify(true));
  		// 	this.close.next();
  		// } else
  		if (result === 0) {
  			this.loginError = 'Password is incorrect';
  		} else if (result === 3) {
  			this.loginError = 'This user does not exist';
  		} else {
  			console.log('success');
  			console.log(result);

  			localStorage.setItem('userData', JSON.stringify(result));
  			this.close.next();
  		}
  	})
  }

  onClose() {
  	this.close.next();
  }

  onSwitchMode() {
  	this.isLoginMode = !this.isLoginMode;
  }

}
