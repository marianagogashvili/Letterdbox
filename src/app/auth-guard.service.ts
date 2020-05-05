import { ActivatedRouteSnapshot, Router, CanActivate, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';
@Injectable()
export class AuthGuard implements CanActivate {
	constructor(private router: Router) {}

	canActivate(route: ActivatedRouteSnapshot,
				state: RouterStateSnapshot): Observable<boolean> |
											Promise<boolean> |
											boolean {
		let user = localStorage.getItem('userData');
		if (user) {
			return true;
		 }  else if (user === null) {
		 	console.log('i;m up');
		 	this.router.navigate(['/']);
		 }
	}
}