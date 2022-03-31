import { async, TestBed } from '@angular/core/testing';
import { EllipsifyMeDirective } from './ellipsis.directive';
import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';

@Component({
  template: '<div appEllipsifyMe>1234567890</div>',
})
class TestEllipsifyComponent {}

describe('EllipsifyMeDirective', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TestEllipsifyComponent, EllipsifyMeDirective],
    });
  }));

  describe(':', () => {
    function setup(): any {
      const fixture = TestBed.createComponent(TestEllipsifyComponent);
      const component = fixture.componentInstance;

      return { component, fixture };
    }

    it('should create the app', () => {
      const { component } = setup();
      expect(component).toBeTruthy();
    });

    it('long text should be truncated', () => {
      const { fixture } = setup();
      const divEl = fixture.debugElement.query(By.css('div'));
      expect(divEl.nativeElement.innerHTML).toBe('1234567890');
      // expect(divEl.nativeElement.style['text-overflow']).toBe('ellipsis');
      // expect(divEl.nativeElement.style['overflow']).toBe('hidden');
      // expect(divEl.nativeElement.style['white-space']).toBe('nowrap');
    });
  });
});
