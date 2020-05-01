import { Injectable } from '@angular/core';
import { Params } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Injectable({providedIn: 'root'})
export class ListService {
	constructor(private http: HttpClient) {}

	getAllLists() {
		return this.http.get('http://localhost:8888/getAllLists.php');		
	}

	createList(param: Params){
		return this.http.post('http://localhost:8888/createList.php', JSON.stringify(param));
	}

	findList(param: Params) {
		return this.http.post('http://localhost:8888/findListById.php', JSON.stringify(param));		
	}

	updateList(param: Params) {
		return this.http.post('http://localhost:8888/updateList.php', JSON.stringify(param));		
	}

	likeList(param: Params) {
		return this.http.post('http://localhost:8888/likeList.php', JSON.stringify(param));		
	}

	findListLike(param: Params) {
		return this.http.post('http://localhost:8888/findListLike.php', JSON.stringify(param));		
	}
 	
 	addComment(param: Params) {
		return this.http.post('http://localhost:8888/addComment.php', JSON.stringify(param));		
	}
	
	getComments(param: Params) {
		return this.http.post('http://localhost:8888/getCommentsFromList.php', JSON.stringify(param));		
	}

	deleteComment(param: Params) {
		return this.http.post('http://localhost:8888/deleteComment.php', JSON.stringify(param));		
	}
	// getFilms(param: Params) {
	// 	return this.http.post('http://localhost:8888/getFilmsFromList.php', JSON.stringify(param));		
	// }
}