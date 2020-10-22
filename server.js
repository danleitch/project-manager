const express = require('express')
const app = express()
const fileHandler = require('fs');
var cors = require('cors');
const bodyParser = require('body-parser');

const PORT = process.env.PORT || 8080;
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())


app.get('/api', function (req, res) {
    fileHandler.readFile('webProject.json', (err, data) => {
        if (err) res.send('webProject.json not found. First post to create file.');
        else
            res.send(`${data}`);
    })
})


app.delete('/delete/:id', (req, res) => {
    const webProjects = readWebProjectFile();
    const idHandler = req.params.id
    const filteredWebProjects = removeIdFromWebProjects(webProjects, idHandler)

    writeToJSONFile(filteredWebProjects)
        .then(result => res.send(result))
        .catch(err => { throw (err) });
})

const removeIdFromWebProjects = (webProjects, id) => {
    return webProjects.filter(x => x.id != id)
}


app.put('/projects/:id', (req, res) => {
    const webProjects = readWebProjectFile();
    const idHandler = req.params.id
    const newProject = req.body
    updateValueFromWebProjects(webProjects, idHandler, newProject);

    writeToJSONFile(webProjects)
        .then(result => res.send(result))
        .catch(err => { throw (err) });
});

const updateValueFromWebProjects = (webProjects, id, newProject) => {
    const webProjectToUpdate = webProjects.find(x => x.id == id)
    Object.assign(webProjectToUpdate, newProject);
}

app.post('/projects', (req, res) => {

    const webProjects = readWebProjectFile();
    const newProject = req.body;

    insertProject(newProject, webProjects)
        .then(insertRes => res.send(insertRes))
        .catch(err => { throw err });
});

const insertProject = (newProject, webProjects) => {
    return new Promise((resolve, reject) => {
        newProject.id = getMaxIdFromWebProjects(webProjects) + 1;
        webProjects.push(newProject);

        writeToJSONFile(webProjects)
            .then(res => resolve(res))
            .catch(err => reject(err));
    });
}

const getMaxIdFromWebProjects = (webProjects) => {
    return (Math.max(...webProjects.map(x => x.id)))

}

const writeToJSONFile = (webProjects) => {
    return new Promise((resolve, reject) => {
        fileHandler.writeFile('webProject.json', JSON.stringify(webProjects), (err) => {
            if (err) reject(err);
            resolve('File updated!');
        });
    });
}


/**
 * This method reads the JSON file and returns an array
 * 
 * @returns Array<any>
 */
const readWebProjectFile = () => {
    const webProjectsBuffer = fileHandler.readFileSync('./webProject.json');
    const webProjectsString = `${webProjectsBuffer}`;
    return webProjectsString ? JSON.parse(webProjectsString) : [];
}


// app.use(function (err, req, res, next) {
//     console.log(err.stack)
//     res.status(500).send('Something broke!')
// })


const path = require("path");
if (process.env.NODE_ENV === "production") {
    app.use(express.static("frontend/build"));
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
    });
}

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});

