
import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from '../user.service';
import { FilmService } from '../../films/film.service';
import { ActivatedRoute, Router } from '@angular/router';
import { faEye } from '@fortawesome/free-regular-svg-icons';
import { faEye as faEye2 } from '@fortawesome/free-solid-svg-icons';

import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { faHeart as faHeart2 } from '@fortawesome/free-solid-svg-icons';

import { faClock } from '@fortawesome/free-regular-svg-icons';
import { faClock as faClock2 } from '@fortawesome/free-solid-svg-icons';

import { BehaviorSubject } from 'rxjs';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-watchlist',
  templateUrl: './watchlist.component.html',
  styleUrls: ['../watched-films/watched-films.component.css']
})
export class WatchlistComponent implements OnInit, OnDestroy {
  watchlistFilms;
  currentUserId;
   // = JSON.parse(localStorage.getItem('userData')).id;
  
  eyeIcon = faEye;
  likeIcon = faHeart;
  likeIcon2 = faHeart2;

  watchlistIcon = faClock;
  watchlistIcon2 = faClock2;

  filmSubject = new BehaviorSubject(null); 
  subscription;
  showTab;

  constructor(private userService: UserService,
              private filmService: FilmService,
              private router: Router,
              private datePipe: DatePipe,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.parent.params.subscribe(result => {
      if (result['id'] === undefined) {
        this.showTab = true;
        this.currentUserId = JSON.parse(localStorage.getItem('userData')).id;
      } else {
        this.showTab = false;
        this.currentUserId = result['id'];
        this.router.navigate(["/user/", this.currentUserId]);

      }
    });

    this.subscription = this.filmSubject.subscribe(subj => {
      if (subj === null) {
        this.userService.getWatchlist({user_id: this.currentUserId}).subscribe(films => {
          console.log(films);
          if (films !== null) {
            this.watchlistFilms = films;
            this.likeAndWatch();
          } 
        });
      } else {
        this.watchlistFilms = subj;
        this.likeAndWatch();
      }
    });

  }
  likeAndWatch() {
    Object.values(this.watchlistFilms).forEach(film => {
        this.filmService.findLike({user_id: this.currentUserId, film_id: film['id']}).subscribe(like => {
          film['liked'] = like;
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
	        this.userService.getWatchlist({user_id: this.currentUserId}).subscribe(films => {
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
	        this.userService.getWatchlist({user_id: this.currentUserId}).subscribe(films => {
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

  filmToLiked(id, add, title){
    if (add === true) {
      this.filmService.filmToLiked({film_id: id, user_id: this.currentUserId, add: true}).subscribe(result => {
        this.userService.getWatchlist({user_id: this.currentUserId}).subscribe(films => {
          this.filmSubject.next(films);
        });
        this.filmService.createActivity(
              {user_id: this.currentUserId, 
                film_id: id, 
                film_title: title, 
                action: 'liked', 
                date: this.datePipe.transform(new Date(), 'yyyy-MM-dd').toString()}).subscribe(result => {
              console.log('ACTIVITY', result);
            });
      });
    } else if (add === false) {
      this.filmService.filmToLiked({film_id: id, user_id: this.currentUserId, add: false}).subscribe(result => {
        this.userService.getWatchlist({user_id: this.currentUserId}).subscribe(films => {
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
  }

  deleteFromWatchlist(id, title){
      this.filmService.filmToWatchList({film_id: id, user_id: this.currentUserId, add: false}).subscribe(result => {
        this.userService.getWatchlist({user_id: this.currentUserId}).subscribe(films => {
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

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }


}
