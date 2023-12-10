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
	nexts.forEach(pos => {
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

function isElementEnclosed(map, x, y, connectorSteps)
{
	var total_wall_west = 0;

	while (x-- > 0)
	{
		if (connectorSteps[`${x}:${y}`] != undefined)
		{
			switch (map[y][x])
			{
				case 'S':
					if (y == 0 || y >= map.length - 1)
						break;
					if (map[y - 1][x] != '|' && map[y - 1][x] != '7' && map[y - 1][x] != 'F')
						break;
				case '|':
				case 'L':
				case 'J':
					total_wall_west++;
					break;
			}
		}
	}
	return (total_wall_west % 2 != 0)
}

fs.readFile(file, {encoding: "utf-8"}, (err, res) => {
	if (err)
		console.error(err)
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
			var totalEnclosed = 0;
			var y = 0;
			var x;
			while (y < res.length)
			{
				x = 0;
				while (x < res[y].length)
				{
					if (connectorSteps[`${x}:${y}`] == undefined && isElementEnclosed(res, x, y, connectorSteps))
					{
						totalEnclosed++;
						process.stdout.write('I');
					}
					else
						process.stdout.write(res[y][x]);
					x++;
				}
				process.stdout.write("\n");
				y++;
			}
			console.log(totalEnclosed);
		}

	}
})