const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')

const { applySoftDeleteMiddleware } = require('./schemaUtils')
const ClientesSchema = mongoose.Schema(
  {
    Nombre: {
      type: String,
    },

    Dni: {
      type: String,
    },

    info: {
      type: String,
    },
    isDeleted: { type: Boolean, default: false },
    deletedAt: { type: Date, default: null },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
)

applySoftDeleteMiddleware(ClientesSchema)

ClientesSchema.plugin(mongoosePaginate)
ClientesSchema.index({
  Nombre: 'text',
  Dni: 'text',
  info: 'text',
  isDeleted: 1,
})

const myModel = (module.exports = mongoose.model('Clientes', ClientesSchema, 'clientes'))
myModel.schema = ClientesSchema
