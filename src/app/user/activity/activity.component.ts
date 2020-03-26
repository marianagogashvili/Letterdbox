import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.css']
})
export class ActivityComponent implements OnInit {
 
  activity;
  today = this.datePipe.transform(new Date(Date.now()), 'yyyy-MM-dd').toString(); 
  yesterday = this.datePipe.transform((new Date(Date.now() - 86400000)), 'yyyy-MM-dd').toString(); 
  weekAgo = this.datePipe.transform((new Date(Date.now() - 7*86400000)), 'yyyy-MM-dd').toString(); 
  constructor(private userService: UserService,
  			  private route: ActivatedRoute,
  			  private datePipe: DatePipe) { }

  ngOnInit() {
  	let userId = JSON.parse(localStorage.getItem('userData')).id;
	// console.log(userId);

	this.userService.getUserActivity({user_id: userId}).subscribe(result => {
		this.activity = result;
		// this.activity.reverse();
		console.log(result);
		// Object.values(result).forEach(value => {
		// 	console.log(value['date']);
		// });
  	});


  	// console.log((new Date(Date.now() - 86400000)) !== (new Date(Date.now() - 7*86400000)));
  }
}
