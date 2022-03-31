import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { ErrorService } from './error.service';
import { ForageDto, ForageRestService } from '../gen';
import { takeUntil } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ForageService implements OnDestroy {
  destroy = new Subject<void>();

  private foragesSubject = new BehaviorSubject<ForageDto[]>([]);
  forages$ = this.foragesSubject.asObservable();

  private foragesOnLocationSubject = new BehaviorSubject<ForageDto[]>([]);
  foragesOnLocation$ = this.foragesOnLocationSubject.asObservable();

  constructor(private errorService: ErrorService, private forageRestService: ForageRestService) {
    this.reload();
  }

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }

  public async reload(): Promise<boolean> {
    try {
      this.forageRestService
        .getForages()
        .pipe(takeUntil(this.destroy))
        .subscribe((forages) => {
          this.foragesSubject.next(forages);
        });
      this.forageRestService
        .getForagesOnLocation()
        .pipe(takeUntil(this.destroy))
        .subscribe((forages) => {
          this.foragesOnLocationSubject.next(forages);
        });

      return true;
    } catch (e) {
      this.errorService.logAndShowError(e);
      return false;
    }
  }

  public setForagesToLocation(forages: ForageDto[]): void {
    this.forageRestService
      .postForageOnLocation(forages)
      .pipe(takeUntil(this.destroy))
      .subscribe(() => {
        this.reload();
      });
  }
}
