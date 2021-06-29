import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable()
export class AuthenticatedGuard implements CanActivate {
	constructor(
		private router: Router
	) {}

	canActivate(
		next: ActivatedRouteSnapshot,
		state: RouterStateSnapshot
	): boolean {
		const token = localStorage.getItem('access_token');

		if (!token) return false;
		
		const helper = new JwtHelperService();
		
		const isExpired = helper.isTokenExpired(token);

		if (!isExpired) this.router.navigate(["/"])

		return isExpired
	}
}