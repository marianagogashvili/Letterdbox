import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { faEye } from '@fortawesome/free-regular-svg-icons';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { FilmService } from './film.service';
import { DatePipe } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-films',
  templateUrl: './films.component.html',
  styleUrls: ['./films.component.css']
})
export class FilmsComponent implements OnInit, OnDestroy {
  films;
  eyeIcon = faEye;
  heartIcon = faHeart;

  subscription;
  constructor(private filmService: FilmService,
  			  private datePipe: DatePipe,
  		      private route: ActivatedRoute,
              private router: Router) { }
  currentUserId = JSON.parse(localStorage.getItem('userData')).id;
  date = this.datePipe.transform(new Date(), 'yyyy-MM-dd').toString();
  ngOnInit() {
  	this.subscription = this.filmService.getFilms().subscribe(result => {
        this.films = result;
    });

    this.route.queryParams.subscribe(params => {
      this.filmService.sortBy(params).subscribe(result => {
         this.films = result;
         console.log(result);
      });

    });
  	// this.filmService.findWatchedFilm({film_id: film.id, user_id: this.currentUserId});
  }

  addToWatched(id) {
  	let param = {film_id: id, 
  				 user_id: this.currentUserId, 
  				 rating: null, 
  				 date: this.date.toString()};
  	this.filmService.addFilmToWatched(param).subscribe(result => {
  		console.log(result);
  	});
  }
  addToLiked(id) {
  	let param = {film_id: id, 
  				 user_id: this.currentUserId, 
  				 rating: null, 
  				 date: this.date.toString(),
  				 add: true};
  	this.filmService.filmToLiked(param).subscribe(result => {
  		console.log(result);
  	});			 
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
