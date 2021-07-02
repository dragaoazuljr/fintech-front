import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PixService } from './pix.service';
import { PixComponent } from './pix.component';
import { PixManagementComponent } from './pix-management/pix-management.component';
import { PixRoutingModule } from './pix-routing.module';
import { MatTableModule } from '@angular/material/table';
import { PixKeyComponent } from './pix-management/pix-key/pix-key.component';
import { CardModule } from '../shared/components/card/card.module';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';


@NgModule({
  declarations: [
    PixComponent,
    PixManagementComponent,
    PixKeyComponent
  ],
  imports: [
    CommonModule,
    PixRoutingModule,
    MatTableModule,
    CardModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule
  ],
  providers: [
    PixService
  ]
})
export class PixModule { }
