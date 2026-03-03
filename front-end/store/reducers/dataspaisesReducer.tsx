import produce from 'immer'
import { DataspaisesAction, DataspaisesActionTypes } from '../actions/dataspaisesActions'
import { ApiStatus, IDataspaisesItem } from '../models'

export const initialDataspaisesState: IDataspaisesState = {
  loadingStatus: ApiStatus.NOTLOADED,
  addingStatus: ApiStatus.NOTLOADED,
  searchingStatus: ApiStatus.NOTLOADED,
  searchString: '',
  dataspaises: [],
  founddataspaises: [],
  totalDocs: 0,
  errMessage: '',
  errStatus: null,
  errField: null,
}

export default function dataspaisesReducer(state: IDataspaisesState = initialDataspaisesState, action: DataspaisesAction) {
  return produce(state, (draft) => {
    switch (action.type) {
      case DataspaisesActionTypes.SEARCH_DATASPAISES:
        draft.searchString = action.searchOptions.searchString
        break
      case DataspaisesActionTypes.SEARCHING_DATASPAISES:
        draft.searchingStatus = ApiStatus.LOADING
        draft.loadingStatus = ApiStatus.NOTLOADED
        draft.addingStatus = ApiStatus.NOTLOADED
        break

      case DataspaisesActionTypes.SEARCHING_DATASPAISES_FAILED:
        draft.searchingStatus = ApiStatus.FAILED
        break

      case DataspaisesActionTypes.FOUND_DATASPAISES:
        draft.searchingStatus = ApiStatus.LOADED
        action.keep ? draft.founddataspaises.push(...action.payload.dataspaises.docs) : (draft.founddataspaises = action.payload.dataspaises.docs)
        draft.totalDocs = action.payload.dataspaises.totalDocs
        break

      case DataspaisesActionTypes.LOAD_DATASPAISES:
      case DataspaisesActionTypes.LOADING_DATASPAISES:
        draft.loadingStatus = ApiStatus.LOADING
        draft.addingStatus = ApiStatus.NOTLOADED
        draft.searchingStatus = ApiStatus.NOTLOADED
        draft.founddataspaises = []
        break

      case DataspaisesActionTypes.LOADING_DATASPAISES_FAILED:
        draft.loadingStatus = ApiStatus.FAILED
        break

      case DataspaisesActionTypes.LOADED_DATASPAISES:
        draft.loadingStatus = ApiStatus.LOADED
        draft.dataspaises = action.payload.dataspaises.docs
        draft.totalDocs = action.payload.dataspaises.totalDocs
        break

      case DataspaisesActionTypes.ADD_DATASPAISES:
      case DataspaisesActionTypes.ADDING_DATASPAISES:
        draft.addingStatus = ApiStatus.LOADING
        draft.searchingStatus = ApiStatus.NOTLOADED
        draft.errMessage = ''
        draft.errStatus = null
        draft.errField = null
        break

      case DataspaisesActionTypes.ADDING_DATASPAISES_FAILED:
        draft.addingStatus = ApiStatus.FAILED
        draft.errMessage = action.message
        draft.errStatus = action.status
        draft.errField = action.field
        break

      case DataspaisesActionTypes.ADDED_DATASPAISES:
        draft.addingStatus = ApiStatus.LOADED
        draft.errStatus = 200
        draft.dataspaises.push(action.payload.dataspaises.docs[0])
        if (draft.searchString) draft.founddataspaises.push(action.payload.dataspaises.docs[0])
        break

      case DataspaisesActionTypes.REMOVE_DATAPAISES:
        draft.dataspaises.splice(
          draft.dataspaises.findIndex((datapaises) => datapaises._id === action.payload._id),
          1
        )
        break

      case DataspaisesActionTypes.SOFT_REMOVE_DATASPAISES:
        draft.loadingStatus = ApiStatus.NOTLOADED
        draft.addingStatus = ApiStatus.LOADING
        break

      case DataspaisesActionTypes.SOFT_REMOVING_DATASPAISES:
        draft.loadingStatus = ApiStatus.LOADING
        draft.addingStatus = ApiStatus.LOADING
        break

      case DataspaisesActionTypes.SOFT_REMOVED_DATASPAISES:
        draft.addingStatus = ApiStatus.LOADED
        draft.dataspaises.splice(
          draft.dataspaises.findIndex((datapaises) => datapaises._id === action.payload._id),
          1
        )
        break

      case DataspaisesActionTypes.SOFT_REMOVING_DATASPAISES_FAILED:
        draft.addingStatus = ApiStatus.FAILED
        draft.errMessage = action.message
        draft.errStatus = action.status
        draft.errField = action.field
        break

      case DataspaisesActionTypes.EDIT_DATASPAISES:
        draft.loadingStatus = ApiStatus.NOTLOADED
        draft.addingStatus = ApiStatus.LOADING
        draft.searchingStatus = ApiStatus.NOTLOADED
        break

      case DataspaisesActionTypes.EDITING_DATASPAISES:
        draft.loadingStatus = ApiStatus.LOADING
        draft.addingStatus = ApiStatus.LOADING
        break

      case DataspaisesActionTypes.EDITED_DATASPAISES:
        draft.addingStatus = ApiStatus.LOADED
        draft.dataspaises[draft.dataspaises.findIndex((datapaises) => datapaises._id === action.payload._id)] = action.payload
        draft.founddataspaises[draft.founddataspaises.findIndex((datapaises) => datapaises._id === action.payload._id)] = action.payload
        break

      case DataspaisesActionTypes.EDITING_DATASPAISES_FAILED:
        draft.addingStatus = ApiStatus.FAILED
        draft.errMessage = action.message
        draft.errStatus = action.status
        draft.errField = action.field
        break
    }
  })
}

export interface IDataspaisesState {
  loadingStatus: ApiStatus
  addingStatus: ApiStatus
  searchingStatus: ApiStatus
  searchString: string
  dataspaises: IDataspaisesItem[]
  founddataspaises: IDataspaisesItem[]
  totalDocs: number
  errMessage?: string
  errStatus?: number
  errField?: string
}
