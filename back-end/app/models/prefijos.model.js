const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')

const { applySoftDeleteMiddleware } = require('./schemaUtils')
const PrefijosSchema = mongoose.Schema(
  {
    Prefijo: {
      type: Number,
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

applySoftDeleteMiddleware(PrefijosSchema)

PrefijosSchema.plugin(mongoosePaginate)
PrefijosSchema.index({
  Prefijo: 'text',
  isDeleted: 1,
})

const myModel = (module.exports = mongoose.model('Prefijos', PrefijosSchema, 'prefijos'))
myModel.schema = PrefijosSchema
