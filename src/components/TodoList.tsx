import { useState, useEffect, useRef, SyntheticEvent } from "react";
import toast, { Toaster } from "react-hot-toast";

import { Todo } from "../types";
import axios from "axios";

const TodoList = () => {
     const [isLoading, setIsLoading] = useState(false);
     const [addingTodo, setAddingTodo] = useState(false);
     const [todos, setTodos] = useState<Todo[]>([]);
     const [isSuccess, setIsSuccess] = useState(false);
     const inpRef = useRef<HTMLInputElement | null>(null);
     const formRef = useRef<HTMLFormElement | null>(null);

     // ************ Add TODO ****************
     async function addTodo(e: SyntheticEvent) {
          e.preventDefault();
          const todoInfo: Todo = {
               completed: false,
               id: Math.floor(Math.random() * 1000),
               title: formRef.current?.todo?.value,
               userId: Math.floor(Math.random() * 100),
          };
          try {
               setAddingTodo(true);
               const response = await axios.post("https://jsonplaceholder.typicode.com/todos", todoInfo);
               const addedTodo = await response.data;
               setTodos(previousTodo => [...previousTodo, addedTodo]);
               setIsSuccess(true);
               setAddingTodo(false);
               toast.success("Successfully added!!");
               formRef?.current?.reset();
          } catch (error) {
               toast.error("Something went wrong!!");
          } finally {
               setAddingTodo(false);
          }
     }

     // ************ Fetch TODO Function ****************
     async function fetchTodos() {
          setIsLoading(true);
          const response = await axios("https://jsonplaceholder.typicode.com/todos?_limit=6");
          const data = await response.data;
          setTodos(data);
          setIsLoading(false);
     }

     // ************ Handle Complete Todo ****************
     const handleComplete = (id: number) => {
          const updatedTodo: Todo[] = todos.map(todo => (todo.id === id ? { ...todo, completed: !todo.completed } : todo));
          setTodos(updatedTodo);
     };

     //  ************ Focus on input field ****************
     useEffect(() => {
          inpRef?.current?.focus();
     }, [isSuccess]);

     // ************ Fetch TODO ****************
     useEffect(() => {
          fetchTodos();
     }, []);

     return (
          <>
               <div className="pt-10">
                    {isLoading ? (
                         <p className="text-4xl font-black text-gray-400">Loading......</p>
                    ) : (
                         <div className="flex flex-col gap-4 overflow-y-auto max-h-[70vh]">
                              {todos.map(todo => (
                                   <div key={todo.id} className="px-5 py-2 bg-white rounded-md shadow flex items-center gap-2 select-none">
                                        <input
                                             type="checkbox"
                                             name="todoCheckbox"
                                             id={`${todo.id}`}
                                             className="cursor-pointer"
                                             checked={todo.completed}
                                             onChange={() => handleComplete(todo.id)}
                                        />
                                        <label htmlFor={`${todo.id}`} className={`text-lg ${todo.completed && "line-through opacity-75"}`}>
                                             {todo.title}
                                        </label>
                                   </div>
                              ))}
                         </div>
                    )}
               </div>

               {/* ================= Input Form ============== */}
               <footer className="absolute bottom-10 left-5 right-5">
                    <form
                         ref={formRef}
                         onSubmit={addTodo}
                         className="flex items-center justify-between px-4 py-2 mt-8 bg-white border-2 border-purple-300 rounded-full shadow-xl w-full"
                    >
                         <input ref={inpRef} type="text" name="todo" className="w-full px-3 py-2 bg-transparent focus:outline-none" />
                         <input
                              type="submit"
                              disabled={addingTodo}
                              value="Add"
                              className="px-8 py-1 text-lg font-semibold text-white duration-300 bg-purple-700 shadow-md cursor-pointer rounded-3xl hover:bg-purple-600 disabled:opacity-50 disabled:cursor-not-allowed"
                         />
                    </form>
               </footer>

               {/* ============ Toaster =========== */}
               <Toaster />
          </>
     );
};

export default TodoList;
