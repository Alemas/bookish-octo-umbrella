let fs = require('fs');
let readline = require('readline');

let numbers = [];

let fileReader = readline.createInterface({
	input: fs.createReadStream('./numbers')
});

fileReader.on('line', (line) => {
	numbers.push(parseInt(line));
});

fileReader.on('close', () => {

	let terminalReader = readline.createInterface({
		input: process.stdin,
		output: process.stdout
	});

	console.log('Os números são: ', numbers);

	terminalReader.question('Digite a operação a ser feita (+ ou *):\n', (op) => {

		let fun;

		switch(op) {
			case '+' : fun = (a, b) => { return a+b; }; break;
			case '*' : fun = (a, b) => { return a*b; }; break;
			default : console.log('Opção inválida'); process.exit(-1);
		}

		let result = numbers[0];

		for(let i = 1 ; i < numbers.length; i++) {
			result = fun(result, numbers[i]);
		}

		console.log(result);
		process.exit(-1);
	});
});