import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FilmService } from '../film.service';
import { faStar as faStar2 } from '@fortawesome/free-solid-svg-icons';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { faStar } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-found',
  templateUrl: './found.component.html',
  styleUrls: ['./found.component.css']
})
export class FoundComponent implements OnInit {
  films;
  reviews;
  lists;
  users;

  star = faStar2;
  penIcon = faPen;
  starIcon = faStar;
  result = [];
  // result;
  selected = 'film';

  constructor(private route: ActivatedRoute,
  			  private router: Router,
  			  private filmService: FilmService) { }

  ngOnInit() {
  	this.route.params.subscribe(result => {
  		console.log(result['film']);
  		// this.result = result['film'];
  		if (result['film'].length >= 2) {
			this.setUp(result['film']);
			// this.result.push(films['length'], result['film']) ;
  		}
  	});
  }
  setUp(word) {
  	console.log(word);
  	this.result = [];
  	this.filmService.findFilmOrListOrReview({param: this.selected, word: word}).subscribe(result => {
  		if (this.selected === 'film') {
  			this.films = result;
  			Object.values(this.films).forEach(film => {
				this.filmService.getFilmRating({'film_id': +film['id']}).subscribe(rating => {
					film['rating'] = rating;
 				});
			});
  		} else if (this.selected === 'review') {
  			this.reviews = result;
  			console.log(result);
	  	} else if (this.selected === 'list') {
	  		let finalResult = [];
	  		Object.values(result).forEach(list => {
	  			let filmsToDisplay = [];
	  			let range = list[1]['length'] < 5 ?  list[1]['length'] : 5; 
	  			// console.log('range' + range);
	  			for (var i = 0; i < range; i++) {
	  				// console.log("nbri");
		  			filmsToDisplay.push(list[1][i]);
		  		}
	  			finalResult.push([list[0], filmsToDisplay]);
	  			// console.log(finalResult);
	  		});
	  		this.lists = finalResult;
	  	} else if (this.selected === 'user') { 
	  		this.users = result;
	  		console.log(result);
	  	}	

	  	this.result.push(result['length'], word);
	  	// return this.result;
  	});
  }
  changeSelected(num) {
  	if (num === 1) {
  		this.selected = 'film';
  	} else if (num === 2) {
  		this.selected = 'review';
  	} else if (num === 3) {
  		this.selected = 'list';
  	} else if (num === 4) {
  		this.selected = 'user';
  	}
  	console.log("CONSOLE LOH");
  	console.log(this.selected);
  	// if (this.result[1] >= 2) {
	  	this.setUp(this.result[1]);
	// }
  }
  toArr(rating) {
  	let arr = [];
  	for (var i = 1; i <= rating; i++) {
  		arr.push(i);
  	}
  	return arr;
  }

  toUserPage(id) {
  	let logId = JSON.parse(localStorage.getItem('userData')).id;

  	if (id === logId) {
  		this.router.navigate(['/user']);
  	} else {
  		this.router.navigate(['/user/', id]);
  	}
  }
}
