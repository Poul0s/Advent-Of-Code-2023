const fs = require("fs");
const inputfile = process.argv.length > 2 ? process.argv[2] : "input.txt" 

fs.readFile(inputfile, {encoding: 'utf-8'}, (err, res) => {
	if (err)
		console.error(err);
	else
    {
        res = res.split("\n").map(e => {
            return e.split(':')[1].replaceAll(' ', '');
        });
        course = [
            parseInt(res[0]),
            parseInt(res[1])
        ];
        console.log(course);
        var poss = get_course_win_possibilities(course);
        console.log(poss);
    }
})

function get_course_win_possibilities(course)
{
    var possibilities = 0;
    for (let i = 1; i < course[0]; i++)
    {
        let time_remaining = course[0] - i;
        let distance = i * time_remaining;
        if (distance > course[1])
        {
            // console.log(`${i} added with ${distance}`);
            possibilities++;
        }
    }
    return (possibilities); 
}