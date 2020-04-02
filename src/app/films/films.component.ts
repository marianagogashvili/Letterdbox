import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { faEye } from '@fortawesome/free-regular-svg-icons';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { faClock } from '@fortawesome/free-regular-svg-icons';
import { faStar } from '@fortawesome/free-solid-svg-icons';

import { FilmService } from './film.service';
import { DatePipe } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
@Component({
  selector: 'app-films',
  templateUrl: './films.component.html',
  styleUrls: ['./films.component.css']
})
export class FilmsComponent implements OnInit, OnDestroy {
  shownFilms;
  // films = Array();
  films;
  eyeIcon = faEye;
  heartIcon = faHeart;
  clockIcon = faClock;
  starIcon = faStar;

  subscription;
  constructor(private filmService: FilmService,
  			      private datePipe: DatePipe,
  		        private route: ActivatedRoute,
              private router: Router) { }
  currentUserId = JSON.parse(localStorage.getItem('userData')).id;
  date = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
  ngOnInit() {

    this.subscription = this.route.queryParams.subscribe(params => {
      this.films = [];
      console.log(params);
      let param;
      if (params['year']) {
        param = {year: params['year'], user_id: this.currentUserId};
      } else if(params['rating']) {
        param = {rating: params['rating'], user_id: this.currentUserId};        
      } else {
        param = {}; 
      }
      this.filmService.sortBy(param).subscribe(r => {
        this.films = r;
        console.log(r);
        Object.values(this.films).forEach(value => {
          // console.log(value);
          // if (value['film_id']) {
          //   this.films.push({film: value, watched: true, liked: like});
          // } else {
          //   this.films.push({film: value, watched: false, liked: like});
          // }
          if (value['film_id']) {
            value['watched'] = true;
            // this.films.push({film: value, watched: true, liked: like});
          } else {
            value['watched'] = false;
            // this.films.push({film: value, watched: false, liked: like});
          }
          this.filmService.findLike({film_id: value['id'], user_id: this.currentUserId}).subscribe(like => {
            value['liked'] = like;
          });
          this.filmService.findFromWatchlist({user_id: this.currentUserId, film_id: value['id']}).subscribe(watchlist => {
            value['watchlist'] = watchlist;
          });
          
        })
      });

    });
  }

  addToWatched(id) {
    let title;
  	Object.values(this.films).forEach(value => {
  		if (value['id'] === id) {
  			value['watched'] = !value['watched'];
        title = value['title'];
  		}
  	})
  	let param = {film_id: id, 
  				 user_id: this.currentUserId, 
  				 rating: null, 
  				 date: this.date.toString()};

  	this.filmService.addFilmToWatched(param).subscribe(result => {
  		console.log(result);
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
  deleteFromWatched(id) {
    let title;
  	Object.values(this.films).forEach(value => {
  		if (value['id'] === id) {
  			value['watched'] = !value['watched'];
        title = value['title'];
  		}
  	})
  	let param = {film_id: id, 
  				 user_id: this.currentUserId};
  	this.filmService.deleteFilmFromWatched(param).subscribe(result => {
		  console.log(result);
      this.filmService.createActivity(
              {user_id: this.currentUserId, 
                film_id: id, 
                film_title: title, 
                action: 'deleted from watched film', 
                date: this.datePipe.transform(new Date(), 'yyyy-MM-dd').toString()}).subscribe(result => {
              console.log('ACTIVITY', result);
            });
  	});
  }
  addToLiked(id) {
  let title;
	Object.values(this.films).forEach(value => {
  		if (value['id'] === id) {
  			value['liked'] = !value['liked'];
        title = value['title'];
  		}
  	})
  	let param = {film_id: id, 
  				 user_id: this.currentUserId,
  				 add: true};
  	this.filmService.filmToLiked(param).subscribe(result => {
  		console.log(result);
      this.filmService.createActivity(
              {user_id: this.currentUserId, 
                film_id: id, 
                film_title: title, 
                action: 'liked', 
                date: this.datePipe.transform(new Date(), 'yyyy-MM-dd').toString()}).subscribe(result => {
              console.log('ACTIVITY', result);
            });
  	});			 
  }
  deleteFromLiked(id) {
    let title;
	  Object.values(this.films).forEach(value => {
  		if (value['id'] === id) {
  			value['liked'] = !value['liked'];
        title = value['title'];
  		}
  	});
  	let param = {film_id: id, 
  				 user_id: this.currentUserId,
  				 add: false};
  	this.filmService.filmToLiked(param).subscribe(result => {
  		console.log(result);
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

  addToWatchlist(id) {
    let title;
    Object.values(this.films).forEach(value => {
      if (value['id'] === id) {
        value['watchlist'] = !value['watchlist'];
        title = value['title'];
      }
    });
    let param = {film_id: id, 
           user_id: this.currentUserId,
           add: true};
    this.filmService.filmToWatchList(param).subscribe(result => {
      console.log(result);
      this.filmService.createActivity(
              {user_id: this.currentUserId, 
                film_id: id, 
                film_title: title, 
                action: 'added to watchlist', 
                date: this.datePipe.transform(new Date(), 'yyyy-MM-dd').toString()}).subscribe(result => {
              console.log('ACTIVITY', result);
            });
    });  
  }

  deleteFromWatchlist(id) {
    let title;
    Object.values(this.films).forEach(value => {
      if (value['id'] === id) {
        value['watchlist'] = !value['watchlist'];
        title = value['title'];
      }
    });
    let param = {film_id: id, 
           user_id: this.currentUserId,
           add: false};
    this.filmService.filmToWatchList(param).subscribe(result => {
      console.log(result);
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

  goToFilm(id) {
    // console.log(id);
    this.router.navigate(['/films', id], { replaceUrl: true });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
