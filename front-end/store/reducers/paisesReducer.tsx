import produce from 'immer'
import { PaisesAction, PaisesActionTypes } from '../actions/paisesActions'
import { ApiStatus, IPaisesItem } from '../models'

export const initialPaisesState: IPaisesState = {
  loadingStatus: ApiStatus.NOTLOADED,
  addingStatus: ApiStatus.NOTLOADED,
  searchingStatus: ApiStatus.NOTLOADED,
  searchString: '',
  paises: [],
  foundpaises: [],
  totalDocs: 0,
  errMessage: '',
  errStatus: null,
  errField: null,
}

export default function paisesReducer(state: IPaisesState = initialPaisesState, action: PaisesAction) {
  return produce(state, (draft) => {
    switch (action.type) {
      case PaisesActionTypes.SEARCH_PAISES:
        draft.searchString = action.searchOptions.searchString
        break
      case PaisesActionTypes.SEARCHING_PAISES:
        draft.searchingStatus = ApiStatus.LOADING
        draft.loadingStatus = ApiStatus.NOTLOADED
        draft.addingStatus = ApiStatus.NOTLOADED
        break

      case PaisesActionTypes.SEARCHING_PAISES_FAILED:
        draft.searchingStatus = ApiStatus.FAILED
        break

      case PaisesActionTypes.FOUND_PAISES:
        draft.searchingStatus = ApiStatus.LOADED
        action.keep ? draft.foundpaises.push(...action.payload.paises.docs) : (draft.foundpaises = action.payload.paises.docs)
        draft.totalDocs = action.payload.paises.totalDocs
        break

      case PaisesActionTypes.LOAD_PAISES:
      case PaisesActionTypes.LOADING_PAISES:
        draft.loadingStatus = ApiStatus.LOADING
        draft.addingStatus = ApiStatus.NOTLOADED
        draft.searchingStatus = ApiStatus.NOTLOADED
        draft.foundpaises = []
        break

      case PaisesActionTypes.LOADING_PAISES_FAILED:
        draft.loadingStatus = ApiStatus.FAILED
        break

      case PaisesActionTypes.LOADED_PAISES:
        draft.loadingStatus = ApiStatus.LOADED
        draft.paises = action.payload.paises.docs
        draft.totalDocs = action.payload.paises.totalDocs
        break

      case PaisesActionTypes.ADD_PAISES:
      case PaisesActionTypes.ADDING_PAISES:
        draft.addingStatus = ApiStatus.LOADING
        draft.searchingStatus = ApiStatus.NOTLOADED
        draft.errMessage = ''
        draft.errStatus = null
        draft.errField = null
        break

      case PaisesActionTypes.ADDING_PAISES_FAILED:
        draft.addingStatus = ApiStatus.FAILED
        draft.errMessage = action.message
        draft.errStatus = action.status
        draft.errField = action.field
        break

      case PaisesActionTypes.ADDED_PAISES:
        draft.addingStatus = ApiStatus.LOADED
        draft.errStatus = 200
        draft.paises.push(action.payload.paises.docs[0])
        if (draft.searchString) draft.foundpaises.push(action.payload.paises.docs[0])
        break

      case PaisesActionTypes.REMOVE_PAIS:
        draft.paises.splice(
          draft.paises.findIndex((pais) => pais._id === action.payload._id),
          1
        )
        break

      case PaisesActionTypes.SOFT_REMOVE_PAISES:
        draft.loadingStatus = ApiStatus.NOTLOADED
        draft.addingStatus = ApiStatus.LOADING
        break

      case PaisesActionTypes.SOFT_REMOVING_PAISES:
        draft.loadingStatus = ApiStatus.LOADING
        draft.addingStatus = ApiStatus.LOADING
        break

      case PaisesActionTypes.SOFT_REMOVED_PAISES:
        draft.addingStatus = ApiStatus.LOADED
        draft.paises.splice(
          draft.paises.findIndex((pais) => pais._id === action.payload._id),
          1
        )
        break

      case PaisesActionTypes.SOFT_REMOVING_PAISES_FAILED:
        draft.addingStatus = ApiStatus.FAILED
        draft.errMessage = action.message
        draft.errStatus = action.status
        draft.errField = action.field
        break

      case PaisesActionTypes.EDIT_PAISES:
        draft.loadingStatus = ApiStatus.NOTLOADED
        draft.addingStatus = ApiStatus.LOADING
        draft.searchingStatus = ApiStatus.NOTLOADED
        break

      case PaisesActionTypes.EDITING_PAISES:
        draft.loadingStatus = ApiStatus.LOADING
        draft.addingStatus = ApiStatus.LOADING
        break

      case PaisesActionTypes.EDITED_PAISES:
        draft.addingStatus = ApiStatus.LOADED
        draft.paises[draft.paises.findIndex((pais) => pais._id === action.payload._id)] = action.payload
        draft.foundpaises[draft.foundpaises.findIndex((pais) => pais._id === action.payload._id)] = action.payload
        break

      case PaisesActionTypes.EDITING_PAISES_FAILED:
        draft.addingStatus = ApiStatus.FAILED
        draft.errMessage = action.message
        draft.errStatus = action.status
        draft.errField = action.field
        break
    }
  })
}

export interface IPaisesState {
  loadingStatus: ApiStatus
  addingStatus: ApiStatus
  searchingStatus: ApiStatus
  searchString: string
  paises: IPaisesItem[]
  foundpaises: IPaisesItem[]
  totalDocs: number
  errMessage?: string
  errStatus?: number
  errField?: string
}
