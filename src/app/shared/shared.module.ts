import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ShowHttpErrorsService } from './services/show-http-errors.service';
import { NgxMaskModule } from 'ngx-mask';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatSnackBarModule
  ],
  providers: [],
  exports: []
})
export class SharedModule { }
