const fs = require("fs")
const file = process.argv.length > 2 ? process.argv[2] : "input.txt"

function HASHAlgorithm(str)
{
    var res = 0;

    for (let i = 0; i < str.length; i++)
    {
        res += str.charCodeAt(i);
        res *= 17;
        res = res % 256;
    }
    return (res);
}

fs.readFile(file, {encoding:"utf-8"}, (err, res) => {
    if (err)
        console.error(err);
    else
    {
        res = res.split(",");
        var boxes = [];
        res.forEach(element => {
            let operationIndex = 0;
            while (element[operationIndex] != '-' && element[operationIndex] != '=')
                operationIndex++;
            let lens = element.substring(0, operationIndex);
            let boxValue = HASHAlgorithm(lens);
            if (element[operationIndex] == '-')
            {
                if (boxes[boxValue])
                    boxes[boxValue] = boxes[boxValue].filter(e => e[0] != lens)
            }
            else
            {
                if (boxes[boxValue] == undefined)
                    boxes[boxValue] = [];
                let boxLens = boxes[boxValue] != undefined && boxes[boxValue].find(e => e[0] == lens) || undefined;
                if (boxLens != undefined)
                    boxLens[1] = parseInt(element.substring(operationIndex + 1));
                else
                {
                    boxes[boxValue].push([lens, parseInt(element.substring(operationIndex + 1))]);
                }
            }
        });
        var sum = 0;
        for (let i = 0; i < 256; i++)
        {
            if (boxes[i] != undefined)
            {
                for (let j = 0; j < boxes[i].length; j++)
                {
                    sum += (i + 1) * (j + 1) * boxes[i][j][1];
                }
            }            
        }
        console.log(sum);
    }
})

