enum TodoStatus {
  normal,
  deleted,
}

export interface ITodo {
  content: string;
  id: string;
  finished: boolean;
  status: TodoStatus;
}

export interface IListRes {
  data: ITodo[];
  stat: string;
  msg?: '';
}
