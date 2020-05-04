import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from '../user.service';
import { FilmService } from '../../films/film.service';
import { Router, ActivatedRoute } from '@angular/router';
import { faEye } from '@fortawesome/free-regular-svg-icons';
import { faEye as faEye2 } from '@fortawesome/free-solid-svg-icons';

import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { faHeart as faHeart2 } from '@fortawesome/free-solid-svg-icons';

import { faClock } from '@fortawesome/free-regular-svg-icons';
import { faClock as faClock2 } from '@fortawesome/free-solid-svg-icons';
import { DatePipe } from '@angular/common';

import { BehaviorSubject } from 'rxjs';
@Component({
  selector: 'app-liked',
  templateUrl: './liked.component.html',
  styleUrls: ['../watched-films/watched-films.component.css']

})
export class LikedComponent implements OnInit, OnDestroy {
  likedFilms;
  currentUserId;
  // = JSON.parse(localStorage.getItem('userData')).id;
  eyeIcon = faEye;
  likeIcon = faHeart;
  likeIcon2 = faHeart2;

  watchlistIcon = faClock;
  watchlistIcon2 = faClock2;

  filmSubject = new BehaviorSubject(null); 
  subscription;

  constructor(private userService: UserService,
              private filmService: FilmService,
              private router: Router,
              private route: ActivatedRoute,
              private datePipe: DatePipe) { }

  ngOnInit() {
    this.route.parent.params.subscribe(result => {
      console.log(result['id']);
      if (result['id'] === undefined) {
        this.currentUserId = JSON.parse(localStorage.getItem('userData')).id;
      } else {
        this.currentUserId = result['id'];
      }
    });
    this.subscription = this.filmSubject.subscribe(subj => {
      if (subj === null) {
        this.userService.getUserLikes({user_id: this.currentUserId}).subscribe(films => {
          this.likedFilms = films;
          this.likeAndWatch();
        });
      } else {
        this.likedFilms = subj;
        this.likeAndWatch();
      }
    });

  }
  likeAndWatch() {
    Object.values(this.likedFilms).forEach(film => {
        this.filmService.findFromWatchlist({user_id: this.currentUserId, film_id: film['id']}).subscribe(watchlist => {
          film['watchlisted'] = watchlist;
        });
      });
  }

  toFilm(id) {
    this.router.navigate(['/films', id], { replaceUrl: true });
  }

  filmToWatched(id, add, title) {
  	let date = (this.datePipe.transform(new Date(), 'yyyy-MM-dd')).toString();
  	if (add === false) {
  		this.filmService.deleteFilmFromWatched({user_id: this.currentUserId, film_id: id, date: date}).subscribe(result => {
	        this.userService.getUserLikes({user_id: this.currentUserId}).subscribe(films => {
	          this.filmSubject.next(films);
	        });
	        this.filmService.createActivity(
	            {user_id: this.currentUserId, 
	              film_id: id, 
	              film_title: title, 
	              action: 'deleted from watched film', 
	              date: this.datePipe.transform(new Date(), 'yyyy-MM-dd').toString()}).subscribe(result => {
	            console.log('ACTIVITY', result);
	          });
	    });
  	} else if(add === true) {
  		this.filmService.addFilmToWatched({user_id: this.currentUserId, film_id: id, date: date}).subscribe(result => {
	        this.userService.getUserLikes({user_id: this.currentUserId}).subscribe(films => {
	          this.filmSubject.next(films);
	        });
	        this.filmService.createActivity(
	            {user_id: this.currentUserId, 
	              film_id: id, 
	              film_title: title, 
	              action: 'watched', 
	              date: this.datePipe.transform(new Date(), 'yyyy-MM-dd').toString()}).subscribe(result => {
	            console.log('ACTIVITY', result);
	          });
	    });
  	}
    
  }

  deleteFromLiked(id, title){
	  this.filmService.filmToLiked({film_id: id, user_id: this.currentUserId, add: false}).subscribe(result => {
	    this.userService.getUserLikes({user_id: this.currentUserId}).subscribe(films => {
	      this.filmSubject.next(films);
	    });
	    this.filmService.createActivity(
            {user_id: this.currentUserId, 
              film_id: id, 
              film_title: title, 
              action: 'deleted like from', 
              date: this.datePipe.transform(new Date(), 'yyyy-MM-dd').toString()}).subscribe(result => {
            console.log('ACTIVITY', result);
          });
	  });
  }

  filmToWatchlist(id, add, title){
    if (add === true) {
      this.filmService.filmToWatchList({film_id: id, user_id: this.currentUserId, add: true}).subscribe(result => {
        this.userService.getUserLikes({user_id: this.currentUserId}).subscribe(films => {
          this.filmSubject.next(films);
        });
        this.filmService.createActivity(
            {user_id: this.currentUserId, 
              film_id: id, 
              film_title: title, 
              action: 'added to watchlist', 
              date: this.datePipe.transform(new Date(), 'yyyy-MM-dd').toString()}).subscribe(result => {
            console.log('ACTIVITY', result);
          });
      });  
    } else if (add === false) {
      this.filmService.filmToWatchList({film_id: id, user_id: this.currentUserId, add: false}).subscribe(result => {
        this.userService.getUserLikes({user_id: this.currentUserId}).subscribe(films => {
          this.filmSubject.next(films);
        });
        this.filmService.createActivity(
            {user_id: this.currentUserId, 
              film_id: id, 
              film_title: title, 
              action: 'deleted from watchlist', 
              date: this.datePipe.transform(new Date(), 'yyyy-MM-dd').toString()}).subscribe(result => {
            console.log('ACTIVITY', result);
          });
      }); 
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }


}
