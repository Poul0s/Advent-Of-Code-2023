const fs = require("fs");

// console.log("Parsing file");
fs.readFile("./input.txt", {encoding: 'utf-8'}, (err, res) => {
	if (err)
		console.error(err);
	else
	{
		console.log(res);
		var seeds = [];
		var transformations = [];
		var lines = res.split('\n');

		parseSeeds(lines[0], seeds);
		parseTransformations(lines, transformations);
		console.log("Parsing finished, processing...\n");
		console.log(transformations);

		for (i = 0; i < transformations.length; i++)
		{
			var new_seeds = seeds.map(e => e);
			for (j = 0; j < transformations[i].length; j++)
			{
				var from = transformations[i][j][1];
				var to = transformations[i][j][0];
				var range = transformations[i][j][2];
				for (k = 0; k < seeds.length; k++)
				{
					if (seeds[k] != undefined && seeds[k] >= from && seeds[k] < from + range)
					{
						var dist = seeds[k] - from;
						console.log(`seed ${k} : ${seeds[k]}->${to + dist}`);
						new_seeds[k] = to + dist;
						seeds[k] = undefined;
					}
				}
			}
			seeds = new_seeds.map(e => e);
			console.log(`\n new seeds : ${seeds}\n`);
		}
		var min = seeds[0];
		seeds.forEach(seed => {
			if (min > seed)
				min = seed;
		})
		console.log(`Lowest location : ${min}`)
	}
})

function parseTransformations(lines, transformations)
{
	lines
		.filter(line => (line.indexOf(':') == -1))
		.join('\n')
		.split('\n\n')
		.forEach(ele => {
			ele = ele.split('\n').filter(e => e != '');
			console.log(ele);
			var res = []
			ele.forEach(transfo => {
				transfo = transfo.split(' ');
				res.push([
					parseInt(transfo[0]),
					parseInt(transfo[1]),
					parseInt(transfo[2])
				]);
			})
			transformations.push(res);
		});
}

function parseSeeds(seed_line, seeds)
{
	seed_line
		.split(':')[1]
		.split(' ')
		.filter(ele => ele != '')
		.forEach(element => {
			seeds.push(parseInt(element))
		});
}