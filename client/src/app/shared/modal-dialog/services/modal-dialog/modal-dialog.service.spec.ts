import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { ModalDialogService } from './modal-dialog.service';
import { autoSpy } from '../../../util';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';

describe('ModalDialogService', () => {
  let service: ModalDialogService;
  const modalServiceSpy = autoSpy(NgbModal);
  modalServiceSpy.open = jest.fn().mockReturnValue({ componentInstance: {} });
  const consoleLogMock = jest.spyOn(global.console, 'log').mockImplementation();

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [{ provide: NgbModal, useValue: modalServiceSpy }],
    });
    service = TestBed.inject(ModalDialogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should dismiss modal dialogs when closing the active one', () => {
    service.closeActiveDialog();
    expect(modalServiceSpy.dismissAll).toHaveBeenCalled();
  });

  it('should dismiss modals before showing the new one', () => {
    service.showComponentDialog({});
    expect(modalServiceSpy.dismissAll).toHaveBeenCalled();
  });

  it('should run the confirmation dialog callbacks if defined when actions selected', () => {
    service.showConfirmationDialog(
      { title: 'title', bodyText: 'body' },
      () => {
        console.log('action accept selected');
      },
      () => {
        console.log('action cancel selected');
      }
    );
    service.closeActiveDialogWithActionId('accept');
    expect(consoleLogMock).toHaveBeenCalledWith('action accept selected');

    service.closeActiveDialogWithActionId('cancel');
    expect(consoleLogMock).toHaveBeenCalledWith('action cancel selected');
  });

  it('should run the loading dialog loadingPromise if defined', fakeAsync(() => {
    service.showLoadingDialog<string>({ title: 'title', bodyText: 'body' }, of('Test').toPromise());
    tick();
    expect(modalServiceSpy.dismissAll).toHaveBeenCalledTimes(2);
  }));

  it('should not dismiss dialog after display if no loadingPromise is defined', fakeAsync(() => {
    service.showLoadingDialog({ title: 'title', bodyText: 'body' });
    tick();
    expect(modalServiceSpy.dismissAll).toHaveBeenCalledTimes(1);
  }));

  it('should run the table dialog callbacks if defined when actions selected', () => {
    service.showTableDialog(
      { title: 'title', tableInfo: { columnDefs: [], data: [] } },
      () => {
        console.log('action accept selected');
      },
      () => {
        console.log('action cancel selected');
      }
    );
    service.closeActiveDialogWithActionId('accept');
    expect(consoleLogMock).toHaveBeenCalledWith('action accept selected');

    service.closeActiveDialogWithActionId('cancel');
    expect(consoleLogMock).toHaveBeenCalledWith('action cancel selected');
  });
});
