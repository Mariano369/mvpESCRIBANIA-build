import axios from 'axios'
import { combineEpics, Epic } from 'redux-observable'
import { catchError, filter, map, mergeMap, startWith, switchMap } from 'rxjs/operators'
import {
  addedSuscriptores,
  addingSuscriptores,
  addingSuscriptoresFailed,
  editedSuscriptores,
  editingSuscriptores,
  editingSuscriptoresFailed,
  foundSuscriptores,
  loadedSuscriptores,
  loadingSuscriptores,
  loadingSuscriptoresFailed,
  removedSuscriptor,
  removingSuscriptor,
  removingSuscriptorFailed,
  searchingSuscriptores,
  searchingSuscriptoresFailed,
  softRemovedSuscriptores,
  softRemovingSuscriptores,
  softRemovingSuscriptoresFailed,
  SuscriptoresAction,
  SuscriptoresActionTypes,
} from '../actions/suscriptoresActions'
import buildFormData from './buildFormData'

import { from, of } from 'rxjs'
import { isOfType } from 'typesafe-actions'
import { IState } from '../reducers'

const API_URL = 'http://127.0.0.1:4567'

const searchSuscriptoresEpic: Epic<SuscriptoresAction, SuscriptoresAction, IState> = (action$, state$) =>
  action$.pipe(
    filter(isOfType(SuscriptoresActionTypes.SEARCH_SUSCRIPTORES)),
    mergeMap((action) => {
      if (typeof action.searchOptions === 'string') {
        action.searchOptions = {
          searchString: action.searchOptions,
          page: 1,
          searchField: '_id',
        }
      }
      let url = `${API_URL}/api/suscriptores/search/`
      return from(axios.get(url, { params: action.searchOptions })).pipe(
        map((response) => foundSuscriptores(response.data, action.keep)),
        startWith(searchingSuscriptores()),
        catchError(() => of(searchingSuscriptoresFailed()))
      )
    })
  )

const loadSuscriptoresEpic: Epic<SuscriptoresAction, SuscriptoresAction, IState> = (action$, state$) => {
  let responses = []
  return action$.pipe(
    filter(isOfType(SuscriptoresActionTypes.LOAD_SUSCRIPTORES)),
    switchMap((action) => {
      let url = `${API_URL}/api/suscriptores/`
      return from(axios.get(url, { params: action.loadOptions })).pipe(
        map((response) => loadedSuscriptores(response.data)),
        startWith(loadingSuscriptores()),
        catchError(() => of(loadingSuscriptoresFailed()))
      )
    })
  )
}

const addSuscriptoresEpic: Epic<SuscriptoresAction, SuscriptoresAction, IState> = (action$, state$) =>
  action$.pipe(
    filter(isOfType(SuscriptoresActionTypes.ADD_SUSCRIPTORES)),

    mergeMap((action) => {
      const data = new FormData()
      buildFormData(data, action.payload)
      const config = {
        headers: {
          'content-type': 'multipart/form-data',
        },
      }

      return from(axios.post(`${API_URL}/api/suscriptores/`, data, config)).pipe(
        map((response) => addedSuscriptores(response.data)),
        startWith(addingSuscriptores()),
        catchError((err) => of(addingSuscriptoresFailed(err.response)))
      )
    })
  )

const removeSuscriptoresEpic: Epic<SuscriptoresAction, SuscriptoresAction, IState> = (action$, state$) =>
  action$.pipe(
    filter(isOfType(SuscriptoresActionTypes.REMOVE_SUSCRIPTOR)),
    mergeMap((action) =>
      from(axios.delete(`${API_URL}/api/suscriptores/${action.payload._id}`)).pipe(
        map((response) => removedSuscriptor()),
        startWith(removingSuscriptor()),
        catchError(() => of(removingSuscriptorFailed()))
      )
    )
  )

const softRemoveSuscriptoresEpic: Epic<SuscriptoresAction, SuscriptoresAction, IState> = (action$, state$) =>
  action$.pipe(
    filter(isOfType(SuscriptoresActionTypes.SOFT_REMOVE_SUSCRIPTORES)),
    mergeMap((action) =>
      from(axios.delete(`${API_URL}/api/suscriptores/soft/${action.payload._id}`)).pipe(
        map((response) => softRemovedSuscriptores(response.data.record)),
        startWith(softRemovingSuscriptores()),
        catchError((err) => of(softRemovingSuscriptoresFailed(err.response)))
      )
    )
  )

const editSuscriptoresEpic: Epic<SuscriptoresAction, SuscriptoresAction, IState> = (action$, state$) =>
  action$.pipe(
    filter(isOfType(SuscriptoresActionTypes.EDIT_SUSCRIPTORES)),
    mergeMap((action) => {
      const data = new FormData()
      buildFormData(data, action.payload)
      const config = {
        headers: {
          'content-type': 'multipart/form-data',
        },
      }

      return from(axios.put(`${API_URL}/api/suscriptores/${action.payload._id}`, data, config)).pipe(
        map((response) => editedSuscriptores(response.data)),
        startWith(editingSuscriptores()),
        catchError((err) => of(editingSuscriptoresFailed(err.response)))
      )
    })
  )

export default combineEpics(
  searchSuscriptoresEpic,
  loadSuscriptoresEpic,
  addSuscriptoresEpic,
  removeSuscriptoresEpic,
  softRemoveSuscriptoresEpic,
  editSuscriptoresEpic
)
