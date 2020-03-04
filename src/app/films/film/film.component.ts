import { Component, OnInit } from '@angular/core';
import { FilmService } from '../film.service';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
@Component({
  selector: 'app-film',
  templateUrl: './film.component.html',
  styleUrls: ['./film.component.css']
})
export class FilmComponent implements OnInit {
  film;
  constructor(private filmService: FilmService,
  			  private route: ActivatedRoute) { 
  }

  ngOnInit() {
  	this.route.params.subscribe(params => {
  		let id = +params['id'];
  		this.filmService.getFilmById({id: id}).subscribe(film => {
  			this.film = film;
   		});
  	});
  	console.log(this.film);

  }

}
