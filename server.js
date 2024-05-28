import { error } from "console";
import express from "express";
import fs from 'fs';


// create server
const app = express();

// middleware
app.use(express.json());

let guestbook =
	[
		{ id: 0, name: "marcel", message: "hello world" }
	]

// service
app.get('/posts', (req, res) => {
	res.json(guestbook);
});

// add post
app.post('/posts', (req, res) => {
	const { name, message } = req.body;
	post.id = guestbook.length;
	const post = { id, name, message };
	guestbook.push(post);
	res.json(post);
});

// delete a post
app.delete('/posts/:id', (req, res) => {
	const { id } = req.params;
	guestbook = guestbook.filter((item) => item.id !== Number(id));
	res.json({deleted: id}, guestbook);
});

// patch a post
app.patch("/posts/id", (req, res) => {
	const { id } = req.params;
	const { name, message } = req.body;
	const post = guestbook.find((item) => item.id === Number(id));
	if (name) post.name = name;
	if (message) post.message = message;
	res.json(post);
	
	if (!post) {
		res.json({error: "post not found"});
	
	}
});


// server listener
app.listen(3000, () => {
	console.log("server is running on port 3000");
});