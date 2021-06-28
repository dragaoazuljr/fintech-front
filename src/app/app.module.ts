import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ShowHttpErrorsInterceptor } from './interceptors/showHttpErrors.interceptor';
import { SharedModule } from './shared/shared.module';
import { ShowHttpErrorsService } from './shared/services/show-http-errors.service';
import { CustomLoader } from './shared/CustomLoader';
import { NgxMaskModule } from 'ngx-mask';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule,
    BrowserAnimationsModule,
    HttpClientModule,
    SharedModule,
    NgxMaskModule.forRoot(),
    TranslateModule.forRoot({
      defaultLanguage: 'pt-BR',
      loader: {
        provide: TranslateLoader,
        useClass: CustomLoader
      }
    })
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ShowHttpErrorsInterceptor, multi: true },
    { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: {appearance: 'outline'} },
    TranslateService,
    ShowHttpErrorsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
