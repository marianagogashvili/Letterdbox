import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ListService } from '../list.service';
import { faEye } from '@fortawesome/free-regular-svg-icons';
import { faEye as faEye2 } from '@fortawesome/free-solid-svg-icons';

import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { faHeart as faHeart2 } from '@fortawesome/free-solid-svg-icons';

import { faClock } from '@fortawesome/free-regular-svg-icons';
import { faClock as faClock2 } from '@fortawesome/free-solid-svg-icons';
import { faPen } from '@fortawesome/free-solid-svg-icons';

import { DatePipe } from '@angular/common';
import { NgForm } from '@angular/forms';
import { FilmService } from '../../films/film.service';
import { UserService } from '../../user/user.service';
import { FormControl } from '@angular/forms';
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  listId;
  list;
  films;
  comments;
  penIcon = faPen;
  currentUserId = JSON.parse(localStorage.getItem('userData')).id;

  eyeIcon = faEye;
  likeIcon = faHeart;
  likeIcon2 = faHeart2;

  watchlistIcon = faClock;
  watchlistIcon2 = faClock2;

  ownLike;
  numberOfLikes;

  // comment: FormControl = new FormControl();

  constructor(private route: ActivatedRoute,
  			  private listService: ListService,
  			  private router: Router,
  			  private filmService: FilmService,
  			  private userService: UserService,
  			  private datePipe: DatePipe) { }

  ngOnInit() {
  	this.route.params.subscribe(result => {
  		this.listId = +result['id'];
  		this.listService.findList({id: this.listId}).subscribe(list => {
  			console.log("List" + list);
  			if (list === false) {
  				this.router.navigate(['/']);
  			} else  {
  				this.list = list[0];
	  			console.log(list[0]);
	  			this.films = list[1];
	  			console.log(list[1]);
	  			this.setUp();
	  			this.setUpComment();
  			}
  			
  		});
  		// this.listService.getFilms({id: this.listId}).subscribe(films => {
  			
  		// });
  	});

  }

  setUp() {
  	Object.values(this.films).forEach(film => {
        this.filmService.findLike({user_id: this.currentUserId, film_id: film['id']}).subscribe(like => {
          film['liked'] = like;
        });
        this.filmService.findFromWatchlist({user_id: this.currentUserId, film_id: film['id']}).subscribe(watchlist => {
          film['watchlisted'] = watchlist;
        });
        this.filmService.findWatchedFilm({user_id: this.currentUserId, film_id: film['id']}).subscribe(watched => {
          film['watched'] = watched;
        });
      });

  	this.listService.findListLike({user_id: this.currentUserId, list_id: this.listId}).subscribe(result => {
  		console.log(result);
  		if (result[0] === false) {
  			this.ownLike = false;
  		} else {
  			this.ownLike = true;
  		}
  		
  		this.numberOfLikes = +result[1][0];
  	});
  }
  setUpComment() {
  	this.listService.getComments({list_id: this.listId}).subscribe(result => {
  		let end = [];
  		if (result !== null ) {
  			Object.values(result).forEach(r => {
	  			end.unshift(r);
	  		});	
	  		this.comments = end;
	  		console.log(result);
  		}
  		
  	});
  }

  filmToWatched(id, add, title) {
  	let date = (this.datePipe.transform(new Date(), 'yyyy-MM-dd')).toString();
  	if (add === false) {
  		this.filmService.deleteFilmFromWatched({user_id: this.currentUserId, film_id: id, date: date}).subscribe(result => {
	        this.setUp();
	        this.filmService.createActivity(
	            {user_id: this.currentUserId, 
	              film_id: id, 
	              film_title: title, 
	              action: 'deleted from watched film', 
	              date: this.datePipe.transform(new Date(), 'yyyy-MM-dd').toString()}).subscribe(result => {
	            console.log('ACTIVITY', result);
	          });
	    });
  	} else if(add === true) {
  		this.filmService.addFilmToWatched({user_id: this.currentUserId, film_id: id, date: date}).subscribe(result => {
	        this.setUp();
	        this.filmService.createActivity(
	            {user_id: this.currentUserId, 
	              film_id: id, 
	              film_title: title, 
	              action: 'watched', 
	              date: this.datePipe.transform(new Date(), 'yyyy-MM-dd').toString()}).subscribe(result => {
	            console.log('ACTIVITY', result);
	          });
	    });
  	}
  }

  filmToLiked(id, add, title){
    if (add === true) {
      this.filmService.filmToLiked({film_id: id, user_id: this.currentUserId, add: true}).subscribe(result => {
	        this.setUp();
        this.filmService.createActivity(
              {user_id: this.currentUserId, 
                film_id: id, 
                film_title: title, 
                action: 'liked', 
                date: this.datePipe.transform(new Date(), 'yyyy-MM-dd').toString()}).subscribe(result => {
              console.log('ACTIVITY', result);
            });
      });
    } else if (add === false) {
      this.filmService.filmToLiked({film_id: id, user_id: this.currentUserId, add: false}).subscribe(result => {
	        this.setUp(); 
        this.filmService.createActivity(
              {user_id: this.currentUserId, 
                film_id: id, 
                film_title: title, 
                action: 'deleted like from', 
                date: this.datePipe.transform(new Date(), 'yyyy-MM-dd').toString()}).subscribe(result => {
              console.log('ACTIVITY', result);
            });
      });
    }
  }

  filmToWatchlist(id, add, title){
    if (add === true) {
      this.filmService.filmToWatchList({film_id: id, user_id: this.currentUserId, add: true}).subscribe(result => {
	        this.setUp();    
        this.filmService.createActivity(
            {user_id: this.currentUserId, 
              film_id: id, 
              film_title: title, 
              action: 'added to watchlist', 
              date: this.datePipe.transform(new Date(), 'yyyy-MM-dd').toString()}).subscribe(result => {
            console.log('ACTIVITY', result);
          });
      });  
    } else if (add === false) {
      this.filmService.filmToWatchList({film_id: id, user_id: this.currentUserId, add: false}).subscribe(result => {
	        this.setUp();        
        this.filmService.createActivity(
            {user_id: this.currentUserId, 
              film_id: id, 
              film_title: title, 
              action: 'deleted from watchlist', 
              date: this.datePipe.transform(new Date(), 'yyyy-MM-dd').toString()}).subscribe(result => {
            console.log('ACTIVITY', result);
          });
      }); 
    }
  }
  
  toFilm(id){
  	this.router.navigate(['/films', id]);
  }

  likeList() {
  	this.listService.likeList({user_id: this.currentUserId, list_id: this.listId, like: !this.ownLike}).subscribe(result => {
  		console.log(result);
  		this.setUp();
  	});
  }

  saveComment(form: NgForm) {
  	// console.log(this.comment.value);
  	let date = this.datePipe.transform(new Date(), 'yyyy-MM-dd').toString();
  	console.log(form.value.comment);
  	this.listService.addComment({
  		user_id: this.currentUserId, 
  		list_id: this.listId, 
  		description: form.value.comment,
  		date: date
  	}).subscribe(result => {
  		console.log(result);
  		this.setUpComment()
  		form.reset();
  		// this.comment.setValue('');
  	})
  }

  deleteComment(id) {
  	this.listService.deleteComment({id: id}).subscribe(result => {
  		console.log(result);
  		this.setUpComment();
  	});
  }

}
