import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShellNotificationComponent } from './shell-notification.component';

describe('ShellNotificationComponent', () => {
  let component: ShellNotificationComponent;
  let fixture: ComponentFixture<ShellNotificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShellNotificationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShellNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
