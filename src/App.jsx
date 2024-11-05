import { useState } from 'react'
import Navbar from './components/Navbar'
import { v4 as uuidv4 } from 'uuid';

function App() {
  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])

  const handleChange = (e) => {
    setTodo(e.target.value)
  }
  const handleAdd = () => {
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }])
    setTodo("")
  }
  const handleEdit = (e, i) => {
    let t= todos.filter((items)=> items.id === i)
    console.log(t)
    setTodo(t[0].todo)
  }
  const handleDelete = (e, i) => {
    let newTodo = todos.filter((items) => items.id !== i)
    setTodos(newTodo)
  }
  const handleCheckbox = (e) => {
    let i = e.target.name
    let index = todos.findIndex((items) => items.id === i)
    let arr = [...todos]
    arr[index].isCompleted = !arr[index].isCompleted
    setTodos(arr)
  }

  return (
    <>
      <Navbar />
      <div className="container m-auto mt-5 p-5 rounded-xl bg-blue-100 min-h-[80vh]">
        <div className="addTodo w-1/2">
          <h2 className='text-md font-bold mb-1'>Add a Todo</h2>
          <input type="text" onChange={handleChange} value={todo} className='w-[87%] px-3 py-1' />
          <button onClick={handleAdd} className='bg-blue-900 hover:bg-blue-800 text-white text-sm font-bold mx-3 px-3 py-1 rounded'>Add</button>
        </div>
        <h2 className='text-md font-bold mt-3'>Your Todos</h2>
        <div className="todos w-1/2 flex flex-col">
          {todos.length === 0 && <p>No Todos added yet</p>}

          {todos.map((items) => {

            return <div key={items.id} className="todo flex justify-between items-center my-1 py-1 pl-2 bg-blue-200 ">
              <div className="Written w-9/12 flex gap-1">
                <input type="checkbox" value={items.isCompleted} name={items.id} onChange={handleCheckbox} id="" />
                <div className="text"><span className={items.isCompleted ? "line-through" : ""}>{items.todo}</span></div>
              </div>
              <div className="buttons">
                <button onClick={(e) => { handleEdit(e, items.id) }} className='bg-blue-900 hover:bg-blue-800 text-white text-sm font-bold ml-3 px-3 py-1 rounded'>Edit</button>
                <button onClick={(e) => { handleDelete(e, items.id) }} className='bg-blue-900 hover:bg-blue-800 text-white text-sm font-bold mx-2 px-3 py-1 rounded'>Delete</button>
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
