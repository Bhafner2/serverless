import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslocoModule } from '@ngneat/transloco';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { autoSpy } from '../../../util';
import { ModalDialogService } from '../../services';
import { LoadingDialogComponent } from './loading-dialog.component';

describe('LoadingDialogComponent', () => {
  let component: LoadingDialogComponent;
  let fixture: ComponentFixture<LoadingDialogComponent>;
  const modalDialogServiceSpy = autoSpy(ModalDialogService);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoadingDialogComponent],
      imports: [TranslocoModule, FormsModule, CommonModule],
      providers: [{ provide: ModalDialogService, useValue: modalDialogServiceSpy }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadingDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
