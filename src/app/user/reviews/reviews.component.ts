import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { FilmService } from '../../films/film.service';
import { ActivatedRoute, Router } from '@angular/router';

import { faStar } from '@fortawesome/free-solid-svg-icons';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.css']
})
export class ReviewsComponent implements OnInit {
  currentUserId;
   // = JSON.parse(localStorage.getItem('userData')).id;
  reviews;
  starIcon = faStar;
  showTab;

  constructor(private userService: UserService,
              private filmService: FilmService,
              private datePipe: DatePipe,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.route.parent.params.subscribe(result => {
      console.log(result['id']);
      if (result['id'] === undefined) {
        console.log("IS UNDEFINED");
        this.showTab = true;
        this.currentUserId = JSON.parse(localStorage.getItem('userData')).id;
      } else {
        console.log("IS DEFINED!!!!!!");
        this.showTab = false;

        this.currentUserId = result['id'];
      }
    });
  	this.setUp();
  }
  setUp() {
    this.userService.getUserReviews({user_id: this.currentUserId}).subscribe(result => {
      this.reviews = result;
      console.log(result);
    });
  }

  toArr(num) {
  	let rating = [];
  	for (let i = 1; i <= num; i++) {
  		rating.push(i);
  	}
  	return rating;
  }

  deleteReview(id, title) {
    this.userService.deleteReview({user_id: this.currentUserId, film_id: id}).subscribe(result => {
      console.log(result);
      this.setUp();
      this.filmService.createActivity(
          {user_id: this.currentUserId, 
            film_id: id, 
            film_title: title, 
            action: 'deleted review of', 
            date: this.datePipe.transform(new Date(), 'yyyy-MM-dd').toString()}).subscribe(result => {
          console.log('ACTIVITY', result);
        });
    });
  }

}
