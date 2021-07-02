import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Pix } from '../../interfaces/Pix';

@Component({
  selector: 'fintech-pix-key',
  templateUrl: './pix-key.component.html',
  styleUrls: ['./pix-key.component.scss']
})
export class PixKeyComponent implements OnInit {

  @Input() pix: Pix | undefined;
  @Output() removePixKeyEmitter = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  removePixKey(){
    this.removePixKeyEmitter.emit(true);
  }
}
