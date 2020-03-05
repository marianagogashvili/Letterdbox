import { Component, OnInit } from '@angular/core';
import { FilmService } from '../film.service';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { faStar } from '@fortawesome/free-regular-svg-icons';
import { faEye } from '@fortawesome/free-regular-svg-icons';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
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
  constructor(private filmService: FilmService,
  			  private route: ActivatedRoute) { 
  }

  ngOnInit() {
  	this.route.params.subscribe(params => {
  		let id = +params['id'];
  		this.filmService.getFilmById({id: id}).subscribe(film => {
  			// this.film = film;
  			Object.values(film).forEach(v => {
  				this.film.push(v);
  			});
   		});
  	});
  	console.log(this.film);

  }

}
