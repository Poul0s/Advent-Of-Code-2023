const fs = require('fs');
const fileName = process.argv.length > 2 ? process.argv[2] : "input.txt"

Array.prototype.isFullZero = function() {
    let res = true;
    for (let i = 0; i < this.length; i++)
    {
        if (this[i] != 0)
        {
            res = false;
            break ;
        }
    }
    return (res);
}

Array.prototype.last = function() {
    return (this[this.length - 1]);
}

fs.readFile(fileName, {encoding: "utf-8"}, (err, res) => {
    if (err)
        console.error(err)
    else
    {
        var historys = []
        res.split('\n').forEach(line => {
            historys.push([line.split(' ').filter(e => e != '').map(e => parseInt(e))]);
        })
        let sum = 0;
        historys.forEach(historyArr => {
            let lastArr = historyArr.last();
            while (!lastArr.isFullZero())
            {
                let newArray = [];
                for (let i = 0; i < lastArr.length - 1; i++)
                    newArray.push(lastArr[i + 1] - lastArr[i]);
                historyArr.push(newArray);
                lastArr = newArray;
            }
            lastArr.push(0);
            for (let i = historyArr.length - 2; i >= 0; i--)
                historyArr[i].push(historyArr[i].last() + historyArr[i + 1].last());
            console.log(historyArr);
            console.log("\n\n\n\n");
            sum += historyArr[0].last();
        })
        console.log(sum);
    }
})



function isFullZero(arr)
{

}