import { useEffect, useRef } from "react";

const InputForm = () => {
     const inpRef = useRef<HTMLInputElement | null>(null);

     useEffect(() => {
          inpRef?.current?.focus();
     }, []);
     return (
          <form className="flex items-center justify-between px-4 py-2 bg-white border-2 border-purple-300 rounded-full shadow-xl">
               <input ref={inpRef} type="text" name="addTodo" className="w-full px-3 py-2 bg-transparent focus:outline-none" />
               <input type="submit" value="Add" className="px-8 py-1 text-lg font-semibold text-white bg-purple-700 shadow-md rounded-3xl" />
          </form>
     );
};

export default InputForm;
