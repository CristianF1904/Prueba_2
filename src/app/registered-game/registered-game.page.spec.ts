import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegisteredGamePage } from './registered-game.page';

describe('RegisteredGamePage', () => {
  let component: RegisteredGamePage;
  let fixture: ComponentFixture<RegisteredGamePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(RegisteredGamePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
