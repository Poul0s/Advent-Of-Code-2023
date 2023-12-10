const fs = require("fs");
const file = process.argv.length > 2 ? process.argv[2] : "input.txt";

function get_start_pos(map)
{
	var y = 0;
	var x;
	while (y < map.length)
	{
		x = 0;
		while (x < map[y].length)
		{
			console.log(map[y][x])
			if (map[y][x] == 'S')
				return [x, y];
			x++;
		}
		y++;
	}
	return [NaN, NaN]
}

function get_nexts_pos_from_pos(map, x, y)
{
	console.log("check pos at", map[y][x]);
	switch (map[y][x])
	{
		case '|':
			return [[y - 1, x], [y + 1, x]]
			break;
		case '-':
			return [[y, x - 1], [y, x + 1]];
			break;
		case 'L':
			return [[y - 1, x], [y, x + 1]];
			break;
		case 'J':
			return [[y - 1, x], [y, x - 1]];
			break;
		case '7':
			return [[y + 1, x], [y, x - 1]];
			break;
		case 'F':
			return [[y + 1, x], [y, x + 1]];
			break;
		case 'S':
		{
			var pos = [];
			if (y > 0 && (map[y - 1][x] == '|' || map[y - 1][x] == '7' || map[y - 1][x] == 'F'))
				pos.push([y - 1, x]);
			if (y < map.length - 1 && (map[y + 1][x] == '|' || map[y + 1][x] == 'L' || map[y - 1][x] == 'J'))
				pos.push([y + 1, x]);

			if (x > 0 && (map[y][x - 1] == '-' || map[y][x - 1] == 'F' || map[y][x - 1] == 'L'))
				pos.push([y, x - 1]);
			if (x < map[y].length - 1 && (map[y][x + 1] == '-' || map[y][x + 1] == '7' || map[y][x + 1] == 'J'))
				pos.push([y, x + 1]);
			return pos;
			break;
		}

		default: 
			return[];
	}
}


// you have to increase max stack call size with nodejs
function set_next_pos_step(map, x, y, connectorSteps)
{
	var nexts = get_nexts_pos_from_pos(map, x, y);
	var currentStepValue = connectorSteps[`${x}:${y}`];
	console.log(x, y, map[y][x]);
	nexts.forEach(pos => {
		console.log("next", pos[1], pos[0]);
		if (pos[0] != y || pos[1] != x)
		{
			var posStepValue = connectorSteps[`${pos[1]}:${pos[0]}`];
			if (posStepValue == undefined || posStepValue > currentStepValue + 1)
			{
				connectorSteps[`${pos[1]}:${pos[0]}`] = currentStepValue + 1;
				set_next_pos_step(map, pos[1], pos[0], connectorSteps);
			}
		}
	})

}

fs.readFile(file, {encoding: "utf-8"}, (err, res) => {
	if (err)
		console.error(err);
	else
	{
		res = res.split("\n");
		var connectorSteps = {};
		var [startX, startY] = get_start_pos(res);
		if (isNaN(startX) || isNaN(startY))
			console.error("No map start found");
		else
		{
			connectorSteps[`${startX}:${startY}`] = 0;
			set_next_pos_step(res, startX, startY, connectorSteps);
			var max = undefined;
			for (const [k, v] of Object.entries(connectorSteps))
			{
				if (max == undefined || v > max)
				{
					max = v;
					console.log(`new max value : ${v} at ${k}`);
				}
			}
		}
	}
})