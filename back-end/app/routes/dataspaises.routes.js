module.exports = (app) => {
  const dataspaises = require('../controllers/dataspaises.controller.js')

  // Get all records
  app.get('/api/dataspaises', async (req, res) => {
    dataspaises.findAll({ req, res })
  })

  // Search records
  app.get('/api/dataspaises/search', async (req, res) => {
    dataspaises.find({ req, res }).then((result) => {
      res.send(result)
    })
  })

  // Retrieve a single record
  app.get('/api/dataspaises/:ID', async (req, res) => {
    dataspaises.findOne({ req, res }).then((result) => {
      res.send(result)
    })
  })

  // Add a record
  app.post('/api/dataspaises', async (req, res) => {
    dataspaises
      .createAsPromise({ req, res })
      .then((result) => {
        res.send(result)
      })
      .catch((e) => {
        res.status(e.code || 500).send(e)
      })
  })

  // Update a record
  app.put('/api/dataspaises/:ID', async (req, res) => {
    dataspaises
      .update({ req, res })
      .then((result) => {
        res.send(result)
      })
      .catch((e) => {
        res.status(500).send(e)
      })
  })

  // Delete a record
  app.delete('/api/dataspaises/:ID', async (req, res) => {
    dataspaises
      .delete({ req, res })
      .then((result) => {
        res.send(result)
      })
      .catch((e) => {
        res.status(500).send(e)
      })
  })
}
