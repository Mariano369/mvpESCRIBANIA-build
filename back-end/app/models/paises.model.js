const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')

const { applySoftDeleteMiddleware } = require('./schemaUtils')
const PaisesSchema = mongoose.Schema(
  {
    Pais: [mongoose.Schema.Types.ObjectId],
    isDeleted: { type: Boolean, default: false },
    deletedAt: { type: Date, default: null },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
)

applySoftDeleteMiddleware(PaisesSchema)

PaisesSchema.plugin(mongoosePaginate)
PaisesSchema.index({
  Pais: 'text',
  isDeleted: 1,
})

const myModel = (module.exports = mongoose.model('Paises', PaisesSchema, 'paises'))
myModel.schema = PaisesSchema
