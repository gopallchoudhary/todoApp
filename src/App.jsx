import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import { v4 as uuidv4 } from "uuid";
import { FaEdit } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";

function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [showFinished, setShowFinished] = useState(false);

  //LOCAL-STORAGE
  useEffect(() => {
    let todoString = localStorage.getItem("todos");
    if (todoString) {
      let todos = JSON.parse(localStorage.getItem("todos"));
      setTodos(todos);
    }
  }, []);

  const saveToLS = (params) => {
    localStorage.setItem("todos", JSON.stringify(todos));
  };

  //SHOW-FINISHED
  const toggleFinished = (e) => {
    setShowFinished(!showFinished);
  };

  //EDIT-TODO
  const handleEdit = (e, id) => {
    let t = todos.filter((i) => i.id === id);
    setTodo(t[0].todo);
    let newTodos = todos.filter((item) => {
      return item.id !== id;
    });
    setTodos(newTodos);
    saveToLS();
  };

  //DELETE-TODO
  const handleDelete = (e, id) => {
    let newTodos = todos.filter((item) => {
      return item.id !== id;
    });
    setTodos(newTodos);
    saveToLS();
  };

  //ADD-TODO
  const handleAdd = () => {
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }]);
    setTodo("");
    saveToLS();
  };

  //CHANGE..
  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  //CHECKBOX
  const handleCheckbox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex((item) => {
      return item.id === id;
    });
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos);
    saveToLS();
  };

  return (
    <>
      <Navbar />
      <div className="md:container mx-3 md:mx-auto rounded-md bg-violet-200 p-3 my-6 min-h-[85vh] md:w-[35%]">
        <h1 className="font-semibold text-center text-xl">
          iTask - Manage your todos at one place
        </h1>
        <div className="addTodo my-5 flex flex-col gap-2">
          <h2 className="font-bold text-lg my-1">Add a todo</h2>
          <div className="flex gap-1">
            <input
              onChange={handleChange}
              value={todo}
              className="  w-full rounded-full py-1 px-4 border border-violet-400 "
              type="text"
            />
            <button
              onClick={handleAdd}
              disabled={todo.length <= 3}
              className="bg-violet-700  enabled:cursor-pointer disabled:bg-violet-500 hover:bg-violet-950 p-4 py-2 text-white font-bold text-sm rounded-full"
            >
              Save
            </button>
          </div>
        </div>
        <input
          type="checkbox"
          onChange={toggleFinished}
          checked={showFinished}
          id=""
          className="my-4"
        />{" "}
        Finished Todos
        <div className="h-[1px] bg-black w-[90%] mx-auto opacity-40 shadow-2xl my-2 "></div>
        <h2 className="font-bold text-lg">Your Todos</h2>
        <div className="todos ">
          {todos.length === 0 && (
            <div className="m-5 text-xl">No todos to display</div>
          )}
          {todos.map((item) => {
            return (
              (showFinished || !item.isCompleted) && (
                <div
                  key={item.id}
                  className="todo flex  md:my-4 my-2 justify-between "
                >
                  <div className="flex gap-5">
                    <input
                      onChange={handleCheckbox}
                      name={item.id}
                      type="checkbox"
                      checked={item.isCompleted}
                      id=""
                    />
                    <div className={item.isCompleted ? "line-through" : ""}>
                      {item.todo}
                    </div>
                  </div>

                  <div className="buttons flex h-full">
                    <button
                      onClick={(e) => handleEdit(e, item.id)}
                      className="bg-violet-700 hover:bg-violet-950 p-2 py-1 text-white font-bold text-sm rounded-md mx-1"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={(e) => {
                        handleDelete(e, item.id);
                      }}
                      className="bg-violet-700 hover:bg-violet-950 p-2 py-1 text-white font-bold text-sm rounded-md mx-1"
                    >
                      <AiFillDelete />
                    </button>
                  </div>
                </div>
              )
            );
          })}
        </div>
      </div>
    </>
  );
}

export default App;
