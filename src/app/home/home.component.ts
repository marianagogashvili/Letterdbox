import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { DataStorageService } from '../shared/data-storage.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FilmService } from '../films/film.service'; 

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  private subscription: Subscription;
  films;

  constructor(private dataStorageService: DataStorageService,
  		      private route: ActivatedRoute,
              private router: Router,
              private filmService: FilmService, ) { }

  ngOnInit() {
  	this.subscription = this.dataStorageService.getFilms().subscribe(result => {
        this.films = result;
    });

    this.route.queryParams.subscribe(params => {
      this.filmService.sortBy(params).subscribe(result => {
         this.films = result;
         console.log(result);
      });

    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
