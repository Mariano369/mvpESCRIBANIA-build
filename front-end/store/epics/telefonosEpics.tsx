import axios from 'axios'
import { combineEpics, Epic } from 'redux-observable'
import { catchError, filter, map, mergeMap, startWith, switchMap } from 'rxjs/operators'
import {
  addedTelefonos,
  addingTelefonos,
  addingTelefonosFailed,
  editedTelefonos,
  editingTelefonos,
  editingTelefonosFailed,
  foundTelefonos,
  loadedTelefonos,
  loadingTelefonos,
  loadingTelefonosFailed,
  removedTelefono,
  removingTelefono,
  removingTelefonoFailed,
  searchingTelefonos,
  searchingTelefonosFailed,
  softRemovedTelefonos,
  softRemovingTelefonos,
  softRemovingTelefonosFailed,
  TelefonosAction,
  TelefonosActionTypes,
} from '../actions/telefonosActions'
import buildFormData from './buildFormData'

import { from, of } from 'rxjs'
import { isOfType } from 'typesafe-actions'
import { IState } from '../reducers'

const API_URL = 'http://127.0.0.1:4567'

const searchTelefonosEpic: Epic<TelefonosAction, TelefonosAction, IState> = (action$, state$) =>
  action$.pipe(
    filter(isOfType(TelefonosActionTypes.SEARCH_TELEFONOS)),
    mergeMap((action) => {
      if (typeof action.searchOptions === 'string') {
        action.searchOptions = {
          searchString: action.searchOptions,
          page: 1,
          searchField: '_id',
        }
      }
      let url = `${API_URL}/api/telefonos/search/`
      return from(axios.get(url, { params: action.searchOptions })).pipe(
        map((response) => foundTelefonos(response.data, action.keep)),
        startWith(searchingTelefonos()),
        catchError(() => of(searchingTelefonosFailed()))
      )
    })
  )

const loadTelefonosEpic: Epic<TelefonosAction, TelefonosAction, IState> = (action$, state$) => {
  let responses = []
  return action$.pipe(
    filter(isOfType(TelefonosActionTypes.LOAD_TELEFONOS)),
    switchMap((action) => {
      let url = `${API_URL}/api/telefonos/`
      return from(axios.get(url, { params: action.loadOptions })).pipe(
        map((response) => loadedTelefonos(response.data)),
        startWith(loadingTelefonos()),
        catchError(() => of(loadingTelefonosFailed()))
      )
    })
  )
}

const addTelefonosEpic: Epic<TelefonosAction, TelefonosAction, IState> = (action$, state$) =>
  action$.pipe(
    filter(isOfType(TelefonosActionTypes.ADD_TELEFONOS)),

    mergeMap((action) => {
      const data = new FormData()
      buildFormData(data, action.payload)
      const config = {
        headers: {
          'content-type': 'multipart/form-data',
        },
      }

      return from(axios.post(`${API_URL}/api/telefonos/`, data, config)).pipe(
        map((response) => addedTelefonos(response.data)),
        startWith(addingTelefonos()),
        catchError((err) => of(addingTelefonosFailed(err.response)))
      )
    })
  )

const removeTelefonosEpic: Epic<TelefonosAction, TelefonosAction, IState> = (action$, state$) =>
  action$.pipe(
    filter(isOfType(TelefonosActionTypes.REMOVE_TELEFONO)),
    mergeMap((action) =>
      from(axios.delete(`${API_URL}/api/telefonos/${action.payload._id}`)).pipe(
        map((response) => removedTelefono()),
        startWith(removingTelefono()),
        catchError(() => of(removingTelefonoFailed()))
      )
    )
  )

const softRemoveTelefonosEpic: Epic<TelefonosAction, TelefonosAction, IState> = (action$, state$) =>
  action$.pipe(
    filter(isOfType(TelefonosActionTypes.SOFT_REMOVE_TELEFONOS)),
    mergeMap((action) =>
      from(axios.delete(`${API_URL}/api/telefonos/soft/${action.payload._id}`)).pipe(
        map((response) => softRemovedTelefonos(response.data.record)),
        startWith(softRemovingTelefonos()),
        catchError((err) => of(softRemovingTelefonosFailed(err.response)))
      )
    )
  )

const editTelefonosEpic: Epic<TelefonosAction, TelefonosAction, IState> = (action$, state$) =>
  action$.pipe(
    filter(isOfType(TelefonosActionTypes.EDIT_TELEFONOS)),
    mergeMap((action) => {
      const data = new FormData()
      buildFormData(data, action.payload)
      const config = {
        headers: {
          'content-type': 'multipart/form-data',
        },
      }

      return from(axios.put(`${API_URL}/api/telefonos/${action.payload._id}`, data, config)).pipe(
        map((response) => editedTelefonos(response.data)),
        startWith(editingTelefonos()),
        catchError((err) => of(editingTelefonosFailed(err.response)))
      )
    })
  )

export default combineEpics(searchTelefonosEpic, loadTelefonosEpic, addTelefonosEpic, removeTelefonosEpic, softRemoveTelefonosEpic, editTelefonosEpic)
