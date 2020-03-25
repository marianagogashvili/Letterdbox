
import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from '../user.service';
import { FilmService } from '../../films/film.service';
import { Router } from '@angular/router';
import { faEye } from '@fortawesome/free-regular-svg-icons';
import { faEye as faEye2 } from '@fortawesome/free-solid-svg-icons';

import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { faHeart as faHeart2 } from '@fortawesome/free-solid-svg-icons';

import { faClock } from '@fortawesome/free-regular-svg-icons';
import { faClock as faClock2 } from '@fortawesome/free-solid-svg-icons';

import { BehaviorSubject } from 'rxjs';
@Component({
  selector: 'app-watchlist',
  templateUrl: './watchlist.component.html',
  styleUrls: ['./watchlist.component.css']
})
export class WatchlistComponent implements OnInit, OnDestroy {
  watchlistFilms;
  currentUserId = JSON.parse(localStorage.getItem('userData')).id;
  
  eyeIcon = faEye;
  likeIcon = faHeart;
  likeIcon2 = faHeart2;

  watchlistIcon = faClock;
  watchlistIcon2 = faClock2;

  filmSubject = new BehaviorSubject(null); 
  subscription;

  constructor(private userService: UserService,
              private filmService: FilmService,
              private router: Router) { }

  ngOnInit() {
    this.subscription = this.filmSubject.subscribe(subj => {
      if (subj === null) {
        this.userService.getWatchlist({user_id: this.currentUserId}).subscribe(films => {
          console.log(films);
          this.watchlistFilms = films;
          this.likeAndWatch();
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
        this.filmService.findFromWatchlist({user_id: this.currentUserId, film_id: film['id']}).subscribe(watchlist => {
          film['watchlisted'] = watchlist;
        });
      });
  }

  toFilm(id) {
    this.router.navigate(['/films', id], { replaceUrl: true });
  }

  filmToWatched(id, add) {
    this.filmService.deleteFilmFromWatched({user_id: this.currentUserId, film_id: id}).subscribe(result => {
        this.userService.getWatchlist({user_id: this.currentUserId}).subscribe(films => {
          this.filmSubject.next(films);
        });
    });
  }

  filmToLiked(id, add){
    if (add === true) {
      this.filmService.filmToLiked({film_id: id, user_id: this.currentUserId, add: true}).subscribe(result => {
        this.userService.getWatchlist({user_id: this.currentUserId}).subscribe(films => {
          this.filmSubject.next(films);
        });
      });
    } else if (add === false) {
      this.filmService.filmToLiked({film_id: id, user_id: this.currentUserId, add: false}).subscribe(result => {
        this.userService.getWatchlist({user_id: this.currentUserId}).subscribe(films => {
          this.filmSubject.next(films);
        });

      });
    }
  }

  deleteFromWatchlist(id){
      this.filmService.filmToWatchList({film_id: id, user_id: this.currentUserId, add: false}).subscribe(result => {
        this.userService.getWatchlist({user_id: this.currentUserId}).subscribe(films => {
          this.filmSubject.next(films);
        });
      }); 
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }


}
