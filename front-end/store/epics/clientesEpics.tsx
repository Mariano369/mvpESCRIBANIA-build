import axios from 'axios'
import { combineEpics, Epic } from 'redux-observable'
import { catchError, filter, map, mergeMap, startWith, switchMap } from 'rxjs/operators'
import {
  addedClientes,
  addingClientes,
  addingClientesFailed,
  ClientesAction,
  ClientesActionTypes,
  editedClientes,
  editingClientes,
  editingClientesFailed,
  foundClientes,
  loadedClientes,
  loadingClientes,
  loadingClientesFailed,
  removedCliente,
  removingCliente,
  removingClienteFailed,
  searchingClientes,
  searchingClientesFailed,
  softRemovedClientes,
  softRemovingClientes,
  softRemovingClientesFailed,
} from '../actions/clientesActions'
import buildFormData from './buildFormData'

import { from, of } from 'rxjs'
import { isOfType } from 'typesafe-actions'
import { IState } from '../reducers'

const API_URL = 'http://127.0.0.1:4567'

const searchClientesEpic: Epic<ClientesAction, ClientesAction, IState> = (action$, state$) =>
  action$.pipe(
    filter(isOfType(ClientesActionTypes.SEARCH_CLIENTES)),
    mergeMap((action) => {
      if (typeof action.searchOptions === 'string') {
        action.searchOptions = {
          searchString: action.searchOptions,
          page: 1,
          searchField: '_id',
        }
      }
      let url = `${API_URL}/api/clientes/search/`
      return from(axios.get(url, { params: action.searchOptions })).pipe(
        map((response) => foundClientes(response.data, action.keep)),
        startWith(searchingClientes()),
        catchError(() => of(searchingClientesFailed()))
      )
    })
  )

const loadClientesEpic: Epic<ClientesAction, ClientesAction, IState> = (action$, state$) => {
  let responses = []
  return action$.pipe(
    filter(isOfType(ClientesActionTypes.LOAD_CLIENTES)),
    switchMap((action) => {
      let url = `${API_URL}/api/clientes/`
      return from(axios.get(url, { params: action.loadOptions })).pipe(
        map((response) => loadedClientes(response.data)),
        startWith(loadingClientes()),
        catchError(() => of(loadingClientesFailed()))
      )
    })
  )
}

const addClientesEpic: Epic<ClientesAction, ClientesAction, IState> = (action$, state$) =>
  action$.pipe(
    filter(isOfType(ClientesActionTypes.ADD_CLIENTES)),

    mergeMap((action) => {
      const data = new FormData()
      buildFormData(data, action.payload)
      const config = {
        headers: {
          'content-type': 'multipart/form-data',
        },
      }

      return from(axios.post(`${API_URL}/api/clientes/`, data, config)).pipe(
        map((response) => addedClientes(response.data)),
        startWith(addingClientes()),
        catchError((err) => of(addingClientesFailed(err.response)))
      )
    })
  )

const removeClientesEpic: Epic<ClientesAction, ClientesAction, IState> = (action$, state$) =>
  action$.pipe(
    filter(isOfType(ClientesActionTypes.REMOVE_CLIENTE)),
    mergeMap((action) =>
      from(axios.delete(`${API_URL}/api/clientes/${action.payload._id}`)).pipe(
        map((response) => removedCliente()),
        startWith(removingCliente()),
        catchError(() => of(removingClienteFailed()))
      )
    )
  )

const softRemoveClientesEpic: Epic<ClientesAction, ClientesAction, IState> = (action$, state$) =>
  action$.pipe(
    filter(isOfType(ClientesActionTypes.SOFT_REMOVE_CLIENTES)),
    mergeMap((action) =>
      from(axios.delete(`${API_URL}/api/clientes/soft/${action.payload._id}`)).pipe(
        map((response) => softRemovedClientes(response.data.record)),
        startWith(softRemovingClientes()),
        catchError((err) => of(softRemovingClientesFailed(err.response)))
      )
    )
  )

const editClientesEpic: Epic<ClientesAction, ClientesAction, IState> = (action$, state$) =>
  action$.pipe(
    filter(isOfType(ClientesActionTypes.EDIT_CLIENTES)),
    mergeMap((action) => {
      const data = new FormData()
      buildFormData(data, action.payload)
      const config = {
        headers: {
          'content-type': 'multipart/form-data',
        },
      }

      return from(axios.put(`${API_URL}/api/clientes/${action.payload._id}`, data, config)).pipe(
        map((response) => editedClientes(response.data)),
        startWith(editingClientes()),
        catchError((err) => of(editingClientesFailed(err.response)))
      )
    })
  )

export default combineEpics(searchClientesEpic, loadClientesEpic, addClientesEpic, removeClientesEpic, softRemoveClientesEpic, editClientesEpic)
