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

function slideRocksNorth(map)
{
    var y = 0;
    var slideY;
    var x;
    while (y < map.length)
    {
        x = 0;
        while (x < map[y].length)
        {
            if (map[y][x] == 'O')
            {
                slideY = y;
                while (slideY > 0 && map[slideY - 1][x] == '.')
                    slideY--;
                map[y] = map[y].substring(0, x) + '.' + map[y].substring(x + 1);
                map[slideY] = map[slideY].substring(0, x) + 'O' + map[slideY].substring(x + 1);
            }
            x++;
        }
        y++;
    }
}

fs.readFile(file, {encoding: "utf-8"}, (err, res) => {
    if (err)
        console.error(err);
    else
    {
        res = res.split('\n');
        console.log(res.join('\n'), '\n\n');
        slideRocksNorth(res);
        console.log(res.join('\n'));
        console.log(countChargesNorth(res));
    }
})