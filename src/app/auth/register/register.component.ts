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

  	const post = {username: username, email: email, password: password};
  	console.log(form.value);
  	this.authService.signup(post).subscribe(result => {
  		// cookies and authentication
  		if (result === 1) {
  			console.log('good');
  			this.close.next();
  		} else {
  			console.log(result);
  		}
  		
  	});
  }

  onClose() {
  	this.close.next();
  }

}
