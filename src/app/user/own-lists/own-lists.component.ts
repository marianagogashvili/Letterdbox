import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-own-lists',
  templateUrl: './own-lists.component.html',
  styleUrls: ['./own-lists.component.css']
})
export class OwnListsComponent implements OnInit {
  userId = JSON.parse(localStorage.getItem('userData')).id;
  lists;
  constructor(private userService: UserService) { }

  ngOnInit() {
  	this.userService.getUserLists({user_id: this.userId}).subscribe(result => {
  		this.lists = result;
  		console.log(result);
  	});
  }

}
