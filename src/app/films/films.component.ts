import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { faEye } from '@fortawesome/free-regular-svg-icons';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
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
  films = Array();
  eyeIcon = faEye;
  heartIcon = faHeart;

  subscription;
  constructor(private filmService: FilmService,
  			  private datePipe: DatePipe,
  		      private route: ActivatedRoute,
              private router: Router) { }
  currentUserId = JSON.parse(localStorage.getItem('userData')).id;
  date = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
  ngOnInit() {
  	// this.subscription = this.filmService.getFilms().pipe(map(r => {
  	// 	Object.values(r).forEach(value => {
  	// 		// this.filmService.findWatchedFilm({film_id: value['id'], user_id: this.currentUserId}).subscribe(watched =>{
  	// 		// 	console.log(watched);
  				
  	// 		// 	if (watched !== null) {
	  // 		// 		this.films.push({film: value, watched: true, liked: watched['like']})
	  // 		// 	} else {
	  // 		// 		this.films.push({film: value, watched: false, liked: false})
	  // 		// 	}
  	// 		// })
  	// 		this.filmService.findLike({film_id: value['id'], user_id: this.currentUserId}).subscribe(like => {
  	// 			if (value['film_id']) {
			// 		this.films.push({film: value, watched: true, liked: like});
	  // 			} else {
	  // 				this.films.push({film: value, watched: false, liked: like});
	  // 			}
  	// 		})
  			
  	// 	})
  	// 	return this.films;
  	// })).subscribe(result => {
   //      // this.shownFilms = result;

   //      console.log(result);
   //  });

    this.subscription = this.route.queryParams.subscribe(params => {
      this.films = [];
      // console.log(params['year']);
      let param = {year: params['year'], user_id: this.currentUserId};
      this.filmService.sortBy(param).pipe(map(r => {
  		Object.values(r).forEach(value => {
  			// console.log(value);
  			this.filmService.findLike({film_id: value['id'], user_id: this.currentUserId}).subscribe(like => {
  				if (value['film_id']) {
					this.films.push({film: value, watched: true, liked: like});
	  			} else {
	  				this.films.push({film: value, watched: false, liked: like});
	  			}
  			})
  			
  		})
  		return this.films;
  	})).subscribe(result => {
         console.log(result);
      });

    });
  }

  addToWatched(id) {
  	Object.values(this.films).forEach(value => {
  		if (value['film']['id'] === id) {
  			value['watched'] = !value['watched'];
  		}
  	})
  	let param = {film_id: id, 
  				 user_id: this.currentUserId, 
  				 rating: null, 
  				 date: this.date.toString()};

  	this.filmService.addFilmToWatched(param).subscribe(result => {
  		console.log(result);
  	});
  }
  deleteFromWatched(id) {
  	Object.values(this.films).forEach(value => {
  		if (value['film']['id'] === id) {
  			value['watched'] = !value['watched'];
  		}
  	})
  	let param = {film_id: id, 
  				 user_id: this.currentUserId};
  	this.filmService.deleteFilmFromWatched(param).subscribe(result => {
		console.log(result);
  	});
  }
  addToLiked(id) {
	Object.values(this.films).forEach(value => {
  		if (value['film']['id'] === id) {
  			value['liked'] = !value['liked'];
  		}
  	})
  	let param = {film_id: id, 
  				 user_id: this.currentUserId,
  				 add: true};
  	this.filmService.filmToLiked(param).subscribe(result => {
  		console.log(result);
  	});			 
  }
  deleteFromLiked(id) {
	Object.values(this.films).forEach(value => {
  		if (value['film']['id'] === id) {
  			value['liked'] = !value['liked'];
  		}
  	})
  	let param = {film_id: id, 
  				 user_id: this.currentUserId,
  				 add: false};
  	this.filmService.filmToLiked(param).subscribe(result => {
  		console.log(result);
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
