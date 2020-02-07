import { Component, OnInit } from '@angular/core';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { trigger, state, group, animate, keyframes, style, transition } from '@angular/animations';
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

      // transition('normal => sliding', [
      //   animate(600, keyframes([
      //     style({
      //       transform: 'translateX(100px)',
      //       opacity: 0,
      //       offset: 0
      //     }),
      //     style({
      //       transform: 'translateX(50px)',
      //       opacity: 0.5,
      //       offset: 0.3
      //     }),
      //     style({
      //       transform: 'translateX(20px)',
      //       opacity: 1,
      //       offset: 0.8
      //     }),
      //     style({
      //       transform: 'translateX(0px)',
      //       opacity: 1,
      //       offset: 1
      //     })
      //   ]))
      // ]),
      // transition('sliding => normal', [
      //   group([
      //     animate(300, style({
      //       color: 'white'
      //     })),
      //     animate(300, style({
      //       transform: 'translateX(-100px)',
      //       opacity: 0
      //     }))
      //   ])
      // ])
    ])
  ]
})
export class HeaderComponent implements OnInit {
  searchText = faSearch;
  searchState = 'normal';
  constructor() { }

  ngOnInit() {
  }

  toggleSearch() {
    this.searchState == 'normal' ? this.searchState = 'sliding' : this.searchState = 'normal';
    if(this.searchText === faSearch) {
  		this.searchText = faTimes;
  	} else {
  		this.searchText = faSearch;
  	}
  }

} 
