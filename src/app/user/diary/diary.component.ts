import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { faCalendar } from '@fortawesome/free-solid-svg-icons';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { FilmService } from '../../films/film.service';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-diary',
  templateUrl: './diary.component.html',
  styleUrls: ['./diary.component.css']
})
export class DiaryComponent implements OnInit {
  watchedFilms;
  calendar = faCalendar;
  star = faStar;
  heart = faHeart;
  currentUserId = JSON.parse(localStorage.getItem('userData')).id;
  constructor(private userService: UserService,
  		      private filmService: FilmService) { }

  ngOnInit() {
  	this.userService.getWatchedFilms({user_id: this.currentUserId}).subscribe(films => {
  		this.watchedFilms = films;
  		Object.values(this.watchedFilms).forEach(film => {
	  		this.filmService.findLike({film_id: film['id'], user_id: this.currentUserId}).subscribe(result => {
	  			film['liked'] = result;
  			});
  		});
  		console.log(this.watchedFilms);
  	});
  	
  }
  toArr(num) {
  	let arr = [];
  	for (var i = 1; i <= num; i++) {
  		arr.push(i);
  	}
  	return arr;
  }

}
