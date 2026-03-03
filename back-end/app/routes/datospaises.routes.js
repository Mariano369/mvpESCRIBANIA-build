module.exports = (app) => {
  const datospaises = require('../controllers/datospaises.controller.js')

  // Get all records
  app.get('/api/datospaises', async (req, res) => {
    datospaises.findAll({ req, res })
  })

  // Search records
  app.get('/api/datospaises/search', async (req, res) => {
    datospaises.find({ req, res }).then((result) => {
      res.send(result)
    })
  })

  // Retrieve a single record
  app.get('/api/datospaises/:ID', async (req, res) => {
    datospaises.findOne({ req, res }).then((result) => {
      res.send(result)
    })
  })

  // Add a record
  app.post('/api/datospaises', async (req, res) => {
    datospaises
      .createAsPromise({ req, res })
      .then((result) => {
        res.send(result)
      })
      .catch((e) => {
        res.status(e.code || 500).send(e)
      })
  })

  // Update a record
  app.put('/api/datospaises/:ID', async (req, res) => {
    datospaises
      .update({ req, res })
      .then((result) => {
        res.send(result)
      })
      .catch((e) => {
        res.status(500).send(e)
      })
  })

  // Delete a record
  app.delete('/api/datospaises/:ID', async (req, res) => {
    datospaises
      .delete({ req, res })
      .then((result) => {
        res.send(result)
      })
      .catch((e) => {
        res.status(500).send(e)
      })
  })
}
