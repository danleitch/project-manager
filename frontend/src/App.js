import React from 'react';
import './App.css';
import Get from './components/Get';
import Delete from './components/Delete';


function App() {

  let titleData = "";
  //capture method
  const titleHandler = (e) => {
    const rawTitleData = (e.target.value);
    titleData = rawTitleData
    console.log(rawTitleData);
  }

  let descriptionData = "";
  //capture method
  const descriptionHandler = (e) => {
    const rawdescriptionData = (e.target.value);
    descriptionData = rawdescriptionData
    console.log(rawdescriptionData);
  }

  let urlData = "";
  //capture method
  const urlHandler = (e) => {
    const rawURLData = (e.target.value);
    urlData = rawURLData
    console.log(rawURLData);
  }

  //submitting method.
  const submitFunc = () => {
    console.log(titleData, descriptionData, urlData);
    fetch('/projects', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: titleData,
        description: descriptionData,
        url: urlData
      })
    }).then(res => {
      console.log(res);
    }).catch(err => {
      console.log(err);
    });
    window.location.reload(false);
    alert("Your project has been successfully captured")

  }


  return (
    <div className="App">
      <h1>Hello Projects<span role="img" aria-label="happyface">😀</span></h1>

      <h2>Add your project in 4 easy steps!</h2>
      <h3>Enter Project Title</h3>
      1. <input placeholder="Enter Title" onChange={titleHandler}></input>

      <h3>Enter Project Description</h3>
      2. <input placeholder="Enter Description" onChange={descriptionHandler}></input>

      <h3>Enter Project URL</h3>
      3.<input placeholder="Enter URL" onChange={urlHandler}></input>

      <br />
      <br />
      4. <button onClick={submitFunc}>Submit to File</button>
      <br />
      <br />
      <Get />
      <br />
      <Delete />
    </div>
  );
}

export default App;
