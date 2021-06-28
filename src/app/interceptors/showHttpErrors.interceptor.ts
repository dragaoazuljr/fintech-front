import { HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { forwardRef, Inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ShowHttpErrorsService } from "../shared/services/show-http-errors.service";
import { catchError } from "rxjs/operators"

@Injectable()
export class ShowHttpErrorsInterceptor implements HttpInterceptor {
	constructor(
		private _showHttpErrorsService: ShowHttpErrorsService
	) {}

	intercept(req: HttpRequest<any>, next: HttpHandler): Observable<any> {
		return next.handle(req)
			.pipe(
				catchError(err => {
					this._showHttpErrorsService.validate(err);
					throw new Error(err);
				})
			)
	}
}