import { HttpErrorResponse } from "@angular/common/http";
import { forwardRef, Inject, Injectable, Injector } from "@angular/core";
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from "@angular/material/snack-bar"
import { TranslateService } from "@ngx-translate/core";

@Injectable()
export class ShowHttpErrorsService {

	_translateService: TranslateService

	constructor(
		private _snackBar: MatSnackBar,
		private injector: Injector
	) {
		this._translateService = injector.get<TranslateService>(TranslateService)
	}

	validate(httpError: HttpErrorResponse) {
		const horizontalPosition: MatSnackBarHorizontalPosition = 'right';
		const verticalPosition: MatSnackBarVerticalPosition = 'top';

		const errorsMessages = this.getErrorMessages(httpError.error)

		errorsMessages.forEach(message => this._snackBar.open(message, "x", {
			horizontalPosition,
			verticalPosition,
			duration: 5000,
			panelClass: 'snack-bar-error'
		}))
	}

	getErrorMessages(error: any): string[] {
		if (!error) return [];

		if(Array.isArray(error.message)) return error.message.map((m: string) => this._translateService.instant(`errors.${this.camelize(m)}`))
		
		return [this._translateService.instant(`errors.${this.camelize(error.message)}`)];
	}

	camelize(str: string) {
		return str.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, function(match: any, index: any) {
			if (+match === 0) return ""; // or if (/\s+/.test(match)) for white spaces
			return index === 0 ? match.toLowerCase() : match.toUpperCase();
		  });
	}
}