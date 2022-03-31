import { APP_BASE_HREF } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { StoreModule } from './store/store.module';
import { routes } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { setupFactory } from './shared/util/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('AppComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes(routes),
        HttpClientTestingModule,
        NoopAnimationsModule,
        FormsModule,
        StoreModule,
      ],
      declarations: [AppComponent],
      providers: [
        {
          provide: APP_BASE_HREF,
          useValue: '/',
        },
        environment.PROVIDERS,
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  const setup = setupFactory.bind(this, AppComponent);

  describe(':', () => {
    it('should create the app', () => {
      const { component } = setup();
      expect(component).toBeTruthy();
    });

    it('should render the sidebar', () => {
      const { fixture } = setup();
      fixture.detectChanges();

      const compiled = fixture.debugElement.nativeElement;
      expect(compiled.textContent).toContain('');
    });
  });
});
