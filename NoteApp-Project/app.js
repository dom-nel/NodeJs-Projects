var notes = require('./notes.js');
var yargs = require('yargs');
yargs.version('1.1.0');


//add, remove, read, list


// create the add command
yargs.command({
	command: 'add',
	describe: 'Add a new note',
	builder: {
		title: {
			describe: 'Note Title',
			demandOption: true, 
			type: 'string'
		},
		body: {
			describe: 'Note Body',
			demandOption: true, 
			type: 'string'
		}
	},
	handler: function(argv) {
		//console.log('Title:', argv.title);
		//console.log('Body Text:', argv.body);
		// call the addNote function
		notes.addNote(argv.title, argv.body);
	}
});

// create the remove command
yargs.command({
	command: 'remove',
	describe: 'Remove a note',
	builder: {
		title: {
			describe: 'Note Title',
			demandOption: true, 
			type: 'string'
		},
	},
	handler: function(argv) {
		//console.log('Removing a new note');
		notes.removeNote(argv.title)
	}
});

// create the read command
yargs.command({
	command: 'read',
	describe: 'Read a new note',
	builder: {
		title: {
			describe: 'Note Title',
			demandOption: true, 
			type: 'string'
		},
	},
	handler(argv) {
		//console.log('Reading a new note');
		// call the readNote function
		notes.readNote(argv.title);
	}
});


// create the list command
yargs.command({
	command: 'list',
	describe: 'List a new note',
	handler: function() {
		console.log('Listing a new note');
	}
});


yargs.parse();
