import mongoose from 'mongoose'

const teamSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Team name is required'],
      trim: true,
      minlength: 2,
      maxlength: 50
    },

    description: {
      type: String,
      default: '',
      trim: true,
      maxlength: 500
    },

    members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },

    status: {
      type: String,
      enum: ['active', 'inactive'],
      default: 'active'
    }
  },
  { timestamps: true }
)

teamSchema.index({ createdBy: 1, createdAt: -1 })
teamSchema.index({ name: 1 })

const Team = mongoose.model('Team', teamSchema)

export default Team
