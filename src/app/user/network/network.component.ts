import { Component, OnInit } from '@angular/core';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { faHeart  } from '@fortawesome/free-solid-svg-icons';
import { faStream  } from '@fortawesome/free-solid-svg-icons';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { UserService } from '../user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { PeopleService } from '../../people/people.service';

@Component({
  selector: 'app-network',
  templateUrl: './network.component.html',
  styleUrls: ['./network.component.css']
})
export class NetworkComponent implements OnInit {
  eyeIcon = faEye;
  likeIcon = faHeart;
  listIcon = faStream;
  plusIcon = faPlusCircle;
  checkIcon = faCheckCircle;

  currentUserId;
  followers;
  following;

  currentTab;
  constructor(private userService: UserService,
  			  private router: Router,
  			  private route: ActivatedRoute,
  			  private peopleService: PeopleService) { }

  ngOnInit() {
  	this.route.parent.params.subscribe(result => {
      if (result['id'] === undefined) {
        this.currentUserId = JSON.parse(localStorage.getItem('userData')).id;
      } else {
        this.currentUserId = result['id'];
        this.router.navigate(["/user/", this.currentUserId]);
      }
    });

  	this.userService.getNetwork({user_id: this.currentUserId}).subscribe(result => {
  		console.log(result);
  		this.followers = result[0];
  		this.following = result[1];
  		this.setUpSubscription();
  		this.currentTab = this.followers;
  	});
  	
  }

  setUpSubscription() {

  	Object.values(this.followers).forEach(person => {
  		this.peopleService.getFollowed({me: this.currentUserId, person: person['id']}).subscribe(result => {
  			person['followed'] = result;
  		});
  	});
  	Object.values(this.following).forEach(person => {
  		this.peopleService.getFollowed({me: this.currentUserId, person: person['id']}).subscribe(result => {
  			person['followed'] = result;
  		});
  	});
  }

  follow(id) {
  	this.peopleService.followUnfollow({me: this.currentUserId, person: id, follow: true}).subscribe(result =>{
  		console.log(result);
  		this.setUpSubscription();
  	})
  }

  unfollow(id) {
  	this.peopleService.followUnfollow({me: this.currentUserId, person: id, follow: false}).subscribe(result =>{
  		console.log(result);
  		this.setUpSubscription();
  		
  	})
  }

}
