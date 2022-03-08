const { Schema, model } = require("mongoose");


const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: [true, 'Debes introducir el usuario']
    },
    password: {
      type: String,

    },
    email: {
      type: String,
      required: [true, 'Debes introducir el email']
    },
    profilePic: {
      type: String,
      default: 'https://i.stack.imgur.com/l60Hf.png'
    },
    description: {
      type: String,
    },
    role: {
      type: String,
      enum: ['ADMIN', 'USER', 'EQUIP'],
      default: "USER"
    },
    friends: [{
      type: Schema.Types.ObjectId,
      ref: "User"
    }],
    favPlaces: [{
      type: Schema.Types.ObjectId,
      ref: "Place",
     
    }],
    donePitches: [{
      pitch: {
        type: Schema.Types.ObjectId,
        ref: "Pitch"
      },
      date: {
        type: Date,
        default: Date.now
      }
    }],
    wishPitches: [{
      type: Schema.Types.ObjectId,
      ref: "Pitch",
   
    }]

  },
  {
    timestamps: true,
  }
);

const User = model("User", userSchema)



User.syncIndexes();

module.exports = User;
