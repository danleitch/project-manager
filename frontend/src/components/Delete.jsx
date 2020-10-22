import React from 'react';

function Delete() {

    // THis next part is for delete
    //     capture method


    let idData = "";
    const idHandler = (e) => {
        const rawIdData = (e.target.value);
        idData = rawIdData
        console.log(rawIdData);
    }

    function removeFunc() {
        if (window.confirm('Are you sure you want to delete - Entire ' + idData + "?")) {
            fetch('/delete/' + idData, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
            })
            window.location.reload(false);
            alert("Your project has been successfully Removed")
        }
    }

    return (
        <div>
            <h1>Would you like to remove a project?</h1>
            <input placeholder="Please Enter project ID" onChange={idHandler}></input>
            <br /><br />
            <button onClick={removeFunc}>Remove</button>
        </div>
    );
}




export default Delete