import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StatsTableComponent } from './stats-table.component';
import { getTranslocoModule } from '../../../transloco/transloco-testing.module';

describe('StatsTableComponent', () => {
  let component: StatsTableComponent;
  let fixture: ComponentFixture<StatsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StatsTableComponent],
      imports: [getTranslocoModule(), ReactiveFormsModule, FormsModule],
      providers: [],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StatsTableComponent);
    component = fixture.componentInstance;
    component.config = {
      header: 'Summer 69',
      title: 'animal.statsTitle.GruppenDurchschnitt',
      comment:
        'Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups.',
      columns: 3,
      isEditable: true,
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
