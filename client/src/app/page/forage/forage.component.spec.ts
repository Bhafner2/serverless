import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { RouterTestingModule } from '@angular/router/testing';
import { RouterModule } from '@angular/router';
import { ForageComponent } from './forage.component';
import { getTranslocoModule } from '../../shared/transloco/transloco-testing.module';

describe('ForageComponent', () => {
  let component: ForageComponent;
  let fixture: ComponentFixture<ForageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ForageComponent],
      imports: [getTranslocoModule(), SharedModule, RouterTestingModule.withRoutes([]), RouterModule],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ForageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
