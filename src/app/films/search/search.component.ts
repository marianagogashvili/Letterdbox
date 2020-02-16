import { Component, Input, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { FormControl } from '@angular/forms'; 
import { trigger, state, style, animate, transition } from '@angular/animations';

import { FilmService } from '../film.service';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  animations: [
  	trigger('searchState', [
  		state('void', style({
	  		transform: 'translateX(-100px)',
	  		opacity: 0
  		})),
  		state('*', style({
	  		transform: 'translateX(0px)',
	  		opacity: 1
  		})),
  		transition('void => *', animate(500)),

  	])
  ]
})
export class SearchComponent implements OnInit {
  @Output() close = new Subject<void>();
  filmTitle: FormControl = new FormControl();
  films;
  isHidden=true;
  constructor(private filmService: FilmService) { }

  ngOnInit() {
  	this.filmTitle.valueChanges.subscribe(title => {
  		if (title !== '') {
			this.filmService.findFilms(title).subscribe(result => {
				this.films = result;
				this.isHidden = false;
			})  		
		} else {
			this.isHidden = true;
			this.films = [];
		}
  		
  	});
  }
  
  onClose() {
  	this.close.next();
  }

  addFilm(film) {
  	console.log(film);
  }
}
