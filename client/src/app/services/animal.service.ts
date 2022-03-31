import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { ErrorService } from './error.service';
import { AnimalDto, AnimalRestService } from '../gen';
import { takeUntil } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AnimalService implements OnDestroy {
  destroy = new Subject<void>();
  private animalsSubject = new BehaviorSubject<AnimalDto[]>([]);
  animals$ = this.animalsSubject.asObservable();

  constructor(private errorService: ErrorService, private animalRestService: AnimalRestService) {
    this.reload();
  }

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }

  public async reload(): Promise<boolean> {
    try {
      this.animalRestService
        .getAnimals()
        .pipe(takeUntil(this.destroy))
        .subscribe((animals) => {
          this.animalsSubject.next(animals);
        });

      return true;
    } catch (e) {
      this.errorService.logAndShowError(e);
      return false;
    }
  }
}
