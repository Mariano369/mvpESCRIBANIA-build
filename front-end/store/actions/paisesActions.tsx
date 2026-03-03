import { IpaginatedPaises, IPaisesItem } from '../models'

export enum PaisesActionTypes {
  SEARCH_PAISES = 'paises/search',
  SEARCHING_PAISES = 'paises/searching',
  FOUND_PAISES = 'paises/found',
  SEARCHING_PAISES_FAILED = 'paises/searching_failed',

  LOAD_PAISES = 'paises/load',
  LOADING_PAISES = 'paises/loading',
  LOADED_PAISES = 'paises/loaded',
  LOADING_PAISES_FAILED = 'paises/loading_failed',

  ADD_PAISES = 'paises/add',
  ADDING_PAISES = 'paises/adding',
  ADDED_PAISES = 'paises/added',
  ADDING_PAISES_FAILED = 'paises/adding_failed',

  REMOVE_PAIS = 'paises/remove',
  REMOVING_PAIS = 'paises/removing',
  REMOVED_PAIS = 'paises/removed',
  REMOVING_PAIS_FAILED = 'paises/removing_failed',

  SOFT_REMOVE_PAISES = 'paises/soft_remove',
  SOFT_REMOVING_PAISES = 'paises/soft_removing',
  SOFT_REMOVED_PAISES = 'paises/soft_removed',
  SOFT_REMOVING_PAISES_FAILED = 'paises/soft_removing_failed',

  EDIT_PAISES = 'paises/edit',
  EDITING_PAISES = 'paises/editing',
  EDITED_PAISES = 'paises/edited',
  EDITING_PAISES_FAILED = 'paises/editing_failed',

  VIEW_PAISES = 'paises/view',
  VIEWING_PAISES = 'paises/viewing',
  VIEWED_PAISES = 'paises/viewed',
  VIEWING_PAISES_FAILED = 'paises/viewing_failed',
}

export function searchPaises(searchOptions: TSearchOptions | string, keep?: boolean): ISearchPaisesAction {
  return {
    type: PaisesActionTypes.SEARCH_PAISES,
    searchOptions: typeof searchOptions === 'string' ? { searchString: searchOptions } : searchOptions,
    keep: keep,
  }
}

export function searchingPaises(): ISearchingPaisesAction {
  return {
    type: PaisesActionTypes.SEARCHING_PAISES,
  }
}

export function foundPaises(paises: IpaginatedPaises, keep?: boolean): IFoundPaisesAction {
  return {
    type: PaisesActionTypes.FOUND_PAISES,
    keep: keep,
    payload: {
      paises,
    },
  }
}

export function searchingPaisesFailed(): ISearchingPaisesFailedAction {
  return {
    type: PaisesActionTypes.SEARCHING_PAISES_FAILED,
  }
}

export function loadPaises(loadOptions: TSearchOptions): ILoadPaisesAction {
  return {
    type: PaisesActionTypes.LOAD_PAISES,
    loadOptions: loadOptions,
  }
}

export function loadingPaises(): ILoadingPaisesAction {
  return {
    type: PaisesActionTypes.LOADING_PAISES,
  }
}

export function loadedPaises(paises: IpaginatedPaises): ILoadedPaisesAction {
  return {
    type: PaisesActionTypes.LOADED_PAISES,
    payload: {
      paises,
    },
  }
}

export function loadingPaisesFailed(): ILoadingPaisesFailedAction {
  return {
    type: PaisesActionTypes.LOADING_PAISES_FAILED,
  }
}

export function addPaises(pais: IPaisesItem): IAddPaisesAction {
  return {
    type: PaisesActionTypes.ADD_PAISES,
    payload: pais,
  }
}

export function addingPaises(): IAddingPaisesAction {
  return {
    type: PaisesActionTypes.ADDING_PAISES,
  }
}

export function addedPaises(paises: IpaginatedPaises): IAddedPaisesAction {
  return {
    type: PaisesActionTypes.ADDED_PAISES,
    payload: {
      paises,
    },
  }
}

export function addingPaisesFailed(errData: { data: { message: string; field?: string }; status: number }): IAddingPaisesFailedAction {
  return {
    type: PaisesActionTypes.ADDING_PAISES_FAILED,
    message: errData.data.message,
    status: errData.status,
    field: errData.data.field,
  }
}

export function removePais(pais: IPaisesItem): IRemovePaisAction {
  return {
    type: PaisesActionTypes.REMOVE_PAIS,
    payload: pais,
  }
}

export function removingPais(): IRemovingPaisAction {
  return {
    type: PaisesActionTypes.REMOVING_PAIS,
  }
}

export function removedPais(): IRemovedPaisAction {
  return {
    type: PaisesActionTypes.REMOVED_PAIS,
  }
}

export function removingPaisFailed(): IRemovingPaisFailedAction {
  return {
    type: PaisesActionTypes.REMOVING_PAIS_FAILED,
  }
}

export function softRemovePaises(pais: IPaisesItem): ISoftRemovePaisesAction {
  return {
    type: PaisesActionTypes.SOFT_REMOVE_PAISES,
    payload: pais,
  }
}

export function softRemovingPaises(): ISoftRemovingPaisesAction {
  return {
    type: PaisesActionTypes.SOFT_REMOVING_PAISES,
  }
}

export function softRemovedPaises(pais: IPaisesItem): ISoftRemovedPaisesAction {
  return {
    type: PaisesActionTypes.SOFT_REMOVED_PAISES,
    payload: pais,
  }
}

export function softRemovingPaisesFailed(errData: { data: { message: string; field?: string }; status: number }): ISoftRemovingPaisesFailedAction {
  return {
    type: PaisesActionTypes.SOFT_REMOVING_PAISES_FAILED,
    message: errData.data.message,
    status: errData.status,
    field: errData.data.field,
  }
}

export function editPaises(pais: IPaisesItem): IEditPaisesAction {
  return {
    type: PaisesActionTypes.EDIT_PAISES,
    payload: pais,
  }
}

export function editingPaises(): IEditingPaisesAction {
  return {
    type: PaisesActionTypes.EDITING_PAISES,
  }
}

export function editedPaises(paises: IPaisesItem): IEditedPaisesAction {
  return {
    type: PaisesActionTypes.EDITED_PAISES,
    payload: paises,
  }
}

export function editingPaisesFailed(errData: { data: { message: string; field?: string }; status: number }): IEditingPaisesFailedAction {
  return {
    type: PaisesActionTypes.EDITING_PAISES_FAILED,
    message: errData.data.message,
    status: errData.status,
    field: errData.data.field,
  }
}

export function viewPaises(pais: IPaisesItem): IViewPaisesAction {
  return {
    type: PaisesActionTypes.VIEW_PAISES,
    payload: pais,
  }
}

export function viewingPaises(): IViewingPaisesAction {
  return {
    type: PaisesActionTypes.VIEWING_PAISES,
  }
}

export function viewedPaises(paises: IPaisesItem): IViewedPaisesAction {
  return {
    type: PaisesActionTypes.VIEWED_PAISES,
    payload: paises,
  }
}

export function viewingPaisesFailed(): IViewingPaisesFailedAction {
  return {
    type: PaisesActionTypes.VIEWING_PAISES_FAILED,
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

export interface ISearchPaisesAction {
  type: PaisesActionTypes.SEARCH_PAISES
  searchOptions: TSearchOptions
  keep?: boolean
}

export interface ISearchingPaisesAction {
  type: PaisesActionTypes.SEARCHING_PAISES
}

export interface IFoundPaisesAction {
  type: PaisesActionTypes.FOUND_PAISES
  keep?: boolean
  payload: {
    paises: IpaginatedPaises
  }
}

export interface ISearchingPaisesFailedAction {
  type: PaisesActionTypes.SEARCHING_PAISES_FAILED
}

export interface ILoadPaisesAction {
  type: PaisesActionTypes.LOAD_PAISES
  loadOptions: TSearchOptions
}

export interface ILoadingPaisesAction {
  type: PaisesActionTypes.LOADING_PAISES
}

export interface ILoadedPaisesAction {
  type: PaisesActionTypes.LOADED_PAISES
  payload: {
    paises: IpaginatedPaises
  }
}

export interface ILoadingPaisesFailedAction {
  type: PaisesActionTypes.LOADING_PAISES_FAILED
}

export interface IAddPaisesAction {
  type: PaisesActionTypes.ADD_PAISES
  payload: IPaisesItem
}

export interface IAddingPaisesAction {
  type: PaisesActionTypes.ADDING_PAISES
}

export interface IAddedPaisesAction {
  type: PaisesActionTypes.ADDED_PAISES
  payload: {
    paises: IpaginatedPaises
  }
}

export interface IAddingPaisesFailedAction {
  type: PaisesActionTypes.ADDING_PAISES_FAILED
  message: string
  status: number
  field?: string
}

export interface IRemovePaisAction {
  type: PaisesActionTypes.REMOVE_PAIS
  payload: IPaisesItem
}

export interface IRemovingPaisAction {
  type: PaisesActionTypes.REMOVING_PAIS
}

export interface IRemovedPaisAction {
  type: PaisesActionTypes.REMOVED_PAIS
}

export interface IRemovingPaisFailedAction {
  type: PaisesActionTypes.REMOVING_PAIS_FAILED
}

export interface ISoftRemovePaisesAction {
  type: PaisesActionTypes.SOFT_REMOVE_PAISES
  payload: IPaisesItem
}

export interface ISoftRemovingPaisesAction {
  type: PaisesActionTypes.SOFT_REMOVING_PAISES
}

export interface ISoftRemovedPaisesAction {
  type: PaisesActionTypes.SOFT_REMOVED_PAISES
  payload: IPaisesItem
}

export interface ISoftRemovingPaisesFailedAction {
  type: PaisesActionTypes.SOFT_REMOVING_PAISES_FAILED
  message: string
  status: number
  field?: string
}

export interface IEditPaisesAction {
  type: PaisesActionTypes.EDIT_PAISES
  payload: IPaisesItem
}

export interface IEditingPaisesAction {
  type: PaisesActionTypes.EDITING_PAISES
}

export interface IEditedPaisesAction {
  type: PaisesActionTypes.EDITED_PAISES
  payload: IPaisesItem
}

export interface IEditingPaisesFailedAction {
  type: PaisesActionTypes.EDITING_PAISES_FAILED
  message: string
  status: number
  field?: string
}

export interface IViewPaisesAction {
  type: PaisesActionTypes.VIEW_PAISES
  payload: IPaisesItem
}

export interface IViewingPaisesAction {
  type: PaisesActionTypes.VIEWING_PAISES
}

export interface IViewedPaisesAction {
  type: PaisesActionTypes.VIEWED_PAISES
  payload: IPaisesItem
}

export interface IViewingPaisesFailedAction {
  type: PaisesActionTypes.VIEWING_PAISES_FAILED
}

export type PaisesAction =
  | ISearchPaisesAction
  | ISearchingPaisesAction
  | IFoundPaisesAction
  | ISearchingPaisesFailedAction
  | ILoadPaisesAction
  | ILoadingPaisesAction
  | ILoadedPaisesAction
  | ILoadingPaisesFailedAction
  | IAddPaisesAction
  | IAddingPaisesAction
  | IAddedPaisesAction
  | IAddingPaisesFailedAction
  | IRemovePaisAction
  | IRemovingPaisAction
  | IRemovedPaisAction
  | IRemovingPaisFailedAction
  | ISoftRemovePaisesAction
  | ISoftRemovingPaisesAction
  | ISoftRemovedPaisesAction
  | ISoftRemovingPaisesFailedAction
  | IEditPaisesAction
  | IEditingPaisesAction
  | IEditedPaisesAction
  | IEditingPaisesFailedAction
  | IViewPaisesAction
  | IViewingPaisesAction
  | IViewedPaisesAction
  | IViewingPaisesFailedAction
