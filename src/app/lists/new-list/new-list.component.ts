import { Component, OnInit } from '@angular/core';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { faArrowDown } from '@fortawesome/free-solid-svg-icons';

import { FilmService } from '../../films/film.service';
import { NgForm, FormControl } from '@angular/forms'; 
import { BehaviorSubject } from 'rxjs';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // <== add the imports!
import { ListService } from '../list.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-new-list',
  templateUrl: './new-list.component.html',
  styleUrls: ['./new-list.component.css']
})
export class NewListComponent implements OnInit {
  starIcon = faStar;
  crossIcon = faTimes;
  upIcon = faArrowUp;
  downIcon = faArrowDown;
  filmName: FormControl = new FormControl();
  films;
  listFilms = [];
  rankedList = false;
  currentUserId = JSON.parse(localStorage.getItem('userData')).id;
  error;
  // filmSubject = new BehaviorSubject(null);

  constructor(private filmService: FilmService,
              private listService: ListService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
        this.route.params.subscribe(result => { 
          console.log(result['id']);
          if (result['id']) {
            this.filmService.getFilmById({id: result['id']}).subscribe(film => {
              this.addToList(film);
            });
          }
         
          
        });
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
    console.log(film);
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
      if (form.value.ranked === true) {
        Object.values(this.listFilms).forEach((film, i) => {
          films.push({rank: (i+1), id: +film['id']});
        });
      } else {
        Object.values(this.listFilms).forEach((film, i) => {
          films.push({rank: null,id: +film['id']});
        });
      }
      
      let param = {name: form.value.list,
                   desc: form.value.descr,
                   public: form.value.public,
                   ranked: form.value.ranked,
                   user_id: this.currentUserId,
                   films: films}
      console.log(param);
      this.listService.createList(param).subscribe(result => {
        if (result === false) {
          this.error = "List with this name already exists";
          setTimeout(() => {
            this.error = null;
          }, 5000);
        } else {
          this.router.navigate(['/lists/' + result]);
        }

      });
    }
  }

  // thoughts 0
  // mom 1
  // up mom = staticValue
  // thoughts = 1
  // 
  
  up(id) {
    Object.values(this.listFilms).forEach((film, i) => {
      if (film['id'] === id) {
        if (this.listFilms[i-1]) {
          let filmBefore = this.listFilms[i-1];
          this.listFilms[i] = filmBefore;
          this.listFilms[i-1] = film;
        }  
      }
    });
    console.log(this.listFilms);
  }

  down(id) {
    Object.values(this.listFilms).forEach((film, i) => {
      if (film['id'] === id) {
        if (this.listFilms[i+1]) {
          let filmAfter = this.listFilms[i+1];
          this.listFilms[i] = filmAfter;
          this.listFilms[i+1] = film;
        }  
      }
    });
    console.log(this.listFilms);
  }
}


