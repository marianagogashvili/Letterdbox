import { Injectable } from '@angular/core';
import { Params } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Injectable({providedIn: 'root'})
export class FilmService {

	constructor(private http: HttpClient) {}
	getFilms(param: Params) {
		return this.http.post(
			'http://localhost:8888/getFilms.php', JSON.stringify(param)
		);
	}
	sortBy(param: Params) {
		if (param['year']) {
			return this.http.post(
				'http://localhost:8888/sortFilms.php', JSON.stringify(param)
			);
		} else if (param['rating']) {
			return this.http.post(
				'http://localhost:8888/sortFilms.php', JSON.stringify(param)
			);
		} else if (param['popular']) {
			return this.http.post(
				'http://localhost:8888/sortFilms.php', JSON.stringify(param)
			);
		} else if (param['genre']) {
			return this.http.post(
				'http://localhost:8888/sortFilms.php', JSON.stringify(param)
			);
		} else {
			return this.http.post(
				'http://localhost:8888/getFilms.php', JSON.stringify(param)
			);
		}
	}

	findFilms(param: Params) {
		return this.http.post(
			'http://localhost:8888/findFilms.php', JSON.stringify(param)
		);
	}

	getFilmById(param: Params) {
		return this.http.post(
			'http://localhost:8888/getFilmById.php', JSON.stringify(param)
			);
	}

	addFilmToWatched(param: Params) {
		return this.http.post(
			'http://localhost:8888/addFilmToWatched.php', JSON.stringify(param)
		);
	}

	deleteFilmFromWatched(param: Params) {
		return this.http.post(
			'http://localhost:8888/deleteFilmFromWatched.php', JSON.stringify(param)
		);
	}

	findWatchedFilm(param: Params) {
		return this.http.post(
			'http://localhost:8888/findWatchedFilm.php', JSON.stringify(param)
			);
	}

	updateWatchedFilm(param: Params) {
		return this.http.post(
			'http://localhost:8888/updateWatchedFilm.php', JSON.stringify(param)
			);
	}

	getReview(param: Params) {
		return this.http.post('http://localhost:8888/getReview.php', JSON.stringify(param)
		);
	}

	getAllReviewsOfFilm(param: Params) {
		return this.http.post('http://localhost:8888/getAllReviews.php', JSON.stringify(param)
		);
	}

	addReviewToFilm(param: Params) {
		return this.http.post(
			'http://localhost:8888/addReview.php', JSON.stringify(param)
		);
	}

	updateReviewOfFilm(param: Params) {
		return this.http.post(
			'http://localhost:8888/updateFilmReview.php', JSON.stringify(param)
			);
	}

	filmToLiked(param: Params) {
		return this.http.post(
			'http://localhost:8888/filmToLiked.php', JSON.stringify(param)
		);
	}

	findLike(param: Params) {
		return this.http.post(
			'http://localhost:8888/findLike.php', JSON.stringify(param)
			);
	}

	filmToWatchList(param: Params) {
		return this.http.post(
			'http://localhost:8888/filmToWatchlist.php', JSON.stringify(param)
			);
	}

	findFromWatchlist(param: Params) {
		return this.http.post(
			'http://localhost:8888/findFromWatchlist.php', JSON.stringify(param)
			);
	}

	getFilmRating(param: Params) {
		return this.http.post(
			'http://localhost:8888/getFilmRating.php', JSON.stringify(param)
			);
	}

	createActivity(param: Params) {
		return this.http.post(
			'http://localhost:8888/createActivity.php', JSON.stringify(param)
			);
	}
}