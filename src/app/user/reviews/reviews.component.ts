import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.css']
})
export class ReviewsComponent implements OnInit {
  currentUserId = JSON.parse(localStorage.getItem('userData')).id;
  reviews;
  constructor(private userService: UserService) { }

  ngOnInit() {
  	this.userService.getUserReviews({user_id: this.currentUserId}).subscribe(result => {
  		this.reviews = result;
  		console.log(result);
  	});
  }

}
