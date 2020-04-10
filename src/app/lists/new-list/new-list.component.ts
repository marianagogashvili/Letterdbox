import { Component, OnInit } from '@angular/core';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FilmService } from '../../films/film.service';
import { FormControl } from '@angular/forms'; 
import { BehaviorSubject } from 'rxjs';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // <== add the imports!

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
  rankedList = false;
  // filmSubject = new BehaviorSubject(null);

  constructor(private filmService: FilmService) { }

  ngOnInit() {
        this.filmName.valueChanges.subscribe(title => {
	  		if (title !== '' && (title.split('').length >= 3)) {
		  		this.filmService.findFilms(title).subscribe(result => {
		  			this.films = result;
		  			// console.log(result);
		  		});
		  	} else {
				this.films = [];
		  	}
		  	
	  	});
    // this.filmSubject.subscribe(result => {
    // 	console.log(result);
    // 	if (result !== null) {
    // 		// this.listFilms.push(result);
    // 		this.listFilms = result;
    // 	}
    // });
  }

  addToList(film) {
	  let add=0;
  	if (this.listFilms.length !== 0) {
  		Object.values(this.listFilms).forEach(result => {
  			if (result['id'] === film['id']){
  				add=add+1;
  			} 
	  	});
	  	if (add === 0) {
	  		this.listFilms.push(film);
	  		// this.filmSubject.next(this.listFilms);
	  	}
  	} else {
	  	this.listFilms.push(film);
  		// this.filmSubject.next(this.listFilms);
  	}
  	
  }

  removeFilm(film) {
		Object.values(this.listFilms).forEach((result, i) => {
  			if (result['id'] === film['id']){
  				this.listFilms.splice(i, 1);
  				// this.filmSubject.next(film);
  			} 
	  	});
  }

  switchRanked() {
    this.rankedList = !this.rankedList;
  }
}


