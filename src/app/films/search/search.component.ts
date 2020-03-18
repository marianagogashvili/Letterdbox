import { Component, Input, OnInit, Output, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { FormControl } from '@angular/forms'; 
import { trigger, state, style, animate, transition } from '@angular/animations';
import { faStar } from '@fortawesome/free-regular-svg-icons';
import { faStar as faStar2} from '@fortawesome/free-solid-svg-icons';
import { DatePipe } from '@angular/common';

import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { faHeart as faHeart2} from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { FilmService } from '../film.service';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  animations: [
  	trigger('searchState', [
  		state('void', style({
	  		transform: 'translateX(-200px)',
        opacity: 0,
	  		visibility: 'hidden'
  		})),
  		state('*', style({
	  		transform: 'translateX(0px)',
        opacity: 1,
	  		visibility: 'visible'
  		})),
  		transition('void => *', animate(500)),

  	]),
  	trigger('savedState', [
  		state('seen', style({
	  		// transform: 'translateX(-100px)',
        opacity: 1,
	  		visibility: 'visible'
  		})),
  		state('hidden', style({
	  		// transform: 'translateX(0px)',
        opacity: 0,
	  		visibility: 'hidden'
  		})),
  		transition('seen <=> hidden', animate(500)),

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
  initialLike: boolean;
  rating = 0;

  date = new Date();

  filmWatchedAlert;
  watchedFilm;
  savedState = 'seen';

  subscription1;
  constructor(private filmService: FilmService,
  			  private datepipe: DatePipe,
  			  private router: Router ) { }

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
    console.log('saved',this.savedState);
  }
  
  onClose() {
  	this.close.next();
    this.savedState = 'hidden';

  }


  addFilm(film) {
    console.log(this.currentFilm);

    this.secondTabHidden = false;

    let currentUserId = JSON.parse(localStorage.getItem('userData')).id;
    
    this.currentFilm = film;

    this.filmService.findWatchedFilm({film_id: film.id, user_id: currentUserId}).subscribe(result => {
      console.log(result);
      if (result !== null) {
        this.watchedFilm = result;

        this.filmWatchedAlert = "Warning! You already added this film to watched.";
        setTimeout(() => {
          this.filmWatchedAlert = null;
        }, 3000);
        // this.rating = result['film']['rating'];
        this.filmDate.setValue(result['film']['date']);
        if (result['film']['rating']) {
          this.rating = parseInt(result['film']['rating']);
        } else {
          this.rating = 0;
        }
        if (result['review'] !== null) {
          this.filmReview.setValue(result['review']['text']);
        }
        
      } else {
          this.rating = 0;
      }
        this.changeStarIcon(this.rating);

    });

    this.filmService.findLike({film_id: film.id, user_id: currentUserId}).subscribe(result => {
      if (result === false) {
        this.heartIcon = faHeart;
        this.liked = false;
        this.initialLike = false;
      } else if(result === true) {
        this.heartIcon = faHeart2;
        this.liked = true;
        this.initialLike = true;
      }
      
    });
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
	  	}  else {
        this.starIcon = faStar;
        this.starIcon2 = faStar;
        this.starIcon3 = faStar;
        this.starIcon4 = faStar;
        this.starIcon5 = faStar;
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
  saveReview(id, title) {
  	let currentUserId = JSON.parse(localStorage.getItem('userData')).id;
  	let dating = (this.filmDate.value !== '' ? this.filmDate.value : this.date);

  	let param = {film_id: id, 
  				 user_id: currentUserId, 
  				 rating: this.rating, 
  				 date: this.datepipe.transform(dating, 'yyyy-MM-dd').toString()};

  	if (this.watchedFilm) {
      if (this.filmReview.value) {
        if (this.watchedFilm['review'] !== false) {
          if (this.filmReview.value !== this.watchedFilm['review']['text']) {
            this.filmService.updateReviewOfFilm({film_id: id, user_id: currentUserId, text: this.filmReview.value}).subscribe(result => {
              console.log(result);
              this.filmService.createActivity(
                {user_id: currentUserId, 
                 film_id: id, 
                 film_title: title, 
                 action: 'film review update', 
                 date: this.datepipe.transform(this.date, 'yyyy-MM-dd').toString()}).subscribe(result => {
                console.log(result);
              });
            });
          }
        } else {
            this.filmService.addReviewToFilm({user_id: currentUserId, film_id: id, text: this.filmReview.value}).subscribe(result => {
              console.log(result);
              this.filmService.createActivity(
                {user_id: currentUserId, 
                  film_id: id, 
                  film_title: title, 
                  action: 'film review add', 
                  date: this.datepipe.transform(this.date, 'yyyy-MM-dd').toString()}).subscribe(result => {
                console.log(result);
              });
            });
        }
      }
     
  		if ((parseInt(this.watchedFilm['film']['rating']) !== this.rating) ||
  			(this.watchedFilm['film']['date'] !== this.filmDate.value)) {
  			this.filmService.updateWatchedFilm(param)
  			.subscribe(result => {
  				 	console.log(result);
             this.filmService.createActivity(
                {user_id: currentUserId, 
                  film_id: id, 
                  film_title: title, 
                  action: 'film update', 
                  date: this.datepipe.transform(dating, 'yyyy-MM-dd').toString()}).subscribe(result => {
                console.log(result);
              });
  				 });
  		}
  	} else {
	  	this.filmService.addFilmToWatched(param).subscribe(result => {
	  		console.log(result);
        this.filmService.createActivity(
                {user_id: currentUserId, 
                  film_id: id, 
                  film_title: title, 
                  action: 'film add', 
                  date: this.datepipe.transform(dating, 'yyyy-MM-dd').toString()}).subscribe(result => {
                console.log(result);
              });
	  	});

	  	if(this.filmReview.value !== '') {
        console.log(this.filmReview.value);
	  		this.filmService.addReviewToFilm({user_id: currentUserId, film_id: id, text: this.filmReview.value}).subscribe(result => {
	  			console.log(result);
          this.filmService.createActivity(
                {user_id: currentUserId, 
                  film_id: id, 
                  film_title: title, 
                  action: 'review add', 
                  date: this.datepipe.transform(dating, 'yyyy-MM-dd').toString()}).subscribe(result => {
                console.log(result);
              });
	  		});

	  	}

	  	// if (this.liked) {
	  	// 	this.filmService.filmToLiked({user_id: currentUserId, film_id: id, add: true}).subscribe(result => {
	  	// 		console.log(result);
	  	// 	});
	  	// }
  		
  	}

  if ((this.initialLike === true) && (this.liked === false)) {
    this.filmService.filmToLiked(
      { user_id: currentUserId, 
        film_id: id,
        add: false}).subscribe(result => {
        console.log(result);
        this.filmService.createActivity(
          {user_id: currentUserId, 
            film_id: id, 
            film_title: title, 
            action: 'like delete', 
            date: this.datepipe.transform(dating, 'yyyy-MM-dd').toString()}).subscribe(result => {
          console.log(result);
        });
      });
  } else if ((this.initialLike === false) && (this.liked === true)) {
    this.filmService.filmToLiked(
      {user_id: currentUserId, 
         film_id: id, 
         add: true}).subscribe(result => {
        console.log(result);
        this.filmService.createActivity(
          {user_id: currentUserId, 
            film_id: id, 
            film_title: title, 
            action: 'like add', 
            date: this.datepipe.transform(dating, 'yyyy-MM-dd').toString()}).subscribe(result => {
          console.log(result);
        });
      });
  } 

  this.close.next();
	this.savedState = 'hidden';
	// this.router.navigate(['/user']);
  }

  goBack() {
  	this.secondTabHidden = true;
  }

  ngOnDestroy() {
  	this.subscription1.unsubscribe();
  	// console.log('first');
  	// this.subscription2.unsubscribe();
  	// console.log('second');
  	// this.subscription3.unsubscribe();
  	// console.log('third');
  	// this.subscription4.unsubscribe();
  	// console.log('fourth');
  }

}
