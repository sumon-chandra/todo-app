import { Todo } from "../types";

interface TodoCardProps {
     todo: Todo;
}
const TodoCard = ({ todo }: TodoCardProps) => {
     return (
          <div className="px-5 py-2 bg-white rounded-md shadow">
               <p className="text-lg">{todo.title}</p>
          </div>
     );
};

export default TodoCard;
