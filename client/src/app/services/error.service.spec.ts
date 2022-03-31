import { getTestBed, TestBed } from '@angular/core/testing';
import { ErrorService } from './error.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';

describe('ErrorService', () => {
  let injector: TestBed;
  let errorService: ErrorService;
  let toastrService: ToastrService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, ToastrModule.forRoot()],
      providers: [ToastrService, ErrorService],
    });
    injector = getTestBed();
    toastrService = injector.get(ToastrService);
    errorService = injector.get(ErrorService);
    jest.spyOn(toastrService, 'error');
  });

  it('should call the toastrService to display an error message (unknown)', () => {
    errorService.showError('unknown error');
    expect(toastrService.error).toBeCalledWith('Error: An unknown error happened. Please try again.');
  });

  it('should call the toastrService to display an error message (HttpErrorResponse)', () => {
    errorService.showError(
      new HttpErrorResponse({ error: 'This is just another error', status: 404, url: 'url', statusText: 'statusText' })
    );
    expect(toastrService.error).toBeCalledWith('Error: Http failure response for url: 404 statusText');
  });

  it('should call the toastrService to display an error message (Error)', () => {
    errorService.showError(new Error('error message'));
    expect(toastrService.error).toBeCalledWith('Error: error message');
  });
});
