import { Component, OnInit, OnDestroy } from '@angular/core';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FilmService } from '../../films/film.service';
import { NgForm, FormControl } from '@angular/forms'; 
import { BehaviorSubject } from 'rxjs';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // <== add the imports!
import { ListService } from '../list.service';
import { ActivatedRoute } from '@angular/router';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { faArrowDown } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';

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

  listId;
  listName;
  listDescr;
  listPublic;
  rankedList;

  initFilms = [];
  initList;

  sub1; sub2;

  upIcon = faArrowUp;
  downIcon = faArrowDown;

  constructor(private filmService: FilmService,
              private listService: ListService,
              private route: ActivatedRoute,
              private router: Router) { }

    ngOnInit() {
    	
    	this.sub1 = this.route.params.subscribe(params => {
    		let id = +params['id'];
	    	this.listService.findList({id: id}).subscribe(result => {
	    		// console.log(result);
	    		Object.values(result[1]).forEach(film => {
	    			this.initFilms.push(+film['id']);
	    		});
    			if (this.currentUserId !== result[0]['user_id']) {
    				this.router.navigate(["/"]);
	    		}
	    		this.initList = result[0];
	    		
	    		this.listId = result[0]['id'];
	    		this.listName = result[0]['title'];
	    		this.listDescr = result[0]['description'];
				this.listPublic = +result[0]['public'];
				this.rankedList = +result[0]['ranked'];
				this.listFilms = result[1];
	    	});
		});
		this.sub2 = this.filmName.valueChanges.subscribe(title => {
	  		if (title !== '' && (title.split('').length >= 3)) {
		  		this.filmService.findFilms(title).subscribe(result => {
		  			this.films = result;
		  		});
		  	} else {
				this.films = [];
		  	}
	  	});
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
//     console.log("bRUH 1",this.initFilms);
	// console.log("bRUH 2",this.listFilms);
    
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
      let param = {title: form.value.list,
                   description: form.value.descr,
                   public: form.value.public,
                   ranked: form.value.ranked,
                   id: this.listId,
                   films: films}

   //    console.log(this.initList);
   //    console.log(form.value.list);
   //    console.log(this.initList['description'] === form.value.descr);
	  // console.log(+this.initList['public'] === form.value.public);
	  // console.log(+this.initList['ranked'] === form.value.ranked);

	  // console.log("FILMS INIT" + this.initFilms);
	  // console.log("FILMS" + films);
	  // // console.log(JSON.stringify(this.initFilms) === JSON.stringify(films));
	  // // console.log();
	  // 		console.log("BRUHBRUHBRUHBRUHBRUHBRUHBRUHBRUHBRUH");

	  // console.log(((JSON.stringify(this.initFilms) !== JSON.stringify(films)) ||
	  // 			   (form.value.ranked !== +this.initList['ranked'])));

	  if ((this.initList['title'] === form.value.list) && 
	  	  (JSON.stringify(this.initFilms) === JSON.stringify(films)) &&
	  	  (this.initList['description'] === form.value.descr) &&
	  	  (+this.initList['public'] === form.value.public) &&
	  	  (+this.initList['ranked'] === form.value.ranked)) {
	  	this.error = "Sorry, you didn't change anything";
	  } else {
	  	if (JSON.stringify(this.initFilms) === JSON.stringify(films) && 
	  		(form.value.ranked === +this.initList['ranked'])) {
	  		this.listService.updateList({title: form.value.list,
                   description: form.value.descr,
                   public: form.value.public,
                   ranked: form.value.ranked,
                   id: this.listId,
                   films: null}).subscribe(result => {
	       		// console.log(result);
	       		this.router.navigate(['/lists/' + this.listId]);
	     	});
	  	} else if ((JSON.stringify(this.initFilms) !== JSON.stringify(films)) ||
	  			   (form.value.ranked !== +this.initList['ranked'])) {

	  		if (form.value.ranked === 1 || form.value.ranked === true) {

	  			let rankedInitlist = [];
	  			let rankedFilms = [];

	  			Object.values(this.initFilms).forEach((initFilm, i) => {
	  				rankedInitlist.push({id: initFilm, rank: (i+1)});
	  			});
	  			Object.values(films).forEach((film, i) => {
	  				rankedFilms.push({id: film, rank: (i+1)});
	  			});

	  			let toRemove = this.initFilms.filter((el) => {
	  				return films.indexOf(el) < 0;
	  			});
	  			let toAdd = rankedFilms.filter((el) => {
	  				return this.initFilms.indexOf(el['id']) < 0;
	  			});
 
	  		    let toUpdate = [];
	  			Object.values(rankedInitlist).forEach(initFilms => {
	  				Object.values(rankedFilms).forEach(films => {

	  					if (+this.initList['ranked'] === 0) { // все чтобы были null
	  						 // console.log("ВСЕ ТЕПЕРЬ 0");
	  						 if (initFilms['id'] === films['id']){
		  						toUpdate.push(films);
		  					 }
	  					} else if (+this.initList['ranked'] === 1) {
	  						 // console.log("ВСЕ ТЕПЕРЬ 1");
							 if ((initFilms['id'] === films['id']) && (initFilms['rank'] !== films['rank'])){
		  						toUpdate.push(films);
		  					 }
	  					}
	  					
	  				});
	  			});
	  			// console.log("toremove  ");
	  			// console.log(toRemove);

	  			// console.log("Toadd  ");
	  			// console.log(toAdd);

	  			// console.log("ToUpdate ");
	  			// console.log(toUpdate);

	  			this.listService.updateList({title: form.value.list,
                   description: form.value.descr,
                   public: form.value.public,
                   ranked: form.value.ranked,
                   id: this.listId,
                   add: toAdd,
               	   remove: toRemove,
               	   update: toUpdate}).subscribe(result => {
		       		this.initFilms = films;
		       		this.initList['ranked'] = 1;
		       		this.router.navigate(['/lists/' + this.listId]);
		     	});
	  		} else if (form.value.ranked === 0 || form.value.ranked === false) {
	  			let toRemove = this.initFilms.filter((el) => {
	  				return films.indexOf(el) < 0;
	  			});
	  			
	  			let rankedInitlist = [];
	  			let rankedFilms = [];

	  			Object.values(this.initFilms).forEach((initFilm, i) => {
	  				rankedInitlist.push({id: initFilm, rank: null});
	  			});

	  			Object.values(films).forEach((film, i) => {
	  				rankedFilms.push({id: film, rank: null});
	  			});

	  			let toAdd = rankedFilms.filter((el) => {
	  				return this.initFilms.indexOf(el['id']) < 0;
	  			});

	  			let toUpdate = [];

	  			Object.values(rankedInitlist).forEach(initFilms => {
	  				Object.values(rankedFilms).forEach(films => {
	  					if (+this.initList['ranked'] === 1) { // все чтобы имели rank
	  						 if (initFilms['id'] === films['id']){
		  						toUpdate.push(films);
		  					 }	 
	  					} 
	  				});
	  			});

	  	// 		console.log("toremove  ");
	  	// 		console.log(toRemove);
	  	// 		console.log("Toadd  ");
	  	// 		console.log(toAdd);
			 // console.log("toUpdate  ");
	  	// 		console.log(toUpdate);

	  			this.listService.updateList({title: form.value.list,
                   description: form.value.descr,
                   public: form.value.public,
                   ranked: form.value.ranked,
                   id: this.listId,
                   add: toAdd,
               	   remove: toRemove,
               	   update: toUpdate}).subscribe(result => {
		       		this.initFilms = films;
		       		this.initList['ranked'] = 0;
		       		this.router.navigate(['/lists/' + this.listId]);
		     	});
	  		}
	  		
	  	}
	  }
      
    }
  }

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
    // console.log(this.listFilms);
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
    // console.log(this.listFilms);
  }

  ngOnDestroy() {
  	this.sub1.unsubscribe();
  	this.sub2.unsubscribe();
  }
}
