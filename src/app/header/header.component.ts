import { Component, OnInit, ElementRef, OnDestroy } from '@angular/core';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { trigger, state, group, animate, keyframes, style, transition } from '@angular/animations';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FilmService } from '../films/film.service'; 
import { map, catchError } from 'rxjs/operators';
// import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { FormControl } from '@angular/forms';
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
  lupaIcon = faSearch;
  // currentLink = 'films';

  films = null;
  register = false;
  searchFilm = false;
  loggedInUser = localStorage.getItem('userData');
  // private subscription: Subscription;
  filmSearch: FormControl = new FormControl();
  constructor(private route: ActivatedRoute,
              private router: Router,
              private filmService: FilmService, 
              private elRef: ElementRef,
              private authService: AuthService) { }

  ngOnInit() {
    this.elRef.nativeElement.ownerDocument.body.style.backgroundColor = '#2e3945'
    console.log('search', this.searchFilm);
    console.log('reg', this.register);

  } 

  toggleSearch() {
    this.searchState == 'normal' ? this.searchState = 'sliding' : this.searchState = 'normal';
    if(this.searchText === faSearch) {
  		this.searchText = faTimes;
  	} else {
  		this.searchText = faSearch;
  	}
  }

  onOpenSearch() {
    console.log(this.filmSearch.value);
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

  onLogout() {
    localStorage.removeItem('userData');
    this.router.navigate(['/']);
  }

  onOpenSearchFilm() {
    this.searchFilm = true;
  }

  onCloseSearchFilm() {
    this.searchFilm = false;
  }

  // ngOnDestroy() {
  //   this.subscription.unsubscribe();
  // }
} 
