const fs = require("fs");
const possibleChars = ['.', '#'];
const { exec } = require("child_process");

function isPossibility(rowData, index)
{
    var checkingDataIndex = 0;
    var checkingDataCurrentNb = 0;
    var i = 0;
    while (i < rowData[0].length && i < index + 1)
    {
        if (rowData[0][i] == '#')
        {
            if (checkingDataIndex >= rowData[1].length)
                return (false);
            checkingDataCurrentNb++;
            if (checkingDataCurrentNb > rowData[1][checkingDataIndex])
                return (false);
        }
        else
        {
            if (checkingDataCurrentNb != 0)
            {
                if (checkingDataCurrentNb < rowData[1][checkingDataIndex])
                    return (false);
                checkingDataIndex++;
                checkingDataCurrentNb = 0;
            }
        }
        i++;
    }
    if (index == rowData[0].length - 1)
    {
        if (checkingDataIndex == rowData[1].length - 1 && checkingDataCurrentNb == rowData[1][checkingDataIndex])
            return (true);
        else if (checkingDataIndex == rowData[1].length && checkingDataCurrentNb == 0)
            return (true);
        return (false);
    }
    else
        return (true);
}

function countAllArrangements(rowData, index)
{
    if (rowData[0][index] == '?')
    {
        let res = 0;
        let oldStr = rowData[0];
        for (let char of possibleChars)
        {
            rowData[0] = rowData[0].substring(0, index) + char + rowData[0].substring(index + 1);
            // console.log(rowData[0], char);
            if (isPossibility(rowData, index))
            {
                if (index == rowData[0].length - 1)
                {
                    res++;
                    // console.log("yes");
                }
                else
                    res += countAllArrangements(rowData, index + 1);
            }
        }
        rowData[0] = oldStr;
        return (res);
    }
    else
    {
        if (index == rowData[0].length - 1)
        {
            // console.log("test", rowData[0]);
            if (isPossibility(rowData, index))
            {
                // console.log("yes2");
                return (1);
            }
            else
                return (0);
        }
        else
            return (countAllArrangements(rowData, index + 1));
    }
}

if (process.argv[2] == "--process")
{
    var data = process.argv[3].split(' ');
    data[1] = data[1].split(',').filter(e => e != '').map(e => parseInt(e));
    let possDup = [...data[1]];
    let strDup = data[0];
    for (let i = 1; i < 5; i++)
    {
        data[0] = data[0] + '?' + strDup;
        data[1] = data[1].concat(possDup);
    }
    let totalArrangements = countAllArrangements(data, 0);
    console.log(totalArrangements);
}
else
{
    const file = process.argv.length > 2 ? process.argv[2] : "input.txt";
    fs.readFile(file, {encoding: "utf-8"}, (err, res) => {
        if (err)
            console.error(err);
        else
        {
            var sum = 0;
            res = res.split('\n').filter(e => e != '');
            for (let i = 0; i < res.length; i++)
            {
                // console.log(`executing ${process.argv[0]} ${process.argv[1]} --process "${res[i]}"...`);
                let line = i;
                exec(`${process.argv[0]} ${process.argv[1]} --process "${res[i]}"`, (error, stdout, stderr) => {
                    if (error) {
                        console.log(`error for line ${line}: ${error.message}`);
                        return;
                    }
                    if (stderr) {
                        console.log(`stderr for line ${line}: ${stderr}`);
                        return;
                    }
                    sum += parseInt(stdout);
                    console.log(`stdout for line ${line}: ${stdout} (new res is ${sum})`);
                });
            }
        }
    })
}
