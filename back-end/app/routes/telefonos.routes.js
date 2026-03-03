module.exports = (app) => {
  const telefonos = require('../controllers/telefonos.controller.js')

  // Get all records
  app.get('/api/telefonos', async (req, res) => {
    telefonos.findAll({ req, res })
  })

  // Search records
  app.get('/api/telefonos/search', async (req, res) => {
    telefonos.find({ req, res }).then((result) => {
      res.send(result)
    })
  })

  // Retrieve a single record
  app.get('/api/telefonos/:ID', async (req, res) => {
    telefonos.findOne({ req, res }).then((result) => {
      res.send(result)
    })
  })

  // Add a record
  app.post('/api/telefonos', async (req, res) => {
    telefonos
      .createAsPromise({ req, res })
      .then((result) => {
        res.send(result)
      })
      .catch((e) => {
        res.status(e.code || 500).send(e)
      })
  })

  // Update a record
  app.put('/api/telefonos/:ID', async (req, res) => {
    telefonos
      .update({ req, res })
      .then((result) => {
        res.send(result)
      })
      .catch((e) => {
        res.status(500).send(e)
      })
  })

  // Delete a record
  app.delete('/api/telefonos/:ID', async (req, res) => {
    telefonos
      .delete({ req, res })
      .then((result) => {
        res.send(result)
      })
      .catch((e) => {
        res.status(500).send(e)
      })
  })
}
