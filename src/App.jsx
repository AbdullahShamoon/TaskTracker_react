import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import { v4 as uuidv4 } from 'uuid';
import { RiDeleteBin7Fill } from "react-icons/ri";
import { MdEdit } from "react-icons/md";



function App() {
  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
  const [showFinished, setshowFinished] = useState(true)

  useEffect(() => {
    let todoString = localStorage.getItem("todos")
    todoString && setTodos(JSON.parse(todoString))
  }, [])


  const saveToLocal = () => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }

  const handleChange = (e) => {
    setTodo(e.target.value)
  }
  const handleAdd = () => {
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }])
    setTodo("")
    saveToLocal()
  }
  const handleEdit = (e, i) => {
    let t = todos.filter((items) => items.id === i)
    setTodo(t[0].todo)

    let newTodo = todos.filter((items) => items.id !== i)
    setTodos(newTodo)
    saveToLocal()
  }
  const handleDelete = (e, i) => {
    let newTodo = todos.filter((items) => items.id !== i)
    setTodos(newTodo)
    saveToLocal()
  }
  const handleCheckbox = (e) => {
    let i = e.target.name
    let index = todos.findIndex((items) => items.id === i)
    let arr = [...todos]
    arr[index].isCompleted = !arr[index].isCompleted
    setTodos(arr)
    saveToLocal()
  }

  const toggleFinished = (e) => {
    setshowFinished(!showFinished)
  }

  return (
    <>
      <Navbar />
      <div className="container shadow-2xl m-auto mt-5 p-5 bg-blue-100 min-h-[80vh] lg:w-1/3 md:w-1/2 w-full flex flex-col">
        <div className='text-3xl font-bold justify-center flex items-baseline text-blue-950 gap-2'>TaskTracker<span className='text-xl '> - Manage your tasks</span></div>
        <div className="addTodo w-full mt-2 flex flex-col">
          <input type="text" onChange={handleChange} value={todo} placeholder='Add a todo' className='w-full mt-3 mb-2 px-3 py-1 rounded-full' />
          <button onClick={handleAdd} disabled={todo.length <= 3} className='bg-blue-900 hover:bg-blue-800 text-white text-sm font-bold mx-1 px-3 py-1  disabled:bg-blue-950'>Add</button>
        </div>
        <div className="show pt-5 pl-2 flex gap-3">
          <input type="checkbox" onChange={toggleFinished} />
          <span>Hide Finished</span>
        </div>
        <div className="w-5/6 bg-[#1512445d] h-[1px] mx-auto mt-3"></div>
        <h2 className='text-xl font-bold my-3 pl-2'>Your Todos</h2>
        <div className="todos w-full flex flex-col">
          {todos.length === 0 && <p>No Todos added yet</p>}

          {todos.map((items) => {

            return (showFinished || !items.isCompleted) && <div key={items.id} className="todo flex justify-between items-center my-1 py-1 pl-2 rounded bg-blue-200 ">
              <div className="Written sm:w-9/12 w-8/12  flex gap-1">
                <input type="checkbox" checked={items.isCompleted} name={items.id} onChange={handleCheckbox} id="" />
                <div className="text"><span className={items.isCompleted ? "line-through" : ""}>{items.todo}</span></div>
              </div>
              <div className="buttons">
                <button onClick={(e) => { handleEdit(e, items.id) }} className='bg-blue-900 hover:bg-blue-800 text-white text-xl font-bold px-1 rounded-full py-1 '><MdEdit />
                </button>
                <button onClick={(e) => { handleDelete(e, items.id) }} className='bg-blue-900 hover:bg-blue-800 text-white text-xl font-bold mx-2 px-1 py-1 rounded-full'><RiDeleteBin7Fill />
                </button>
                {/* This will send the id of the todo to be deleted (nhi to index find krna pdta handleCheckbox k tarah) we can also do it with that method , which we have used in handleCheckbox*/}
              </div>
            </div>
          })}
        </div>
      </div>
    </>
  )
}

export default App
