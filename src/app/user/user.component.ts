import { Component, OnInit } from '@angular/core';
import { UserService } from './user.service';
import { DatePipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
    animations: [
    trigger('showSettings', [
      state('hidden', style({
          opacity: 0,
          visibility: 'hidden'
      })),
      state('shown', style({
        opacity: 1,
          visibility: 'visible'
      })),
      transition('hidden <=> shown', animate(500))
    ])
  ]
}) // 
export class UserComponent implements OnInit {

  username;
  id;
  numberOfFilms = 0;
  numberOfFilmsThisYear = 0;

  routeId;
  foundUser = false;
  openSetting = 'hidden';
  showTab;
  currentYear = this.datePipe.transform(new Date, 'yyyy');
  constructor(private userService: UserService,
              private datePipe: DatePipe,
              private router: Router,
              private route: ActivatedRoute) { }
  

  ngOnInit() {

    this.userService.newUser.subscribe(result => {
      console.log(result);
      if (result !== null) {
        this.username = result['username'];
      }
      this.openSetting = 'hidden';
    })

    // this.router.navigate(["profile"]);
    this.route.params.subscribe(result => {
      console.log(result['id']);
      if (result['id'] === undefined) {
        this.showTab = true;
        this.id = JSON.parse(localStorage.getItem('userData')).id;
        this.username = JSON.parse(localStorage.getItem('userData')).username;
      } else {
        if (localStorage.getItem('userData') !== null) {
          let id = JSON.parse(localStorage.getItem('userData')).id;
          if (id === result['id']) {
            this.router.navigate(["/user"]);
          }
        }
        
        this.showTab = false;
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
  openSettings() {
    this.openSetting = 'shown';
    console.log(this.openSetting);

  }
  onClose() {
    this.openSetting = 'hidden';
  }
  	// this.userService.numberOfFilms.subscribe(number => {
  	// 	console.log(number);
  	// 	this.numberOfFilms = number;
  	// });

}
