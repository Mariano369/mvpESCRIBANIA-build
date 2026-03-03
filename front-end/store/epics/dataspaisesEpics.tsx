import axios from 'axios'
import { combineEpics, Epic } from 'redux-observable'
import { catchError, filter, map, mergeMap, startWith, switchMap } from 'rxjs/operators'
import {
  addedDataspaises,
  addingDataspaises,
  addingDataspaisesFailed,
  DataspaisesAction,
  DataspaisesActionTypes,
  editedDataspaises,
  editingDataspaises,
  editingDataspaisesFailed,
  foundDataspaises,
  loadedDataspaises,
  loadingDataspaises,
  loadingDataspaisesFailed,
  removedDatapaises,
  removingDatapaises,
  removingDatapaisesFailed,
  searchingDataspaises,
  searchingDataspaisesFailed,
  softRemovedDataspaises,
  softRemovingDataspaises,
  softRemovingDataspaisesFailed,
} from '../actions/dataspaisesActions'
import buildFormData from './buildFormData'

import { from, of } from 'rxjs'
import { isOfType } from 'typesafe-actions'
import { IState } from '../reducers'

const API_URL = 'http://127.0.0.1:4567'

const searchDataspaisesEpic: Epic<DataspaisesAction, DataspaisesAction, IState> = (action$, state$) =>
  action$.pipe(
    filter(isOfType(DataspaisesActionTypes.SEARCH_DATASPAISES)),
    mergeMap((action) => {
      if (typeof action.searchOptions === 'string') {
        action.searchOptions = {
          searchString: action.searchOptions,
          page: 1,
          searchField: '_id',
        }
      }
      let url = `${API_URL}/api/dataspaises/search/`
      return from(axios.get(url, { params: action.searchOptions })).pipe(
        map((response) => foundDataspaises(response.data, action.keep)),
        startWith(searchingDataspaises()),
        catchError(() => of(searchingDataspaisesFailed()))
      )
    })
  )

const loadDataspaisesEpic: Epic<DataspaisesAction, DataspaisesAction, IState> = (action$, state$) => {
  let responses = []
  return action$.pipe(
    filter(isOfType(DataspaisesActionTypes.LOAD_DATASPAISES)),
    switchMap((action) => {
      let url = `${API_URL}/api/dataspaises/`
      return from(axios.get(url, { params: action.loadOptions })).pipe(
        map((response) => loadedDataspaises(response.data)),
        startWith(loadingDataspaises()),
        catchError(() => of(loadingDataspaisesFailed()))
      )
    })
  )
}

const addDataspaisesEpic: Epic<DataspaisesAction, DataspaisesAction, IState> = (action$, state$) =>
  action$.pipe(
    filter(isOfType(DataspaisesActionTypes.ADD_DATASPAISES)),

    mergeMap((action) => {
      const data = new FormData()
      buildFormData(data, action.payload)
      const config = {
        headers: {
          'content-type': 'multipart/form-data',
        },
      }

      return from(axios.post(`${API_URL}/api/dataspaises/`, data, config)).pipe(
        map((response) => addedDataspaises(response.data)),
        startWith(addingDataspaises()),
        catchError((err) => of(addingDataspaisesFailed(err.response)))
      )
    })
  )

const removeDataspaisesEpic: Epic<DataspaisesAction, DataspaisesAction, IState> = (action$, state$) =>
  action$.pipe(
    filter(isOfType(DataspaisesActionTypes.REMOVE_DATAPAISES)),
    mergeMap((action) =>
      from(axios.delete(`${API_URL}/api/dataspaises/${action.payload._id}`)).pipe(
        map((response) => removedDatapaises()),
        startWith(removingDatapaises()),
        catchError(() => of(removingDatapaisesFailed()))
      )
    )
  )

const softRemoveDataspaisesEpic: Epic<DataspaisesAction, DataspaisesAction, IState> = (action$, state$) =>
  action$.pipe(
    filter(isOfType(DataspaisesActionTypes.SOFT_REMOVE_DATASPAISES)),
    mergeMap((action) =>
      from(axios.delete(`${API_URL}/api/dataspaises/soft/${action.payload._id}`)).pipe(
        map((response) => softRemovedDataspaises(response.data.record)),
        startWith(softRemovingDataspaises()),
        catchError((err) => of(softRemovingDataspaisesFailed(err.response)))
      )
    )
  )

const editDataspaisesEpic: Epic<DataspaisesAction, DataspaisesAction, IState> = (action$, state$) =>
  action$.pipe(
    filter(isOfType(DataspaisesActionTypes.EDIT_DATASPAISES)),
    mergeMap((action) => {
      const data = new FormData()
      buildFormData(data, action.payload)
      const config = {
        headers: {
          'content-type': 'multipart/form-data',
        },
      }

      return from(axios.put(`${API_URL}/api/dataspaises/${action.payload._id}`, data, config)).pipe(
        map((response) => editedDataspaises(response.data)),
        startWith(editingDataspaises()),
        catchError((err) => of(editingDataspaisesFailed(err.response)))
      )
    })
  )

export default combineEpics(
  searchDataspaisesEpic,
  loadDataspaisesEpic,
  addDataspaisesEpic,
  removeDataspaisesEpic,
  softRemoveDataspaisesEpic,
  editDataspaisesEpic
)
