const fs = require("fs");
const file = process.argv.length > 2 ? process.argv[2] : "input.txt"

function isMapRowMirror(map, columnBeforeSep)
{
    var maxCheck = Math.min(columnBeforeSep, map[0].length - columnBeforeSep)
    var y = 0;
    var x;
    var totalError = 0;
    while (y < map.length)
    {
        x = 0;
        while (x < maxCheck)
        {
            if (map[y][columnBeforeSep - x - 1] != map[y][columnBeforeSep + x])
            {
                totalError++;
                if (totalError > 1)
                    return (false)
            }
            x++;
        }
        y++;
    }
    return (totalError == 1);
}

function isMapColumnMirror(map, rowBeforeSep)
{
    var maxCheck = Math.min(rowBeforeSep, map.length - rowBeforeSep)
    var y = 0;
    var x;
    var totalError = 0;
    while (y < maxCheck)
    {
        x = 0;
        while (x < map[0].length)
        {
            if (map[rowBeforeSep - y - 1][x] != map[rowBeforeSep + y][x])
            {
                totalError++;
                if (totalError > 1)
                    return (false);
            }
            x++;
        }
        y++;
    }
    return (totalError == 1);
}

function getMapMirrorValue(map)
{
    var i = 1;
    while (i < map[0].length)
    {
        if (isMapRowMirror(map, i))
            return (i);
        i++;
    }
    i = 1;
    while (i < map.length)
    {
        if (isMapColumnMirror(map, i))
            return (i * 100);
        i++;
    }
    console.error("Map error");
    return (0);
}
fs.readFile(file, {encoding:"utf-8"}, (err, res) => {
    if (err)
        console.error(err);
    else
    {
        res = res.split('\n');
        res.push('');
        var currentMap = []
        var sum = 0;
        res.forEach(line => {
            if (line == '')
            {
                sum += getMapMirrorValue(currentMap);
                currentMap = [];
            }
            else
                currentMap.push(line);
        })
        console.log("Sum is : ", sum);
    }
})
