import React, { useState } from 'react';

const OpzioniTodo = ({ todo }) => {

    const [todoValue, setTodoValue] = React.useState(todo.title);
    const [todoId, setTodoId] = useState(todo.id);
    const [toggle, setToggle] = useState(true);
    const [createdAt, setCreatedAt] = useState(todo.created_at);
    const [updatedAt, setUpdatedAt] = useState(todo.updated_at);
    const [completedStatus, setCompletedStatus] = useState(todo.completed);

    const handleOnChange = (e) => {
        const newValue = e.target.value;
        setTodoValue(newValue);
    }

    const toggleEditForm = (e) => {
        setToggle(!toggle)
    }

    const updateTitle = (e) => {
        if (todoValue.length > 2) {
            fetch('http://localhost:3000/todos/' + todoId, {
                method: 'PUT',
                body: JSON.stringify({
                    title: todoValue,
                    created_at: createdAt,
                    updated_at: new Date(),
                    completed: completedStatus
                }),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            })
                .then((response) => response.json())
                .then((json) => console.log(json));

            setTimeout(() => {
                window.location.reload();
            }, 500);
        } else {
            alert("Scrivi almeno 3 caratteri")
        }
    }

    const deleteTodo = (e) => {
        fetch('http://localhost:3000/todos/' + todoId, {
            method: 'DELETE'
        })

        setTimeout(() => {
            window.location.reload();
        }, 500);
    }

    const completeTodo = (e) => {
        fetch('http://localhost:3000/todos/' + todoId, {
            method: 'PUT',
            body: JSON.stringify({
                title: todoValue,
                created_at: createdAt,
                updated_at: new Date(),
                completed: true
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then((response) => response.json())
            .then((json) => console.log(json));

        setTimeout(() => {
            window.location.reload();
        }, 500);
    }

    return (
        <>
            {todo.completed ? null : <button onClick={toggleEditForm}>{toggle ? "Modifica" : "Chiudi e annulla"}</button>} 
            {toggle ? <button onClick={completeTodo} disabled={todo.completed}>{todo.completed ? "Completato" : "Imposta come completato"}</button> : null}
            {!toggle ? (<div>
                <input value={todoValue} onChange={handleOnChange} type="text" />
                <button onClick={updateTitle}>Aggiorna todo</button>
                <button onClick={deleteTodo}>Cancella todo</button>
            </div>) : null}
        </>
    )
}

export default OpzioniTodo;