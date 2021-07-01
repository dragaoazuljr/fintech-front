import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DasboardPixComponent } from './dasboard-pix.component';

describe('DasboardPixComponent', () => {
  let component: DasboardPixComponent;
  let fixture: ComponentFixture<DasboardPixComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DasboardPixComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DasboardPixComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load 5 pix keys', () => {
    
  })
});
