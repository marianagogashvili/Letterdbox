import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FilmService } from '../film.service';
import { faStar as faStar2 } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-found',
  templateUrl: './found.component.html',
  styleUrls: ['./found.component.css']
})
export class FoundComponent implements OnInit {
  films;
  star = faStar2;

  constructor(private route: ActivatedRoute,
  			  private filmService: FilmService) { }

  ngOnInit() {
  	this.route.params.subscribe(result => {
  		console.log(result['film']);
  		if (result['film'].length >= 2) {
  			this.filmService.findFilms(result['film']).subscribe(films => {
				this.films = films;
				Object.values(this.films).forEach(film => {
					this.filmService.getFilmRating({'film_id': +film['id']}).subscribe(rating => {
						film['rating'] = rating;
	 				});
				});
				console.log(films);
			});
  		}
  		
  	});
  }

}
