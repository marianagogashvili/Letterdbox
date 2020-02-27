import { Injectable } from '@angular/core';
import { Params } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Injectable({providedIn: 'root'})
export class FilmService {

	constructor(private http: HttpClient) {}
	getFilms() {
		return this.http.get(
			'http://localhost:8888/getFilms.php'
		);
	}
	sortBy(param: Params) {
		if (param.year) {
			return this.http.get(
				'http://localhost:8888/sortFilms.php?year=' + param.year
			);
		} else if (param.rating) {
			return this.http.get(
				'http://localhost:8888/sortFilms.php?rating=' + param.year
			);
		} else if (param.popular) {
			return this.http.get(
				'http://localhost:8888/sortFilms.php?popular=' + param.year
			);
		} else if (param.genre) {
			return this.http.get(
				'http://localhost:8888/sortFilms.php?genre=' + param.year
			);
		} else {
			return this.http.get(
				'http://localhost:8888/getFilms.php'
			);
		}
	}

	findFilms(param: Params) {
		return this.http.post(
			'http://localhost:8888/findFilms.php', JSON.stringify(param)
		);
	}

	addFilmToWatched(param: Params) {
		return this.http.post(
			'http://localhost:8888/addFilmToWatched.php', JSON.stringify(param)
		);
	}
	addReviewToFilm(param: Params) {
		return this.http.post(
			'http://localhost:8888/addReview.php', JSON.stringify(param)
		);
	}
	filmToLiked(param: Params) {
		return this.http.post(
			'http://localhost:8888/filmToLiked.php', JSON.stringify(param)
		);
	}

	findWatchedFilm(param: Params) {
		return this.http.post(
			'http://localhost:8888/findWatchedFilm.php', JSON.stringify(param)
			);
	}
	updateReviewOfFilm(param: Params) {
		return this.http.post(
			'http://localhost:8888/updateFilmReview.php', JSON.stringify(param)
			);
	}
	updateWatchedFilm(param: Params) {
		return this.http.post(
			'http://localhost:8888/updateWatchedFilm.php', JSON.stringify(param)
			);
	}
}