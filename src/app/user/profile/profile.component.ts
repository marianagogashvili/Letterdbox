import { Component, OnInit, Input } from '@angular/core';
import { UserService } from '../user.service';
import { FilmService } from '../../films/film.service';
import { ActivatedRoute, Router } from '@angular/router';

import { faEye } from '@fortawesome/free-regular-svg-icons';
import { faEye as faEye2 } from '@fortawesome/free-solid-svg-icons';

import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { faHeart as faHeart2 } from '@fortawesome/free-solid-svg-icons';

import { faClock } from '@fortawesome/free-regular-svg-icons';
import { faClock as faClock2 } from '@fortawesome/free-solid-svg-icons';

import { DatePipe } from '@angular/common';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['../watched-films/watched-films.component.css']
})
export class ProfileComponent implements OnInit {
  recentFilms;
  // userId = JSON.parse(localStorage.getItem('userData')).id;
  userId;

  eyeIcon = faEye;
  likeIcon = faHeart;
  likeIcon2 = faHeart2;

  watchlistIcon = faClock;
  watchlistIcon2 = faClock2;

  filmSubject = new BehaviorSubject(null); 

  subscription;
  all = false;

  constructor(private userService: UserService,
  			  private filmService: FilmService,
  			  private datePipe: DatePipe,
          private router: Router,
          private route: ActivatedRoute) { }

  ngOnInit() {
    // console.log(this.id);
    this.route.params.subscribe(result => {
      console.log(result['id']);
      if (result['id'] === undefined) {
        this.userId = JSON.parse(localStorage.getItem('userData')).id;
      } else {
        this.userId = result['id'];
      }
    });
  	this.subscription = this.filmSubject.subscribe(subj => {
      if (subj === null) {
        this.userService.getShortUserActivity({user_id: this.userId}).subscribe(result => {
	  		this.recentFilms = result;
	  		// console.log(result);
        this.likeAndWatch();
	  	});
      } else {
        this.recentFilms = subj;
        this.likeAndWatch();
      }
    });
  }

  likeAndWatch() {
  	if (this.recentFilms) {
  		Object.values(this.recentFilms).forEach(film => {
	        this.filmService.findLike({user_id: this.userId, film_id: film['id']}).subscribe(like => {
	          film['liked'] = like;
	        });
	        this.filmService.findFromWatchlist({user_id: this.userId, film_id: film['id']}).subscribe(watchlist => {
	          film['watchlisted'] = watchlist;
	        });
	      });
  	}
    
  }

  changeFilmOverflow() {
    this.all = !this.all;
  }

  filmToWatched(id, add, title) {
  	let date = (this.datePipe.transform(new Date(), 'yyyy-MM-dd')).toString();
  	if (add === false) {
  		this.filmService.deleteFilmFromWatched({user_id: this.userId, film_id: id, date: date}).subscribe(result => {
	        this.userService.getShortUserActivity({user_id: this.userId}).subscribe(result => {
		  		this.filmSubject.next(result);
		  	});
	        this.filmService.createActivity(
	            {user_id: this.userId, 
	              film_id: id, 
	              film_title: title, 
	              action: 'deleted from watched film', 
	              date: this.datePipe.transform(new Date(), 'yyyy-MM-dd').toString()}).subscribe(result => {
	            console.log('ACTIVITY', result);
	          });
	    });
  	} else if(add === true) {
  		this.filmService.addFilmToWatched({user_id: this.userId, film_id: id, date: date}).subscribe(result => {
	        this.userService.getShortUserActivity({user_id: this.userId}).subscribe(result => {
		  		this.filmSubject.next(result);
		  	});
	        this.filmService.createActivity(
	            {user_id: this.userId, 
	              film_id: id, 
	              film_title: title, 
	              action: 'watched', 
	              date: this.datePipe.transform(new Date(), 'yyyy-MM-dd').toString()}).subscribe(result => {
	            console.log('ACTIVITY', result);
	          });
	    });
  	}
    
  }

  filmToLiked(id, add, title){
    if (add === true) {
      this.filmService.filmToLiked({film_id: id, user_id: this.userId, add: true}).subscribe(result => {
        this.userService.getShortUserActivity({user_id: this.userId}).subscribe(result => {
		  		this.filmSubject.next(result);
		  	});
        this.filmService.createActivity(
              {user_id: this.userId, 
                film_id: id, 
                film_title: title, 
                action: 'liked', 
                date: this.datePipe.transform(new Date(), 'yyyy-MM-dd').toString()}).subscribe(result => {
              console.log('ACTIVITY', result);
            });
      });
    } else if (add === false) {
      this.filmService.filmToLiked({film_id: id, user_id: this.userId, add: false}).subscribe(result => {
        this.userService.getShortUserActivity({user_id: this.userId}).subscribe(result => {
		  		this.filmSubject.next(result);
		  	});
        this.filmService.createActivity(
              {user_id: this.userId, 
                film_id: id, 
                film_title: title, 
                action: 'deleted like from', 
                date: this.datePipe.transform(new Date(), 'yyyy-MM-dd').toString()}).subscribe(result => {
              console.log('ACTIVITY', result);
            });
      });
    }
  }

  filmToWatchlist(id, add, title){
    if (add === true) {
      this.filmService.filmToWatchList({film_id: id, user_id: this.userId, add: true}).subscribe(result => {
        this.userService.getShortUserActivity({user_id: this.userId}).subscribe(result => {
	  		this.filmSubject.next(result);
	  	});
        this.filmService.createActivity(
            {user_id: this.userId, 
              film_id: id, 
              film_title: title, 
              action: 'added to watchlist', 
              date: this.datePipe.transform(new Date(), 'yyyy-MM-dd').toString()}).subscribe(result => {
            console.log('ACTIVITY', result);
          });
      });  
    } else if (add === false) {
      this.filmService.filmToWatchList({film_id: id, user_id: this.userId, add: false}).subscribe(result => {
        this.userService.getShortUserActivity({user_id: this.userId}).subscribe(result => {
	  		this.filmSubject.next(result);
	  	});
        this.filmService.createActivity(
            {user_id: this.userId, 
              film_id: id, 
              film_title: title, 
              action: 'deleted from watchlist', 
              date: this.datePipe.transform(new Date(), 'yyyy-MM-dd').toString()}).subscribe(result => {
            console.log('ACTIVITY', result);
          });
      }); 
    }
  }

}
