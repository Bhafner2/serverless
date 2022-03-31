import { ComponentFixture, TestBed } from '@angular/core/testing';
import { getTranslocoModule } from '../../../../transloco/transloco-testing.module';
import { RouterTestingModule } from '@angular/router/testing';
import { FavouriteCellComponent } from './favourite-cell.component';

describe('FavouriteCellComponent', () => {
  let component: FavouriteCellComponent;
  let fixture: ComponentFixture<FavouriteCellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FavouriteCellComponent],
      imports: [getTranslocoModule(), RouterTestingModule.withRoutes([])],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FavouriteCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should setValue', () => {
    const params = {
      isFavourite: 'isFav',
      data: {
        isFav: true,
      },
    };

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    component.agInit(params);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    component.refresh(params);
    component.setValues(params);

    expect(component.isFavourite).toBe(true);
  });
});
