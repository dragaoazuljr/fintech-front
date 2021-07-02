import { CommonModule } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { Pix } from '../interfaces/Pix';
import { PixService } from '../pix.service';

import { PixManagementComponent } from './pix-management.component';

describe('PixManagementComponent', () => {
  let component: PixManagementComponent;
  let fixture: ComponentFixture<PixManagementComponent>;
  let pixService: PixService;
  let mockPixKeys: Pix[] = [
    {
      _id: "1",
      key: "key",
      label: "label",
      user: "1"
    }
  ]

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PixManagementComponent ],
      providers: [ PixService ],
      imports: [
        CommonModule,
        MatInputModule,
        ReactiveFormsModule,
        HttpClientTestingModule,
        MatSnackBarModule,
        BrowserAnimationsModule,
        RouterModule.forRoot([])
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PixManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    pixService = TestBed.inject(PixService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load all pix keys', fakeAsync(() => {
    const spy = spyOn(pixService, "getPixKeys")
      .and
      .resolveTo(mockPixKeys);

    component.ngOnInit();
    tick();
    fixture.detectChanges();

    const nativeElement: HTMLElement = fixture.nativeElement;
    const pixListElement = nativeElement.querySelector('div.pix-list');

    expect(pixListElement).toBeTruthy();
    expect(pixListElement?.childElementCount).toBe(1);
  }));
  
  it('should validate label and key fields when creating a new pix key', () => {
    component.ngOnInit();

    component
      .createPixKeyForm
      .patchValue({ key: "", label: "" });

    fixture.detectChanges();
    const nativeElement: HTMLElement = fixture.nativeElement;
    const pixLabelElement = nativeElement.querySelector('.pix-label');
    const pixKeyElement = nativeElement.querySelector('.pix-key');

    expect(pixKeyElement?.classList.contains('ng-invalid')).toBe(true)
    expect(pixLabelElement?.classList.contains('ng-invalid')).toBe(true)
  })
});
