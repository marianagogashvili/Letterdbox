import { Component, Input, OnInit, Output, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { FormControl } from '@angular/forms'; 
import { trigger, state, style, animate, transition } from '@angular/animations';
import { faStar } from '@fortawesome/free-regular-svg-icons';
import { faStar as faStar2} from '@fortawesome/free-solid-svg-icons';
import { DatePipe } from '@angular/common';

import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { faHeart as faHeart2} from '@fortawesome/free-solid-svg-icons';

import { FilmService } from '../film.service';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  animations: [
  	trigger('searchState', [
  		state('void', style({
	  		transform: 'translateX(-100px)',
	  		opacity: 0
  		})),
  		state('*', style({
	  		transform: 'translateX(0px)',
	  		opacity: 1
  		})),
  		transition('void => *', animate(500)),

  	])
  ]
})
export class SearchComponent implements OnInit, OnDestroy {
  @Output() close = new Subject<void>();
  filmTitle: FormControl = new FormControl();
  filmDate: FormControl = new FormControl();
  filmReview: FormControl = new FormControl();

  films;
  isHidden=true;
  /////
  secondTabHidden=true;
  currentFilm;
  //////
  starIcon = faStar; starIcon2 = faStar; starIcon3 = faStar; starIcon4 = faStar; starIcon5 = faStar;
  heartIcon = faHeart;
  liked = false;
  rating = 0;

  date = new Date();

  filmWatchedAlert;
  watchedFilm;

  subscription1; subscription2; subscription3; subscription4;
  constructor(private filmService: FilmService,
  			  private datepipe: DatePipe) { }

  ngOnInit() {
  	this.subscription1 = this.filmTitle.valueChanges.subscribe(title => {
  		if (title !== '') {
			this.filmService.findFilms(title).subscribe(result => {
				this.films = result;
				this.isHidden = false;
			})  		
		} else {
			this.isHidden = true;
			this.films = [];
		}
  		
  	});
  }
  
  onClose() {
  	this.close.next();
  }

  changeStarIcon(num) {
  	this.rating = num;
	  	if (num === 1) {
	  		this.starIcon = faStar2;
	  		this.starIcon2 = faStar;
	  		this.starIcon3 = faStar;
	  		this.starIcon4 = faStar;
	  		this.starIcon5 = faStar;
	  	} else if(num === 2) {
	  		this.starIcon = faStar2;
	  		this.starIcon2 = faStar2;
	  		this.starIcon3 = faStar;
	  		this.starIcon4 = faStar;
	  		this.starIcon5 = faStar;
	  	} else if(num === 3) {
	  		this.starIcon = faStar2;
	  		this.starIcon2 = faStar2;
	  		this.starIcon3 = faStar2;
	  		this.starIcon4 = faStar;
	  		this.starIcon5 = faStar;
	  	} else if(num === 4) {
	  		this.starIcon = faStar2;
	  		this.starIcon2 = faStar2;
	  		this.starIcon3 = faStar2;
	  		this.starIcon4 = faStar2;
	  		this.starIcon5 = faStar;
	  	} else if(num === 5) {
	  		this.starIcon = faStar2;
	  		this.starIcon2 = faStar2;
	  		this.starIcon3 = faStar2;
	  		this.starIcon4 = faStar2;
	  		this.starIcon5 = faStar2;
	  	} 
  }

  changeHeartIcon() {
  	this.liked = !this.liked;
  	if (this.heartIcon === faHeart) {
  		this.heartIcon = faHeart2;
  	} else if (this.heartIcon === faHeart2) {
  		this.heartIcon = faHeart;
  	}
  }

  addFilm(film) {
  	this.secondTabHidden = false;

  	let currentUserId = JSON.parse(localStorage.getItem('userData')).id;
  	
  	this.currentFilm = film;
  	this.filmService.findWatchedFilm({film_id: film.id, user_id: currentUserId}).subscribe(result => {
  		if (result !== null) {
  			this.watchedFilm = result;
  			// console.log(JSON.stringify(result));
	  		this.filmWatchedAlert = "Warning! You already added this film to watched.";
	  		setTimeout(() => {
	  			this.filmWatchedAlert = null;
	  		}, 3000);
  			// this.rating = result['film']['rating'];
  			this.filmDate.setValue(result['film']['date']);
  			this.changeStarIcon(parseInt(result['film']['rating']));
  			if (result['like'] !== false) {
  				this.changeHeartIcon();
  			}
  			if (result['review'] !== false) {
  				this.filmReview.setValue(result['review']['text']);
  			}
  		}
  	});

  }

  saveReview(id) {
  	let currentUserId = JSON.parse(localStorage.getItem('userData')).id;
  	let dating = (this.filmDate.value !== '' ? this.filmDate.value : this.date);
  	let param = {film_id: id, 
  				 user_id: currentUserId, 
  				 rating: this.rating, 
  				 date: this.datepipe.transform(this.date, 'yyyy-MM-dd').toString()};
  	// console.log(param);
  	if (this.watchedFilm) {
  		// console.log(this.filmReview.value !== this.watchedFilm['review']['text']);

 		if (this.filmReview.value !== this.watchedFilm['review']['text']) {
  			this.filmService.updateReviewOfFilm({film_id: id, user_id: currentUserId, text: this.filmReview.value}).subscribe(result => {
  				console.log(result);
  			});
  		}

  		if ((this.watchedFilm['like'] !== false) && (this.liked === false)) {
			this.filmService.filmToLiked({user_id: currentUserId, film_id: id, add: false}).subscribe(result => {
	  			console.log(result);
	  		});
  		} else if ((this.watchedFilm['like'] === false) && (this.liked === true)) {
			this.filmService.filmToLiked(
				{user_id: currentUserId, 
			     film_id: id, 
			     add: true}).subscribe(result => {
	  			console.log(result);
	  		});
  		}

  		if (parseInt(this.watchedFilm['film']['rating']) !== this.rating) {
  			// update rating and date
  			this.filmService.updateWatchedFilm(
  				{film_id: id, 
  				 user_id: currentUserId, 
  				 rating: this.rating, 
  				 date: this.datepipe.transform(this.date, 'yyyy-MM-dd').toString()}).subscribe(result => {
  				 	console.log(result);
  				 });
  		}
  	} else {
	  	this.filmService.addFilmToWatched(param).subscribe(result => {
	  		console.log(result);
	  	});

	  	if(this.filmReview.value !== '') {
	  		this.filmService.addReviewToFilm({user_id: currentUserId, film_id: id, review: this.filmReview.value}).subscribe(result => {
	  			console.log(result);
	  		});
	  	}

	  	if (this.liked) {
	  		this.filmService.filmToLiked({user_id: currentUserId, film_id: id, add: true}).subscribe(result => {
	  			console.log(result);
	  		});
	  	}
  	}

  }

  goBack() {
  	this.secondTabHidden = true;
  }

  ngOnDestroy() {
  	// this.subscription1.unsubscribe();
  	// console.log('first');
  	// this.subscription2.unsubscribe();
  	// console.log('second');
  	// this.subscription3.unsubscribe();
  	// console.log('third');
  	// this.subscription4.unsubscribe();
  	// console.log('fourth');
  }

}
