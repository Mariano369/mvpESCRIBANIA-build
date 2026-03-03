import axios from 'axios'
import { combineEpics, Epic } from 'redux-observable'
import { catchError, filter, map, mergeMap, startWith, switchMap } from 'rxjs/operators'
import {
  addedPrefijos,
  addingPrefijos,
  addingPrefijosFailed,
  editedPrefijos,
  editingPrefijos,
  editingPrefijosFailed,
  foundPrefijos,
  loadedPrefijos,
  loadingPrefijos,
  loadingPrefijosFailed,
  PrefijosAction,
  PrefijosActionTypes,
  removedPrefijo,
  removingPrefijo,
  removingPrefijoFailed,
  searchingPrefijos,
  searchingPrefijosFailed,
  softRemovedPrefijos,
  softRemovingPrefijos,
  softRemovingPrefijosFailed,
} from '../actions/prefijosActions'
import buildFormData from './buildFormData'

import { from, of } from 'rxjs'
import { isOfType } from 'typesafe-actions'
import { IState } from '../reducers'

const API_URL = 'http://127.0.0.1:4567'

const searchPrefijosEpic: Epic<PrefijosAction, PrefijosAction, IState> = (action$, state$) =>
  action$.pipe(
    filter(isOfType(PrefijosActionTypes.SEARCH_PREFIJOS)),
    mergeMap((action) => {
      if (typeof action.searchOptions === 'string') {
        action.searchOptions = {
          searchString: action.searchOptions,
          page: 1,
          searchField: '_id',
        }
      }
      let url = `${API_URL}/api/prefijos/search/`
      return from(axios.get(url, { params: action.searchOptions })).pipe(
        map((response) => foundPrefijos(response.data, action.keep)),
        startWith(searchingPrefijos()),
        catchError(() => of(searchingPrefijosFailed()))
      )
    })
  )

const loadPrefijosEpic: Epic<PrefijosAction, PrefijosAction, IState> = (action$, state$) => {
  let responses = []
  return action$.pipe(
    filter(isOfType(PrefijosActionTypes.LOAD_PREFIJOS)),
    switchMap((action) => {
      let url = `${API_URL}/api/prefijos/`
      return from(axios.get(url, { params: action.loadOptions })).pipe(
        map((response) => loadedPrefijos(response.data)),
        startWith(loadingPrefijos()),
        catchError(() => of(loadingPrefijosFailed()))
      )
    })
  )
}

const addPrefijosEpic: Epic<PrefijosAction, PrefijosAction, IState> = (action$, state$) =>
  action$.pipe(
    filter(isOfType(PrefijosActionTypes.ADD_PREFIJOS)),

    mergeMap((action) => {
      const data = new FormData()
      buildFormData(data, action.payload)
      const config = {
        headers: {
          'content-type': 'multipart/form-data',
        },
      }

      return from(axios.post(`${API_URL}/api/prefijos/`, data, config)).pipe(
        map((response) => addedPrefijos(response.data)),
        startWith(addingPrefijos()),
        catchError((err) => of(addingPrefijosFailed(err.response)))
      )
    })
  )

const removePrefijosEpic: Epic<PrefijosAction, PrefijosAction, IState> = (action$, state$) =>
  action$.pipe(
    filter(isOfType(PrefijosActionTypes.REMOVE_PREFIJO)),
    mergeMap((action) =>
      from(axios.delete(`${API_URL}/api/prefijos/${action.payload._id}`)).pipe(
        map((response) => removedPrefijo()),
        startWith(removingPrefijo()),
        catchError(() => of(removingPrefijoFailed()))
      )
    )
  )

const softRemovePrefijosEpic: Epic<PrefijosAction, PrefijosAction, IState> = (action$, state$) =>
  action$.pipe(
    filter(isOfType(PrefijosActionTypes.SOFT_REMOVE_PREFIJOS)),
    mergeMap((action) =>
      from(axios.delete(`${API_URL}/api/prefijos/soft/${action.payload._id}`)).pipe(
        map((response) => softRemovedPrefijos(response.data.record)),
        startWith(softRemovingPrefijos()),
        catchError((err) => of(softRemovingPrefijosFailed(err.response)))
      )
    )
  )

const editPrefijosEpic: Epic<PrefijosAction, PrefijosAction, IState> = (action$, state$) =>
  action$.pipe(
    filter(isOfType(PrefijosActionTypes.EDIT_PREFIJOS)),
    mergeMap((action) => {
      const data = new FormData()
      buildFormData(data, action.payload)
      const config = {
        headers: {
          'content-type': 'multipart/form-data',
        },
      }

      return from(axios.put(`${API_URL}/api/prefijos/${action.payload._id}`, data, config)).pipe(
        map((response) => editedPrefijos(response.data)),
        startWith(editingPrefijos()),
        catchError((err) => of(editingPrefijosFailed(err.response)))
      )
    })
  )

export default combineEpics(searchPrefijosEpic, loadPrefijosEpic, addPrefijosEpic, removePrefijosEpic, softRemovePrefijosEpic, editPrefijosEpic)
