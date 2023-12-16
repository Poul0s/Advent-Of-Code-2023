const fs = require("fs");
const { start } = require("repl");
const file = process.argv.length > 2 ? process.argv[2] : "input.txt"

class Beam {
    constructor(x, y, dirX, dirY)
    {
        this.x = x;
        this.y = y;
        this.dirX = dirX;
        this.dirY = dirY;
    }
}

var s = new Map();
var counter = 0;

function printMap(map, beam)
{
    for (let y = 0; y < map.length; y++)
    {
        for (let x = 0; x < map[y].length; x++)
        {
            if (s.has(`${y}:${x}`))
                process.stdout.write('#');
            else
                process.stdout.write(map[y][x]);
        }
        process.stdout.write('\t');
        for (let x = 0; x < map[y].length; x++)
        {
            if (beam.y == y && beam.x == x)
            {
                if (beam.dirY == -1)
                    process.stdout.write('^');
                if (beam.dirY == 1)
                    process.stdout.write('v');
                if (beam.dirX == 1)
                    process.stdout.write('>');
                if (beam.dirX == -1)
                    process.stdout.write('<');
            }
            else
                process.stdout.write(map[y][x]);
        }
        process.stdout.write('\n');
    }
    process.stdout.write('\n');
}

function startBeamSimulatiom(map, beam)
{
    if (beam.y < 0 || beam.x < 0)
        return;
    if (beam.y >= map.length || beam.x >= map[beam.y].length)
        return;
    else if (map[beam.y][beam.x] == '#')
        return;
    else
    {
        var tile = map[beam.y][beam.x];
        // printMap(map, beam);
        if (!s.has(`${beam.y}:${beam.x}`))
        {
            counter++
            s.set(`${beam.y}:${beam.x}`, true);
        }
        if (map[beam.y][beam.x] != '.' && !s.has(`${beam.y}:${beam.x}:${beam.dirX}:${beam.dirY}`))
        {
            s.set(`${beam.y}:${beam.x}:${beam.dirX}:${beam.dirY}`, true);
            switch (tile)
            {
                case '|':
                    if (beam.dirX != 0)
                    {
                        beam.dirX = 0;
                        beam.dirY = 1;
                        let duplicateBeam = new Beam(beam.x, beam.y - 1, 0, -1);
                        startBeamSimulatiom(map, duplicateBeam);
                    }
                break;

                case '-':
                    if (beam.dirY != 0)
                    {
                        beam.dirX = 1;
                        beam.dirY = 0;
                        let duplicateBeam = new Beam(beam.x - 1, beam.y, -1, 0);
                        startBeamSimulatiom(map, duplicateBeam);
                    }
                    break;

                case '/':
                    [beam.dirX, beam.dirY] = [-beam.dirY, -beam.dirX]
                    break;

                case '\\':
                    [beam.dirX, beam.dirY] = [beam.dirY, beam.dirX]
                    break;
            }
            beam.x += beam.dirX;
            beam.y += beam.dirY;
            startBeamSimulatiom(map, beam);
        }
        else if (map[beam.y][beam.x] == '.')
        {
            beam.x += beam.dirX;
            beam.y += beam.dirY;
            startBeamSimulatiom(map, beam);
        }
    }
}

fs.readFile(file, {encoding:"utf-8"}, (err, res) => {
    if (err)
        console.error(err)
    else
    {
        res = res.split('\n').map(e => e.split(''));
        max = 0;

        for (let x = 0; x < res[0].length; x++)
        {
            s = new Map();
            counter = 0;
            startBeamSimulatiom(res, new Beam(x, 0, 0, 1));
            max = Math.max(counter, max);

            s = new Map();
            counter = 0;
            startBeamSimulatiom(res, new Beam(x, res.length - 1, 0, -1));
            max = Math.max(counter, max);
        }
        for (let y = 0; y < res.length; y++)
        {
            s = new Map();
            counter = 0;
            startBeamSimulatiom(res, new Beam(0, y, 1, 0));
            max = Math.max(counter, max);
            
            s = new Map();
            counter = 0;
            startBeamSimulatiom(res, new Beam(res[0].length - 1, y, -1, 0));
            max = Math.max(counter, max);
        }
        
        console.log(max);
    }
})