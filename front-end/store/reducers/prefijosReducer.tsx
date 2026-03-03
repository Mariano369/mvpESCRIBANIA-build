import produce from 'immer'
import { PrefijosAction, PrefijosActionTypes } from '../actions/prefijosActions'
import { ApiStatus, IPrefijosItem } from '../models'

export const initialPrefijosState: IPrefijosState = {
  loadingStatus: ApiStatus.NOTLOADED,
  addingStatus: ApiStatus.NOTLOADED,
  searchingStatus: ApiStatus.NOTLOADED,
  searchString: '',
  prefijos: [],
  foundprefijos: [],
  totalDocs: 0,
  errMessage: '',
  errStatus: null,
  errField: null,
}

export default function prefijosReducer(state: IPrefijosState = initialPrefijosState, action: PrefijosAction) {
  return produce(state, (draft) => {
    switch (action.type) {
      case PrefijosActionTypes.SEARCH_PREFIJOS:
        draft.searchString = action.searchOptions.searchString
        break
      case PrefijosActionTypes.SEARCHING_PREFIJOS:
        draft.searchingStatus = ApiStatus.LOADING
        draft.loadingStatus = ApiStatus.NOTLOADED
        draft.addingStatus = ApiStatus.NOTLOADED
        break

      case PrefijosActionTypes.SEARCHING_PREFIJOS_FAILED:
        draft.searchingStatus = ApiStatus.FAILED
        break

      case PrefijosActionTypes.FOUND_PREFIJOS:
        draft.searchingStatus = ApiStatus.LOADED
        action.keep ? draft.foundprefijos.push(...action.payload.prefijos.docs) : (draft.foundprefijos = action.payload.prefijos.docs)
        draft.totalDocs = action.payload.prefijos.totalDocs
        break

      case PrefijosActionTypes.LOAD_PREFIJOS:
      case PrefijosActionTypes.LOADING_PREFIJOS:
        draft.loadingStatus = ApiStatus.LOADING
        draft.addingStatus = ApiStatus.NOTLOADED
        draft.searchingStatus = ApiStatus.NOTLOADED
        draft.foundprefijos = []
        break

      case PrefijosActionTypes.LOADING_PREFIJOS_FAILED:
        draft.loadingStatus = ApiStatus.FAILED
        break

      case PrefijosActionTypes.LOADED_PREFIJOS:
        draft.loadingStatus = ApiStatus.LOADED
        draft.prefijos = action.payload.prefijos.docs
        draft.totalDocs = action.payload.prefijos.totalDocs
        break

      case PrefijosActionTypes.ADD_PREFIJOS:
      case PrefijosActionTypes.ADDING_PREFIJOS:
        draft.addingStatus = ApiStatus.LOADING
        draft.searchingStatus = ApiStatus.NOTLOADED
        draft.errMessage = ''
        draft.errStatus = null
        draft.errField = null
        break

      case PrefijosActionTypes.ADDING_PREFIJOS_FAILED:
        draft.addingStatus = ApiStatus.FAILED
        draft.errMessage = action.message
        draft.errStatus = action.status
        draft.errField = action.field
        break

      case PrefijosActionTypes.ADDED_PREFIJOS:
        draft.addingStatus = ApiStatus.LOADED
        draft.errStatus = 200
        draft.prefijos.push(action.payload.prefijos.docs[0])
        if (draft.searchString) draft.foundprefijos.push(action.payload.prefijos.docs[0])
        break

      case PrefijosActionTypes.REMOVE_PREFIJO:
        draft.prefijos.splice(
          draft.prefijos.findIndex((prefijo) => prefijo._id === action.payload._id),
          1
        )
        break

      case PrefijosActionTypes.SOFT_REMOVE_PREFIJOS:
        draft.loadingStatus = ApiStatus.NOTLOADED
        draft.addingStatus = ApiStatus.LOADING
        break

      case PrefijosActionTypes.SOFT_REMOVING_PREFIJOS:
        draft.loadingStatus = ApiStatus.LOADING
        draft.addingStatus = ApiStatus.LOADING
        break

      case PrefijosActionTypes.SOFT_REMOVED_PREFIJOS:
        draft.addingStatus = ApiStatus.LOADED
        draft.prefijos.splice(
          draft.prefijos.findIndex((prefijo) => prefijo._id === action.payload._id),
          1
        )
        break

      case PrefijosActionTypes.SOFT_REMOVING_PREFIJOS_FAILED:
        draft.addingStatus = ApiStatus.FAILED
        draft.errMessage = action.message
        draft.errStatus = action.status
        draft.errField = action.field
        break

      case PrefijosActionTypes.EDIT_PREFIJOS:
        draft.loadingStatus = ApiStatus.NOTLOADED
        draft.addingStatus = ApiStatus.LOADING
        draft.searchingStatus = ApiStatus.NOTLOADED
        break

      case PrefijosActionTypes.EDITING_PREFIJOS:
        draft.loadingStatus = ApiStatus.LOADING
        draft.addingStatus = ApiStatus.LOADING
        break

      case PrefijosActionTypes.EDITED_PREFIJOS:
        draft.addingStatus = ApiStatus.LOADED
        draft.prefijos[draft.prefijos.findIndex((prefijo) => prefijo._id === action.payload._id)] = action.payload
        draft.foundprefijos[draft.foundprefijos.findIndex((prefijo) => prefijo._id === action.payload._id)] = action.payload
        break

      case PrefijosActionTypes.EDITING_PREFIJOS_FAILED:
        draft.addingStatus = ApiStatus.FAILED
        draft.errMessage = action.message
        draft.errStatus = action.status
        draft.errField = action.field
        break
    }
  })
}

export interface IPrefijosState {
  loadingStatus: ApiStatus
  addingStatus: ApiStatus
  searchingStatus: ApiStatus
  searchString: string
  prefijos: IPrefijosItem[]
  foundprefijos: IPrefijosItem[]
  totalDocs: number
  errMessage?: string
  errStatus?: number
  errField?: string
}
