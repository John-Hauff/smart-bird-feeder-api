import mongoose from "mongoose";

const projectSchema = mongoose.Schema({
	title: {
		type: String,
		required: true,
		unique: true,
	},
	key: {
		type: String,
		default: "",
	},
	mode: {
		type: String,
		default: "",
	},
	bpm: {
		type: Number,
		default: 100,
	},
	loops: {
		type: [{
			name: String,
			key: {
				type: String,
				default: ""
			},
			mode: {
				type: String,
				default: ""
			},
			placement: Number,
			iterations: Number,
			progression: {
				type: [String],
				default: []
			},
		}],
		default: [],
	},
	dateCreated: {
		type: Date,
		default: new Date(),
	},
	lastUpdate: {
		type: Date,
		default: new Date(),
	},
});

export default mongoose.model("Project", projectSchema);