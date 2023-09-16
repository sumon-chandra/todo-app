import { useState, useEffect, useRef } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Todo } from "../types";
import axios from "axios";
import removeImg from "../assets/remove.png";
import editImg from "../assets/edit.png";

const TodoList = () => {
     const [isLoading, setIsLoading] = useState(false);
     const [addingTodo, setAddingTodo] = useState(false);
     const [todos, setTodos] = useState<Todo[]>([]);
     const [isSuccess, setIsSuccess] = useState(false);
     const [inputValue, setInputValue] = useState("");
     const [editableTodo, setEditableTodo] = useState(false);
     const [editableTodoId, setEditableTodoId] = useState<number | null>(null);
     const inpRef = useRef<HTMLInputElement | null>(null);

     // ************ Add TODO ****************
     async function handleAddTodo() {
          const todoInfo: Todo = {
               completed: false,
               id: Math.floor(Math.random() * 1000),
               title: inputValue,
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
               setInputValue("");
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

     // ************ Handle Delete Todo ****************
     const handleRemoveTodo = (id: number) => {
          const updatedTodos = todos.filter(todo => todo.id !== id);
          setTodos(updatedTodos);
          toast.success("Todos removed successfully");
     };

     // ************ Handle Edit Todo ****************
     const handleEditTodo = (id: number) => {
          setEditableTodoId(id);

          const findTodo = todos.find(todo => todo.id === id);
          if (findTodo) {
               setInputValue(findTodo.title);
          }
     };

     // ************ Handle Update Todo ****************
     const updateTodo = async () => {
          setEditableTodo(true);
          const updatedTodo = {
               title: inputValue,
               completed: false,
          };
          try {
               const response = await axios.patch(`https://jsonplaceholder.typicode.com/todos/${editableTodoId}`, updatedTodo);
               const data = (await response.data) as Todo;
               const updatedTodos: Todo[] = todos.map(todo => (todo.id === data.id ? { ...todo, title: data.title } : todo));
               setInputValue("");
               setTodos(updatedTodos);
               setEditableTodo(false);
               setEditableTodoId(null);
               toast.success("Todo Updated successfully");
          } catch (error) {
               toast.error("Something went wrong");
          } finally {
               setEditableTodo(false);
          }
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
                                   <div key={todo.id} className="px-5 py-2 relative bg-white rounded-md shadow flex items-center gap-2 select-none">
                                        <input
                                             type="checkbox"
                                             name="todoCheckbox"
                                             id={`${todo.id}`}
                                             className="cursor-pointer"
                                             checked={todo.completed}
                                             onChange={() => handleComplete(todo.id)}
                                        />
                                        <label htmlFor={`${todo.id}`} className={`text-lg pr-10 ${todo.completed && "line-through opacity-75"}`}>
                                             {todo.title}
                                        </label>
                                        <div className="absolute right-3 flex gap-3">
                                             <img
                                                  src={editImg}
                                                  alt="Edit image"
                                                  className="w-4 cursor-pointer"
                                                  onClick={() => handleEditTodo(todo.id)}
                                             />
                                             <img
                                                  src={removeImg}
                                                  className="w-4 cursor-pointer "
                                                  onClick={() => handleRemoveTodo(todo.id)}
                                                  alt="Remove image"
                                             />
                                        </div>
                                   </div>
                              ))}
                         </div>
                    )}
               </div>

               {/* ================= Input Form ============== */}
               <footer className="absolute bottom-10 left-0 right-0 lg:px-0 px-5">
                    <div
                         // onSubmit={addTodo}
                         className="flex items-center justify-between px-4 py-2 mt-8 bg-white border-2 border-purple-300 rounded-full shadow-xl w-full"
                    >
                         <input
                              ref={inpRef}
                              onChange={e => setInputValue(e.target.value)}
                              type="text"
                              value={inputValue}
                              name="todo"
                              className="w-full px-3 py-2 bg-transparent focus:outline-none"
                         />
                         <button
                              type="submit"
                              disabled={addingTodo || editableTodo}
                              onClick={editableTodoId ? updateTodo : handleAddTodo}
                              className="px-8 py-1 text-lg font-semibold text-white duration-300 bg-purple-700 shadow-md cursor-pointer rounded-3xl hover:bg-purple-600 disabled:opacity-50 disabled:cursor-not-allowed"
                         >
                              {editableTodoId ? "Update" : "Add"}
                         </button>
                    </div>
               </footer>

               {/* ============ Toaster =========== */}
               <Toaster />
          </>
     );
};

export default TodoList;
