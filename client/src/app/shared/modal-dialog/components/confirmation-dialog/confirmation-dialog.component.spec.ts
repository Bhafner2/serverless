import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { By } from '@angular/platform-browser';
import { ConfirmationDialogComponent } from './confirmation-dialog.component';
import { autoSpy } from '../../../util';
import { ModalDialogService } from '../../services';
import { getTranslocoModule } from '../../../transloco/transloco-testing.module';

describe('ConfirmationDialogComponent', () => {
  let component: ConfirmationDialogComponent;
  let fixture: ComponentFixture<ConfirmationDialogComponent>;
  const modalDialogServiceSpy = autoSpy(ModalDialogService);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConfirmationDialogComponent],
      imports: [getTranslocoModule(), FormsModule, CommonModule],
      providers: [{ provide: ModalDialogService, useValue: modalDialogServiceSpy }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should trigger closeDialog when X clicked', () => {
    jest.spyOn(component, 'closeDialog');
    const closeIcon = fixture.debugElement.query(By.css('.app-modal-dialog__modal-header .close')).nativeElement;
    closeIcon.click();
    fixture.detectChanges();
    expect(component.closeDialog).toHaveBeenCalled();
  });

  it('should call service with right actionId when button clicked', () => {
    const acceptButton = fixture.debugElement.query(
      By.css('.app-modal-dialog__modal-footer .btn-primary')
    ).nativeElement;
    acceptButton.click();
    fixture.detectChanges();
    expect(modalDialogServiceSpy.closeActiveDialogWithActionId).toHaveBeenCalledWith('accept');

    const cancelButton = fixture.debugElement.query(
      By.css('.app-modal-dialog__modal-footer .btn-secondary')
    ).nativeElement;
    cancelButton.click();
    fixture.detectChanges();
    expect(modalDialogServiceSpy.closeActiveDialogWithActionId).toHaveBeenCalledWith('cancel');
  });
});
