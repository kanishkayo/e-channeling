import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardDoctorComponent } from './board-doctor.component';

describe('BoardDoctorComponent', () => {
  let component: BoardDoctorComponent;
  let fixture: ComponentFixture<BoardDoctorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BoardDoctorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BoardDoctorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
