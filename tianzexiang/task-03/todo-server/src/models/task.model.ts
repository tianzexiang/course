import { Collection, Db } from 'mongodb'
import { ITask } from '../interfaces/model'

export let TaskModel: Collection<ITask>

export function createTaskModel(db: Db) {
  TaskModel = db.collection<ITask>('tasks')
  return TaskModel
}
