const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')

const { applySoftDeleteMiddleware } = require('./schemaUtils')
const DatasPaisesSchema = mongoose.Schema(
  {
    DataPais: {
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

applySoftDeleteMiddleware(DatasPaisesSchema)

DatasPaisesSchema.plugin(mongoosePaginate)
DatasPaisesSchema.index({
  DataPais: 'text',
  isDeleted: 1,
})

const myModel = (module.exports = mongoose.model('DatasPaises', DatasPaisesSchema, 'dataspaises'))
myModel.schema = DatasPaisesSchema
