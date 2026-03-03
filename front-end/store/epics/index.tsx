import { Action } from 'redux'
import { combineEpics, createEpicMiddleware } from 'redux-observable'
import { IState } from '../reducers'
import datospaisesEpics from './datospaisesEpics'
import paisesEpics from './paisesEpics'
import suscriptoresEpics from './suscriptoresEpics'

export const rootEpic = combineEpics(suscriptoresEpics, paisesEpics, datospaisesEpics)

export default createEpicMiddleware<Action, Action, IState>()
