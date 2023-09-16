import TodoList from "./components/TodoList";

function App() {
     return (
          <main className="w-full min-h-screen px-5 pb-8 mx-auto lg:px-0 lg:w-5/12">
               <header className="pt-8 text-3xl font-black text-center text-purple-700">
                    <h3>TODO LIST APP</h3>
               </header>
               <TodoList />
          </main>
     );
}

export default App;
