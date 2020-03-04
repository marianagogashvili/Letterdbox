import { Component, OnInit } from '@angular/core';
import { UserService } from './user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  username = JSON.parse(localStorage.getItem('userData')).username;
  id = JSON.parse(localStorage.getItem('userData')).id;
  numberOfFilms;
  constructor(private userService: UserService) { }

  ngOnInit() {
  	this.userService.getWatchedFilms({user_id: this.id}).subscribe(films => {
  		this.numberOfFilms = Object.keys(films).length;
  	});
  }
  	// this.userService.numberOfFilms.subscribe(number => {
  	// 	console.log(number);
  	// 	this.numberOfFilms = number;
  	// });

}
