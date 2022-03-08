const { Schema, model } = require("mongoose");

const placeSchema = new Schema(
    {
        name: {
            type: String,
            unique: true,
            required: true
        },
        description: {
            type: String,
            required: true,
        },
        placeImg:{
            type: String,
            default:"https://prints.ultracoloringpages.com/15d7ea7b4a5e072e8941e1df37b63d76.png"
        },
        location: {
            type: {
                type: String
            },
            coordinates: [Number]
        },

        pitch: [{
            type: Schema.Types.ObjectId,
            ref: "Pitch"
        }]

    },
    {
        timestamps: true,
    }
)

const Place = model("Place", placeSchema)

module.exports = Place
