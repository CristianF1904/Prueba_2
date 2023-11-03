import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PublicGamePage } from './public-game.page';

describe('PublicGamePage', () => {
  let component: PublicGamePage;
  let fixture: ComponentFixture<PublicGamePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(PublicGamePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
