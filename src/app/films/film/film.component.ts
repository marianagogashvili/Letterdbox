import { Component, OnInit } from '@angular/core';
import { FilmService } from '../film.service';
import { ActivatedRoute } from '@angular/router';
import { map, tap } from 'rxjs/operators';
import { faStar } from '@fortawesome/free-regular-svg-icons';
import { faEye } from '@fortawesome/free-regular-svg-icons';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { faHeart as faHeart2 } from '@fortawesome/free-solid-svg-icons';

import { faClock } from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'app-film',
  templateUrl: './film.component.html',
  styleUrls: ['./film.component.css']
})
export class FilmComponent implements OnInit {
  film = Array();
  starIcon = faStar;
  eyeIcon = faEye;
  likeIcon = faHeart;
  watchIcon = faClock;
  currentUserId = JSON.parse(localStorage.getItem('userData')).id;
  
  liked;
  watched;
  later;
  constructor(private filmService: FilmService,
  			  private route: ActivatedRoute) { 
  }

  ngOnInit() {
  	this.route.params.subscribe(params => {
  		let id = +params['id'];
   		this.filmService.getFilmById({id: id}).subscribe(result => {
   			this.film.push(result);
   		});
   		this.filmService.findWatchedFilm({film_id: id, user_id: this.currentUserId}).subscribe(result => {
   			this.film.push(result);
   			// console.log(result);
	  	});
	  	this.filmService.findLike({film_id: id, user_id: this.currentUserId})
	  	.subscribe(result => {
   			this.film.push(result);
	  		// console.log(result);
	  	});
  	});
  	// if (this.film[2] === true) {
  	// 	this.likeIcon = faHeart2;
  	// }
  }

  addToWatched() {
  	this.filmService.addFilmToWatched({}).subscribe(result => {

  	});
  }

  deleteFromWatched() {

  }

  addToLiked() {

  }

  deleteFromLiked() {

  }

  addToLater() {

  }

  deleteFromLater() {

  }

}
