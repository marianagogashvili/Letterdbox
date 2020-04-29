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
  result = [];
  selected = 'film';

  constructor(private route: ActivatedRoute,
  			  private filmService: FilmService) { }

  ngOnInit() {
  	this.route.params.subscribe(result => {
  		console.log(result['film']);
  		// this.result = result['film'];
  		if (result['film'].length >= 2) {
  			this.filmService.findFilms(result['film']).subscribe(films => {
				this.films = films;
				Object.values(this.films).forEach(film => {
					this.filmService.getFilmRating({'film_id': +film['id']}).subscribe(rating => {
						film['rating'] = rating;
	 				});
				});
				this.result.push(films['length'], result['film']) ;
				console.log();
			});
  		}
  	});
  }

  changeSelected(num) {
  	if (num === 1) {
  		this.selected = 'film';
  	} else if (num === 2) {
  		this.selected = 'review';
  	} else if (num === 3) {
  		this.selected = 'list';
  	}
  	console.log(this.selected);
  	this.filmService.findFilmOrListOrReview({param: this.selected, word: this.result[1]}).subscribe(result => {
  		console.log(result);
  	});
  }

}
