const { Schema, model } = require("mongoose");

const pitchSchema = new Schema(
    {
        name: {
            type: String,
            unique: true,
            required: true
        },
        meters: {
            type: Number,
            required: true,
        },
        diff: {
            type: String,
            required: true,
        },
        points: {
            type: Number,
            required: true,
        },
        quickdraws: {
            type: Number,
            required: true,
        },
        sector: {
            type: String,
            required: true,
        },

    },
    {
        timestamps: true,
    }
);

const Pitch = model("Pitch", pitchSchema)

module.exports = Pitch