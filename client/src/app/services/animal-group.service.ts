import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { ErrorService } from './error.service';
import { AnimalGroupDto, AnimalGroupRestService } from '../gen';
import { AnimalService } from './animal.service';
import { takeUntil } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AnimalGroupService implements OnDestroy {
  destroy = new Subject<void>();
  activeAnimalGroupId: number;

  private animalGroupsSubject = new BehaviorSubject<AnimalGroupDto[]>([]);
  animalGroups$ = this.animalGroupsSubject.asObservable();

  private activeAnimalGroupSubject = new BehaviorSubject<AnimalGroupDto>({});
  activeAnimalGroup$ = this.activeAnimalGroupSubject.asObservable();

  constructor(
    private errorService: ErrorService,
    private animalGroupRestService: AnimalGroupRestService,
    private animalService: AnimalService
  ) {
    this.reload();
  }

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }
  public async reload(): Promise<boolean> {
    try {
      this.animalGroupRestService
        .getAnimalGroups()
        .pipe(takeUntil(this.destroy))
        .subscribe((animalGroups) => {
          this.animalGroupsSubject.next(animalGroups);
          this.setActiveAnimalGroup();
        });

      return true;
    } catch (e) {
      this.errorService.logAndShowError(e);
      return false;
    }
  }

  public setActiveAnimalGroupId(activeAnimalGroupId: number): void {
    this.activeAnimalGroupId = activeAnimalGroupId;
    this.setActiveAnimalGroup();
  }

  private setActiveAnimalGroup(): void {
    let activeAnimalGroup;

    if (this.activeAnimalGroupId) {
      this.animalGroupsSubject.value.find((animalGroup) => {
        if (animalGroup.id === this.activeAnimalGroupId) {
          activeAnimalGroup = animalGroup;
        }
      });
    }
    if (activeAnimalGroup) {
      this.activeAnimalGroupSubject.next(activeAnimalGroup);
    } else {
      this.activeAnimalGroupSubject.next({});
    }
  }

  public save(animalGroup: AnimalGroupDto): void {
    this.animalGroupRestService
      .postAnimalGroupsWithId(animalGroup?.id, animalGroup)
      .pipe(takeUntil(this.destroy))
      .subscribe((answer) => {
        this.activeAnimalGroupSubject.next(answer);
        this.reload();
        this.animalService.reload();
      });
  }
}
