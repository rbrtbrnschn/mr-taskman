### Task

This task directory is supposed to be the root for all wrapper functions surrounding the _Task_ Class.
These would include a function that gets the task from the database and returns it, one that edits the task and POSTs that to the database, etc.
Things like creating, completing, editing a task of type Task, is handled by the _Task_ Class located at ./src/interfaces/Task.ts.

### What a function that edits the task for each?

Yes Task instance bound method will edit the instance. The task edit function in here will emit the changed task to the database.

### In a nutshell:

Think of the functions / files in the current directory as functions that interact with the database, and the methods of a Task instance would obviously and solely interact with the given instance.
