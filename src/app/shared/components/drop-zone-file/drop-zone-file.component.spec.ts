import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DropZoneFileComponent } from './drop-zone-file.component';

describe('DropZoneFileComponent', () => {
  let component: DropZoneFileComponent;
  let fixture: ComponentFixture<DropZoneFileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DropZoneFileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DropZoneFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
