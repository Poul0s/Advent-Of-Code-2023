const fs = require('fs');
const file = process.argv.length > 2 ? process.argv[2] : "input.txt"

function countChargesNorth(map)
{
    var y = 0;
    var x;
    var charges = 0;
    while (y < map.length)
    {
        x = 0;
        while (x < map[y].length)
        {
            if (map[y][x] == 'O')
                charges += (map.length - y);
            x++;
        }
        y++;
    }
    return (charges);
}

// direction : 0 north  1 west  2  south  3 east
function slideRocksDirection(map, direction)
{
    var y = direction == 2 ? map.length - 1 : 0;
    var slideCoord;
    var x;
    while ((direction == 2) ? y >= 0 : y < map.length)
    {
        x = direction == 3 ? map[y].length - 1 : 0;
        while (direction == 3 ? x >= 0 : x < map[y].length)
        {
            if (map[y][x] == 'O')
            {
                if (direction == 0 || direction == 2)
                {
                    slideCoord = y;
                    let target = direction == 0 ? 0 : map.length - 1;
                    let incrementor = direction == 0 ? -1 : 1;
                    while (slideCoord != target && map[slideCoord + incrementor][x] == '.')
                        slideCoord += incrementor;
                    map[y] = map[y].substring(0, x) + '.' + map[y].substring(x + 1);
                    map[slideCoord] = map[slideCoord].substring(0, x) + 'O' + map[slideCoord].substring(x + 1);
                }
                else
                {
                    slideCoord = x;
                    let target = direction == 1 ? 0 : map[y].length - 1;
                    let incrementor = direction == 1 ? -1 : 1;
                    while (slideCoord != target && map[y][slideCoord + incrementor] == '.')
                        slideCoord += incrementor;
                    map[y] = map[y].substring(0, x) + '.' + map[y].substring(x + 1);
                    map[y] = map[y].substring(0, slideCoord) + 'O' + map[y].substring(slideCoord + 1);
                }
            }
            x += (direction == 3) ? -1 : 1;
        }
        y += (direction == 2) ? -1 : 1;
    }
}

fs.readFile(file, {encoding: "utf-8"}, (err, res) => {
    if (err)
        console.error(err);
    else
    {
        res = res.split('\n');
        console.log(res.join('\n'), '\n\n');
        let nbCycles = 1000000000;
        let quarter = nbCycles / 10;
        let i, j;
        for (i = 0; i < nbCycles; i++)
        {
            for (j = 0; j < 4; j++)
                slideRocksDirection(res, j);
            if (i % quarter == 0)
                console.log(`${i / nbCycles * 100}%`);
        }
        console.log(res.join('\n'));
        console.log(countChargesNorth(res));
    }
})