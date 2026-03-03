import { IpaginatedPrefijos, IPrefijosItem } from '../models'

export enum PrefijosActionTypes {
  SEARCH_PREFIJOS = 'prefijos/search',
  SEARCHING_PREFIJOS = 'prefijos/searching',
  FOUND_PREFIJOS = 'prefijos/found',
  SEARCHING_PREFIJOS_FAILED = 'prefijos/searching_failed',

  LOAD_PREFIJOS = 'prefijos/load',
  LOADING_PREFIJOS = 'prefijos/loading',
  LOADED_PREFIJOS = 'prefijos/loaded',
  LOADING_PREFIJOS_FAILED = 'prefijos/loading_failed',

  ADD_PREFIJOS = 'prefijos/add',
  ADDING_PREFIJOS = 'prefijos/adding',
  ADDED_PREFIJOS = 'prefijos/added',
  ADDING_PREFIJOS_FAILED = 'prefijos/adding_failed',

  REMOVE_PREFIJO = 'prefijos/remove',
  REMOVING_PREFIJO = 'prefijos/removing',
  REMOVED_PREFIJO = 'prefijos/removed',
  REMOVING_PREFIJO_FAILED = 'prefijos/removing_failed',

  SOFT_REMOVE_PREFIJOS = 'prefijos/soft_remove',
  SOFT_REMOVING_PREFIJOS = 'prefijos/soft_removing',
  SOFT_REMOVED_PREFIJOS = 'prefijos/soft_removed',
  SOFT_REMOVING_PREFIJOS_FAILED = 'prefijos/soft_removing_failed',

  EDIT_PREFIJOS = 'prefijos/edit',
  EDITING_PREFIJOS = 'prefijos/editing',
  EDITED_PREFIJOS = 'prefijos/edited',
  EDITING_PREFIJOS_FAILED = 'prefijos/editing_failed',

  VIEW_PREFIJOS = 'prefijos/view',
  VIEWING_PREFIJOS = 'prefijos/viewing',
  VIEWED_PREFIJOS = 'prefijos/viewed',
  VIEWING_PREFIJOS_FAILED = 'prefijos/viewing_failed',
}

export function searchPrefijos(searchOptions: TSearchOptions | string, keep?: boolean): ISearchPrefijosAction {
  return {
    type: PrefijosActionTypes.SEARCH_PREFIJOS,
    searchOptions: typeof searchOptions === 'string' ? { searchString: searchOptions } : searchOptions,
    keep: keep,
  }
}

export function searchingPrefijos(): ISearchingPrefijosAction {
  return {
    type: PrefijosActionTypes.SEARCHING_PREFIJOS,
  }
}

export function foundPrefijos(prefijos: IpaginatedPrefijos, keep?: boolean): IFoundPrefijosAction {
  return {
    type: PrefijosActionTypes.FOUND_PREFIJOS,
    keep: keep,
    payload: {
      prefijos,
    },
  }
}

export function searchingPrefijosFailed(): ISearchingPrefijosFailedAction {
  return {
    type: PrefijosActionTypes.SEARCHING_PREFIJOS_FAILED,
  }
}

export function loadPrefijos(loadOptions: TSearchOptions): ILoadPrefijosAction {
  return {
    type: PrefijosActionTypes.LOAD_PREFIJOS,
    loadOptions: loadOptions,
  }
}

export function loadingPrefijos(): ILoadingPrefijosAction {
  return {
    type: PrefijosActionTypes.LOADING_PREFIJOS,
  }
}

export function loadedPrefijos(prefijos: IpaginatedPrefijos): ILoadedPrefijosAction {
  return {
    type: PrefijosActionTypes.LOADED_PREFIJOS,
    payload: {
      prefijos,
    },
  }
}

export function loadingPrefijosFailed(): ILoadingPrefijosFailedAction {
  return {
    type: PrefijosActionTypes.LOADING_PREFIJOS_FAILED,
  }
}

export function addPrefijos(prefijo: IPrefijosItem): IAddPrefijosAction {
  return {
    type: PrefijosActionTypes.ADD_PREFIJOS,
    payload: prefijo,
  }
}

export function addingPrefijos(): IAddingPrefijosAction {
  return {
    type: PrefijosActionTypes.ADDING_PREFIJOS,
  }
}

export function addedPrefijos(prefijos: IpaginatedPrefijos): IAddedPrefijosAction {
  return {
    type: PrefijosActionTypes.ADDED_PREFIJOS,
    payload: {
      prefijos,
    },
  }
}

export function addingPrefijosFailed(errData: { data: { message: string; field?: string }; status: number }): IAddingPrefijosFailedAction {
  return {
    type: PrefijosActionTypes.ADDING_PREFIJOS_FAILED,
    message: errData.data.message,
    status: errData.status,
    field: errData.data.field,
  }
}

export function removePrefijo(prefijo: IPrefijosItem): IRemovePrefijoAction {
  return {
    type: PrefijosActionTypes.REMOVE_PREFIJO,
    payload: prefijo,
  }
}

export function removingPrefijo(): IRemovingPrefijoAction {
  return {
    type: PrefijosActionTypes.REMOVING_PREFIJO,
  }
}

export function removedPrefijo(): IRemovedPrefijoAction {
  return {
    type: PrefijosActionTypes.REMOVED_PREFIJO,
  }
}

export function removingPrefijoFailed(): IRemovingPrefijoFailedAction {
  return {
    type: PrefijosActionTypes.REMOVING_PREFIJO_FAILED,
  }
}

export function softRemovePrefijos(prefijo: IPrefijosItem): ISoftRemovePrefijosAction {
  return {
    type: PrefijosActionTypes.SOFT_REMOVE_PREFIJOS,
    payload: prefijo,
  }
}

export function softRemovingPrefijos(): ISoftRemovingPrefijosAction {
  return {
    type: PrefijosActionTypes.SOFT_REMOVING_PREFIJOS,
  }
}

export function softRemovedPrefijos(prefijo: IPrefijosItem): ISoftRemovedPrefijosAction {
  return {
    type: PrefijosActionTypes.SOFT_REMOVED_PREFIJOS,
    payload: prefijo,
  }
}

export function softRemovingPrefijosFailed(errData: {
  data: { message: string; field?: string }
  status: number
}): ISoftRemovingPrefijosFailedAction {
  return {
    type: PrefijosActionTypes.SOFT_REMOVING_PREFIJOS_FAILED,
    message: errData.data.message,
    status: errData.status,
    field: errData.data.field,
  }
}

export function editPrefijos(prefijo: IPrefijosItem): IEditPrefijosAction {
  return {
    type: PrefijosActionTypes.EDIT_PREFIJOS,
    payload: prefijo,
  }
}

export function editingPrefijos(): IEditingPrefijosAction {
  return {
    type: PrefijosActionTypes.EDITING_PREFIJOS,
  }
}

export function editedPrefijos(prefijos: IPrefijosItem): IEditedPrefijosAction {
  return {
    type: PrefijosActionTypes.EDITED_PREFIJOS,
    payload: prefijos,
  }
}

export function editingPrefijosFailed(errData: { data: { message: string; field?: string }; status: number }): IEditingPrefijosFailedAction {
  return {
    type: PrefijosActionTypes.EDITING_PREFIJOS_FAILED,
    message: errData.data.message,
    status: errData.status,
    field: errData.data.field,
  }
}

export function viewPrefijos(prefijo: IPrefijosItem): IViewPrefijosAction {
  return {
    type: PrefijosActionTypes.VIEW_PREFIJOS,
    payload: prefijo,
  }
}

export function viewingPrefijos(): IViewingPrefijosAction {
  return {
    type: PrefijosActionTypes.VIEWING_PREFIJOS,
  }
}

export function viewedPrefijos(prefijos: IPrefijosItem): IViewedPrefijosAction {
  return {
    type: PrefijosActionTypes.VIEWED_PREFIJOS,
    payload: prefijos,
  }
}

export function viewingPrefijosFailed(): IViewingPrefijosFailedAction {
  return {
    type: PrefijosActionTypes.VIEWING_PREFIJOS_FAILED,
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

export interface ISearchPrefijosAction {
  type: PrefijosActionTypes.SEARCH_PREFIJOS
  searchOptions: TSearchOptions
  keep?: boolean
}

export interface ISearchingPrefijosAction {
  type: PrefijosActionTypes.SEARCHING_PREFIJOS
}

export interface IFoundPrefijosAction {
  type: PrefijosActionTypes.FOUND_PREFIJOS
  keep?: boolean
  payload: {
    prefijos: IpaginatedPrefijos
  }
}

export interface ISearchingPrefijosFailedAction {
  type: PrefijosActionTypes.SEARCHING_PREFIJOS_FAILED
}

export interface ILoadPrefijosAction {
  type: PrefijosActionTypes.LOAD_PREFIJOS
  loadOptions: TSearchOptions
}

export interface ILoadingPrefijosAction {
  type: PrefijosActionTypes.LOADING_PREFIJOS
}

export interface ILoadedPrefijosAction {
  type: PrefijosActionTypes.LOADED_PREFIJOS
  payload: {
    prefijos: IpaginatedPrefijos
  }
}

export interface ILoadingPrefijosFailedAction {
  type: PrefijosActionTypes.LOADING_PREFIJOS_FAILED
}

export interface IAddPrefijosAction {
  type: PrefijosActionTypes.ADD_PREFIJOS
  payload: IPrefijosItem
}

export interface IAddingPrefijosAction {
  type: PrefijosActionTypes.ADDING_PREFIJOS
}

export interface IAddedPrefijosAction {
  type: PrefijosActionTypes.ADDED_PREFIJOS
  payload: {
    prefijos: IpaginatedPrefijos
  }
}

export interface IAddingPrefijosFailedAction {
  type: PrefijosActionTypes.ADDING_PREFIJOS_FAILED
  message: string
  status: number
  field?: string
}

export interface IRemovePrefijoAction {
  type: PrefijosActionTypes.REMOVE_PREFIJO
  payload: IPrefijosItem
}

export interface IRemovingPrefijoAction {
  type: PrefijosActionTypes.REMOVING_PREFIJO
}

export interface IRemovedPrefijoAction {
  type: PrefijosActionTypes.REMOVED_PREFIJO
}

export interface IRemovingPrefijoFailedAction {
  type: PrefijosActionTypes.REMOVING_PREFIJO_FAILED
}

export interface ISoftRemovePrefijosAction {
  type: PrefijosActionTypes.SOFT_REMOVE_PREFIJOS
  payload: IPrefijosItem
}

export interface ISoftRemovingPrefijosAction {
  type: PrefijosActionTypes.SOFT_REMOVING_PREFIJOS
}

export interface ISoftRemovedPrefijosAction {
  type: PrefijosActionTypes.SOFT_REMOVED_PREFIJOS
  payload: IPrefijosItem
}

export interface ISoftRemovingPrefijosFailedAction {
  type: PrefijosActionTypes.SOFT_REMOVING_PREFIJOS_FAILED
  message: string
  status: number
  field?: string
}

export interface IEditPrefijosAction {
  type: PrefijosActionTypes.EDIT_PREFIJOS
  payload: IPrefijosItem
}

export interface IEditingPrefijosAction {
  type: PrefijosActionTypes.EDITING_PREFIJOS
}

export interface IEditedPrefijosAction {
  type: PrefijosActionTypes.EDITED_PREFIJOS
  payload: IPrefijosItem
}

export interface IEditingPrefijosFailedAction {
  type: PrefijosActionTypes.EDITING_PREFIJOS_FAILED
  message: string
  status: number
  field?: string
}

export interface IViewPrefijosAction {
  type: PrefijosActionTypes.VIEW_PREFIJOS
  payload: IPrefijosItem
}

export interface IViewingPrefijosAction {
  type: PrefijosActionTypes.VIEWING_PREFIJOS
}

export interface IViewedPrefijosAction {
  type: PrefijosActionTypes.VIEWED_PREFIJOS
  payload: IPrefijosItem
}

export interface IViewingPrefijosFailedAction {
  type: PrefijosActionTypes.VIEWING_PREFIJOS_FAILED
}

export type PrefijosAction =
  | ISearchPrefijosAction
  | ISearchingPrefijosAction
  | IFoundPrefijosAction
  | ISearchingPrefijosFailedAction
  | ILoadPrefijosAction
  | ILoadingPrefijosAction
  | ILoadedPrefijosAction
  | ILoadingPrefijosFailedAction
  | IAddPrefijosAction
  | IAddingPrefijosAction
  | IAddedPrefijosAction
  | IAddingPrefijosFailedAction
  | IRemovePrefijoAction
  | IRemovingPrefijoAction
  | IRemovedPrefijoAction
  | IRemovingPrefijoFailedAction
  | ISoftRemovePrefijosAction
  | ISoftRemovingPrefijosAction
  | ISoftRemovedPrefijosAction
  | ISoftRemovingPrefijosFailedAction
  | IEditPrefijosAction
  | IEditingPrefijosAction
  | IEditedPrefijosAction
  | IEditingPrefijosFailedAction
  | IViewPrefijosAction
  | IViewingPrefijosAction
  | IViewedPrefijosAction
  | IViewingPrefijosFailedAction
