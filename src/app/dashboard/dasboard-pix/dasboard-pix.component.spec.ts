import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PixService } from 'src/app/pix/pix.service';
import { CardModule } from 'src/app/shared/components/card/card.module';

import { DasboardPixComponent } from './dasboard-pix.component';

describe('DasboardPixComponent', () => {
  let component: DasboardPixComponent;
  let fixture: ComponentFixture<DasboardPixComponent>;
  let pixService: PixService;
  const mockPixKeys = [
    { _id: "1", key: "key", label: "email", user: "1" },
    { _id: "1", key: "key", label: "label", user: "1" },
    { _id: "1", key: "key", label: "email", user: "1" },
    { _id: "1", key: "user@a.com", label: "email", user: "1" },
    { _id: "1", key: "key", label: "email", user: "1" },
    { _id: "1", key: "key", label: "email", user: "1" },
    { _id: "1", key: "key", label: "email", user: "1" },
  ]

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DasboardPixComponent ],
      imports: [ 
        HttpClientTestingModule,
        CardModule,
        MatInputModule,
        MatButtonModule,
        BrowserAnimationsModule
      ],
      providers: [ PixService ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DasboardPixComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    pixService = TestBed.inject(PixService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load 5 pix keys', fakeAsync(() => {
    const spy = spyOn(pixService, "getPixKeys")
      .and
      .resolveTo(mockPixKeys);

    component.ngOnInit();
    tick();
    fixture.detectChanges();

    const nativeElement: HTMLElement = fixture.nativeElement;
    const pixListElement = nativeElement.querySelector('div.pix-list');

    expect(pixListElement).toBeTruthy();
    expect(pixListElement?.childElementCount).toBe(5);
  }));

  it('should show pix key and label', fakeAsync(() => {
    const spy = spyOn(pixService, "getPixKeys")
      .and
      .resolveTo([ mockPixKeys[0] ])

    component.ngOnInit();
    tick();
    fixture.detectChanges();

    const nativeElement = fixture.nativeElement;
    const pixLabelEleement = nativeElement.querySelector('span.pix-label');
    const pixKeyEleement = nativeElement.querySelector('span.pix-key');

    expect(pixLabelEleement?.innerHTML).toBe('email');
    expect(pixKeyEleement?.innerHTML).toBe('key');
  }))
});
