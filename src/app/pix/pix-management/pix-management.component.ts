import { HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { Pix } from '../interfaces/Pix';
import { PixService } from '../pix.service';

@Component({
  selector: 'fintech-pix-management',
  templateUrl: './pix-management.component.html',
  styleUrls: ['./pix-management.component.scss']
})
export class PixManagementComponent implements OnInit {
  pixKeys: Pix[] | undefined;

  createPixKeyForm = new FormGroup ({
    label: new FormControl(null, [Validators.required]),
    key: new FormControl(null, [Validators.required])
  });

  constructor(
    private _pixService: PixService,
    private _matSnack: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.loadPixKeys();
  }

  async loadPixKeys() {
    this.pixKeys = await this._pixService.getPixKeys();
  }

  async removePix(pix: Pix) {
    const removed =  await this._pixService.deletePix(pix.key);

    if(removed.type === HttpEventType.Response && removed.ok) this.showDeletedMessage();
  }

  showDeletedMessage() {
    const options: MatSnackBarConfig = {
      duration: 5000,
      panelClass: 'snack-bar-success',
      verticalPosition: 'top',
      horizontalPosition: 'right'
    }
    this._matSnack.open("Chave pix removida com sucesso!");

    this.loadPixKeys();
  }

  async createKey() {
    const createKeyData = this.createPixKeyForm.value;

    const created = await this._pixService.createPixKey(createKeyData);

    if(created) this.showCreatedMessage()
  }

  showCreatedMessage() {
    const options: MatSnackBarConfig = { 
      panelClass: 'snack-bar-success',
      duration: 5000,
      horizontalPosition: 'right',
      verticalPosition: 'top'
    };

    this._matSnack.open("Chave cadastrada com sucesso!", "x", options)

    this.loadPixKeys();
  }
}
