import React, { useState } from 'react';

const OpzioniTodo = ({ todo }) => {

    const [todoValue, setTodoValue] = React.useState(todo.title);
    const [todoId,] = useState(todo.id);
    const [toggle, setToggle] = useState(true);
    const [createdAt,] = useState(todo.created_at);
    const [completedStatus,] = useState(todo.completed);

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

            setToggle(true);
        } else {
            alert("Scrivi almeno 3 caratteri")
        }
    }

    const deleteTodo = (e) => {
        if (window.confirm("Attenzione: questa azione è irreversibile. Cancello?")) {
            fetch('http://localhost:3000/todos/' + todoId, {
                method: 'DELETE'
            })

            setToggle(!toggle);
            window.location.reload();
        } else {
            alert("Operazione annullata")
        }
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
