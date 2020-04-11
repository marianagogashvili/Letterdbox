import { Component, OnInit } from '@angular/core';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FilmService } from '../../films/film.service';
import { NgForm, FormControl } from '@angular/forms'; 
import { BehaviorSubject } from 'rxjs';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // <== add the imports!
import { ListService } from '../list.service';
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
  currentUserId = JSON.parse(localStorage.getItem('userData')).id;
  error;
  // filmSubject = new BehaviorSubject(null);

  constructor(private filmService: FilmService,
              private listService: ListService) { }

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
	  	} else {
        this.error = "You've already added this list";
        setTimeout(() => {
          this.error = null;
        }, 3000);
      }
  	} else {
	  	this.listFilms.push(film);
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
  saveList(form: NgForm) {
    if (this.listFilms.length === 0) {
      this.error = "Please select films to create a list";
      setTimeout(() => {
        this.error = null;
      }, 5000);
    } else {
      let films = [];
      Object.values(this.listFilms).forEach(film => {
        films.push(+film['id']);
      });
      let param = {name: form.value.list,
                   desc: form.value.descr,
                   public: form.value.public,
                   ranked: form.value.ranked,
                   user_id: this.currentUserId,
                   films: films}
      console.log(param);
      this.listService.createList(param).subscribe(result => {
        console.log(result);
      });
    }
  }
}


