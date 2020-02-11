import { Component, OnInit, ElementRef } from '@angular/core';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { trigger, state, group, animate, keyframes, style, transition } from '@angular/animations';
import { DataStorageService } from '../shared/data-storage.service';
import { ActivatedRoute, Params } from '@angular/router';
import { FilmService } from '../films/film.service'; 
import { map, catchError } from 'rxjs/operators';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  animations: [
    trigger('search', [
      state('normal', style({
        opacity: 0,
        transform: 'translateX(100px)'
      })),
      state('sliding', style({
        opacity: 1,
        transform: 'translateX(0px)'
      })),
      transition('normal => sliding', animate(600)),
      transition('sliding => normal', animate(400)),
     ])

  ]
})
export class HeaderComponent implements OnInit {
  searchText = faSearch;
  searchState = 'normal';

  films = null;
  param;
  register = false;
  loggedInUser = localStorage.getItem('userData');

  constructor(private dataStorageService: DataStorageService,
              private route: ActivatedRoute,
              private filmService: FilmService, 
              private elRef: ElementRef) { }

  ngOnInit() {
    this.elRef.nativeElement.ownerDocument.body.style.backgroundColor = '#2e3945'
    this.dataStorageService.getFilms().subscribe(result => {
          this.films = result;
      });

    // if (this.route.queryParams.observers.length !== 0) {
      this.route.queryParams.subscribe(params => {
        this.param = params;
        this.filmService.sortBy(params).subscribe(result => {
           this.films = result;
           console.log(result);
        });

      });
    // }

  } 

  toggleSearch() {
    this.searchState == 'normal' ? this.searchState = 'sliding' : this.searchState = 'normal';
    if(this.searchText === faSearch) {
  		this.searchText = faTimes;
  	} else {
  		this.searchText = faSearch;
  	}
  }

  onSelect(result) {
    console.log(result);
  }

  onOpenRegister() {
    this.register = true;
  }

  onCloseRegister() {
    this.register = false;
  }

} 
