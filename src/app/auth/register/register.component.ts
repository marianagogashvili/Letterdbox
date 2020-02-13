import { Output, Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { BehaviorSubject } from 'rxjs';
// import { trigger, state, style, animate, transition } from '@angular/animations';
import { AuthService } from '../auth.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [DatePipe]
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
  			  private router: Router,
  			  private datePipe: DatePipe) { }

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
  		if (result === 0) {
  			console.log(result);
  		} else {
  			console.log('good');
			let date = new Date();
  			let store = {id: result['id'], username: result['username'], email: result['email'], date: date};
  			localStorage.setItem('userData', JSON.stringify(store));
  			this.close.next();
			this.router.navigate(['/user']);
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
  			setTimeout(() => {
  				this.loginError = null;
  			}, 3000);
  		} else if (result === 3) {
			this.loginError = 'This user does not exist';
  			setTimeout(() => {
  				this.loginError = null;
  			}, 3000);
  		} else {
  			// console.log('success');
  			// console.log(result);
  			let date = new Date();
  			// this.datePipe.transform(date, 'dd-MM-yyyy')
  			let user = {id: result[0], username: result[1], email: result[2], date: date};
  			localStorage.setItem('userData', JSON.stringify(user));
  			// this.authService.resolveUser(user); 			
  			this.close.next();
			this.router.navigate(['/user']);
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
