import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { SetExample } from './default.actions';

export interface DefaultStateModel {
  example?: any;
}

@State<DefaultStateModel>({
  name: 'default',
  defaults: {
    example: {},
  },
})
@Injectable()
export class DefaultState {
  /**
   * Selectors
   */
  @Selector()
  static example(state: DefaultStateModel): DefaultStateModel {
    return state.example;
  }

  /**
   * Commands
   */
  @Action(SetExample)
  setCustomer({ getState, patchState }: StateContext<DefaultStateModel>, { payload }: SetExample) {
    patchState({
      example: payload,
    });
  }
}
