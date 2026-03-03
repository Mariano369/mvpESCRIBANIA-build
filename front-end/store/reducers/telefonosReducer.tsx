import produce from 'immer'
import { TelefonosAction, TelefonosActionTypes } from '../actions/telefonosActions'
import { ApiStatus, ITelefonosItem } from '../models'

export const initialTelefonosState: ITelefonosState = {
  loadingStatus: ApiStatus.NOTLOADED,
  addingStatus: ApiStatus.NOTLOADED,
  searchingStatus: ApiStatus.NOTLOADED,
  searchString: '',
  telefonos: [],
  foundtelefonos: [],
  totalDocs: 0,
  errMessage: '',
  errStatus: null,
  errField: null,
}

export default function telefonosReducer(state: ITelefonosState = initialTelefonosState, action: TelefonosAction) {
  return produce(state, (draft) => {
    switch (action.type) {
      case TelefonosActionTypes.SEARCH_TELEFONOS:
        draft.searchString = action.searchOptions.searchString
        break
      case TelefonosActionTypes.SEARCHING_TELEFONOS:
        draft.searchingStatus = ApiStatus.LOADING
        draft.loadingStatus = ApiStatus.NOTLOADED
        draft.addingStatus = ApiStatus.NOTLOADED
        break

      case TelefonosActionTypes.SEARCHING_TELEFONOS_FAILED:
        draft.searchingStatus = ApiStatus.FAILED
        break

      case TelefonosActionTypes.FOUND_TELEFONOS:
        draft.searchingStatus = ApiStatus.LOADED
        action.keep ? draft.foundtelefonos.push(...action.payload.telefonos.docs) : (draft.foundtelefonos = action.payload.telefonos.docs)
        draft.totalDocs = action.payload.telefonos.totalDocs
        break

      case TelefonosActionTypes.LOAD_TELEFONOS:
      case TelefonosActionTypes.LOADING_TELEFONOS:
        draft.loadingStatus = ApiStatus.LOADING
        draft.addingStatus = ApiStatus.NOTLOADED
        draft.searchingStatus = ApiStatus.NOTLOADED
        draft.foundtelefonos = []
        break

      case TelefonosActionTypes.LOADING_TELEFONOS_FAILED:
        draft.loadingStatus = ApiStatus.FAILED
        break

      case TelefonosActionTypes.LOADED_TELEFONOS:
        draft.loadingStatus = ApiStatus.LOADED
        draft.telefonos = action.payload.telefonos.docs
        draft.totalDocs = action.payload.telefonos.totalDocs
        break

      case TelefonosActionTypes.ADD_TELEFONOS:
      case TelefonosActionTypes.ADDING_TELEFONOS:
        draft.addingStatus = ApiStatus.LOADING
        draft.searchingStatus = ApiStatus.NOTLOADED
        draft.errMessage = ''
        draft.errStatus = null
        draft.errField = null
        break

      case TelefonosActionTypes.ADDING_TELEFONOS_FAILED:
        draft.addingStatus = ApiStatus.FAILED
        draft.errMessage = action.message
        draft.errStatus = action.status
        draft.errField = action.field
        break

      case TelefonosActionTypes.ADDED_TELEFONOS:
        draft.addingStatus = ApiStatus.LOADED
        draft.errStatus = 200
        draft.telefonos.push(action.payload.telefonos.docs[0])
        if (draft.searchString) draft.foundtelefonos.push(action.payload.telefonos.docs[0])
        break

      case TelefonosActionTypes.REMOVE_TELEFONO:
        draft.telefonos.splice(
          draft.telefonos.findIndex((telefono) => telefono._id === action.payload._id),
          1
        )
        break

      case TelefonosActionTypes.SOFT_REMOVE_TELEFONOS:
        draft.loadingStatus = ApiStatus.NOTLOADED
        draft.addingStatus = ApiStatus.LOADING
        break

      case TelefonosActionTypes.SOFT_REMOVING_TELEFONOS:
        draft.loadingStatus = ApiStatus.LOADING
        draft.addingStatus = ApiStatus.LOADING
        break

      case TelefonosActionTypes.SOFT_REMOVED_TELEFONOS:
        draft.addingStatus = ApiStatus.LOADED
        draft.telefonos.splice(
          draft.telefonos.findIndex((telefono) => telefono._id === action.payload._id),
          1
        )
        break

      case TelefonosActionTypes.SOFT_REMOVING_TELEFONOS_FAILED:
        draft.addingStatus = ApiStatus.FAILED
        draft.errMessage = action.message
        draft.errStatus = action.status
        draft.errField = action.field
        break

      case TelefonosActionTypes.EDIT_TELEFONOS:
        draft.loadingStatus = ApiStatus.NOTLOADED
        draft.addingStatus = ApiStatus.LOADING
        draft.searchingStatus = ApiStatus.NOTLOADED
        break

      case TelefonosActionTypes.EDITING_TELEFONOS:
        draft.loadingStatus = ApiStatus.LOADING
        draft.addingStatus = ApiStatus.LOADING
        break

      case TelefonosActionTypes.EDITED_TELEFONOS:
        draft.addingStatus = ApiStatus.LOADED
        draft.telefonos[draft.telefonos.findIndex((telefono) => telefono._id === action.payload._id)] = action.payload
        draft.foundtelefonos[draft.foundtelefonos.findIndex((telefono) => telefono._id === action.payload._id)] = action.payload
        break

      case TelefonosActionTypes.EDITING_TELEFONOS_FAILED:
        draft.addingStatus = ApiStatus.FAILED
        draft.errMessage = action.message
        draft.errStatus = action.status
        draft.errField = action.field
        break
    }
  })
}

export interface ITelefonosState {
  loadingStatus: ApiStatus
  addingStatus: ApiStatus
  searchingStatus: ApiStatus
  searchString: string
  telefonos: ITelefonosItem[]
  foundtelefonos: ITelefonosItem[]
  totalDocs: number
  errMessage?: string
  errStatus?: number
  errField?: string
}
