const mongose = require("mongoose");

// these are the only properties that will be accepted into the database (for this taskSchema)
const TaskSchema = new mongose.Schema({
  name: {
    type: String,
    // we are setting required to be true then adding a custom error message
    required: [true, "must provide name"],
    // trimes white spaces
    trim: true,
    // we are setting the maxlength property to 20 max characters and a custom
    // error message
    maxlength: [20, "name can not be more than 20 characters"],
  },
  completed: {
    type: Boolean,
    // adds default property set to false at the start
    default: false
  },
});

module.exports = mongose.model("Task", TaskSchema);
