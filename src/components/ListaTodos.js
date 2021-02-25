import React, { useEffect, useState } from 'react';
import { Badge } from "react-bootstrap";
import OpzioniTodo from "./OpzioniTodo";

const ALLTODOS = "http://localhost:3000/todos";

const ListaTodos = () => {
    const [data, setData] = useState([]);
    const [error, setError] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);
    const [filterFalseHidden, setFilterFalseHidden] = useState(false)
    const [filterTrueHidden, setFilterTrueHidden] = useState(false)

    const getAllTodosList = async () => {
        try {
            const response = await fetch(ALLTODOS);
            const result = await response.json();
            setData(result);
        } catch (error) {
            console.log(error);
            setError(true);
        } finally {
            setIsLoaded(true);
            setFilterFalseHidden(false);
            setFilterTrueHidden(false);
        }
    };

    const filterTrueCompleted = () => {
        const filter = data.filter(obj => obj.completed === true);
        setData(filter);
        setFilterFalseHidden(true);
    }

    const filterFalseCompleted = () => {
        const filter = data.filter(obj => obj.completed === false);
        setData(filter);
        setFilterTrueHidden(true);
    }

    useEffect(() => {
        getAllTodosList();
    }, [])

    if (error) return <p>Errore...</p>
    else if (!isLoaded) return <p>In caricamento...</p>
    else return (
        <>
            <Badge hidden={filterTrueHidden} variant="primary"><button onClick={filterTrueCompleted}>Completati: {data.filter(obj => obj.completed === true).length}</button></Badge>
            <Badge hidden={filterFalseHidden} variant="warning"><button onClick={filterFalseCompleted}>Da fare: {data.filter(obj => obj.completed === false).length}</button></Badge>
            <Badge variant="danger"><button onClick={getAllTodosList}>Tutti</button></Badge>
            {data.length === 0 ? (<p>Non ci sono todo, aggiungine qualcuna</p>)
                : data.map((todo, i) => {
                    return (
                        <div style={{ margin: "5px 0", border: "1px solid black", width: "650px", padding: "10px" }} key={`todo-n-${i}`}>
                            <Badge variant="success">{todo.title}</Badge>
                            <Badge variant="info"> {todo.id}</Badge>
                            <div>
                                <p className="my-0">creato il {new Date(todo.created_at).getUTCDate()}-{new Date(todo.created_at).getUTCMonth()}-{new Date(todo.created_at).getUTCFullYear()}</p>
                                <p className="my-0">ultimo aggiornamento: {new Date(todo.updated_at).getUTCDate()}-{new Date(todo.updated_at).getUTCMonth()}-{new Date(todo.updated_at).getUTCFullYear()} ore {new Date(todo.updated_at).getUTCHours() + 1},{new Date(todo.updated_at).getUTCMinutes() < 10 ? '0' + new Date(todo.updated_at).getUTCMinutes() : new Date(todo.updated_at).getUTCMinutes()}</p>
                            </div>
                            <OpzioniTodo todo={todo} />
                        </div>
                    )
                })}
        </>
    )
}

export default ListaTodos
