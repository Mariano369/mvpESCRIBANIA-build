module.exports = (app) => {
  const paises = require('../controllers/paises.controller.js')

  // Get all records
  app.get('/api/paises', async (req, res) => {
    paises.findAll({ req, res })
  })

  // Search records
  app.get('/api/paises/search', async (req, res) => {
    paises.find({ req, res }).then((result) => {
      res.send(result)
    })
  })

  // Retrieve a single record
  app.get('/api/paises/:ID', async (req, res) => {
    paises.findOne({ req, res }).then((result) => {
      res.send(result)
    })
  })

  // Add a record
  app.post('/api/paises', async (req, res) => {
    paises
      .createAsPromise({ req, res })
      .then((result) => {
        res.send(result)
      })
      .catch((e) => {
        res.status(e.code || 500).send(e)
      })
  })

  // Update a record
  app.put('/api/paises/:ID', async (req, res) => {
    paises
      .update({ req, res })
      .then((result) => {
        res.send(result)
      })
      .catch((e) => {
        res.status(500).send(e)
      })
  })

  // Delete a record
  app.delete('/api/paises/:ID', async (req, res) => {
    paises
      .delete({ req, res })
      .then((result) => {
        res.send(result)
      })
      .catch((e) => {
        res.status(500).send(e)
      })
  })
}
