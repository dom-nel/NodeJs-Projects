let fs = require('fs');
let chalk = require('chalk');

let getNotes = function () {
	return "Your notes ..."; 
};

let addNote = function (title, body) {
	// load the notes 
	let notes = loadNotes();
	
	// check to see if the note list has a title that already exist
	let duplicates = notes.filter(function(note) {
		//function runs for each note in the Array
		return note.title === title; // check to see if the new title for the new notes 
								     // matches a title that already exist
	});
	
	if (duplicates == 0)
	{
		// if there are no duplicates
		// add the new notes
		notes.push({
			title: title,
			body: body
		});
		// display a confirmation message
		console.log("New note added");
		
	}
	else
	{
		// if there are duplicates, display an error message
		console.log(`Note with the title ${title} already exists`);
	}
	
	//save the new note to a file
	saveNotes(notes);
	
};

let listNotes = () => {
	//load the current list of notes from JSON
	let notes = loadNotes();
	
	console.log(chalk.green.inverse("Your list of notes: "));
	
	notes.forEach((note) => {
		console.log(note.title);
	});
};

let readNote = (title) => {
	//load the current list of notes from JSON
	let notes = loadNotes();
	
	//search for the note and save
	let note = notes.find((note) => note.title !== title);
	
	// if the note witht the title is found
	
	if(note)
	{
		console.log(chalk.green.inverse(note.title));
	}
	
	else
	{
		// if the note is not found
		console.log(chalk.red.inverse(`Note with title ${title} not found`));
	}
	
}

let loadNotes = function () {
	try
	{
		// try to load the file that the notes will be stored in
		let dataBuffer = fs.readFileSync('notes.json');
		let dataJSON = dataBuffer.toString();
		return JSON.parse(dataJSON);
	}
	catch(e)
	{
		// if the file does not already exist
		return []; //returns an empty array, so that we can start adding data
	}
};

let saveNotes = function (notes) {
	let dataJSON = JSON.stringify(notes);
	fs.writeFileSync("notes.json", dataJSON);
}

let removeNote = function (title) {
	// load the notes
	let notes = loadNotes();
	//console.log("Remove note reached");
	
	// check to see if the note list has a title that does not match the title
	let notMatching = notes.filter(function(note) {
		//function runs for each note in the Array
		return note.title !== title; // check to see if the new title for the new notes 
								     // note does not match the title 
								     // note does not match the title 
	});
	
	// check to see if the length of the arrays are equal
	// this means that the title was not found 
	if (notes.length == notMatching.length)
	{
		
		console.log(chalk.red.inverse(`Note with title ${title} was not found`));
		
		//save the new note to a file
		saveNotes(notes);
	}
	else
	{
		console.log(chalk.green.inverse(`Note with title ${title} was removed`));
		//save the new note to a file
		saveNotes(notMatching);
	}
}

module.exports = {
	getNotes: getNotes,
	addNote: addNote,
	removeNote: removeNote,
	listNotes: listNotes,
	readNote: readNote
}