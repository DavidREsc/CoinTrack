import TodoList from "./components/TodoList"
import NewTodo from "./components/NewTodo"
import { useState } from "react"
import { Todo } from "./todos.models"

const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([])

  const todoAddHandler = (text: string) => {
    setTodos(prevState => [...prevState, {id: Math.random().toString(), text}])
  }

  const todoDeleteHandler = (todoId: string) => {
    setTodos(prevTodos => {
      return prevTodos.filter(todo => todo.id !== todoId)
    })
  }
  return (
    <div className="App">
      <NewTodo onAddTodo={todoAddHandler}/>
      <TodoList items={todos} onDeleteTodo={todoDeleteHandler}/>
    </div>
  )
}

export default App
