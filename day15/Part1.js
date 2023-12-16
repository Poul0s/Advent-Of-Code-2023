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
        var sum = 0;
        res.forEach(element => {
            sum += HASHAlgorithm(element); 
        });
        console.log(sum);
    }
})

