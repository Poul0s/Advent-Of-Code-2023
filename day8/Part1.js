const fs = require("fs");
const inputFile = process.argv.length > 2 ? process.argv[2] : "input.txt"

fs.readFile(inputFile, {encoding: "utf-8"}, (err, res) => {
	if (err)
		console.error(err);
	else
	{
		res = res.split("\n");
		var instructions = res[0];
		var map = {};
		res.slice(2).forEach(line => {
			let linepos; 
			line = line.split("=");
			linepos = line[0].trim();
			line = line[1].split(",");
			map[linepos] = [
				line[0].replaceAll(/[^a-zA-Z]/g,""),
				line[1].replaceAll(/[^a-zA-Z]/g,"")
			];
		});
		let moves = 0;
		let pos = "AAA"
		while (pos != "ZZZ")
		{
			console.log(instructions[moves % instructions.length], pos, map[pos])
			if (instructions[moves % instructions.length] == 'R')
				pos = map[pos][1]
			else
				pos = map[pos][0]
			moves++;
		}
		console.log(moves);
	}
})