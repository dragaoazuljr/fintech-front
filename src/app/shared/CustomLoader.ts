import { TranslateLoader } from "@ngx-translate/core";
import { Observable } from "rxjs";

export class CustomLoader implements TranslateLoader{
	getTranslation(lang: string): Observable<any> {
		return new Observable( observer => {
			fetch(`/assets/i18n/${lang}.json`)
				.then(res => res.json())
				.then(data => {
					observer.next(data);
					observer.complete();
				})
				.catch(err => observer.error(err))
		})
	}
}