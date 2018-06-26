import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadMultiFileComponent } from './read-multi-file.component';

describe('ReadMultiFileComponent', () => {
  let component: ReadMultiFileComponent;
  let fixture: ComponentFixture<ReadMultiFileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReadMultiFileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadMultiFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
