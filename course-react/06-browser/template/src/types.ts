export interface ITodo {
  content: string;
  id: string;
  finished: boolean;
  status: TodoStatus;
}

enum TodoStatus {
  normal,
  deleted,
}

export interface IListRes {
  data: ITodo[];
  stat: string;
  msg?: "";
}
