API Notes

Server is listening on port http://localhost:8080/API


---- For GET -----
for GET to display all text. 
http://localhost:8080/api


---- For PUT -----
The Query string will be /projects/:id

for instance. http://localhost:8080/projects/:id

From here you specify your new ID & then update the keys and values through Postman Query Params.
Then Submit 

Here are the keys that are available for manipulation.
"title", "description","URL"


---- For POST -----

The Query Path will be /projects/

for instance. http://localhost:8080/projects/

From here you specify your new keys and values through Postman Query Params. 
Then Submit 

Here are the keys that are available for manipulation.
"title", "description","URL"


---- For Delete -----
The Query string will be /delete/:id

for instance. http://localhost:8080/projects/:id
From here you specify the ID of the entry you wish to delete