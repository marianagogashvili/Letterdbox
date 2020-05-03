import { Injectable } from '@angular/core';
import { Params } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({providedIn: 'root'})
export class UserService {
  	numberOfFilms = new Subject();

	constructor(private http: HttpClient) {}

 	getWatchedFilms(param: Params) {
 		return this.http.post(
 			'http://localhost:8888/getAllFilmsWatchedByUser.php',
 		 	JSON.stringify(param)
 		);
 	}

 	findUserById(param: Params) {
 		return this.http.post(
 			'http://localhost:8888/findUserById.php',
 		 	JSON.stringify(param)
 		);
 	}

 	deleteReview(param: Params) {
 		return this.http.post(
			'http://localhost:8888/deleteReview.php', JSON.stringify(param)
			);
 	}

 	getUserActivity(param: Params) {
		return this.http.post(
			'http://localhost:8888/getUserActivity.php', JSON.stringify(param)
			);
	}

	getShortUserActivity(param: Params) {
		return this.http.post(
			'http://localhost:8888/getShortUserActivity.php', JSON.stringify(param)
			);
	}

	clearActivity(param: Params) {
		return this.http.post(
			'http://localhost:8888/clearActivity.php', JSON.stringify(param)
			);
	}

	getUserReviews(param: Params) {
		return this.http.post(
			'http://localhost:8888/getUserReviews.php', JSON.stringify(param)
			);
	}

	getWatchlist(param: Params) {
		return this.http.post(
			'http://localhost:8888/getWatchlist.php', JSON.stringify(param)
			);
	}


	getUserLikes(param: Params) {
		return this.http.post(
			'http://localhost:8888/getUserLikes.php', JSON.stringify(param)
			);
	}

	getUserLists(param: Params) {
		return this.http.post(
			'http://localhost:8888/getUserLists.php', JSON.stringify(param)
			);
	}
}