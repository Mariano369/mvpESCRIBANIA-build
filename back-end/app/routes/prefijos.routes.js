module.exports = (app) => {
  const prefijos = require('../controllers/prefijos.controller.js')

  // Get all records
  app.get('/api/prefijos', async (req, res) => {
    prefijos.findAll({ req, res })
  })

  // Search records
  app.get('/api/prefijos/search', async (req, res) => {
    prefijos.find({ req, res }).then((result) => {
      res.send(result)
    })
  })

  // Retrieve a single record
  app.get('/api/prefijos/:ID', async (req, res) => {
    prefijos.findOne({ req, res }).then((result) => {
      res.send(result)
    })
  })

  // Add a record
  app.post('/api/prefijos', async (req, res) => {
    prefijos
      .createAsPromise({ req, res })
      .then((result) => {
        res.send(result)
      })
      .catch((e) => {
        res.status(e.code || 500).send(e)
      })
  })

  // Update a record
  app.put('/api/prefijos/:ID', async (req, res) => {
    prefijos
      .update({ req, res })
      .then((result) => {
        res.send(result)
      })
      .catch((e) => {
        res.status(500).send(e)
      })
  })

  // Delete a record
  app.delete('/api/prefijos/:ID', async (req, res) => {
    prefijos
      .delete({ req, res })
      .then((result) => {
        res.send(result)
      })
      .catch((e) => {
        res.status(500).send(e)
      })
  })
}
