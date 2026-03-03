import { IDatospaisesItem, IpaginatedDatospaises } from '../models'

export enum DatospaisesActionTypes {
  SEARCH_DATOSPAISES = 'datospaises/search',
  SEARCHING_DATOSPAISES = 'datospaises/searching',
  FOUND_DATOSPAISES = 'datospaises/found',
  SEARCHING_DATOSPAISES_FAILED = 'datospaises/searching_failed',

  LOAD_DATOSPAISES = 'datospaises/load',
  LOADING_DATOSPAISES = 'datospaises/loading',
  LOADED_DATOSPAISES = 'datospaises/loaded',
  LOADING_DATOSPAISES_FAILED = 'datospaises/loading_failed',

  ADD_DATOSPAISES = 'datospaises/add',
  ADDING_DATOSPAISES = 'datospaises/adding',
  ADDED_DATOSPAISES = 'datospaises/added',
  ADDING_DATOSPAISES_FAILED = 'datospaises/adding_failed',

  REMOVE_DATOPAIS = 'datospaises/remove',
  REMOVING_DATOPAIS = 'datospaises/removing',
  REMOVED_DATOPAIS = 'datospaises/removed',
  REMOVING_DATOPAIS_FAILED = 'datospaises/removing_failed',

  SOFT_REMOVE_DATOSPAISES = 'datospaises/soft_remove',
  SOFT_REMOVING_DATOSPAISES = 'datospaises/soft_removing',
  SOFT_REMOVED_DATOSPAISES = 'datospaises/soft_removed',
  SOFT_REMOVING_DATOSPAISES_FAILED = 'datospaises/soft_removing_failed',

  EDIT_DATOSPAISES = 'datospaises/edit',
  EDITING_DATOSPAISES = 'datospaises/editing',
  EDITED_DATOSPAISES = 'datospaises/edited',
  EDITING_DATOSPAISES_FAILED = 'datospaises/editing_failed',

  VIEW_DATOSPAISES = 'datospaises/view',
  VIEWING_DATOSPAISES = 'datospaises/viewing',
  VIEWED_DATOSPAISES = 'datospaises/viewed',
  VIEWING_DATOSPAISES_FAILED = 'datospaises/viewing_failed',
}

export function searchDatospaises(searchOptions: TSearchOptions | string, keep?: boolean): ISearchDatospaisesAction {
  return {
    type: DatospaisesActionTypes.SEARCH_DATOSPAISES,
    searchOptions: typeof searchOptions === 'string' ? { searchString: searchOptions } : searchOptions,
    keep: keep,
  }
}

export function searchingDatospaises(): ISearchingDatospaisesAction {
  return {
    type: DatospaisesActionTypes.SEARCHING_DATOSPAISES,
  }
}

export function foundDatospaises(datospaises: IpaginatedDatospaises, keep?: boolean): IFoundDatospaisesAction {
  return {
    type: DatospaisesActionTypes.FOUND_DATOSPAISES,
    keep: keep,
    payload: {
      datospaises,
    },
  }
}

export function searchingDatospaisesFailed(): ISearchingDatospaisesFailedAction {
  return {
    type: DatospaisesActionTypes.SEARCHING_DATOSPAISES_FAILED,
  }
}

export function loadDatospaises(loadOptions: TSearchOptions): ILoadDatospaisesAction {
  return {
    type: DatospaisesActionTypes.LOAD_DATOSPAISES,
    loadOptions: loadOptions,
  }
}

export function loadingDatospaises(): ILoadingDatospaisesAction {
  return {
    type: DatospaisesActionTypes.LOADING_DATOSPAISES,
  }
}

export function loadedDatospaises(datospaises: IpaginatedDatospaises): ILoadedDatospaisesAction {
  return {
    type: DatospaisesActionTypes.LOADED_DATOSPAISES,
    payload: {
      datospaises,
    },
  }
}

export function loadingDatospaisesFailed(): ILoadingDatospaisesFailedAction {
  return {
    type: DatospaisesActionTypes.LOADING_DATOSPAISES_FAILED,
  }
}

export function addDatospaises(datopais: IDatospaisesItem): IAddDatospaisesAction {
  return {
    type: DatospaisesActionTypes.ADD_DATOSPAISES,
    payload: datopais,
  }
}

export function addingDatospaises(): IAddingDatospaisesAction {
  return {
    type: DatospaisesActionTypes.ADDING_DATOSPAISES,
  }
}

export function addedDatospaises(datospaises: IpaginatedDatospaises): IAddedDatospaisesAction {
  return {
    type: DatospaisesActionTypes.ADDED_DATOSPAISES,
    payload: {
      datospaises,
    },
  }
}

export function addingDatospaisesFailed(errData: { data: { message: string; field?: string }; status: number }): IAddingDatospaisesFailedAction {
  return {
    type: DatospaisesActionTypes.ADDING_DATOSPAISES_FAILED,
    message: errData.data.message,
    status: errData.status,
    field: errData.data.field,
  }
}

export function removeDatopais(datopais: IDatospaisesItem): IRemoveDatopaisAction {
  return {
    type: DatospaisesActionTypes.REMOVE_DATOPAIS,
    payload: datopais,
  }
}

export function removingDatopais(): IRemovingDatopaisAction {
  return {
    type: DatospaisesActionTypes.REMOVING_DATOPAIS,
  }
}

export function removedDatopais(): IRemovedDatopaisAction {
  return {
    type: DatospaisesActionTypes.REMOVED_DATOPAIS,
  }
}

export function removingDatopaisFailed(): IRemovingDatopaisFailedAction {
  return {
    type: DatospaisesActionTypes.REMOVING_DATOPAIS_FAILED,
  }
}

export function softRemoveDatospaises(datopais: IDatospaisesItem): ISoftRemoveDatospaisesAction {
  return {
    type: DatospaisesActionTypes.SOFT_REMOVE_DATOSPAISES,
    payload: datopais,
  }
}

export function softRemovingDatospaises(): ISoftRemovingDatospaisesAction {
  return {
    type: DatospaisesActionTypes.SOFT_REMOVING_DATOSPAISES,
  }
}

export function softRemovedDatospaises(datopais: IDatospaisesItem): ISoftRemovedDatospaisesAction {
  return {
    type: DatospaisesActionTypes.SOFT_REMOVED_DATOSPAISES,
    payload: datopais,
  }
}

export function softRemovingDatospaisesFailed(errData: {
  data: { message: string; field?: string }
  status: number
}): ISoftRemovingDatospaisesFailedAction {
  return {
    type: DatospaisesActionTypes.SOFT_REMOVING_DATOSPAISES_FAILED,
    message: errData.data.message,
    status: errData.status,
    field: errData.data.field,
  }
}

export function editDatospaises(datopais: IDatospaisesItem): IEditDatospaisesAction {
  return {
    type: DatospaisesActionTypes.EDIT_DATOSPAISES,
    payload: datopais,
  }
}

export function editingDatospaises(): IEditingDatospaisesAction {
  return {
    type: DatospaisesActionTypes.EDITING_DATOSPAISES,
  }
}

export function editedDatospaises(datospaises: IDatospaisesItem): IEditedDatospaisesAction {
  return {
    type: DatospaisesActionTypes.EDITED_DATOSPAISES,
    payload: datospaises,
  }
}

export function editingDatospaisesFailed(errData: { data: { message: string; field?: string }; status: number }): IEditingDatospaisesFailedAction {
  return {
    type: DatospaisesActionTypes.EDITING_DATOSPAISES_FAILED,
    message: errData.data.message,
    status: errData.status,
    field: errData.data.field,
  }
}

export function viewDatospaises(datopais: IDatospaisesItem): IViewDatospaisesAction {
  return {
    type: DatospaisesActionTypes.VIEW_DATOSPAISES,
    payload: datopais,
  }
}

export function viewingDatospaises(): IViewingDatospaisesAction {
  return {
    type: DatospaisesActionTypes.VIEWING_DATOSPAISES,
  }
}

export function viewedDatospaises(datospaises: IDatospaisesItem): IViewedDatospaisesAction {
  return {
    type: DatospaisesActionTypes.VIEWED_DATOSPAISES,
    payload: datospaises,
  }
}

export function viewingDatospaisesFailed(): IViewingDatospaisesFailedAction {
  return {
    type: DatospaisesActionTypes.VIEWING_DATOSPAISES_FAILED,
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

export interface ISearchDatospaisesAction {
  type: DatospaisesActionTypes.SEARCH_DATOSPAISES
  searchOptions: TSearchOptions
  keep?: boolean
}

export interface ISearchingDatospaisesAction {
  type: DatospaisesActionTypes.SEARCHING_DATOSPAISES
}

export interface IFoundDatospaisesAction {
  type: DatospaisesActionTypes.FOUND_DATOSPAISES
  keep?: boolean
  payload: {
    datospaises: IpaginatedDatospaises
  }
}

export interface ISearchingDatospaisesFailedAction {
  type: DatospaisesActionTypes.SEARCHING_DATOSPAISES_FAILED
}

export interface ILoadDatospaisesAction {
  type: DatospaisesActionTypes.LOAD_DATOSPAISES
  loadOptions: TSearchOptions
}

export interface ILoadingDatospaisesAction {
  type: DatospaisesActionTypes.LOADING_DATOSPAISES
}

export interface ILoadedDatospaisesAction {
  type: DatospaisesActionTypes.LOADED_DATOSPAISES
  payload: {
    datospaises: IpaginatedDatospaises
  }
}

export interface ILoadingDatospaisesFailedAction {
  type: DatospaisesActionTypes.LOADING_DATOSPAISES_FAILED
}

export interface IAddDatospaisesAction {
  type: DatospaisesActionTypes.ADD_DATOSPAISES
  payload: IDatospaisesItem
}

export interface IAddingDatospaisesAction {
  type: DatospaisesActionTypes.ADDING_DATOSPAISES
}

export interface IAddedDatospaisesAction {
  type: DatospaisesActionTypes.ADDED_DATOSPAISES
  payload: {
    datospaises: IpaginatedDatospaises
  }
}

export interface IAddingDatospaisesFailedAction {
  type: DatospaisesActionTypes.ADDING_DATOSPAISES_FAILED
  message: string
  status: number
  field?: string
}

export interface IRemoveDatopaisAction {
  type: DatospaisesActionTypes.REMOVE_DATOPAIS
  payload: IDatospaisesItem
}

export interface IRemovingDatopaisAction {
  type: DatospaisesActionTypes.REMOVING_DATOPAIS
}

export interface IRemovedDatopaisAction {
  type: DatospaisesActionTypes.REMOVED_DATOPAIS
}

export interface IRemovingDatopaisFailedAction {
  type: DatospaisesActionTypes.REMOVING_DATOPAIS_FAILED
}

export interface ISoftRemoveDatospaisesAction {
  type: DatospaisesActionTypes.SOFT_REMOVE_DATOSPAISES
  payload: IDatospaisesItem
}

export interface ISoftRemovingDatospaisesAction {
  type: DatospaisesActionTypes.SOFT_REMOVING_DATOSPAISES
}

export interface ISoftRemovedDatospaisesAction {
  type: DatospaisesActionTypes.SOFT_REMOVED_DATOSPAISES
  payload: IDatospaisesItem
}

export interface ISoftRemovingDatospaisesFailedAction {
  type: DatospaisesActionTypes.SOFT_REMOVING_DATOSPAISES_FAILED
  message: string
  status: number
  field?: string
}

export interface IEditDatospaisesAction {
  type: DatospaisesActionTypes.EDIT_DATOSPAISES
  payload: IDatospaisesItem
}

export interface IEditingDatospaisesAction {
  type: DatospaisesActionTypes.EDITING_DATOSPAISES
}

export interface IEditedDatospaisesAction {
  type: DatospaisesActionTypes.EDITED_DATOSPAISES
  payload: IDatospaisesItem
}

export interface IEditingDatospaisesFailedAction {
  type: DatospaisesActionTypes.EDITING_DATOSPAISES_FAILED
  message: string
  status: number
  field?: string
}

export interface IViewDatospaisesAction {
  type: DatospaisesActionTypes.VIEW_DATOSPAISES
  payload: IDatospaisesItem
}

export interface IViewingDatospaisesAction {
  type: DatospaisesActionTypes.VIEWING_DATOSPAISES
}

export interface IViewedDatospaisesAction {
  type: DatospaisesActionTypes.VIEWED_DATOSPAISES
  payload: IDatospaisesItem
}

export interface IViewingDatospaisesFailedAction {
  type: DatospaisesActionTypes.VIEWING_DATOSPAISES_FAILED
}

export type DatospaisesAction =
  | ISearchDatospaisesAction
  | ISearchingDatospaisesAction
  | IFoundDatospaisesAction
  | ISearchingDatospaisesFailedAction
  | ILoadDatospaisesAction
  | ILoadingDatospaisesAction
  | ILoadedDatospaisesAction
  | ILoadingDatospaisesFailedAction
  | IAddDatospaisesAction
  | IAddingDatospaisesAction
  | IAddedDatospaisesAction
  | IAddingDatospaisesFailedAction
  | IRemoveDatopaisAction
  | IRemovingDatopaisAction
  | IRemovedDatopaisAction
  | IRemovingDatopaisFailedAction
  | ISoftRemoveDatospaisesAction
  | ISoftRemovingDatospaisesAction
  | ISoftRemovedDatospaisesAction
  | ISoftRemovingDatospaisesFailedAction
  | IEditDatospaisesAction
  | IEditingDatospaisesAction
  | IEditedDatospaisesAction
  | IEditingDatospaisesFailedAction
  | IViewDatospaisesAction
  | IViewingDatospaisesAction
  | IViewedDatospaisesAction
  | IViewingDatospaisesFailedAction
