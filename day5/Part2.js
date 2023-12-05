const fs = require("fs");
var min = undefined;

// console.log("Parsing file");
fs.readFile("./input2.txt", {encoding: 'utf-8'}, (err, res) => {
	if (err)
		console.error(err);
	else
	{
		// console.log(res);
		var seeds = [];
		var transformations = [];
		var lines = res.split('\n');
		
		parseTransformations(lines, transformations);
		parseSeeds(lines[0], transformations);
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
			// console.log(ele);
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

function parseSeeds(seed_line, transformations)
{
	var i;
	var j;
	var k;
	var seeds = []
	const max_size = 4000000;
	seed_line = seed_line.split(':')[1]
						.split(' ')
						.filter(ele => ele != '')
	console.log(seed_line.length);
	for (j = 0; j < seed_line.length; j += 2)
	{
		console.log("seed line", j);
		seed_line[j] = parseInt(seed_line[j]);
		seed_line[j + 1] = parseInt(seed_line[j + 1]);
		for (k = seed_line[j]; k < seed_line[j] + seed_line[j + 1]; k++)
		{
			seeds.push(k);
			if (seeds.length > max_size )
			{
				console.log(`process seed ${k} / ${seed_line[j] + seed_line[j + 1]}`);
				var cpseed = seeds;
				processSeeds(cpseed, transformations)
				console.log("sent");
				seeds = [];
			}
		}
	}
	if (seeds.length != 0)
		processSeeds(seeds, transformations);
	console.log("min : ", min);
}

function processSeeds(seeds, transformations)
{
	new Promise((res, rej) => {
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
						// console.log(`seed ${k} : ${seeds[k]}->${to + dist}`);
						new_seeds[k] = to + dist;
						seeds[k] = undefined;
					}
				}
			}
			seeds = new_seeds.map(e => e);
			// console.log(`\n new seeds : ${seeds}\n`);
		}
		seeds.forEach(seed => {
			if (min == undefined || min > seed)
			{
				min = seed;
				console.log(`new lowest location found : ${min}`)
			}
		})
		console.log(`process seed finish`)
		res(1);
	})
}