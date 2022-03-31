import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { ErrorService } from './error.service';
import { CompanyBranchCompanyRestService, CompanyBranchDto } from '../gen';
import { takeUntil } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CompanyBranchService implements OnDestroy {
  destroy = new Subject<void>();
  private companyBranchSubject = new BehaviorSubject<CompanyBranchDto>({});
  companyBranch$ = this.companyBranchSubject.asObservable();

  constructor(
    private errorService: ErrorService,
    private companyBranchCompanyRestService: CompanyBranchCompanyRestService
  ) {
    this.reload();
  }

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }
  public async reload(): Promise<boolean> {
    try {
      this.companyBranchCompanyRestService
        .getCompanyBranch()
        .pipe(takeUntil(this.destroy))
        .subscribe((data) => {
          this.companyBranchSubject.next(data);
        });
      return true;
    } catch (e) {
      this.errorService.logAndShowError(e);
      return false;
    }
  }
}
