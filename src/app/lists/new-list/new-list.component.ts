import { Component, OnInit } from '@angular/core';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FilmService } from '../../films/film.service';
import { FormControl } from '@angular/forms'; 
import { BehaviorSubject } from 'rxjs';
@Component({
  selector: 'app-new-list',
  templateUrl: './new-list.component.html',
  styleUrls: ['./new-list.component.css']
})
export class NewListComponent implements OnInit {
  starIcon = faStar;
  crossIcon = faTimes;
  filmName: FormControl = new FormControl();
  films;
  listFilms = [];
  filmSubject = new BehaviorSubject(null);

  constructor(private filmService: FilmService) { }

  ngOnInit() {
        this.filmName.valueChanges.subscribe(title => {
	  		if (title !== '' && (title.split('').length >= 3)) {
		  		this.filmService.findFilms(title).subscribe(result => {
		  			this.films = result;
		  			console.log(result);
		  		});
		  	} else {
				this.films = [];
		  	}
		  	
	  	});
    this.filmSubject.subscribe(result => {
    	console.log(result);
    	if (result !== null) {
    		this.listFilms.push(result);
    	}
    });
  }

  addToList(film) {
  	// this.listFilms.forEach(result => {
  	// 	console.log(result);
  	// 	if (film['id'] !== result['id']) {
  	// 		this.filmSubject.next(film);
  	// 	}
  	// });
  	// this.filmSubject.next(film);
  	// console.log(this.listFilms.indexOf(film) != -1);
	let add;

  	if (this.listFilms.length !== 0) {
  		Object.values(this.listFilms).forEach(result => {
  			console.log(result['id'] === film['id']);
  			add = (result['id'] === film['id']);
	  	});
	  	if (add === false) {
	  		this.filmSubject.next(film);
	  	}
  	} else {
  		console.log('FILM2');
  		this.filmSubject.next(film);
  	}
  	
  }

}
