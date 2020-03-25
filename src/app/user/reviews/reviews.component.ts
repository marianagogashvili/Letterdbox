import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { faStar } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.css']
})
export class ReviewsComponent implements OnInit {
  currentUserId = JSON.parse(localStorage.getItem('userData')).id;
  reviews;
  starIcon = faStar;
  constructor(private userService: UserService) { }

  ngOnInit() {
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

}
