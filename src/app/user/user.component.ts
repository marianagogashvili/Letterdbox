import { Component, OnInit } from '@angular/core';
import { UserService } from './user.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  username = JSON.parse(localStorage.getItem('userData')).username;
  id = JSON.parse(localStorage.getItem('userData')).id;
  numberOfFilms = 0;
  numberOfFilmsThisYear = 0;

  currentYear = this.datePipe.transform(new Date, 'yyyy');
  constructor(private userService: UserService,
              private datePipe: DatePipe) { }

  ngOnInit() {
  	this.userService.getWatchedFilms({user_id: this.id}).subscribe(films => {
  		console.log(films);
      this.numberOfFilms = Object.keys(films).length;
      Object.values(films).forEach(film => {
        if (this.datePipe.transform(film['date'], 'yyyy') === this.currentYear) {
          this.numberOfFilmsThisYear = this.numberOfFilmsThisYear + 1;
        }
      });
  	});

  }
  	// this.userService.numberOfFilms.subscribe(number => {
  	// 	console.log(number);
  	// 	this.numberOfFilms = number;
  	// });

}
