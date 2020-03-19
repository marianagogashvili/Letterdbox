import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.css']
})
export class ActivityComponent implements OnInit {
 
  activity;
  constructor(private userService: UserService,
  			  private route: ActivatedRoute) { }

  ngOnInit() {
  	let userId = JSON.parse(localStorage.getItem('userData')).id;
	console.log(userId);

	this.userService.getUserActivity({user_id: userId}).subscribe(result => {
		this.activity = result;
		console.log(result);
  	});
  	
  }

}
