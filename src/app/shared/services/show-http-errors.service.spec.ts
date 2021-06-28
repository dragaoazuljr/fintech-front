import { CommonModule } from "@angular/common";
import { TestBed } from "@angular/core/testing";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { TranslateModule } from "@ngx-translate/core";
import { ShowHttpErrorsService } from "./show-http-errors.service"

describe('ShowHttpErrorService', () => {
	let service: ShowHttpErrorsService;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [
				CommonModule,
				MatSnackBarModule,
				TranslateModule.forRoot({})
			],
			providers: [
				ShowHttpErrorsService
			]
		})

		service = TestBed.inject<ShowHttpErrorsService>(ShowHttpErrorsService);
	})

	it('should be created', () => {
		expect(service).toBeTruthy();
	})
})