import React, { useState } from 'react';

const AggiungiTodo = () => {
    const [inputValue, setInputValue] = useState("");
    const [toastToggle, setToastToggle] = useState(true);

    const addNewTodo = () => {
        if (inputValue.length > 2) {
            const newTodoData = {
                id: Date.now() + Math.random().toString().slice(2),
                title: inputValue,
                created_at: new Date(),
                updated_at: new Date(),
                completed: false
            };

            fetch("http://localhost:3000/todos/", {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(newTodoData)
            })
                .then(res => res.json())
                .then(res => console.log(res))
                .catch(e => console.log(e));

            setInputValue("");
            setToastToggle(false)
            setTimeout(() => setToastToggle(true), 2000)
        } else {
            alert("Scrivi almeno 3 caratteri")
        }
    }

    return (
        <div>
            <div hidden={toastToggle}>Nuova todo aggiunta</div>
            <input value={inputValue} onChange={(e) => setInputValue(e.target.value)} type="text" />
            <button onClick={addNewTodo}>Aggiungi todo</button>
        </div>
    )
}

export default AggiungiTodo;
