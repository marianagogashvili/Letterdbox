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
import { Subject, BehaviorSubject } from 'rxjs';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { FormControl } from '@angular/forms';
import { UserService } from '../../user/user.service';
@Component({
  selector: 'app-film',
  templateUrl: './film.component.html',
  styleUrls: ['./film.component.css'],
  animations: [
  	trigger('initState', [
  		state('closed', style({
  			transform: 'translateX(-200px)',
  			opacity: 0,
  			visibility: 'hidden'
  		})),
  		state('opened', style({
  			transform: 'translateX(0)',
  			opacity: 1,
  			visibility: 'visible'
  		})),
  		transition('closed <=> opened', animate(500))
  	]),
  	trigger('initState2', [
  		state('closed', style({
  			opacity: 0,
  			visibility: 'hidden'
  		})),
  		state('opened', style({
  			opacity: 1,
  			visibility: 'visible'
  		})),
  		transition('closed <=> opened', animate(500))
  	])
    // ,
    // trigger('initState3', [
    //   state('closed', style({
    //     transform: 'translateX(-200px)',
    //     opacity: 0,
    //     visibility: 'hidden'
    //   })),
    //   state('opened', style({
    //     transform: 'translateX(0)',
    //     opacity: 1,
    //     visibility: 'visible'
    //   })),
    //   transition('closed <=> opened', animate(500))
    // ]),

  ]
})
export class FilmComponent implements OnInit, OnDestroy {
  film;
  star = faStar2;

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
  mainRatingNum;

  initState = 'closed';
  showListPage  = 'closed';
  // initState3 = 'closed';

  showState = false;
  filmReview: FormControl = new FormControl();

  watchedFilm;
  filmReviews;

  reviewSubject = new BehaviorSubject(null); 
  subscription1; 
  spinnerIsLoading = false;

  userLists;
  selectedList: FormControl = new FormControl();

  // @Output() close = new Subject<void>();
  constructor(private filmService: FilmService,
          private userService: UserService,
  			  private route: ActivatedRoute,
  			  private router: Router,
  			  private datePipe: DatePipe) { 
  }

  ngOnInit() {

	this.spinnerIsLoading = true;

  	this.route.params.subscribe(params => {
  		let id = +params['id'];
  		this.currentFilmId = id;

      this.filmService.getFilmsToList({user_id: this.currentUserId, film_id: id}).subscribe(result => {
        this.userLists = result;
        console.log(this.userLists);
      });

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
	  	
	  	this.subscription1 = this.reviewSubject.subscribe(result => {
	    	// console.log('reviewssss', result);
        let end = [];
	    	if (result !== null) {
	    		// this.filmReviews = result;
          if (result !== null) {
              Object.values(result).forEach(r => {
                end.unshift(r);
              });
              this.filmReviews = end;
            } else {
              this.filmReviews = null;
            }
	    	} else {
	    		this.filmService.getAllReviewsOfFilm({film_id: id}).subscribe(result => {
			    	// this.filmReviews = result;
			    	if (result !== null) {
              Object.values(result).forEach(r => {
                end.unshift(r);
              });
              this.filmReviews = end;
            } else {
              this.filmReviews = null;
            }
            
			    });
	    	}
	    	console.log('spin', this.spinnerIsLoading);
	    });
    
	    this.filmService.getFilmRating({film_id: id}).subscribe(result => {
	    	// console.log('rating', result);
	    	this.mainRatingNum = result;
	    });
  	});
    this.spinnerIsLoading = false;

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
		    this.filmService.createActivity(
            	{user_id: this.currentUserId, 
             	 film_id: this.currentFilmId, 
             	 film_title: this.film['title'], 
             	 action: 'watched', 
             	 date: date}).subscribe(result => {
            	console.log('ACTIVITY', result);
            });	 
  		});
  	} else {
  		this.filmService.deleteFilmFromWatched(param).subscribe(result => {
  			this.watched = false;
  			this.eyeIcon = faEye;
  			console.log(result);
  			this.filmService.createActivity(
            	{user_id: this.currentUserId, 
             	 film_id: this.currentFilmId, 
             	 film_title: this.film['title'], 
             	 action: 'watched', 
             	 date: date}).subscribe(result => {
            	console.log('deleted from watched film', result);
            });	
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
		  	this.filmService.createActivity(
	            {user_id: this.currentUserId, 
	              film_id: this.currentFilmId, 
	              film_title: this.film['title'], 
	              action: 'liked', 
	              date: date}).subscribe(result => {
	            console.log('ACTIVITY', result);
            });	 
  		});
  	} else {
  		this.filmService.filmToLiked({film_id: this.film['id'], 
  				 user_id: this.currentUserId, 
  				 add: false}).subscribe(result => {
  			this.liked = false;
  			this.likeIcon = faHeart;
  			console.log(result);
  			this.filmService.createActivity(
		        {user_id: this.currentUserId, 
		          film_id: this.currentFilmId, 
		          film_title: this.film['title'], 
		          action: 'deleted like from', 
		          date: date}).subscribe(result => {
		        console.log('ACTIVITY', result);
	        });	 
  		});
  	}
  }


  toLater() {
    let date = this.datePipe.transform(new Date(), 'yyyy-MM-dd').toString();
  	if (this.later === false) {
  		this.filmService.filmToWatchList(
  				{film_id: this.film['id'], 
  				 user_id: this.currentUserId, 
  				 add: true}).subscribe(result => {
  			this.later = true;
  			this.watchIcon = faClock2;
  		    console.log(JSON.stringify(result));
      	    this.filmService.createActivity(
		        {user_id: this.currentUserId, 
		          film_id: this.currentFilmId, 
		          film_title: this.film['title'], 
		          action: 'added to watchlist', 
		          date: date}).subscribe(result => {
		        console.log('ACTIVITY', result);
	        });	 
  		});
  	} else {
		this.filmService.filmToWatchList(
			    {film_id: this.film['id'], 
  				 user_id: this.currentUserId, 
  				 add: false}).subscribe(result => {
  			this.later = false;
  			this.watchIcon = faClock;
  			console.log(JSON.stringify(result));
  			this.filmService.createActivity(
		        {user_id: this.currentUserId, 
		          film_id: this.currentFilmId, 
		          film_title: this.film['title'], 
		          action: 'deleted from watchlist', 
		          date: date}).subscribe(result => {
		        console.log('ACTIVITY', result);
	        });	 	
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
	  		this.filmService.createActivity(
	                {user_id: this.currentUserId, 
	                  film_id: this.currentFilmId, 
	                  film_title: this.film['title'], 
	                  action: 'updated', 
	                  date: date}).subscribe(result => {
	                console.log('ACTIVITY', result);
	              });
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
  onClose2() {
    this.showListPage = 'closed';
  }

  saveFilmReview() {
  	// this.spinnerIsLoading = true;

  	// console.log(this.filmReview.value);
  	let review = {film_id: this.currentFilmId, user_id: +this.currentUserId, text: this.filmReview.value};
  	// console.log(review);
  	// if (this.watchedFilm['review'] !== false  ) {
  	if (this.currentReview !== null) {
	  	if (this.filmReview.value !== this.currentReview['text']) {
	  		this.filmService.updateReviewOfFilm(review).subscribe(result => {
				console.log('updated');
				this.filmService.getAllReviewsOfFilm({film_id: this.currentFilmId}).subscribe(result => {
			  	    this.reviewSubject.next(result);
			  	    console.log('new result');
			    });
			    this.filmService.createActivity(
	                {user_id: this.currentUserId, 
	                  film_id: this.currentFilmId, 
	                  film_title: this.film['title'], 
	                  action: 'updated review of', 
	                  date: this.datePipe.transform(new Date(), 'yyyy-MM-dd').toString()}).subscribe(result => {
	                console.log('ACTIVITY', result);
	              });
			});
	  	}
	} else {
		if (this.filmReview.value !== '') {
			let date = (this.datePipe.transform(new Date(), 'yyyy-MM-dd')).toString();
			this.filmService.addReviewToFilm({film_id: this.currentFilmId, user_id: +this.currentUserId, text: this.filmReview.value, date: date}).subscribe(result => {
				console.log('added');
				this.filmService.getAllReviewsOfFilm({film_id: this.currentFilmId}).subscribe(result => {
			  	    this.reviewSubject.next(result);
			  	    console.log('new result');
			    });
			    this.filmService.createActivity(
	                {user_id: this.currentUserId, 
	                  film_id: this.currentFilmId, 
	                  film_title: this.film['title'], 
	                  action: 'added review to', 
	                  date: date}).subscribe(result => {
	                console.log('ACTIVITY', result);
	              });
			});
		}
	}

    this.showState = false;
  	this.initState = 'closed';
  }
  deleteReview() {
    if(this.currentReview !== null) {
      this.userService.deleteReview({user_id: +this.currentUserId, film_id: this.currentFilmId}).subscribe(result => {
        console.log(result);
        this.filmService.createActivity(
          {user_id: this.currentUserId, 
            film_id: this.currentFilmId, 
            film_title: this.film['title'], 
            action: 'deleted review of', 
            date: this.datePipe.transform(new Date(), 'yyyy-MM-dd').toString()}).subscribe(result => {
          console.log('ACTIVITY', result);
        });
        
        this.filmService.getAllReviewsOfFilm({film_id: this.currentFilmId}).subscribe(result => {
            this.reviewSubject.next(result);
            console.log('new result');
        });
        this.currentReview = null;
        this.filmReview.setValue('');
        this.showState = false;
        this.initState = 'closed';
      });
    }
  }

  saveFilmToList() {
    console.log(this.selectedList.value);
    if (this.selectedList.value !== 'null' && this.selectedList.value !== '') {
        this.filmService.addFilmToList({list_id: this.selectedList.value, film_id: this.currentFilmId}).subscribe(result => {
          console.log(result);
          this.showListPage = 'closed';
          this.selectedList.setValue('---');
          this.filmService.getFilmsToList({user_id: this.currentUserId, film_id: this.currentFilmId}).subscribe(result => {
            this.userLists = result;
            console.log(this.userLists);
          });
        });
    }
    
  }

  toNewList() {
    this.router.navigate(['/lists/new', {id: this.currentFilmId}]);
  }

  addToList() {
    this.showListPage = 'opened';
  }
  ngOnDestroy() {
  	// this.reviewSubscription.unsubscribe();
  	this.subscription1.unsubscribe();
  	console.log("unsubscribed");

  }

}
