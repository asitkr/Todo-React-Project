import React, { useEffect, useRef, useState } from 'react';
import TodoItem from './TodoItem';

// get the todo data from local Storage
const getLocalData = () => {
  const listData = localStorage.getItem('lists');
  // console.log(listData);

  if(listData) {
    return JSON.parse(localStorage.getItem('lists'));
  }
  else {
    return [];
  }
}

function Todo() {

  const [inputItem, setInputItem] = useState("");
  const [todoList, setTodoList] = useState(getLocalData());
  const [buttonDesc, setButtonDesc] = useState("Add");
  const [editTodoId, setEditTodoId] = useState();
  const inputRef = useRef(null);

  // to get foucus at first time
  useEffect(() => {
    inputRef.current.focus();
  }, [])

  //storing todo data in local storage
  useEffect(() => {
    localStorage.setItem('lists', JSON.stringify(todoList));
  }, [todoList]);

  // to handle input field
  const handleInput = (e) => {
    setInputItem(e.target.value);
  }

  // create todo item with itemlist
  const createTodoItem = () => {
    const todoObj = {
      id: Date.now() + todoList.length,
      description: inputItem,
      time: new Date()
    };

    if(inputItem) {
      setTodoList([...todoList, todoObj]);
    }

    setInputItem("");
  }

  const updateTodoItem = () => {
    const editiedTodoDescription = inputItem;
    const editId = editTodoId;
    
    const todoListCopy = JSON.parse(JSON.stringify(todoList));
    const index = todoList.findIndex(item => item.id === editId);
    todoListCopy[index].description = editiedTodoDescription;

    // console.log(editiedTodoDescription);

    if(editiedTodoDescription) {
      setTodoList(todoListCopy);
    }
    setEditTodoId("");
    setButtonDesc('Add');
    setInputItem("");
  }

  const onEditTodo = (obj) => {
    const { id, description } = obj;
    setButtonDesc("Update");
    inputRef.current.focus();
    setEditTodoId(id);
    setInputItem(description);
  }

  // to delete method
  const onDeleteTodo = (id) => {
    const filtredListArray = todoList.filter((item) => item.id !== id);
    setTodoList(filtredListArray);
  }

  const buttonHandler = () => {
    buttonDesc === "Add" ? createTodoItem() : updateTodoItem()
  }

  //render Todo list item
  const renderTodoList = () => {
    return todoList.map((item, id) => {
      return <TodoItem key={id} todo={item} onDelete={onDeleteTodo} onEdit={onEditTodo} />
    });
  }

  return (
    <div className='wrapper'>
      <div className='todo-wrapper'>
        <input type={"text"} ref={inputRef} value={inputItem} placeholder='Enter text' onChange={handleInput} />
        <button className='add' onClick={buttonHandler}>{buttonDesc}</button>
      </div>

      <div>{ renderTodoList() }</div>
    </div>
  )
}

export default Todo;