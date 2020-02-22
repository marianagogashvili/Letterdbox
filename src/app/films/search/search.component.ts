import { Component, Input, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { FormControl } from '@angular/forms'; 
import { trigger, state, style, animate, transition } from '@angular/animations';
import { faStar } from '@fortawesome/free-regular-svg-icons';
import { faStar as faStar2} from '@fortawesome/free-solid-svg-icons';

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
export class SearchComponent implements OnInit {
  @Output() close = new Subject<void>();
  filmTitle: FormControl = new FormControl();
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
  constructor(private filmService: FilmService) { }

  ngOnInit() {
  	this.filmTitle.valueChanges.subscribe(title => {
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

  addFilm(film) {
  	console.log(film);
  	this.currentFilm = film;
  	this.secondTabHidden = false;
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
  saveReview(id, date, review) {
  	console.log(id);
  	console.log(date);
  	console.log(review);

  }

  goBack() {
  	this.secondTabHidden = true;
  }

}
