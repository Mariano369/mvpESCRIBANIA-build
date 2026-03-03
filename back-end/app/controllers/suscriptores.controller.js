const Suscriptores = require('../models/suscriptores.model.js')
const fs = require('fs')
const paginate = require('../paginate')
const errors = require('../services/errors.service')

// Create and Save a new Suscriptor
exports.create = async (options) => {
  const data = options.req ? options.req.body : options.data
  const updatedData = {}

  if (typeof data.Nombre !== 'undefined') updatedData['Nombre'] = data.Nombre
  if (typeof data.Apellido !== 'undefined') updatedData['Apellido'] = data.Apellido
  if (typeof data.Correoelectronico !== 'undefined') updatedData['Correoelectronico'] = data.Correoelectronico
  if (typeof data.Telfono !== 'undefined') updatedData['Telfono'] = data.Telfono
  if (typeof data.Mensaje !== 'undefined') updatedData['Mensaje'] = data.Mensaje
  // Create a Suscriptor
  const Suscriptor = new Suscriptores(updatedData)

  // Save Suscriptor in the database
  Suscriptor.save()
    .then((data) => {
      exports.findOne({ ID: data._id, res: options.res })
    })
    .catch((err) => {
      options.res.status(500).send({
        message: err.message || 'Some error occurred while saving the record.',
      })
    })
}

exports.createAsPromise = (options) => {
  return new Promise(async (resolve, reject) => {
    const data = options.req ? options.req.body : options.data
    const { errorMessages } = data
    const updatedData = {}
    if (data._id) updatedData._id = data._id

    if (typeof data.Nombre !== 'undefined') updatedData['Nombre'] = data.Nombre
    if (typeof data.Apellido !== 'undefined') updatedData['Apellido'] = data.Apellido
    if (typeof data.Correoelectronico !== 'undefined') updatedData['Correoelectronico'] = data.Correoelectronico
    if (typeof data.Telfono !== 'undefined') updatedData['Telfono'] = data.Telfono
    if (typeof data.Mensaje !== 'undefined') updatedData['Mensaje'] = data.Mensaje
    // Create a Suscriptor
    const Suscriptor = new Suscriptores(updatedData)

    // Save Suscriptor in the database
    Suscriptor.save()
      .then((result) => {
        if (options.skipfind) {
          resolve(result)
        } else {
          exports.findOne({ ID: result._id, res: options.res }).then((result) => {
            resolve(result)
          })
        }
      })
      .catch((err) => {
        reject(errors.prepareError(err, errorMessages))
      })
  })
}

// Retrieve and return all Suscriptores from the database.
exports.findAll = (options) => {
  const query = options.query ? options.query : options.req.query
  if (typeof query.populate === 'undefined') query.populate = 'true'
  const data = options.req ? options.req.body : options.data
  if (typeof query.sort === 'string') query.sort = JSON.parse(query.sort)
  if (!query.sortLanguage) query.sortLanguage = 'en'

  const findString = {}
  if (query.fixedSearch) {
    query.fixedSearch = JSON.parse(query.fixedSearch)
    findString[query.fixedSearch.field] = { $regex: new RegExp(query.fixedSearch.value, 'i') }
  }

  Suscriptores.find(findString)
    .sort(query.sort && { [query.sort.field]: query.sort.method === 'desc' ? -1 : 1 })
    .collation({ locale: query.sortLanguage, strength: 1 })

    .then((suscriptores) => {
      options.res.json(paginate.paginate(suscriptores, { page: query.page, limit: query.limit || 10 }))
    })
    .catch((err) => {
      options.res.status(500).send({
        message: err.message || 'Some error occurred while retrieving records.',
      })
    })
}

exports.find = (options) => {
  return new Promise((resolve, reject) => {
    const query = options.query ? options.query : options.req.query
    const data = options.req ? options.req.body : options.data
    let findString = query.searchString ? { $text: { $search: query.searchString } } : {}
    if (query.searchField) {
      if (Suscriptores.schema.path(query.searchField)?.instance === 'Boolean') {
        findString = { [query.searchField]: JSON.parse(query.searchString) }
      } else if (Suscriptores.schema.path(query.searchField)?.instance === 'Date') {
        findString = { $expr: { $eq: [query.searchString, { $dateToString: { date: `$${query.searchField}`, format: '%Y-%m-%d' } }] } }
      } else {
        if (query.exactMatch) {
          findString = { [query.searchField]: query.searchString }
        } else {
          findString = { [query.searchField]: { $regex: new RegExp(query.searchString, 'i') } }
        }
      }

      if (Suscriptores.schema.path(query.searchField)?.instance === 'ObjectId' || Suscriptores.schema.path(query.searchField)?.instance === 'Array') {
        const ObjectID = require('mongoose').Types.ObjectId
        findString = { [query.searchField]: query.searchString ? new ObjectID(query.searchString) : null }
      }
    } else if (query.filters) {
      query.filters.forEach((filter) => {
        const parsed = typeof filter === 'string' ? JSON.parse(filter) : filter
        findString[parsed.field] = parsed.value
      })
    }
    if (typeof query.sort === 'string') query.sort = JSON.parse(query.sort)
    if (!query.sortLanguage) query.sortLanguage = 'en'
    if (query.fixedSearch) {
      query.fixedSearch = JSON.parse(query.fixedSearch)
      findString[query.fixedSearch.field] = { $regex: new RegExp(query.fixedSearch.value, 'i') }
    }

    Suscriptores.find(findString)
      .sort(query.sort && { [query.sort.field]: query.sort.method === 'desc' ? -1 : 1 })
      .collation({ locale: query.sortLanguage, strength: 1 })

      .then((suscriptor) => {
        resolve(paginate.paginate(suscriptor, { page: query.page, limit: query.limit || 10 }))
      })
      .catch((err) => {
        options.res.status(500).send({
          message: err.message || 'Some error occurred while retrieving records.',
        })
      })
  })
}

// Find a single Suscriptor with a ID
exports.findOne = (options) => {
  return new Promise((resolve, reject) => {
    const query = { populate: 'true' }
    const id = options.req ? options.req.params.ID : options.ID
    Suscriptores.findById(id)

      .then((suscriptor) => {
        if (!suscriptor) {
          return options.res.status(404).send({
            message: 'Suscriptor not found with id ' + id,
          })
        }
        resolve(paginate.paginate([suscriptor]))
      })
      .catch((err) => {
        if (err.kind === 'ObjectId') {
          return options.res.status(404).send({
            message: 'Suscriptor not found with id ' + id,
          })
        }
        return options.res.status(500).send({
          message: 'Error retrieving Suscriptor with id ' + id,
        })
      })
  })
}

// Update a suscriptor identified by the ID in the request
exports.update = (options) => {
  return new Promise(async (resolve, reject) => {
    const id = options.req ? options.req.params.ID : options.ID
    const data = options.req ? options.req.body : options.data
    const updatedData = {}

    if (typeof data.Nombre !== 'undefined') updatedData['Nombre'] = data.Nombre
    if (typeof data.Apellido !== 'undefined') updatedData['Apellido'] = data.Apellido
    if (typeof data.Correoelectronico !== 'undefined') updatedData['Correoelectronico'] = data.Correoelectronico
    if (typeof data.Telfono !== 'undefined') updatedData['Telfono'] = data.Telfono
    if (typeof data.Mensaje !== 'undefined') updatedData['Mensaje'] = data.Mensaje
    // Find Suscriptor and update it with the request body
    const query = { populate: 'true' }
    Suscriptores.findByIdAndUpdate(id, updatedData, { new: true })

      .then((result) => {
        resolve(result)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

// Delete a suscriptor with the specified ID in the request
exports.delete = (options) => {
  return new Promise((resolve, reject) => {
    const params = options.req ? options.req.params : options
    let theFilter = { _id: params.ID }

    if (options.queryString && options.queryField) {
      theFilter = { [options.queryField]: options.queryString }
    }
    Suscriptores.deleteMany(theFilter)
      .then((result) => {
        resolve(result)
      })
      .catch((e) => {
        reject(e)
      })
  })
}

// Soft Delete a suscriptor with the specified ID in the request
exports.softDelete = (options) => {
  return new Promise((resolve, reject) => {
    const params = options.req ? options.req.params : options
    const id = params.ID

    Suscriptores.findByIdAndUpdate(id, { isDeleted: true, deletedAt: new Date() }, { new: true })
      .then((result) => {
        if (!result) {
          return reject({ message: 'Record not found', status: 404 })
        }
        resolve({ message: 'Record deleted', record: result })
      })
      .catch((e) => {
        reject(e)
      })
  })
}
