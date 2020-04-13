import { Component, OnInit, OnDestroy } from '@angular/core';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FilmService } from '../../films/film.service';
import { NgForm, FormControl } from '@angular/forms'; 
import { BehaviorSubject } from 'rxjs';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // <== add the imports!
import { ListService } from '../list.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-list',
  templateUrl: './edit-list.component.html',
  styleUrls: ['./edit-list.component.css']
})
export class EditListComponent implements OnInit, OnDestroy {
  starIcon = faStar;
  crossIcon = faTimes;
  filmName: FormControl = new FormControl();
  films;
  listFilms = [];
  currentUserId = JSON.parse(localStorage.getItem('userData')).id;
  error;

  listName;
  listDescr;
  listPublic;
  rankedList;

  initFilms = [];
  initList;

  sub1; sub2;

  constructor(private filmService: FilmService,
              private listService: ListService,
              private route: ActivatedRoute) { }

    ngOnInit() {
    	
    	this.sub1 = this.route.params.subscribe(params => {
    		let id = +params['id'];
	    	this.listService.findList({id: id}).subscribe(result => {
	    		// console.log(result);
	    		Object.values(result[1]).forEach(film => {
	    			this.initFilms.push(+film['id']);
	    		});
    			
	    		this.initList = result[0];
	    		
	    		this.listName = result[0]['title'];
	    		this.listDescr = result[0]['description'];
				this.listPublic = result[0]['public'];
				this.rankedList = result[0]['ranked'];
				this.listFilms = result[1];
				// console.log("RESULT !", result[1]);
				// console.log("RESULT !2", this.initFilms);
				// console.log("RESULT !3", this.listFilms);

	    	});
		});
		this.sub2 = this.filmName.valueChanges.subscribe(title => {
	  		if (title !== '' && (title.split('').length >= 3)) {
		  		this.filmService.findFilms(title).subscribe(result => {
		  			this.films = result;
		  			// console.log(result);
		  		});
		  	} else {
				this.films = [];
		  	}
	  	});
		// console.log(this.initFilms);
	}
    // this.filmSubject.subscribe(result => {
    // 	console.log(result);
    // 	if (result !== null) {
    // 		// this.listFilms.push(result);
    // 		this.listFilms = result;
    // 	}
    // });


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
	// console.log("RESULT !2", this.initFilms);
	// console.log("RESULT !3", this.listFilms);

  }

  removeFilm(film) {
	Object.values(this.listFilms).forEach((result, i) => {
			if (result['id'] === film['id']){
				this.listFilms.splice(i, 1);
				// this.filmSubject.next(film);
			} 
  	});
	// console.log("RESULT !2", this.initFilms);
	// console.log("RESULT !3", this.listFilms);

  }

  switchRanked() {
    this.rankedList = !this.rankedList;
  }
  saveList(form: NgForm) {
  	console.log("bRUH 1",this.initFilms);
	console.log("bRUH 2",this.listFilms);
    
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

      console.log(this.initList);
      console.log(form.value.list);
      console.log(this.initList['description'] === form.value.descr);
	  console.log(this.initList['public'] === form.value.public);
	  console.log(this.initList['ranked'] === form.value.ranked);
	  console.log(this.initFilms === films);
	  console.log(this.initFilms);
	  console.log(films);
	  console.log(JSON.stringify(this.initFilms) === JSON.stringify(films));
	  console.log();

	  if ((this.initList['title'] === form.value.list) && 
	  	  (JSON.stringify(this.initFilms) === JSON.stringify(films)) &&
	  	  (this.initList['description'] === form.value.descr) &&
	  	  (this.initList['public'] === form.value.public) &&
	  	  (this.initList['ranked'] === form.value.ranked)) {
	  	this.error = "Sorry, you didn't change anything";
	  } else if((JSON.stringify(this.initFilms) === JSON.stringify(films))) {

	  }
      // this.listService.updateList(param).subscribe(result => {
      //   console.log(result);
      // });
    }
  }

  ngOnDestroy() {
  	this.sub1.unsubscribe();
  	this.sub2.unsubscribe();
  }
}
