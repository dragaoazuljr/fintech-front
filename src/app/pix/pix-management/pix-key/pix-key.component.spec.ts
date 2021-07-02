import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Pix } from '../../interfaces/Pix';

import { PixKeyComponent } from './pix-key.component';

describe('PixKeyComponent', () => {
  let component: PixKeyComponent;
  let fixture: ComponentFixture<PixKeyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PixKeyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PixKeyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show pix key and label', () => {
    const pix: Pix = {
      _id: "1",
      key: "email@mail.com",
      label: "Email",
      user: "1"
    }

    component.pix = pix;
    fixture.detectChanges();

    const nativeElement: HTMLElement = fixture.nativeElement;
    const labelSpan = nativeElement.querySelector('h2.pix-label');
    const keySpan = nativeElement.querySelector('span.pix-key');

    expect(labelSpan?.innerHTML).toBe('Email');
    expect(keySpan?.innerHTML).toBe('email@mail.com');
  })
});
