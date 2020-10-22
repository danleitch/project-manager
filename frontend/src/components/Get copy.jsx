import React, { useState, useEffect } from 'react';

function Get() {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);
    console.log(items)
    debugger
    // Note: the empty deps array [] means
    // this useEffect will run once
    // similar to componentDidMount()

    useEffect(() => {
        fetch("http://localhost:8080/api")
            .then(res => res.json())
            .then(
                (result) => {
                    setIsLoaded(true);
                    setItems(result);
                    console.log(result);

                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);

                }
            )
    }, [])


    if (error) {
        return <div>Error: {error.message}</div>;
    }
    else if (!isLoaded) {
        return <div>Loading...</div>;
    }
    else {
        return (
            <div>
                <h1>All Current Stored Projects</h1>
                <ul style={{ listStyleType: "none" }}>
                    {items.map(item => (
                        <li >
                            <h3>  ID = {item.id} , Title = {item.title}, Description = {item.description}, URL = {item.URL} </h3>
                        </li>
                    ))}
                </ul>
            </div>
        );
    }
}



export default Get