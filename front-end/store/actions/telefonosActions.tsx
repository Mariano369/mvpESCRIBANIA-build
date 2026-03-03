import { IpaginatedTelefonos, ITelefonosItem } from '../models'

export enum TelefonosActionTypes {
  SEARCH_TELEFONOS = 'telefonos/search',
  SEARCHING_TELEFONOS = 'telefonos/searching',
  FOUND_TELEFONOS = 'telefonos/found',
  SEARCHING_TELEFONOS_FAILED = 'telefonos/searching_failed',

  LOAD_TELEFONOS = 'telefonos/load',
  LOADING_TELEFONOS = 'telefonos/loading',
  LOADED_TELEFONOS = 'telefonos/loaded',
  LOADING_TELEFONOS_FAILED = 'telefonos/loading_failed',

  ADD_TELEFONOS = 'telefonos/add',
  ADDING_TELEFONOS = 'telefonos/adding',
  ADDED_TELEFONOS = 'telefonos/added',
  ADDING_TELEFONOS_FAILED = 'telefonos/adding_failed',

  REMOVE_TELEFONO = 'telefonos/remove',
  REMOVING_TELEFONO = 'telefonos/removing',
  REMOVED_TELEFONO = 'telefonos/removed',
  REMOVING_TELEFONO_FAILED = 'telefonos/removing_failed',

  SOFT_REMOVE_TELEFONOS = 'telefonos/soft_remove',
  SOFT_REMOVING_TELEFONOS = 'telefonos/soft_removing',
  SOFT_REMOVED_TELEFONOS = 'telefonos/soft_removed',
  SOFT_REMOVING_TELEFONOS_FAILED = 'telefonos/soft_removing_failed',

  EDIT_TELEFONOS = 'telefonos/edit',
  EDITING_TELEFONOS = 'telefonos/editing',
  EDITED_TELEFONOS = 'telefonos/edited',
  EDITING_TELEFONOS_FAILED = 'telefonos/editing_failed',

  VIEW_TELEFONOS = 'telefonos/view',
  VIEWING_TELEFONOS = 'telefonos/viewing',
  VIEWED_TELEFONOS = 'telefonos/viewed',
  VIEWING_TELEFONOS_FAILED = 'telefonos/viewing_failed',
}

export function searchTelefonos(searchOptions: TSearchOptions | string, keep?: boolean): ISearchTelefonosAction {
  return {
    type: TelefonosActionTypes.SEARCH_TELEFONOS,
    searchOptions: typeof searchOptions === 'string' ? { searchString: searchOptions } : searchOptions,
    keep: keep,
  }
}

export function searchingTelefonos(): ISearchingTelefonosAction {
  return {
    type: TelefonosActionTypes.SEARCHING_TELEFONOS,
  }
}

export function foundTelefonos(telefonos: IpaginatedTelefonos, keep?: boolean): IFoundTelefonosAction {
  return {
    type: TelefonosActionTypes.FOUND_TELEFONOS,
    keep: keep,
    payload: {
      telefonos,
    },
  }
}

export function searchingTelefonosFailed(): ISearchingTelefonosFailedAction {
  return {
    type: TelefonosActionTypes.SEARCHING_TELEFONOS_FAILED,
  }
}

export function loadTelefonos(loadOptions: TSearchOptions): ILoadTelefonosAction {
  return {
    type: TelefonosActionTypes.LOAD_TELEFONOS,
    loadOptions: loadOptions,
  }
}

export function loadingTelefonos(): ILoadingTelefonosAction {
  return {
    type: TelefonosActionTypes.LOADING_TELEFONOS,
  }
}

export function loadedTelefonos(telefonos: IpaginatedTelefonos): ILoadedTelefonosAction {
  return {
    type: TelefonosActionTypes.LOADED_TELEFONOS,
    payload: {
      telefonos,
    },
  }
}

export function loadingTelefonosFailed(): ILoadingTelefonosFailedAction {
  return {
    type: TelefonosActionTypes.LOADING_TELEFONOS_FAILED,
  }
}

export function addTelefonos(telefono: ITelefonosItem): IAddTelefonosAction {
  return {
    type: TelefonosActionTypes.ADD_TELEFONOS,
    payload: telefono,
  }
}

export function addingTelefonos(): IAddingTelefonosAction {
  return {
    type: TelefonosActionTypes.ADDING_TELEFONOS,
  }
}

export function addedTelefonos(telefonos: IpaginatedTelefonos): IAddedTelefonosAction {
  return {
    type: TelefonosActionTypes.ADDED_TELEFONOS,
    payload: {
      telefonos,
    },
  }
}

export function addingTelefonosFailed(errData: { data: { message: string; field?: string }; status: number }): IAddingTelefonosFailedAction {
  return {
    type: TelefonosActionTypes.ADDING_TELEFONOS_FAILED,
    message: errData.data.message,
    status: errData.status,
    field: errData.data.field,
  }
}

export function removeTelefono(telefono: ITelefonosItem): IRemoveTelefonoAction {
  return {
    type: TelefonosActionTypes.REMOVE_TELEFONO,
    payload: telefono,
  }
}

export function removingTelefono(): IRemovingTelefonoAction {
  return {
    type: TelefonosActionTypes.REMOVING_TELEFONO,
  }
}

export function removedTelefono(): IRemovedTelefonoAction {
  return {
    type: TelefonosActionTypes.REMOVED_TELEFONO,
  }
}

export function removingTelefonoFailed(): IRemovingTelefonoFailedAction {
  return {
    type: TelefonosActionTypes.REMOVING_TELEFONO_FAILED,
  }
}

export function softRemoveTelefonos(telefono: ITelefonosItem): ISoftRemoveTelefonosAction {
  return {
    type: TelefonosActionTypes.SOFT_REMOVE_TELEFONOS,
    payload: telefono,
  }
}

export function softRemovingTelefonos(): ISoftRemovingTelefonosAction {
  return {
    type: TelefonosActionTypes.SOFT_REMOVING_TELEFONOS,
  }
}

export function softRemovedTelefonos(telefono: ITelefonosItem): ISoftRemovedTelefonosAction {
  return {
    type: TelefonosActionTypes.SOFT_REMOVED_TELEFONOS,
    payload: telefono,
  }
}

export function softRemovingTelefonosFailed(errData: {
  data: { message: string; field?: string }
  status: number
}): ISoftRemovingTelefonosFailedAction {
  return {
    type: TelefonosActionTypes.SOFT_REMOVING_TELEFONOS_FAILED,
    message: errData.data.message,
    status: errData.status,
    field: errData.data.field,
  }
}

export function editTelefonos(telefono: ITelefonosItem): IEditTelefonosAction {
  return {
    type: TelefonosActionTypes.EDIT_TELEFONOS,
    payload: telefono,
  }
}

export function editingTelefonos(): IEditingTelefonosAction {
  return {
    type: TelefonosActionTypes.EDITING_TELEFONOS,
  }
}

export function editedTelefonos(telefonos: ITelefonosItem): IEditedTelefonosAction {
  return {
    type: TelefonosActionTypes.EDITED_TELEFONOS,
    payload: telefonos,
  }
}

export function editingTelefonosFailed(errData: { data: { message: string; field?: string }; status: number }): IEditingTelefonosFailedAction {
  return {
    type: TelefonosActionTypes.EDITING_TELEFONOS_FAILED,
    message: errData.data.message,
    status: errData.status,
    field: errData.data.field,
  }
}

export function viewTelefonos(telefono: ITelefonosItem): IViewTelefonosAction {
  return {
    type: TelefonosActionTypes.VIEW_TELEFONOS,
    payload: telefono,
  }
}

export function viewingTelefonos(): IViewingTelefonosAction {
  return {
    type: TelefonosActionTypes.VIEWING_TELEFONOS,
  }
}

export function viewedTelefonos(telefonos: ITelefonosItem): IViewedTelefonosAction {
  return {
    type: TelefonosActionTypes.VIEWED_TELEFONOS,
    payload: telefonos,
  }
}

export function viewingTelefonosFailed(): IViewingTelefonosFailedAction {
  return {
    type: TelefonosActionTypes.VIEWING_TELEFONOS_FAILED,
  }
}

type TSearchOptions = {
  searchString?: string
  searchField?: string
  page?: number
  limit?: number
  populate?: boolean
  sort?: {
    field: string
    method?: 'asc' | 'desc'
  }
  filters?: { field: string; value: string }[]
}

export interface ISearchTelefonosAction {
  type: TelefonosActionTypes.SEARCH_TELEFONOS
  searchOptions: TSearchOptions
  keep?: boolean
}

export interface ISearchingTelefonosAction {
  type: TelefonosActionTypes.SEARCHING_TELEFONOS
}

export interface IFoundTelefonosAction {
  type: TelefonosActionTypes.FOUND_TELEFONOS
  keep?: boolean
  payload: {
    telefonos: IpaginatedTelefonos
  }
}

export interface ISearchingTelefonosFailedAction {
  type: TelefonosActionTypes.SEARCHING_TELEFONOS_FAILED
}

export interface ILoadTelefonosAction {
  type: TelefonosActionTypes.LOAD_TELEFONOS
  loadOptions: TSearchOptions
}

export interface ILoadingTelefonosAction {
  type: TelefonosActionTypes.LOADING_TELEFONOS
}

export interface ILoadedTelefonosAction {
  type: TelefonosActionTypes.LOADED_TELEFONOS
  payload: {
    telefonos: IpaginatedTelefonos
  }
}

export interface ILoadingTelefonosFailedAction {
  type: TelefonosActionTypes.LOADING_TELEFONOS_FAILED
}

export interface IAddTelefonosAction {
  type: TelefonosActionTypes.ADD_TELEFONOS
  payload: ITelefonosItem
}

export interface IAddingTelefonosAction {
  type: TelefonosActionTypes.ADDING_TELEFONOS
}

export interface IAddedTelefonosAction {
  type: TelefonosActionTypes.ADDED_TELEFONOS
  payload: {
    telefonos: IpaginatedTelefonos
  }
}

export interface IAddingTelefonosFailedAction {
  type: TelefonosActionTypes.ADDING_TELEFONOS_FAILED
  message: string
  status: number
  field?: string
}

export interface IRemoveTelefonoAction {
  type: TelefonosActionTypes.REMOVE_TELEFONO
  payload: ITelefonosItem
}

export interface IRemovingTelefonoAction {
  type: TelefonosActionTypes.REMOVING_TELEFONO
}

export interface IRemovedTelefonoAction {
  type: TelefonosActionTypes.REMOVED_TELEFONO
}

export interface IRemovingTelefonoFailedAction {
  type: TelefonosActionTypes.REMOVING_TELEFONO_FAILED
}

export interface ISoftRemoveTelefonosAction {
  type: TelefonosActionTypes.SOFT_REMOVE_TELEFONOS
  payload: ITelefonosItem
}

export interface ISoftRemovingTelefonosAction {
  type: TelefonosActionTypes.SOFT_REMOVING_TELEFONOS
}

export interface ISoftRemovedTelefonosAction {
  type: TelefonosActionTypes.SOFT_REMOVED_TELEFONOS
  payload: ITelefonosItem
}

export interface ISoftRemovingTelefonosFailedAction {
  type: TelefonosActionTypes.SOFT_REMOVING_TELEFONOS_FAILED
  message: string
  status: number
  field?: string
}

export interface IEditTelefonosAction {
  type: TelefonosActionTypes.EDIT_TELEFONOS
  payload: ITelefonosItem
}

export interface IEditingTelefonosAction {
  type: TelefonosActionTypes.EDITING_TELEFONOS
}

export interface IEditedTelefonosAction {
  type: TelefonosActionTypes.EDITED_TELEFONOS
  payload: ITelefonosItem
}

export interface IEditingTelefonosFailedAction {
  type: TelefonosActionTypes.EDITING_TELEFONOS_FAILED
  message: string
  status: number
  field?: string
}

export interface IViewTelefonosAction {
  type: TelefonosActionTypes.VIEW_TELEFONOS
  payload: ITelefonosItem
}

export interface IViewingTelefonosAction {
  type: TelefonosActionTypes.VIEWING_TELEFONOS
}

export interface IViewedTelefonosAction {
  type: TelefonosActionTypes.VIEWED_TELEFONOS
  payload: ITelefonosItem
}

export interface IViewingTelefonosFailedAction {
  type: TelefonosActionTypes.VIEWING_TELEFONOS_FAILED
}

export type TelefonosAction =
  | ISearchTelefonosAction
  | ISearchingTelefonosAction
  | IFoundTelefonosAction
  | ISearchingTelefonosFailedAction
  | ILoadTelefonosAction
  | ILoadingTelefonosAction
  | ILoadedTelefonosAction
  | ILoadingTelefonosFailedAction
  | IAddTelefonosAction
  | IAddingTelefonosAction
  | IAddedTelefonosAction
  | IAddingTelefonosFailedAction
  | IRemoveTelefonoAction
  | IRemovingTelefonoAction
  | IRemovedTelefonoAction
  | IRemovingTelefonoFailedAction
  | ISoftRemoveTelefonosAction
  | ISoftRemovingTelefonosAction
  | ISoftRemovedTelefonosAction
  | ISoftRemovingTelefonosFailedAction
  | IEditTelefonosAction
  | IEditingTelefonosAction
  | IEditedTelefonosAction
  | IEditingTelefonosFailedAction
  | IViewTelefonosAction
  | IViewingTelefonosAction
  | IViewedTelefonosAction
  | IViewingTelefonosFailedAction
