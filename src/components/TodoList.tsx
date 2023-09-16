import { useState, useEffect } from "react";
import { Todo } from "../types";
import axios from "axios";
import TodoCard from "./TodoCard";

const TodoList = () => {
     const [isLoading, setIsLoading] = useState(false);
     const [todos, setTodos] = useState<Todo[]>([]);

     async function fetchTodos() {
          setIsLoading(true);
          const response = await axios("https://jsonplaceholder.typicode.com/todos");
          const data = await response.data;
          setTodos(data);
          setIsLoading(false);
     }

     useEffect(() => {
          fetchTodos();
     }, []);

     return (
          <div className="pt-10">
               {isLoading ? (
                    <p className="text-4xl font-black text-gray-400">Loading......</p>
               ) : (
                    <div className="flex flex-col gap-4 overflow-y-auto max-h-[70vh]">
                         {todos.map(todo => (
                              <TodoCard todo={todo} key={todo.id} />
                         ))}
                    </div>
               )}
          </div>
     );
};

export default TodoList;
