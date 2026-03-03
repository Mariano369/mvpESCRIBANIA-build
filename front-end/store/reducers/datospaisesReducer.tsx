import produce from 'immer'
import { DatospaisesAction, DatospaisesActionTypes } from '../actions/datospaisesActions'
import { ApiStatus, IDatospaisesItem } from '../models'

export const initialDatospaisesState: IDatospaisesState = {
  loadingStatus: ApiStatus.NOTLOADED,
  addingStatus: ApiStatus.NOTLOADED,
  searchingStatus: ApiStatus.NOTLOADED,
  searchString: '',
  datospaises: [],
  founddatospaises: [],
  totalDocs: 0,
  errMessage: '',
  errStatus: null,
  errField: null,
}

export default function datospaisesReducer(state: IDatospaisesState = initialDatospaisesState, action: DatospaisesAction) {
  return produce(state, (draft) => {
    switch (action.type) {
      case DatospaisesActionTypes.SEARCH_DATOSPAISES:
        draft.searchString = action.searchOptions.searchString
        break
      case DatospaisesActionTypes.SEARCHING_DATOSPAISES:
        draft.searchingStatus = ApiStatus.LOADING
        draft.loadingStatus = ApiStatus.NOTLOADED
        draft.addingStatus = ApiStatus.NOTLOADED
        break

      case DatospaisesActionTypes.SEARCHING_DATOSPAISES_FAILED:
        draft.searchingStatus = ApiStatus.FAILED
        break

      case DatospaisesActionTypes.FOUND_DATOSPAISES:
        draft.searchingStatus = ApiStatus.LOADED
        action.keep ? draft.founddatospaises.push(...action.payload.datospaises.docs) : (draft.founddatospaises = action.payload.datospaises.docs)
        draft.totalDocs = action.payload.datospaises.totalDocs
        break

      case DatospaisesActionTypes.LOAD_DATOSPAISES:
      case DatospaisesActionTypes.LOADING_DATOSPAISES:
        draft.loadingStatus = ApiStatus.LOADING
        draft.addingStatus = ApiStatus.NOTLOADED
        draft.searchingStatus = ApiStatus.NOTLOADED
        draft.founddatospaises = []
        break

      case DatospaisesActionTypes.LOADING_DATOSPAISES_FAILED:
        draft.loadingStatus = ApiStatus.FAILED
        break

      case DatospaisesActionTypes.LOADED_DATOSPAISES:
        draft.loadingStatus = ApiStatus.LOADED
        draft.datospaises = action.payload.datospaises.docs
        draft.totalDocs = action.payload.datospaises.totalDocs
        break

      case DatospaisesActionTypes.ADD_DATOSPAISES:
      case DatospaisesActionTypes.ADDING_DATOSPAISES:
        draft.addingStatus = ApiStatus.LOADING
        draft.searchingStatus = ApiStatus.NOTLOADED
        draft.errMessage = ''
        draft.errStatus = null
        draft.errField = null
        break

      case DatospaisesActionTypes.ADDING_DATOSPAISES_FAILED:
        draft.addingStatus = ApiStatus.FAILED
        draft.errMessage = action.message
        draft.errStatus = action.status
        draft.errField = action.field
        break

      case DatospaisesActionTypes.ADDED_DATOSPAISES:
        draft.addingStatus = ApiStatus.LOADED
        draft.errStatus = 200
        draft.datospaises.push(action.payload.datospaises.docs[0])
        if (draft.searchString) draft.founddatospaises.push(action.payload.datospaises.docs[0])
        break

      case DatospaisesActionTypes.REMOVE_DATOPAIS:
        draft.datospaises.splice(
          draft.datospaises.findIndex((datopais) => datopais._id === action.payload._id),
          1
        )
        break

      case DatospaisesActionTypes.SOFT_REMOVE_DATOSPAISES:
        draft.loadingStatus = ApiStatus.NOTLOADED
        draft.addingStatus = ApiStatus.LOADING
        break

      case DatospaisesActionTypes.SOFT_REMOVING_DATOSPAISES:
        draft.loadingStatus = ApiStatus.LOADING
        draft.addingStatus = ApiStatus.LOADING
        break

      case DatospaisesActionTypes.SOFT_REMOVED_DATOSPAISES:
        draft.addingStatus = ApiStatus.LOADED
        draft.datospaises.splice(
          draft.datospaises.findIndex((datopais) => datopais._id === action.payload._id),
          1
        )
        break

      case DatospaisesActionTypes.SOFT_REMOVING_DATOSPAISES_FAILED:
        draft.addingStatus = ApiStatus.FAILED
        draft.errMessage = action.message
        draft.errStatus = action.status
        draft.errField = action.field
        break

      case DatospaisesActionTypes.EDIT_DATOSPAISES:
        draft.loadingStatus = ApiStatus.NOTLOADED
        draft.addingStatus = ApiStatus.LOADING
        draft.searchingStatus = ApiStatus.NOTLOADED
        break

      case DatospaisesActionTypes.EDITING_DATOSPAISES:
        draft.loadingStatus = ApiStatus.LOADING
        draft.addingStatus = ApiStatus.LOADING
        break

      case DatospaisesActionTypes.EDITED_DATOSPAISES:
        draft.addingStatus = ApiStatus.LOADED
        draft.datospaises[draft.datospaises.findIndex((datopais) => datopais._id === action.payload._id)] = action.payload
        draft.founddatospaises[draft.founddatospaises.findIndex((datopais) => datopais._id === action.payload._id)] = action.payload
        break

      case DatospaisesActionTypes.EDITING_DATOSPAISES_FAILED:
        draft.addingStatus = ApiStatus.FAILED
        draft.errMessage = action.message
        draft.errStatus = action.status
        draft.errField = action.field
        break
    }
  })
}

export interface IDatospaisesState {
  loadingStatus: ApiStatus
  addingStatus: ApiStatus
  searchingStatus: ApiStatus
  searchString: string
  datospaises: IDatospaisesItem[]
  founddatospaises: IDatospaisesItem[]
  totalDocs: number
  errMessage?: string
  errStatus?: number
  errField?: string
}
