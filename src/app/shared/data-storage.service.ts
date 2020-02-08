import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Film } from '../films/film.model';
import { map } from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class DataStorageService {
	constructor(private http: HttpClient) {}

	getFilms() {
		return this.http.get(
			'http://localhost:8888/getFilms.php'
		);
	}
}