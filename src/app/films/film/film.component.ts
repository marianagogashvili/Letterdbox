import { Component, OnInit } from '@angular/core';
import { FilmService } from '../film.service';
import { ActivatedRoute } from '@angular/router';
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

@Component({
  selector: 'app-film',
  templateUrl: './film.component.html',
  styleUrls: ['./film.component.css']
})
export class FilmComponent implements OnInit {
  film;
  starIcon = faStar;
  eyeIcon = faEye;
  likeIcon = faHeart;
  watchIcon = faClock;
  currentUserId = JSON.parse(localStorage.getItem('userData')).id;
  
  liked;
  watched;
  later;
  constructor(private filmService: FilmService,
  			  private route: ActivatedRoute,
  			  private datePipe: DatePipe) { 

  }

  ngOnInit() {
  	this.route.params.subscribe(params => {
  		let id = +params['id'];
   		// this.filmService.getFilmById({id: id}).subscribe(result => {
   		// 	// this.film.push(result);
   		// 	this.film = result;  			
   		// });
   		this.filmService.getFilmById({id: id}).subscribe(result => {
   			// this.film.push(result);
			this.film = result; 	
   		});
   		this.filmService.findWatchedFilm({film_id: id, user_id: this.currentUserId}).subscribe(result => {
   			// this.film.push(result);
   			if (result === null) {
   				this.watched = false;
   			} else {
   				this.watched = true;
   				this.eyeIcon = faEye2;
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
  	});
  	console.log(this.film);

  	// if (this.film[2] === true) {
  	// 	this.likeIcon = faHeart2;
  	// }
  }

  toWatched() {
  	let date = this.datePipe.transform(new Date(), 'yyyy-MM-dd').toString();
  	let param = {film_id: this.film[0]['id'], 
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
  	}
  	
  }

  toLiked() {
  	let date = this.datePipe.transform(new Date(), 'yyyy-MM-dd').toString();
  	if (this.liked === false) {
  		this.filmService.filmToLiked(
  				{film_id: this.film[0]['id'], 
  				 user_id: this.currentUserId, 
  				 add: true}).subscribe(result => {
  			this.liked = true;
  			this.likeIcon = faHeart2;
  			console.log(result);

  		});
  	} else {
  		this.filmService.filmToLiked({film_id: this.film[0]['id'], 
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
  				{film_id: this.film[0]['id'], 
  				 user_id: this.currentUserId, 
  				 add: true}).subscribe(result => {
  			this.later = true;
  			this.watchIcon = faClock2;
  		    console.log(JSON.stringify(result));
  		});
  	} else {
		this.filmService.filmToWatchList(
			    {film_id: this.film[0]['id'], 
  				 user_id: this.currentUserId, 
  				 add: false}).subscribe(result => {
  			this.later = false;
  			this.watchIcon = faClock;
  			console.log(JSON.stringify(result));	 	
  		});
  	}
  }


}
