import React from 'react';

function TodoItem(props) {

    const { todo: todoObj, onDelete, onEdit } = props;
    const { id, description } = todoObj;

  return (
    <div className='items'>
        <p>{description}</p>
        <div className='buttons'>
            <button className='edit' onClick={() => onEdit(todoObj)}>Edit</button>
            <button className='delete' onClick={() => onDelete(id)}>Delete</button>
        </div>
    </div>
  )
}

export default TodoItem;