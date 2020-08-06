/* Assignment
Use Node.js and Express to build an API that performs CRUD operations on users.
Add a .gitignore file appropriate for node.js projects.
Add a new package.json.
Add a server script to package.json that runs the API using nodemon.

Finished this by doing 
- npx gitignore node
- npm init -y
- npm i -D nodemon
- New line under test that says: "server": "nodemon index.js"
*/

/* Write endpoints
Add the code necessary to create a Web API and implement the following endpoints:
*/
const express = require("express")

const server = express()

server.use(express.json())

// User Schema
let users = [
	{ id: "1", name: "Jane Witch", "bio": "I am a Witch" },
	{ id: "2", name: "John Magic", "bio": "I am a Wizard" },
	{ id: "3", name: "Jack Stone", "bio": "I am a Fighter" },
]

// GET	/api/users	Returns an array users.
server.get("/users", (req, res) => {
    function getUsers() {
        return users
    }
    res.json(getUsers())
})

// GET	/api/users/:id	Returns the user object with the specified id
server.get("/users/:id", (req, res) => {
    function getUserById(id) {
        return users.find(u => u.id === id)
    }
    const user = getUserById(req.params.id)
    if (user) {
        res.json(user)
    } else {
        res.status(404).json({
            errorMessage: "User cannot be found",
        })
    }
})

// POST	/api/users	Creates a user using the information sent inside the request body.
server.post("/users", (req, res) => {
    if (!req.body.name || !req.body.bio) {
        return res.status(400).json({
            errorMessage: "A name and bio for the user is required, please fill these fields out.",
        })
    }

    function createUser(data) {
        const payload = {
            id: String(users.length + 1),
            ...data,
        }

        users.push(payload)
        return payload
    }

    const newUser = createUser({
        name: req.body.name,
        bio: req.body.bio,
    })

    res.status(201).json(newUser)
})

// PUT	/api/users/:id	Updates the user with the specified id using data from the request body. Returns the modified user
server.put("/users/:id", (req, res) => {

    function updateUser(id, data) {
        const index = users.findIndex(u => u.id === id)
        users[index] = {
            ...users[index],
            ...data,
        }
        
        return users[index]
    }

    function getUserById(id) {
        return users.find(u => u.id === id)
    }

	const user = getUserById(req.params.id)

	if (user) {
		const updatedUser = updateUser(user.id, {
            name: req.body.name || user.name,
            bio: req.body.bio || user.bio,
		})

		res.json(updatedUser)
	} else {
		res.status(404).json({
			message: "User was not found",
		})
	}
})

// DELETE	/api/users/:id	Removes the user with the specified id and returns the deleted user.
server.delete("/users/:id", (req, res) => {

    function getUserById(id) {
        return users.find(u => u.id === id)
    }

	const user = getUserById(req.params.id)

    function deleteUser(id) {
        users = users.filter(u => u.id != id)
    }

	if (user) {
		deleteUser(user.id)
		res.status(204).end()
	} else {
		res.status(404).json({
			message: "User could not be found",
		})
	}
})

server.listen(8000, () => {
	console.log("server started on port 8000")
})