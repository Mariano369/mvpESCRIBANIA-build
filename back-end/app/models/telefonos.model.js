const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')

const { applySoftDeleteMiddleware } = require('./schemaUtils')
const TelefonosSchema = mongoose.Schema(
  {
    Telfono: {
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

applySoftDeleteMiddleware(TelefonosSchema)

TelefonosSchema.plugin(mongoosePaginate)
TelefonosSchema.index({
  Telfono: 'text',
  isDeleted: 1,
})

const myModel = (module.exports = mongoose.model('Telefonos', TelefonosSchema, 'telefonos'))
myModel.schema = TelefonosSchema
