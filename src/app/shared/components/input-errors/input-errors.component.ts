import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'fintech-input-errors',
  templateUrl: './input-errors.component.html',
  styleUrls: ['./input-errors.component.scss']
})
export class InputErrorsComponent implements OnInit {

  @Input('control') control = new FormControl();
  listenFormControlChanges$!: Subscription;
  errors: string[] = [];

  constructor(
    private translate: TranslateService
  ) { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
    if(changes.control.isFirstChange()) {
      if (this.control) this.listenForErrors();
    }
  }

  listenForErrors() {
    if (!this.control) return ;

    this.listenFormControlChanges$ = this.control.valueChanges.subscribe(() => this.validateErrors())
  }
  
  validateErrors(): void {
    if (!this.control) return ;
    
    const errors = this.control.errors;

    if (!errors) {
      this.errors = [];
      return;
    };

    this.errors = 
      Object.keys(errors)
        .filter(key => errors[key])
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.listenFormControlChanges$ && this.listenFormControlChanges$.unsubscribe();
  }
}
