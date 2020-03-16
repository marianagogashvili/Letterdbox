import { Component, OnInit, OnDestroy, Output } from '@angular/core';
import { FilmService } from '../film.service';
import { Router, ActivatedRoute } from '@angular/router';
import { map, tap } from 'rxjs/operators';
import { faStar } from '@fortawesome/free-regular-svg-icons';
import { faStar as faStar2 } from '@fortawesome/free-solid-svg-icons';

import { faEye } from '@fortawesome/free-regular-svg-icons';
import { faEye as faEye2 } from '@fortawesome/free-solid-svg-icons';

import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { faHeart as faHeart2 } from '@fortawesome/free-solid-svg-icons';

import { faClock } from '@fortawesome/free-regular-svg-icons';
import { faClock as faClock2 } from '@fortawesome/free-solid-svg-icons';

import { DatePipe } from '@angular/common';
import { Subject } from 'rxjs';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-film',
  templateUrl: './film.component.html',
  styleUrls: ['./film.component.css'],
  animations: [
  	trigger('initState', [
  		state('closed', style({
  			transform: 'translateX(-200px)',
  			opacity: 0
  		})),
  		state('opened', style({
  			transform: 'translateX(0)',
  			opacity: 1
  		})),
  		transition('closed <=> opened', animate(500))
  	]),
  	trigger('initState2', [
  		state('closed', style({
  			opacity: 0
  		})),
  		state('opened', style({
  			opacity: 1
  		})),
  		transition('closed <=> opened', animate(500))
  	]),


  ]
})
export class FilmComponent implements OnInit, OnDestroy {
  film;
  starIcon1 = faStar;
  starIcon2 = faStar;
  starIcon3 = faStar;
  starIcon4 = faStar;
  starIcon5 = faStar;
  
  eyeIcon = faEye;
  likeIcon = faHeart;
  watchIcon = faClock;

  currentUserId = JSON.parse(localStorage.getItem('userData')).id;
  currentFilmId;

  liked;
  watched;
  later;
  rating;

  initState = 'closed';
  showState = false;
  filmReview: FormControl = new FormControl();

  watchedFilm;
  filmReviews;
  // @Output() close = new Subject<void>();
  constructor(private filmService: FilmService,
  			  private route: ActivatedRoute,
  			  private router: Router,
  			  private datePipe: DatePipe) { 
  }

  ngOnInit() {
  	this.route.params.subscribe(params => {
  		let id = +params['id'];
  		this.currentFilmId = id;
   		this.filmService.getFilmById({id: id}).subscribe(result => {
			this.film = result;
			if (result === null) {
				this.router.navigate(['/']);
			} 
   		});
   		this.filmService.findWatchedFilm({film_id: id, user_id: this.currentUserId}).subscribe(result => {
   			this.watchedFilm = result;
   			if (result !== null) {
   				this.watched = true;
	   			this.eyeIcon = faEye2;

	   			this.rating = result['film']['rating'];
	   			
	   			if (this.rating !== null) {
	   				console.log(+this.rating === 4);
	   				if (+this.rating === 1) {
	   					this.starIcon1 = faStar2;
	   				} else if (+this.rating === 2) {
	   					this.starIcon1 = faStar2;
	   					this.starIcon2 = faStar2;
	   				} else if (+this.rating === 3) {
	   					this.starIcon1 = faStar2;
	   					this.starIcon2 = faStar2;
	   					this.starIcon3 = faStar2;
	   				} else if (+this.rating === 4) {
	   					this.starIcon1 = faStar2;
	   					this.starIcon2 = faStar2;
	   					this.starIcon3 = faStar2;
	   					this.starIcon4 = faStar2;
	   				} else if (+this.rating === 5) {
	   					this.starIcon1 = faStar2;
	   					this.starIcon2 = faStar2;
	   					this.starIcon3 = faStar2;
	   					this.starIcon4 = faStar2;
	   					this.starIcon5 = faStar2;
	   				}
	   			}
   			} else {
   				this.watched = false;
   			}

	  	});
	  	this.filmService.findLike({film_id: id, user_id: this.currentUserId})
	  	.subscribe(result => {
   			// this.film.push(result);
   			if (result === false) {
   				this.liked = false;
   			} else if (result === true) {
   				this.liked = true;
   				this.likeIcon = faHeart2;
   			}
	  	});
	  	this.filmService.findFromWatchlist(
	  		{film_id: id, 
	  		 user_id: this.currentUserId}).subscribe(result => {
   			// this.film.push(result);
	  		if (result === false) {
	  			this.later = false;
	  		} else  {
	  			this.later = true;
	  			this.watchIcon = faClock2;
	  		}
	  	});

	    this.filmService.getAllReviewsOfFilm({film_id: id}).subscribe(result => {
	    	this.filmReviews = result;
	    	console.log(result);
	    });
  	});

  	// if (this.film[2] === true) {
  	// 	this.likeIcon = faHeart2;
  	// }


  }

  toWatched() {
  	let date = this.datePipe.transform(new Date(), 'yyyy-MM-dd').toString();
  	let param = {film_id: this.film['id'], 
  				 user_id: this.currentUserId, 
  				 rating: null, 
  				 date: date};
  	if (this.watched === false) {
  		this.filmService.addFilmToWatched(param).subscribe(result => {
  			this.watched = true;
  			this.eyeIcon = faEye2;
  			console.log(result);
  		});
  	} else {
  		this.filmService.deleteFilmFromWatched(param).subscribe(result => {
  			this.watched = false;
  			this.eyeIcon = faEye;
  			console.log(result);
  		});
  		this.rating = 0;
  		this.starIcon1 = faStar;
  		this.starIcon2 = faStar;
  		this.starIcon3 = faStar;
  		this.starIcon4 = faStar;
  		this.starIcon5 = faStar;

  	}
  	
  }

  toLiked() {
  	let date = this.datePipe.transform(new Date(), 'yyyy-MM-dd').toString();
  	if (this.liked === false) {
  		this.filmService.filmToLiked(
  				{film_id: this.film['id'], 
  				 user_id: this.currentUserId, 
  				 add: true}).subscribe(result => {
  			this.liked = true;
  			this.likeIcon = faHeart2;
  			console.log(result);

  		});
  	} else {
  		this.filmService.filmToLiked({film_id: this.film['id'], 
  				 user_id: this.currentUserId, 
  				 add: false}).subscribe(result => {
  			this.liked = false;
  			this.likeIcon = faHeart;
  			console.log(result);

  		});
  	}
  }


  toLater() {
  	if (this.later === false) {
  		this.filmService.filmToWatchList(
  				{film_id: this.film['id'], 
  				 user_id: this.currentUserId, 
  				 add: true}).subscribe(result => {
  			this.later = true;
  			this.watchIcon = faClock2;
  		    console.log(JSON.stringify(result));
  		});
  	} else {
		this.filmService.filmToWatchList(
			    {film_id: this.film['id'], 
  				 user_id: this.currentUserId, 
  				 add: false}).subscribe(result => {
  			this.later = false;
  			this.watchIcon = faClock;
  			console.log(JSON.stringify(result));	 	
  		});
  	}
  }

  changeRating(num) {
  	if (num !== +this.rating) {
  		let date = this.datePipe.transform(new Date(), 'yyyy-MM-dd').toString();
	  	let param = {film_id: this.film['id'], 
	  				 user_id: this.currentUserId, 
	  				 rating: num, 
	  				 date: date};
	  	this.filmService.updateWatchedFilm(param).subscribe(result => {
	  		console.log(result);
	  	});
  	}
  	this.rating = num;
	if (num === 1) {
		this.starIcon1 = faStar2;
		this.starIcon2 = faStar;
		this.starIcon3 = faStar;
		this.starIcon4 = faStar;
		this.starIcon5 = faStar;
	} else if (num === 2) {
		this.starIcon1 = faStar2;
		this.starIcon2 = faStar2;
		this.starIcon3 = faStar;
		this.starIcon4 = faStar;
		this.starIcon5 = faStar;
	} else if (num === 3) {
		this.starIcon1 = faStar2;
		this.starIcon2 = faStar2;
		this.starIcon3 = faStar2;
		this.starIcon4 = faStar;
		this.starIcon5 = faStar;
	} else if (num === 4) {
		this.starIcon1 = faStar2;
		this.starIcon2 = faStar2;
		this.starIcon3 = faStar2;
		this.starIcon4 = faStar2;
		this.starIcon5 = faStar;
	} else if (num === 5) {
		this.starIcon1 = faStar2;
		this.starIcon2 = faStar2;
		this.starIcon3 = faStar2;
		this.starIcon4 = faStar2;
		this.starIcon5 = faStar2;
	}
  }

  // reviewSubscription;
  currentReview;

  addReview() {
  	this.showState = true;
  	this.initState = 'opened';

  	let param = {
  		film_id: this.currentFilmId, 
  		user_id: this.currentUserId};
  	this.filmService.getReview(param).subscribe(result => {
  		this.currentReview = result;
  		if (result !== null) {
	  		this.filmReview.setValue(result['text']);
		}
  	});
  }

  onClose(){
  	// this.close.next();
  	this.showState = false;
  	this.initState = 'closed';
  	// this.reviewSubscription.unsubscribe();
  }

  saveFilmReview() {
  	console.log(this.filmReview.value);
  	let review = {film_id: this.currentFilmId, user_id: +this.currentUserId, text: this.filmReview.value};
  	console.log(review);
  	// if (this.watchedFilm['review'] !== false  ) {
  	if (this.currentReview !== null) {
	  	if (this.filmReview.value !== this.currentReview['text']) {
	  		this.filmService.updateReviewOfFilm(review).subscribe(result => {
				console.log(result);
			});
	  	}
	} else {
		if (this.filmReview.value !== '') {
			this.filmService.addReviewToFilm(review).subscribe(result => {
				console.log(result);
			});
		}
	}
	this.showState = false;
  	this.initState = 'closed';
  }

  ngOnDestroy() {
  	// this.reviewSubscription.unsubscribe();
  	console.log("unsubscribed");

  }

}
