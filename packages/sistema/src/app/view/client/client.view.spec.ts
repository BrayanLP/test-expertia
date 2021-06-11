import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientView } from './client.view';

describe('ClientView', () => {
  let component: ClientView;
  let fixture: ComponentFixture<ClientView>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientView ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientView);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
