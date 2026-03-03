const Paises = require('../models/paises.model.js')
const fs = require('fs')
const paginate = require('../paginate')
const errors = require('../services/errors.service')

// Create and Save a new Pais
exports.create = async (options) => {
  const data = options.req ? options.req.body : options.data
  const updatedData = {}

  updatedData['Pais'] = []
  try {
    const DatosPaises = require('../controllers/datospaises.controller.js')
    let ReceivedPais = typeof data.Pais === 'string' ? JSON.parse(data.Pais) : data.Pais
    PaisRaw = Array.isArray(ReceivedPais) ? ReceivedPais : [ReceivedPais]
    for await (const Paisinfo of PaisRaw) {
      const PaisFiles = {}

      if (!Paisinfo._id) {
        const mongoose = require('mongoose')
        let PaisID = new mongoose.Types.ObjectId()

        Object.keys(Paisinfo).forEach((info) => {
          if (
            Paisinfo[info] &&
            typeof Paisinfo[info] === 'object' &&
            (typeof Paisinfo[info].DataPais === 'string' || typeof Paisinfo.DataPais === 'string')
          ) {
            PaisFiles[info] = Paisinfo[info]
          }
        })

        let req = options.req || {}
        req.body = { ...Paisinfo, _id: PaisID }
        req.files = { ...PaisFiles }
        try {
          const result = await DatosPaises.createAsPromise({ req, res: options.res })
        } catch (e) {
          if (e.code === 422) {
            const duplicateError = await DatosPaises.find({ query: { searchField: e.field, searchString: Paisinfo[e.field] } })
            ContactsID = duplicateError.docs[0]._id
          }
        }

        updatedData['Pais'].push(PaisID)
      } else {
        DatosPaises.update({ ID: Paisinfo._id, data: Paisinfo })
        updatedData['Pais'].push(Paisinfo._id)
      }
    }
  } catch (e) {
    updatedData['Pais'] = data.Pais
  }

  // Create a Pais
  const Pais = new Paises(updatedData)

  // Save Pais in the database
  Pais.save()
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

    updatedData['Pais'] = []
    try {
      const DatosPaises = require('../controllers/datospaises.controller.js')
      let ReceivedPais = typeof data.Pais === 'string' ? JSON.parse(data.Pais) : data.Pais
      PaisRaw = Array.isArray(ReceivedPais) ? ReceivedPais : [ReceivedPais]
      for await (const Paisinfo of PaisRaw) {
        const PaisFiles = {}

        if (!Paisinfo._id) {
          const mongoose = require('mongoose')
          let PaisID = new mongoose.Types.ObjectId()

          Object.keys(Paisinfo).forEach((info) => {
            if (
              Paisinfo[info] &&
              typeof Paisinfo[info] === 'object' &&
              (typeof Paisinfo[info].DataPais === 'string' || typeof Paisinfo.DataPais === 'string')
            ) {
              PaisFiles[info] = Paisinfo[info]
            }
          })

          let req = options.req || {}
          req.body = { ...Paisinfo, _id: PaisID }
          req.files = { ...PaisFiles }
          try {
            const result = await DatosPaises.createAsPromise({ req, res: options.res })
          } catch (e) {
            if (e.code === 422) {
              const duplicateError = await DatosPaises.find({ query: { searchField: e.field, searchString: Paisinfo[e.field] } })
              ContactsID = duplicateError.docs[0]._id
            }
          }

          updatedData['Pais'].push(PaisID)
        } else {
          DatosPaises.update({ ID: Paisinfo._id, data: Paisinfo })
          updatedData['Pais'].push(Paisinfo._id)
        }
      }
    } catch (e) {
      updatedData['Pais'] = data.Pais
    }

    // Create a Pais
    const Pais = new Paises(updatedData)

    // Save Pais in the database
    Pais.save()
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

// Retrieve and return all Paises from the database.
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

  Paises.find(findString)
    .sort(query.sort && { [query.sort.field]: query.sort.method === 'desc' ? -1 : 1 })
    .collation({ locale: query.sortLanguage, strength: 1 })

    .populate(
      (query.populate === 'true' || query.populate?.indexOf('DatosPaises') > -1) && {
        strictPopulate: false,
        model: 'DatosPaises',
        path: 'Pais',
      }
    )
    .then((paises) => {
      options.res.json(paginate.paginate(paises, { page: query.page, limit: query.limit || 10 }))
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
      if (Paises.schema.path(query.searchField)?.instance === 'Boolean') {
        findString = { [query.searchField]: JSON.parse(query.searchString) }
      } else if (Paises.schema.path(query.searchField)?.instance === 'Date') {
        findString = { $expr: { $eq: [query.searchString, { $dateToString: { date: `$${query.searchField}`, format: '%Y-%m-%d' } }] } }
      } else {
        if (query.exactMatch) {
          findString = { [query.searchField]: query.searchString }
        } else {
          findString = { [query.searchField]: { $regex: new RegExp(query.searchString, 'i') } }
        }
      }

      if (Paises.schema.path(query.searchField)?.instance === 'ObjectId' || Paises.schema.path(query.searchField)?.instance === 'Array') {
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

    Paises.find(findString)
      .sort(query.sort && { [query.sort.field]: query.sort.method === 'desc' ? -1 : 1 })
      .collation({ locale: query.sortLanguage, strength: 1 })

      .populate(
        (query.populate === 'true' || query.populate?.indexOf('DatosPaises') > -1) && {
          strictPopulate: false,
          model: 'DatosPaises',
          path: 'Pais',
        }
      )
      .then((pais) => {
        resolve(paginate.paginate(pais, { page: query.page, limit: query.limit || 10 }))
      })
      .catch((err) => {
        options.res.status(500).send({
          message: err.message || 'Some error occurred while retrieving records.',
        })
      })
  })
}

// Find a single Pais with a ID
exports.findOne = (options) => {
  return new Promise((resolve, reject) => {
    const query = { populate: 'true' }
    const id = options.req ? options.req.params.ID : options.ID
    Paises.findById(id)

      .populate(
        (query.populate === 'true' || query.populate?.indexOf('DatosPaises') > -1) && {
          strictPopulate: false,
          model: 'DatosPaises',
          path: 'Pais',
        }
      )
      .then((pais) => {
        if (!pais) {
          return options.res.status(404).send({
            message: 'Pais not found with id ' + id,
          })
        }
        resolve(paginate.paginate([pais]))
      })
      .catch((err) => {
        if (err.kind === 'ObjectId') {
          return options.res.status(404).send({
            message: 'Pais not found with id ' + id,
          })
        }
        return options.res.status(500).send({
          message: 'Error retrieving Pais with id ' + id,
        })
      })
  })
}

// Update a pais identified by the ID in the request
exports.update = (options) => {
  return new Promise(async (resolve, reject) => {
    const id = options.req ? options.req.params.ID : options.ID
    const data = options.req ? options.req.body : options.data
    const updatedData = {}

    updatedData['Pais'] = []
    try {
      const DatosPaises = require('../controllers/datospaises.controller.js')
      let ReceivedPais = typeof data.Pais === 'string' ? JSON.parse(data.Pais) : data.Pais
      PaisRaw = Array.isArray(ReceivedPais) ? ReceivedPais : [ReceivedPais]
      for await (const Paisinfo of PaisRaw) {
        const PaisFiles = {}

        if (!Paisinfo._id) {
          const mongoose = require('mongoose')
          let PaisID = new mongoose.Types.ObjectId()

          Object.keys(Paisinfo).forEach((info) => {
            if (
              Paisinfo[info] &&
              typeof Paisinfo[info] === 'object' &&
              (typeof Paisinfo[info].DataPais === 'string' || typeof Paisinfo.DataPais === 'string')
            ) {
              PaisFiles[info] = Paisinfo[info]
            }
          })

          let req = options.req || {}
          req.body = { ...Paisinfo, _id: PaisID }
          req.files = { ...PaisFiles }
          try {
            const result = await DatosPaises.createAsPromise({ req, res: options.res })
          } catch (e) {
            if (e.code === 422) {
              const duplicateError = await DatosPaises.find({ query: { searchField: e.field, searchString: Paisinfo[e.field] } })
              ContactsID = duplicateError.docs[0]._id
            }
          }

          updatedData['Pais'].push(PaisID)
        } else {
          DatosPaises.update({ ID: Paisinfo._id, data: Paisinfo })
          updatedData['Pais'].push(Paisinfo._id)
        }
      }
    } catch (e) {
      updatedData['Pais'] = data.Pais
    }

    // Find Pais and update it with the request body
    const query = { populate: 'true' }
    Paises.findByIdAndUpdate(id, updatedData, { new: true })

      .populate(
        (query.populate === 'true' || query.populate?.indexOf('DatosPaises') > -1) && {
          strictPopulate: false,
          model: 'DatosPaises',
          path: 'Pais',
        }
      )
      .then((result) => {
        resolve(result)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

// Delete a pais with the specified ID in the request
exports.delete = (options) => {
  return new Promise((resolve, reject) => {
    const params = options.req ? options.req.params : options
    let theFilter = { _id: params.ID }

    if (options.queryString && options.queryField) {
      theFilter = { [options.queryField]: options.queryString }
    }
    Paises.deleteMany(theFilter)
      .then((result) => {
        resolve(result)
      })
      .catch((e) => {
        reject(e)
      })
  })
}

// Soft Delete a pais with the specified ID in the request
exports.softDelete = (options) => {
  return new Promise((resolve, reject) => {
    const params = options.req ? options.req.params : options
    const id = params.ID

    Paises.findByIdAndUpdate(id, { isDeleted: true, deletedAt: new Date() }, { new: true })
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
