import { HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

Injectable()
export class AuthenticatorInterceptor implements HttpInterceptor {
	constructor() {}

	intercept(req: HttpRequest<any>, next: HttpHandler): Observable<any> {
		const token = localStorage.getItem('access_token');
		
		const clonedReq = req.clone({
			setHeaders: {
				Authorization: `Bearer ${token}`
			}
		})


		return next.handle(clonedReq)
	}
}