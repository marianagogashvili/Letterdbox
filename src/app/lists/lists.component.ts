import { Component, OnInit } from '@angular/core';
import { ListService } from './list.service';
import { faHeart as faHeart2 } from '@fortawesome/free-solid-svg-icons';
import { faComment } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.css']
})
export class ListsComponent implements OnInit {
  lists;
  likeIcon2 = faHeart2;
  commentIcon = faComment;
  constructor(private listService: ListService) { }

  ngOnInit() {
  	this.listService.getAllLists().subscribe(lists => {
  		// this.lists = lists;
  		// console.log(lists);
  		let finalResult = [];

  		Object.values(lists).forEach(list => {
  			let filmsToDisplay = [];
  			let range = list[1]['length'] < 5 ?  list[1]['length'] : 5; 
  			// console.log('range' + range);
  			for (var i = 0; i < range; i++) {
  				// console.log("nbri");
	  			filmsToDisplay.push(list[1][i]);
	  		}
  			finalResult.push([list[0], filmsToDisplay, list[2], list[3], list[4]]);
  			console.log(finalResult);
  		});

  		this.lists = finalResult;
  		
  	});
  }

}
