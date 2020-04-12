import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import {Router} from '@angular/router';
@Component({
  selector: 'app-own-lists',
  templateUrl: './own-lists.component.html',
  styleUrls: ['./own-lists.component.css'],
  //   animations: [
  //   trigger('imgState', [
  //     state('small', style({
  //       transform: 'translateZ(0)',
  //       width: '70px',
  //       height: '105px'
  //       // opacity: 0,
  //       // visibility: 'hidden'
  //     })),
  //     state('big', style({
  //       transform: 'translateZ(100px)',
  //       width: '100px',
  //       height: '150px'
  //       // opacity: 1,
  //       // visibility: 'visible'
  //     })),
  //     transition('small <=> big', animate(500)),

  //   ]),
  // ]
})
export class OwnListsComponent implements OnInit {
  userId = JSON.parse(localStorage.getItem('userData')).id;
  lists;
  penIcon = faPen;
  constructor(private userService: UserService,
  			  private router: Router) { }

  ngOnInit() {
  	this.userService.getUserLists({user_id: this.userId}).subscribe(result => {
  		this.lists = result;
  		console.log(result);
  	});
  }


  // changeImg() {
  // 	if (this.imgState === 'small') {
  // 		this.imgState = 'big';
  // 	} else {
  // 		this.imgState = 'small';
  // 	}
  // }

}
