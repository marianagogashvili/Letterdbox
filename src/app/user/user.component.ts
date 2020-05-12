import { Component, OnInit } from '@angular/core';
import { UserService } from './user.service';
import { DatePipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { PeopleService } from '../people/people.service';

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
  numOfLists = 0;
  numOfFollowing = 0;
  numOfFollower = 0;

  routeId;
  foundUser = false;
  openSetting = 'hidden';
  showTab;
  loggedIn = false;
  youFollowed;
  currentYear = this.datePipe.transform(new Date, 'yyyy');
  constructor(private userService: UserService,
              private datePipe: DatePipe,
              private router: Router,
              private route: ActivatedRoute,
              private peopleService: PeopleService) { }
  

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

      if (result['id'] === undefined) {
        this.showTab = true;
        this.id = JSON.parse(localStorage.getItem('userData')).id;
        this.username = JSON.parse(localStorage.getItem('userData')).username;
      } else {
        if (localStorage.getItem('userData') !== null) {
          this.loggedIn = true; 
          let id = JSON.parse(localStorage.getItem('userData')).id;
          if (id === result['id']) {
            this.router.navigate(["/user"]);
          }
          // there
          this.followSetUp(id, result['id']);
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
      this.userService.getUserLists({user_id: this.id}).subscribe(lists => {
        if (lists !== null) {
          this.numOfLists = lists['length'];      
        }      
      });
      this.userService.getNumOfFollowers({user_id: this.id}).subscribe(follow => {
        this.numOfFollowing = follow[0]['length'];
        this.numOfFollower = follow[1]['length'];

      });
    });
  	
    // console.log(this.route);
    // this.router.navigate(['profile'], {relativeTo: this.route});
  }
  followSetUp(me, person) {
    this.peopleService.getFollowed({me: me, person: person}).subscribe(result => {
      this.youFollowed = result;
    });
  }
  openSettings() {
    this.openSetting = 'shown';
    console.log(this.openSetting);

  }
  onClose() {
    this.openSetting = 'hidden';
  }
  follow() {
    let me = JSON.parse(localStorage.getItem('userData')).id;
    this.peopleService.followUnfollow({me: me, person: this.id, follow: true}).subscribe(result => {
      console.log(result);
      this.followSetUp(me, this.id);
    });
  }

  unfollow() {
    let me = JSON.parse(localStorage.getItem('userData')).id;
    this.peopleService.followUnfollow({me: me, person: this.id, follow: false}).subscribe(result => {
      console.log(result);
      this.followSetUp(me, this.id);
    });
  }
  	// this.userService.numberOfFilms.subscribe(number => {
  	// 	console.log(number);
  	// 	this.numberOfFilms = number;
  	// });

}
