import { timer } from "rxjs";
import { ITodo } from "../redux/types";

export default class Api {
  static createTodo(text: string): Promise<ITodo> {
    return new Promise<ITodo>(resolve => {
      timer(1000).subscribe(() => {
        resolve({
          text,
          completed: false
        });
      });
    });
  }
}
