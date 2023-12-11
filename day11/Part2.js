const fs = require('fs')
const file = process.argv.length > 2 ? process.argv[2] : "input.txt"

Array.prototype.insert = function(value, index)
{
	var nextValues = this.splice(index);
	this.push(value, ...nextValues);
}

function getDistanceBetweenCoords(a, b)
{
	return (Math.abs(a[0] - b[0]) + Math.abs(a[1] - b[1]));
}

function expandGalaxys(universe)
{
	for (let y = 0; y < universe.length; y++)
	{
		let nbGalaxys = 0;
		for (let x = 0; x < universe[y].length; x++)
		{
			if (universe[y][x] == '#')
			{
				nbGalaxys++
				break;
			}
		}
		if (nbGalaxys == 0)
		{
			universe[y] = "X".repeat(universe[y].length)
			y++;
		}
	}

	for (let x = 0; x < universe[0].length; x++)
	{
		let nbGalaxys = 0;
		for (let y = 0; y < universe.length; y++)
		{
			if (universe[y][x] == '#')
			{
				nbGalaxys++;
				break;
			}
		}
		if (nbGalaxys == 0)
		{
			for (let y = 0; y < universe.length; y++)
			{
				universe[y] = universe[y].substring(0, x) + 'X' + universe[y].substring(x + 1);
			}
			x++;
		}
	}
}

fs.readFile(file, {encoding: 'utf-8'}, (err, res) => {
	if (err)
		console.error(err)
	else
	{
		galaxys = [];
		res = res.split('\n')
		expandGalaxys(res);
		let totalExpansionY = 0;
		const fullXLine = "X".repeat(res[0].length)
		for (let y = 0; y < res.length; y++)
		{
			let totalExpansionX = 0;
			console.log(res[y], totalExpansionX);
			if (res[y] == fullXLine)
			{
				totalExpansionY++;
			}
			else
			{
				for (let x = 0; x < res[y].length; x++)
				{
					if (res[y][x] == 'X')
						totalExpansionX++
					else if (res[y][x] == '#')
						galaxys.push([y + totalExpansionY * (1e6 - 1), x + totalExpansionX * (1e6 - 1)]);
				}
			}
		}
		console.log(galaxys);
		var sum = 0;
		for (let i = 0; i < galaxys.length - 1; i++)
		{
			for (let j = i + 1; j < galaxys.length; j++)
			{
				let dist = getDistanceBetweenCoords(galaxys[i], galaxys[j]);
				sum += dist;
			}
		}
		console.log(sum);
	}
})