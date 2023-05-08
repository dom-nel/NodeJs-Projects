const fs = require("fs");
const path = require("path");

const express = require("express");

const app = express(); // setup express application
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
	try {
		res.sendFile(__dirname + "/public/index.html");
	}
	catch (err)
	{
		res.status(500).send("internal server error occurred")
	}
});


app.get("/video", (req, res) => {
	// indicates the part of a document that the serve should return 
	//on this measure in bytes for example: range = 0-6.
	const range = req.headers.range;
	if (!range) res.status(400).send("Range must be provided");
	
	const videoPath = path.join(__dirname, "/public", "video.mp4");
	// extract video size by using statSyn()
	const videoSize = fs.statSync(videoPath).size;
	//10powered by 6 equal 10000000bytes = lmb
	const chunkSize = 10 **6;
	
	// calculating video where to start and where to end.
	const start = Number(range.replace(/\D/g, ""));
	const end = Math.min(start + chunkSize, videoSize - 1);
	const contentLength = end - start + 1;
	
	// setup video headers 
	const headers = {
		"Content-Range": `bytes ${start}-${end}/${videoSize}`,
		"Accept-Ranges": "bytes",
		"Content-Length": contentLength,
		"Content-Type": "video/mp4"
		
	};
	
	res.writeHead(206, headers);
	// creating readStream (stdin)
	const videoStream = fs.createReadStream(videoPath, {start, end});
	
	// create live stream pipe lineHeight
	videoStream.pipe(res);
})


app.listen(PORT, () => {
	console.log("SERVER STARTED AT PORT: " + PORT);
});