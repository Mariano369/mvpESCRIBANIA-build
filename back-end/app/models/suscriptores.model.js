const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')

const { applySoftDeleteMiddleware } = require('./schemaUtils')
const SuscriptoresSchema = mongoose.Schema(
  {
    Nombre: {
      type: String,
    },

    Apellido: {
      type: String,
    },

    Correoelectronico: {
      type: String,
    },

    Telfono: {
      type: String,
    },
    Mensaje: String,
    isDeleted: { type: Boolean, default: false },
    deletedAt: { type: Date, default: null },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
)

applySoftDeleteMiddleware(SuscriptoresSchema)

SuscriptoresSchema.plugin(mongoosePaginate)
SuscriptoresSchema.index({
  Nombre: 'text',
  Apellido: 'text',
  Correoelectronico: 'text',
  Telfono: 'text',
  Mensaje: 'text',
  isDeleted: 1,
})

const myModel = (module.exports = mongoose.model('Suscriptores', SuscriptoresSchema, 'suscriptores'))
myModel.schema = SuscriptoresSchema
