import { Component, OnInit } from '@angular/core';
import { UserService } from './user.service';
import { DatePipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  username;
  id;
  numberOfFilms = 0;
  numberOfFilmsThisYear = 0;

  routeId;
  foundUser = false;

  currentYear = this.datePipe.transform(new Date, 'yyyy');
  constructor(private userService: UserService,
              private datePipe: DatePipe,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(result => {
      console.log(result['id']);
      if (result['id'] === undefined) {
        this.id = JSON.parse(localStorage.getItem('userData')).id;
        this.username = JSON.parse(localStorage.getItem('userData')).username;
      } else {
        this.routeId = result['id'];
        this.id = result['id'];
        this.userService.findUserById({id: result['id']}).subscribe(result => {
          console.log(result);
          if (result === null) {
            this.router.navigate(["/"]);
          } else {
            this.username = result['username'];
          }
        });
      }
      console.log(this.id);
      this.userService.getWatchedFilms({user_id: this.id}).subscribe(films => {
        console.log(films);
        this.numberOfFilms = Object.keys(films).length;
        Object.values(films).forEach(film => {
          if (this.datePipe.transform(film['date'], 'yyyy') === this.currentYear) {
            this.numberOfFilmsThisYear = this.numberOfFilmsThisYear + 1;
          }
        });
      });
    });
  	

  }
  	// this.userService.numberOfFilms.subscribe(number => {
  	// 	console.log(number);
  	// 	this.numberOfFilms = number;
  	// });

}
