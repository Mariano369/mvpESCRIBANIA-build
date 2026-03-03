module.exports = (app) => {
  const suscriptores = require('../controllers/suscriptores.controller.js')

  // Get all records
  app.get('/api/suscriptores', async (req, res) => {
    suscriptores.findAll({ req, res })
  })

  // Search records
  app.get('/api/suscriptores/search', async (req, res) => {
    suscriptores.find({ req, res }).then((result) => {
      res.send(result)
    })
  })

  // Retrieve a single record
  app.get('/api/suscriptores/:ID', async (req, res) => {
    suscriptores.findOne({ req, res }).then((result) => {
      res.send(result)
    })
  })

  // Add a record
  app.post('/api/suscriptores', async (req, res) => {
    suscriptores
      .createAsPromise({ req, res })
      .then((result) => {
        res.send(result)
      })
      .catch((e) => {
        res.status(e.code || 500).send(e)
      })
  })

  // Update a record
  app.put('/api/suscriptores/:ID', async (req, res) => {
    suscriptores
      .update({ req, res })
      .then((result) => {
        res.send(result)
      })
      .catch((e) => {
        res.status(500).send(e)
      })
  })

  // Delete a record
  app.delete('/api/suscriptores/:ID', async (req, res) => {
    suscriptores
      .delete({ req, res })
      .then((result) => {
        res.send(result)
      })
      .catch((e) => {
        res.status(500).send(e)
      })
  })
}
