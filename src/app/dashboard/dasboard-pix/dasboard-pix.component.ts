import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Pix } from 'src/app/pix/interfaces/Pix';
import { PixService } from 'src/app/pix/pix.service';

@Component({
  selector: 'fintech-dasboard-pix',
  templateUrl: './dasboard-pix.component.html',
  styleUrls: ['./dasboard-pix.component.scss']
})
export class DasboardPixComponent implements OnInit {
  pixKeys: Pix[] | undefined;
  search = new FormControl();
  searchSubcription: Subscription | undefined;

  constructor(
    private _pixService: PixService
  ) { }

  ngOnInit(): void {
    this.loadPixKeys();
    this.listenSearchChange()
  }

  listenSearchChange() {
    this.searchSubcription = this.search.valueChanges.subscribe(async key => {
      const keys = await this._pixService.searchPixKeys(key);

      this.sliceKeys(keys)
    })
  }

  async loadPixKeys() {
    const pixKeys = await this._pixService.getPixKeys();

    this.sliceKeys(pixKeys)
  }

  sliceKeys(keys: Pix[]){
    this.pixKeys = keys.slice(0, 5);
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.searchSubcription?.unsubscribe();
  }
}
