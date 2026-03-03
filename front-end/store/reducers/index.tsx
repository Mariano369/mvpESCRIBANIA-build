import { combineReducers } from 'redux'

import datospaisesReducer, { IDatospaisesState, initialDatospaisesState } from './datospaisesReducer'
import paisesReducer, { initialPaisesState, IPaisesState } from './paisesReducer'
import suscriptoresReducer, { initialSuscriptoresState, ISuscriptoresState } from './suscriptoresReducer'

export interface IState {
  suscriptores: ISuscriptoresState
  paises: IPaisesState
  datospaises: IDatospaisesState
}

export const initialState: IState = {
  suscriptores: initialSuscriptoresState,
  paises: initialPaisesState,
  datospaises: initialDatospaisesState,
}

export default combineReducers({
  suscriptores: suscriptoresReducer,
  paises: paisesReducer,
  datospaises: datospaisesReducer,
})
