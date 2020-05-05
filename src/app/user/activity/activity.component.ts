import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.css']
})
export class ActivityComponent implements OnInit {
 
  activity;
  userId;
  showTab;

  today = this.datePipe.transform(new Date(Date.now()), 'yyyy-MM-dd').toString(); 
  yesterday = this.datePipe.transform((new Date(Date.now() - 86400000)), 'yyyy-MM-dd').toString(); 
  weekAgo = this.datePipe.transform((new Date(Date.now() - 7*86400000)), 'yyyy-MM-dd').toString(); 
  constructor(private userService: UserService,
  			  private route: ActivatedRoute,
  			  private datePipe: DatePipe,
          private router: Router) { }

  ngOnInit() {
    this.route.parent.params.subscribe(result => {
      console.log(result['id']);
      if (result['id'] === undefined) {
        this.userId = JSON.parse(localStorage.getItem('userData')).id;
        this.showTab = true;
      } else {
        this.userId = result['id'];
        this.showTab = false;
        this.router.navigate(["/user/", this.userId]);
        // if (localStorage.getItem('userData') !== null) {
        //   let id = JSON.parse(localStorage.getItem('userData')).id;
        //   if (id === result['id']) {
        //     this.router.navigate(["/user"]);
        //   }
        // }
      }
    });
    console.log(this.userId);
    
	  this.userService.getUserActivity({user_id: this.userId}).subscribe(result => {
  		// this.activity = result;
  		// console.log(result);
      let act = [];
      if (result !== null) {
        Object.values(result).forEach(r => {
          act.unshift(r);
        });
      }
      this.activity = act;
  	});
  }
  clearActivity() {
    this.userService.clearActivity({user_id: this.userId}).subscribe(result => {
      console.log(result);
      this.activity = null;
    });
  }
}
