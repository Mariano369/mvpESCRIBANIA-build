import { IDataspaisesItem, IpaginatedDataspaises } from '../models'

export enum DataspaisesActionTypes {
  SEARCH_DATASPAISES = 'dataspaises/search',
  SEARCHING_DATASPAISES = 'dataspaises/searching',
  FOUND_DATASPAISES = 'dataspaises/found',
  SEARCHING_DATASPAISES_FAILED = 'dataspaises/searching_failed',

  LOAD_DATASPAISES = 'dataspaises/load',
  LOADING_DATASPAISES = 'dataspaises/loading',
  LOADED_DATASPAISES = 'dataspaises/loaded',
  LOADING_DATASPAISES_FAILED = 'dataspaises/loading_failed',

  ADD_DATASPAISES = 'dataspaises/add',
  ADDING_DATASPAISES = 'dataspaises/adding',
  ADDED_DATASPAISES = 'dataspaises/added',
  ADDING_DATASPAISES_FAILED = 'dataspaises/adding_failed',

  REMOVE_DATAPAISES = 'dataspaises/remove',
  REMOVING_DATAPAISES = 'dataspaises/removing',
  REMOVED_DATAPAISES = 'dataspaises/removed',
  REMOVING_DATAPAISES_FAILED = 'dataspaises/removing_failed',

  SOFT_REMOVE_DATASPAISES = 'dataspaises/soft_remove',
  SOFT_REMOVING_DATASPAISES = 'dataspaises/soft_removing',
  SOFT_REMOVED_DATASPAISES = 'dataspaises/soft_removed',
  SOFT_REMOVING_DATASPAISES_FAILED = 'dataspaises/soft_removing_failed',

  EDIT_DATASPAISES = 'dataspaises/edit',
  EDITING_DATASPAISES = 'dataspaises/editing',
  EDITED_DATASPAISES = 'dataspaises/edited',
  EDITING_DATASPAISES_FAILED = 'dataspaises/editing_failed',

  VIEW_DATASPAISES = 'dataspaises/view',
  VIEWING_DATASPAISES = 'dataspaises/viewing',
  VIEWED_DATASPAISES = 'dataspaises/viewed',
  VIEWING_DATASPAISES_FAILED = 'dataspaises/viewing_failed',
}

export function searchDataspaises(searchOptions: TSearchOptions | string, keep?: boolean): ISearchDataspaisesAction {
  return {
    type: DataspaisesActionTypes.SEARCH_DATASPAISES,
    searchOptions: typeof searchOptions === 'string' ? { searchString: searchOptions } : searchOptions,
    keep: keep,
  }
}

export function searchingDataspaises(): ISearchingDataspaisesAction {
  return {
    type: DataspaisesActionTypes.SEARCHING_DATASPAISES,
  }
}

export function foundDataspaises(dataspaises: IpaginatedDataspaises, keep?: boolean): IFoundDataspaisesAction {
  return {
    type: DataspaisesActionTypes.FOUND_DATASPAISES,
    keep: keep,
    payload: {
      dataspaises,
    },
  }
}

export function searchingDataspaisesFailed(): ISearchingDataspaisesFailedAction {
  return {
    type: DataspaisesActionTypes.SEARCHING_DATASPAISES_FAILED,
  }
}

export function loadDataspaises(loadOptions: TSearchOptions): ILoadDataspaisesAction {
  return {
    type: DataspaisesActionTypes.LOAD_DATASPAISES,
    loadOptions: loadOptions,
  }
}

export function loadingDataspaises(): ILoadingDataspaisesAction {
  return {
    type: DataspaisesActionTypes.LOADING_DATASPAISES,
  }
}

export function loadedDataspaises(dataspaises: IpaginatedDataspaises): ILoadedDataspaisesAction {
  return {
    type: DataspaisesActionTypes.LOADED_DATASPAISES,
    payload: {
      dataspaises,
    },
  }
}

export function loadingDataspaisesFailed(): ILoadingDataspaisesFailedAction {
  return {
    type: DataspaisesActionTypes.LOADING_DATASPAISES_FAILED,
  }
}

export function addDataspaises(datapaises: IDataspaisesItem): IAddDataspaisesAction {
  return {
    type: DataspaisesActionTypes.ADD_DATASPAISES,
    payload: datapaises,
  }
}

export function addingDataspaises(): IAddingDataspaisesAction {
  return {
    type: DataspaisesActionTypes.ADDING_DATASPAISES,
  }
}

export function addedDataspaises(dataspaises: IpaginatedDataspaises): IAddedDataspaisesAction {
  return {
    type: DataspaisesActionTypes.ADDED_DATASPAISES,
    payload: {
      dataspaises,
    },
  }
}

export function addingDataspaisesFailed(errData: { data: { message: string; field?: string }; status: number }): IAddingDataspaisesFailedAction {
  return {
    type: DataspaisesActionTypes.ADDING_DATASPAISES_FAILED,
    message: errData.data.message,
    status: errData.status,
    field: errData.data.field,
  }
}

export function removeDatapaises(datapaises: IDataspaisesItem): IRemoveDatapaisesAction {
  return {
    type: DataspaisesActionTypes.REMOVE_DATAPAISES,
    payload: datapaises,
  }
}

export function removingDatapaises(): IRemovingDatapaisesAction {
  return {
    type: DataspaisesActionTypes.REMOVING_DATAPAISES,
  }
}

export function removedDatapaises(): IRemovedDatapaisesAction {
  return {
    type: DataspaisesActionTypes.REMOVED_DATAPAISES,
  }
}

export function removingDatapaisesFailed(): IRemovingDatapaisesFailedAction {
  return {
    type: DataspaisesActionTypes.REMOVING_DATAPAISES_FAILED,
  }
}

export function softRemoveDataspaises(datapaises: IDataspaisesItem): ISoftRemoveDataspaisesAction {
  return {
    type: DataspaisesActionTypes.SOFT_REMOVE_DATASPAISES,
    payload: datapaises,
  }
}

export function softRemovingDataspaises(): ISoftRemovingDataspaisesAction {
  return {
    type: DataspaisesActionTypes.SOFT_REMOVING_DATASPAISES,
  }
}

export function softRemovedDataspaises(datapaises: IDataspaisesItem): ISoftRemovedDataspaisesAction {
  return {
    type: DataspaisesActionTypes.SOFT_REMOVED_DATASPAISES,
    payload: datapaises,
  }
}

export function softRemovingDataspaisesFailed(errData: {
  data: { message: string; field?: string }
  status: number
}): ISoftRemovingDataspaisesFailedAction {
  return {
    type: DataspaisesActionTypes.SOFT_REMOVING_DATASPAISES_FAILED,
    message: errData.data.message,
    status: errData.status,
    field: errData.data.field,
  }
}

export function editDataspaises(datapaises: IDataspaisesItem): IEditDataspaisesAction {
  return {
    type: DataspaisesActionTypes.EDIT_DATASPAISES,
    payload: datapaises,
  }
}

export function editingDataspaises(): IEditingDataspaisesAction {
  return {
    type: DataspaisesActionTypes.EDITING_DATASPAISES,
  }
}

export function editedDataspaises(dataspaises: IDataspaisesItem): IEditedDataspaisesAction {
  return {
    type: DataspaisesActionTypes.EDITED_DATASPAISES,
    payload: dataspaises,
  }
}

export function editingDataspaisesFailed(errData: { data: { message: string; field?: string }; status: number }): IEditingDataspaisesFailedAction {
  return {
    type: DataspaisesActionTypes.EDITING_DATASPAISES_FAILED,
    message: errData.data.message,
    status: errData.status,
    field: errData.data.field,
  }
}

export function viewDataspaises(datapaises: IDataspaisesItem): IViewDataspaisesAction {
  return {
    type: DataspaisesActionTypes.VIEW_DATASPAISES,
    payload: datapaises,
  }
}

export function viewingDataspaises(): IViewingDataspaisesAction {
  return {
    type: DataspaisesActionTypes.VIEWING_DATASPAISES,
  }
}

export function viewedDataspaises(dataspaises: IDataspaisesItem): IViewedDataspaisesAction {
  return {
    type: DataspaisesActionTypes.VIEWED_DATASPAISES,
    payload: dataspaises,
  }
}

export function viewingDataspaisesFailed(): IViewingDataspaisesFailedAction {
  return {
    type: DataspaisesActionTypes.VIEWING_DATASPAISES_FAILED,
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

export interface ISearchDataspaisesAction {
  type: DataspaisesActionTypes.SEARCH_DATASPAISES
  searchOptions: TSearchOptions
  keep?: boolean
}

export interface ISearchingDataspaisesAction {
  type: DataspaisesActionTypes.SEARCHING_DATASPAISES
}

export interface IFoundDataspaisesAction {
  type: DataspaisesActionTypes.FOUND_DATASPAISES
  keep?: boolean
  payload: {
    dataspaises: IpaginatedDataspaises
  }
}

export interface ISearchingDataspaisesFailedAction {
  type: DataspaisesActionTypes.SEARCHING_DATASPAISES_FAILED
}

export interface ILoadDataspaisesAction {
  type: DataspaisesActionTypes.LOAD_DATASPAISES
  loadOptions: TSearchOptions
}

export interface ILoadingDataspaisesAction {
  type: DataspaisesActionTypes.LOADING_DATASPAISES
}

export interface ILoadedDataspaisesAction {
  type: DataspaisesActionTypes.LOADED_DATASPAISES
  payload: {
    dataspaises: IpaginatedDataspaises
  }
}

export interface ILoadingDataspaisesFailedAction {
  type: DataspaisesActionTypes.LOADING_DATASPAISES_FAILED
}

export interface IAddDataspaisesAction {
  type: DataspaisesActionTypes.ADD_DATASPAISES
  payload: IDataspaisesItem
}

export interface IAddingDataspaisesAction {
  type: DataspaisesActionTypes.ADDING_DATASPAISES
}

export interface IAddedDataspaisesAction {
  type: DataspaisesActionTypes.ADDED_DATASPAISES
  payload: {
    dataspaises: IpaginatedDataspaises
  }
}

export interface IAddingDataspaisesFailedAction {
  type: DataspaisesActionTypes.ADDING_DATASPAISES_FAILED
  message: string
  status: number
  field?: string
}

export interface IRemoveDatapaisesAction {
  type: DataspaisesActionTypes.REMOVE_DATAPAISES
  payload: IDataspaisesItem
}

export interface IRemovingDatapaisesAction {
  type: DataspaisesActionTypes.REMOVING_DATAPAISES
}

export interface IRemovedDatapaisesAction {
  type: DataspaisesActionTypes.REMOVED_DATAPAISES
}

export interface IRemovingDatapaisesFailedAction {
  type: DataspaisesActionTypes.REMOVING_DATAPAISES_FAILED
}

export interface ISoftRemoveDataspaisesAction {
  type: DataspaisesActionTypes.SOFT_REMOVE_DATASPAISES
  payload: IDataspaisesItem
}

export interface ISoftRemovingDataspaisesAction {
  type: DataspaisesActionTypes.SOFT_REMOVING_DATASPAISES
}

export interface ISoftRemovedDataspaisesAction {
  type: DataspaisesActionTypes.SOFT_REMOVED_DATASPAISES
  payload: IDataspaisesItem
}

export interface ISoftRemovingDataspaisesFailedAction {
  type: DataspaisesActionTypes.SOFT_REMOVING_DATASPAISES_FAILED
  message: string
  status: number
  field?: string
}

export interface IEditDataspaisesAction {
  type: DataspaisesActionTypes.EDIT_DATASPAISES
  payload: IDataspaisesItem
}

export interface IEditingDataspaisesAction {
  type: DataspaisesActionTypes.EDITING_DATASPAISES
}

export interface IEditedDataspaisesAction {
  type: DataspaisesActionTypes.EDITED_DATASPAISES
  payload: IDataspaisesItem
}

export interface IEditingDataspaisesFailedAction {
  type: DataspaisesActionTypes.EDITING_DATASPAISES_FAILED
  message: string
  status: number
  field?: string
}

export interface IViewDataspaisesAction {
  type: DataspaisesActionTypes.VIEW_DATASPAISES
  payload: IDataspaisesItem
}

export interface IViewingDataspaisesAction {
  type: DataspaisesActionTypes.VIEWING_DATASPAISES
}

export interface IViewedDataspaisesAction {
  type: DataspaisesActionTypes.VIEWED_DATASPAISES
  payload: IDataspaisesItem
}

export interface IViewingDataspaisesFailedAction {
  type: DataspaisesActionTypes.VIEWING_DATASPAISES_FAILED
}

export type DataspaisesAction =
  | ISearchDataspaisesAction
  | ISearchingDataspaisesAction
  | IFoundDataspaisesAction
  | ISearchingDataspaisesFailedAction
  | ILoadDataspaisesAction
  | ILoadingDataspaisesAction
  | ILoadedDataspaisesAction
  | ILoadingDataspaisesFailedAction
  | IAddDataspaisesAction
  | IAddingDataspaisesAction
  | IAddedDataspaisesAction
  | IAddingDataspaisesFailedAction
  | IRemoveDatapaisesAction
  | IRemovingDatapaisesAction
  | IRemovedDatapaisesAction
  | IRemovingDatapaisesFailedAction
  | ISoftRemoveDataspaisesAction
  | ISoftRemovingDataspaisesAction
  | ISoftRemovedDataspaisesAction
  | ISoftRemovingDataspaisesFailedAction
  | IEditDataspaisesAction
  | IEditingDataspaisesAction
  | IEditedDataspaisesAction
  | IEditingDataspaisesFailedAction
  | IViewDataspaisesAction
  | IViewingDataspaisesAction
  | IViewedDataspaisesAction
  | IViewingDataspaisesFailedAction
