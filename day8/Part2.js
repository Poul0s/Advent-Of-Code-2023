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
		let ghostPos = []
		res.slice(2).forEach(line => {
			let linepos; 
			line = line.split("=");
			linepos = line[0].trim();
			if (linepos[2] == 'A')
				ghostPos.push(linepos);
			line = line[1].split(",");
			map[linepos] = [
				line[0].replace(/[^a-zA-Z0-9]/g,""),
				line[1].replace(/[^a-zA-Z0-9]/g,"")
			];
		});
		let moves = 0;
		while (has_ghostPos_still_searching(ghostPos))
		{
			let instruction_index = instructions[moves % instructions.length] == 'R' ? 1 : 0;
			moves++;
			for (let i = 0; i < ghostPos.length; i++)
			{
				if (ghostPos[i] != undefined)
				{
					ghostPos[i] = map[ghostPos[i]][instruction_index];
					if (ghostPos[i][2] == 'Z')
					{
						console.log(`Found ${i} for ${moves} moves`) // you have to find what to do with these results :)
						ghostPos[i] = undefined;
					}
				}
			}
		}
	}
})

function has_ghostPos_still_searching(ghostPos)
{
	for (let i = 0; i < ghostPos.length; i++)
	{
		if (ghostPos[i] != undefined)
			return (true);
	}
	return (false);
}
