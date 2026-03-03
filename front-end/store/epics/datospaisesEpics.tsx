import axios from 'axios'
import { combineEpics, Epic } from 'redux-observable'
import { catchError, filter, map, mergeMap, startWith, switchMap } from 'rxjs/operators'
import {
  addedDatospaises,
  addingDatospaises,
  addingDatospaisesFailed,
  DatospaisesAction,
  DatospaisesActionTypes,
  editedDatospaises,
  editingDatospaises,
  editingDatospaisesFailed,
  foundDatospaises,
  loadedDatospaises,
  loadingDatospaises,
  loadingDatospaisesFailed,
  removedDatopais,
  removingDatopais,
  removingDatopaisFailed,
  searchingDatospaises,
  searchingDatospaisesFailed,
  softRemovedDatospaises,
  softRemovingDatospaises,
  softRemovingDatospaisesFailed,
} from '../actions/datospaisesActions'
import buildFormData from './buildFormData'

import { from, of } from 'rxjs'
import { isOfType } from 'typesafe-actions'
import { IState } from '../reducers'

const API_URL = 'http://127.0.0.1:4567'

const searchDatospaisesEpic: Epic<DatospaisesAction, DatospaisesAction, IState> = (action$, state$) =>
  action$.pipe(
    filter(isOfType(DatospaisesActionTypes.SEARCH_DATOSPAISES)),
    mergeMap((action) => {
      if (typeof action.searchOptions === 'string') {
        action.searchOptions = {
          searchString: action.searchOptions,
          page: 1,
          searchField: '_id',
        }
      }
      let url = `${API_URL}/api/datospaises/search/`
      return from(axios.get(url, { params: action.searchOptions })).pipe(
        map((response) => foundDatospaises(response.data, action.keep)),
        startWith(searchingDatospaises()),
        catchError(() => of(searchingDatospaisesFailed()))
      )
    })
  )

const loadDatospaisesEpic: Epic<DatospaisesAction, DatospaisesAction, IState> = (action$, state$) => {
  let responses = []
  return action$.pipe(
    filter(isOfType(DatospaisesActionTypes.LOAD_DATOSPAISES)),
    switchMap((action) => {
      let url = `${API_URL}/api/datospaises/`
      return from(axios.get(url, { params: action.loadOptions })).pipe(
        map((response) => loadedDatospaises(response.data)),
        startWith(loadingDatospaises()),
        catchError(() => of(loadingDatospaisesFailed()))
      )
    })
  )
}

const addDatospaisesEpic: Epic<DatospaisesAction, DatospaisesAction, IState> = (action$, state$) =>
  action$.pipe(
    filter(isOfType(DatospaisesActionTypes.ADD_DATOSPAISES)),

    mergeMap((action) => {
      const data = new FormData()
      buildFormData(data, action.payload)
      const config = {
        headers: {
          'content-type': 'multipart/form-data',
        },
      }

      return from(axios.post(`${API_URL}/api/datospaises/`, data, config)).pipe(
        map((response) => addedDatospaises(response.data)),
        startWith(addingDatospaises()),
        catchError((err) => of(addingDatospaisesFailed(err.response)))
      )
    })
  )

const removeDatospaisesEpic: Epic<DatospaisesAction, DatospaisesAction, IState> = (action$, state$) =>
  action$.pipe(
    filter(isOfType(DatospaisesActionTypes.REMOVE_DATOPAIS)),
    mergeMap((action) =>
      from(axios.delete(`${API_URL}/api/datospaises/${action.payload._id}`)).pipe(
        map((response) => removedDatopais()),
        startWith(removingDatopais()),
        catchError(() => of(removingDatopaisFailed()))
      )
    )
  )

const softRemoveDatospaisesEpic: Epic<DatospaisesAction, DatospaisesAction, IState> = (action$, state$) =>
  action$.pipe(
    filter(isOfType(DatospaisesActionTypes.SOFT_REMOVE_DATOSPAISES)),
    mergeMap((action) =>
      from(axios.delete(`${API_URL}/api/datospaises/soft/${action.payload._id}`)).pipe(
        map((response) => softRemovedDatospaises(response.data.record)),
        startWith(softRemovingDatospaises()),
        catchError((err) => of(softRemovingDatospaisesFailed(err.response)))
      )
    )
  )

const editDatospaisesEpic: Epic<DatospaisesAction, DatospaisesAction, IState> = (action$, state$) =>
  action$.pipe(
    filter(isOfType(DatospaisesActionTypes.EDIT_DATOSPAISES)),
    mergeMap((action) => {
      const data = new FormData()
      buildFormData(data, action.payload)
      const config = {
        headers: {
          'content-type': 'multipart/form-data',
        },
      }

      return from(axios.put(`${API_URL}/api/datospaises/${action.payload._id}`, data, config)).pipe(
        map((response) => editedDatospaises(response.data)),
        startWith(editingDatospaises()),
        catchError((err) => of(editingDatospaisesFailed(err.response)))
      )
    })
  )

export default combineEpics(
  searchDatospaisesEpic,
  loadDatospaisesEpic,
  addDatospaisesEpic,
  removeDatospaisesEpic,
  softRemoveDatospaisesEpic,
  editDatospaisesEpic
)
