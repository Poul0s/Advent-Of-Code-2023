const fs = require("fs");
const inputfile = process.argv.length > 2 ? process.argv[2] : "input.txt" 

fs.readFile(inputfile, {encoding: 'utf-8'}, (err, res) => {
	if (err)
		console.error(err);
	else
	{
		res = res.split('\n');
		var cards = res.map(e => e.split(' ').filter(e => e != ''));
		cards.sort(compCard);
		console.log(cards);
		var sum = 0;
		for (let i = 0; i < cards.length; i++)
		{
			sum += parseInt(cards[i][1]) * (i + 1);
			console.log(`${cards[i][0]} : ${cards[i][1]} * ${i + 1} = ${parseInt(cards[i][1]) * (i + 1)}`);
		}
		console.log(sum);
	}
})

// renvoie un nb neg si 1 < 2
const cardOrder = ['J', '2', '3', '4', '5', '6', '7', '8', '9', 'T', 'Q', 'K', 'A']
function compCard(card1, card2)
{
	var card1_strength = getCardStrength(card1[0]);
	var card2_strength = getCardStrength(card2[0]);

	if (card1_strength != card2_strength)
		return (card1_strength - card2_strength);
	
	for (let i = 0; i < card1[0].length; i++)
	{
		let card1_pow = cardOrder.indexOf(card1[0][i]);
		let card2_pow = cardOrder.indexOf(card2[0][i]);
		if (card1_pow != card2_pow)
			return (card1_pow - card2_pow);
	}
	return (0);
}

function getCardStrength(card)
{
	var sets_nb = new Map();
	var nb_joker = 0;
	for (let i = 0; i < card.length; i++)
	{
		// console.log(sets_nb.get(card[i]), card[i]);
		if (card[i] == 'J')
			nb_joker++;
		else if (sets_nb.get(card[i]) == undefined)
		{
			let nb_char = 0;
			for (let j = 0; j < card.length; j++)
			{
				if (card[j] == card[i])
				nb_char++;
			}
			sets_nb.set(card[i], nb_char);
		}
	}
	if (nb_joker == 5)
		return (7);
	var rank = 1;
	var max_key;
	sets_nb.forEach((v, k, map) => {
		if (max_key == undefined || sets_nb.get(max_key) < v)
			max_key = k;
	})
	sets_nb.set(max_key, sets_nb.get(max_key) + nb_joker); 
	sets_nb.forEach((v, k, map) => {
		if (v == 2)
			rank++;
		else if (v == 3)
			rank += 3;
		else if (v == 4)
			rank = 6;
		else if (v == 5)
			rank = 7;
	})
	console.log(card, rank, sets_nb);
	return (rank);
}