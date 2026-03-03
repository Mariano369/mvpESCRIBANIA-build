import axios from 'axios'
import { combineEpics, Epic } from 'redux-observable'
import { catchError, filter, map, mergeMap, startWith, switchMap } from 'rxjs/operators'
import {
  addedPaises,
  addingPaises,
  addingPaisesFailed,
  editedPaises,
  editingPaises,
  editingPaisesFailed,
  foundPaises,
  loadedPaises,
  loadingPaises,
  loadingPaisesFailed,
  PaisesAction,
  PaisesActionTypes,
  removedPais,
  removingPais,
  removingPaisFailed,
  searchingPaises,
  searchingPaisesFailed,
  softRemovedPaises,
  softRemovingPaises,
  softRemovingPaisesFailed,
} from '../actions/paisesActions'
import buildFormData from './buildFormData'

import { from, of } from 'rxjs'
import { isOfType } from 'typesafe-actions'
import { IState } from '../reducers'

const API_URL = 'http://127.0.0.1:4567'

const searchPaisesEpic: Epic<PaisesAction, PaisesAction, IState> = (action$, state$) =>
  action$.pipe(
    filter(isOfType(PaisesActionTypes.SEARCH_PAISES)),
    mergeMap((action) => {
      if (typeof action.searchOptions === 'string') {
        action.searchOptions = {
          searchString: action.searchOptions,
          page: 1,
          searchField: '_id',
        }
      }
      let url = `${API_URL}/api/paises/search/`
      return from(axios.get(url, { params: action.searchOptions })).pipe(
        map((response) => foundPaises(response.data, action.keep)),
        startWith(searchingPaises()),
        catchError(() => of(searchingPaisesFailed()))
      )
    })
  )

const loadPaisesEpic: Epic<PaisesAction, PaisesAction, IState> = (action$, state$) => {
  let responses = []
  return action$.pipe(
    filter(isOfType(PaisesActionTypes.LOAD_PAISES)),
    switchMap((action) => {
      let url = `${API_URL}/api/paises/`
      return from(axios.get(url, { params: action.loadOptions })).pipe(
        map((response) => loadedPaises(response.data)),
        startWith(loadingPaises()),
        catchError(() => of(loadingPaisesFailed()))
      )
    })
  )
}

const addPaisesEpic: Epic<PaisesAction, PaisesAction, IState> = (action$, state$) =>
  action$.pipe(
    filter(isOfType(PaisesActionTypes.ADD_PAISES)),

    mergeMap((action) => {
      const data = new FormData()
      buildFormData(data, action.payload)
      const config = {
        headers: {
          'content-type': 'multipart/form-data',
        },
      }

      return from(axios.post(`${API_URL}/api/paises/`, data, config)).pipe(
        map((response) => addedPaises(response.data)),
        startWith(addingPaises()),
        catchError((err) => of(addingPaisesFailed(err.response)))
      )
    })
  )

const removePaisesEpic: Epic<PaisesAction, PaisesAction, IState> = (action$, state$) =>
  action$.pipe(
    filter(isOfType(PaisesActionTypes.REMOVE_PAIS)),
    mergeMap((action) =>
      from(axios.delete(`${API_URL}/api/paises/${action.payload._id}`)).pipe(
        map((response) => removedPais()),
        startWith(removingPais()),
        catchError(() => of(removingPaisFailed()))
      )
    )
  )

const softRemovePaisesEpic: Epic<PaisesAction, PaisesAction, IState> = (action$, state$) =>
  action$.pipe(
    filter(isOfType(PaisesActionTypes.SOFT_REMOVE_PAISES)),
    mergeMap((action) =>
      from(axios.delete(`${API_URL}/api/paises/soft/${action.payload._id}`)).pipe(
        map((response) => softRemovedPaises(response.data.record)),
        startWith(softRemovingPaises()),
        catchError((err) => of(softRemovingPaisesFailed(err.response)))
      )
    )
  )

const editPaisesEpic: Epic<PaisesAction, PaisesAction, IState> = (action$, state$) =>
  action$.pipe(
    filter(isOfType(PaisesActionTypes.EDIT_PAISES)),
    mergeMap((action) => {
      const data = new FormData()
      buildFormData(data, action.payload)
      const config = {
        headers: {
          'content-type': 'multipart/form-data',
        },
      }

      return from(axios.put(`${API_URL}/api/paises/${action.payload._id}`, data, config)).pipe(
        map((response) => editedPaises(response.data)),
        startWith(editingPaises()),
        catchError((err) => of(editingPaisesFailed(err.response)))
      )
    })
  )

export default combineEpics(searchPaisesEpic, loadPaisesEpic, addPaisesEpic, removePaisesEpic, softRemovePaisesEpic, editPaisesEpic)
