import { ComponentFixture, TestBed } from '@angular/core/testing';
import { getTranslocoModule } from '../../../../transloco/transloco-testing.module';
import { LinkButtonCellRenderer, LinkButtonCellComponent } from './link-button-cell.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('LinkButtonCellComponent', () => {
  let component: LinkButtonCellComponent;
  let fixture: ComponentFixture<LinkButtonCellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LinkButtonCellComponent],
      imports: [getTranslocoModule(), RouterTestingModule.withRoutes([])],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LinkButtonCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should setValue', () => {
    const params = {
      link: 'route',
      id: 'id',
      text: 'button-name',
      data: {
        id: 1,
      },
    } as LinkButtonCellRenderer;

    component.agInit(params);
    component.refresh(params);
    component.setValues(params);

    expect(component.link).toBe('route/1');
    expect(component.text).toBe('button-name');
  });
});
