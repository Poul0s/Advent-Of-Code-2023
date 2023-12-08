const fs = require("fs");
const inputFile = process.argv.length > 2 ? process.argv[2] : "input.txt"

fs.readFile(inputFile, {encoding: "utf-8"}, (err, res) => {
	if (err)
		console.error(err);
	else
	{
		res = res.split("\n");
		var instructions = res[0];
		var map = [];
		let ghostPos = []
		res = res.slice(2);
		res.forEach(line => {
			let linepos; 
			line = line.split("=");
			linepos = line[0].trim();
			if (linepos[2] == 'A')
				ghostPos.push(get_string_int(linepos));
			line = line[1].split(",");
			map[get_string_int(linepos)] = [
				get_string_int(line[0].replaceAll(/[^a-zA-Z0-9]/g,"")),
				get_string_int(line[1].replaceAll(/[^a-zA-Z0-9]/g,""))
			];
		});
		console.log(ghostPos);
		console.log(map);
		let moves = 0;
		while (!is_all_ghost_at_end(ghostPos, moves))
		{
			let instruction_index = instructions[moves % instructions.length] == 'R' ? 1 : 0;
			for (let i = 0; i < ghostPos.length; i++)
				ghostPos[i] = map[ghostPos[i]][instruction_index];
			moves++;
			if (moves == Number.MAX_SAFE_INTEGER)
				console.error("REACHED MAX INT")
		}
		console.log(moves);
	}
})

var _last = 0;
function is_all_ghost_at_end(ghostPos, moves)
{
	var res = true;
	var total = 0;
	ghostPos.forEach(pos => {
		if (pos < 10000)
			res = false
		else
			total++;
	})
	if (total > _last)
	{
		_last = total;
		console.log(`${total}/${ghostPos.length} are at final pos (${moves} moves)`);
	}
	return (res);
}

var _converted_strings = []
function get_string_int(str)
{
	var res = 0;
	if (str[2] == 'A')
		res += 1000
		if (str[2] == 'Z')
			res += 10000
	while (_converted_strings[res] != undefined && _converted_strings[res] != str)
		res++;
	_converted_strings[res] = str;
	return (res);
}