export interface ISuscriptoresItem {
  _id?: String
  createdAt: Date

  Nombre: string

  Apellido: string

  Correoelectronico: string

  Telfono: string
  Mensaje: String
}

export interface IpaginatedSuscriptores {
  docs: ISuscriptoresItem[]
  totalDocs: number
  offset: number
  limit: number
  totalPages: number
  page: number
  pagingCounter: number
  hasPrevPage: boolean
  hasNextPage: boolean
  prevPage: number | null
  nextPage: number | null
}
export interface IPaisesItem {
  _id?: String
  createdAt: Date
  Pais: IDatospaisesItem
}

export interface IpaginatedPaises {
  docs: IPaisesItem[]
  totalDocs: number
  offset: number
  limit: number
  totalPages: number
  page: number
  pagingCounter: number
  hasPrevPage: boolean
  hasNextPage: boolean
  prevPage: number | null
  nextPage: number | null
}
export interface IDatospaisesItem {
  _id?: String
  createdAt: Date

  DataPais: string
  // DatosPaises - Paises - Pais - DatosPaises - DataPais
  Paises: IPaisesItem[]
}

export interface IpaginatedDatospaises {
  docs: IDatospaisesItem[]
  totalDocs: number
  offset: number
  limit: number
  totalPages: number
  page: number
  pagingCounter: number
  hasPrevPage: boolean
  hasNextPage: boolean
  prevPage: number | null
  nextPage: number | null
}

export enum ApiStatus {
  NOTLOADED = 'notloaded',
  LOADING = 'loading',
  LOADED = 'loaded',
  FAILED = 'failed',
}
