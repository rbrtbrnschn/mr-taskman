import mongoose, { Schema } from "mongoose";

const taskSchema = new Schema({
    title: String,
    description: { type: String, default: "\u200b" },
    participants: [],
    deadline: Date || String,
    taskId: String,
    messagedId: { type: String, default: "" },
    guildId: String, // technically not necessary
    completed: { type: Boolean, default: false },
    createdTimestamp: { type: Number, default: Date.now() },
    completedTimestamp: { type: Number, default: 0 },
    wip: { type: Boolean, default: false }

});

const TaskModel = mongoose.model("tasks", taskSchema);

export { TaskModel };