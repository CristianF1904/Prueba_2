import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CrearJuegoPage } from './crear-juego.page';

describe('CrearJuegoPage', () => {
  let component: CrearJuegoPage;
  let fixture: ComponentFixture<CrearJuegoPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(CrearJuegoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
