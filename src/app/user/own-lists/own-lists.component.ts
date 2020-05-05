import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import {Router, ActivatedRoute} from '@angular/router';
@Component({
  selector: 'app-own-lists',
  templateUrl: './own-lists.component.html',
  styleUrls: ['./own-lists.component.css'],
  //   animations: [
  //   trigger('zoomFilm', [
  //     state('false', style({

  //       // transform: 'translateZ(1)',
  //       // width: '70px',
  //       // height: '105px'
  //       // opacity: 0,
  //       // visibility: 'hidden'
  //     })),
  //     state('true', style({
  //       // transform: 'translateZ(2)',
  //       width: '100px',
  //       height: '150px'
  //       // opacity: 1,
  //       // visibility: 'visible'
  //     })),
  //     transition('false <=> true', animate(500)),

  //   ]),
  // ]
})
export class OwnListsComponent implements OnInit {
  userId;
   // = JSON.parse(localStorage.getItem('userData')).id;
  lists;
  penIcon = faPen;
  showTab;
  constructor(private userService: UserService,
  			  private router: Router,
          		private route: ActivatedRoute) { }

  ngOnInit() {
    // console.log(this.id);
    this.route.parent.params.subscribe(result => {
      console.log(result['id']);
      if (result['id'] === undefined) {
        // console.log("IS UNDEFINED");
        this.showTab = true;
        this.userId = JSON.parse(localStorage.getItem('userData')).id;
      } else {
        // console.log("IS DEFINED!!!!!!");
        this.showTab = false;
        this.userId = result['id'];
      }
    });
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
