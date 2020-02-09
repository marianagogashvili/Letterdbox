import { Input, Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
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

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  onSubmit(form: NgForm) {
  	if (!form.valid) {
  		return;
  	}
  	const username = form.value.username;
  	const email = form.value.email;
  	const password = form.value.password;

  	console.log(form.value);
  	this.authService.signup(username, email, password).subscribe(result => {
  		console.log('huh2');
  	});
  }

  onClose() {
  	// this.registerState = 'hidden';
  }

}
