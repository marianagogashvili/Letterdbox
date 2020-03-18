import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-watched-films',
  templateUrl: './watched-films.component.html',
  styleUrls: ['./watched-films.component.css']
})
export class WatchedFilmsComponent implements OnInit {
  watchedFilms;
  currentUserId = JSON.parse(localStorage.getItem('userData')).id;
  constructor(private userService: UserService,
              private router: Router) { }

  ngOnInit() {
  	this.userService.getWatchedFilms({user_id: this.currentUserId}).subscribe(films => {
  		this.watchedFilms = films;
      // console.log(films.length); 
      // this.userService.numberOfFilms.next(films.length);
  	});
  }

  toFilm(id) {
    this.router.navigate(['/films', id], { replaceUrl: true });
  }

}
