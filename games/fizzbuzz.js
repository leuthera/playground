/*
	fizzbuzz game
	Loop for a given number of iterations
	print 'fizz' for multiplier of 3
	print 'buzz' for multiplier of 5
	print 'fizzbuzz' if multiplier of 3 and 5
	print <Number>
*/

"use strict";

const multiply_of = multiplier => number => number % multiplier === 0;

const is_multiplier_of_3 = multiply_of( 3 );
const is_multiplier_of_5 = multiply_of( 5 );

const result_for = number => {
	let result = "";

	if ( is_multiplier_of_3( number ) ) result += 'fizz';
	if ( is_multiplier_of_5( number ) ) result += 'buzz';
	if ( ! is_multiplier_of_3( number ) && ! is_multiplier_of_5( number ) ) result = number;

	return result;
}

const fizzbuzz = iterations => {
	for ( let i = 1; i <= iterations; i++ ) {
		console.log( i, result_for( i ) );
	}
}

fizzbuzz( 100 );

// test
const results = [
	'1',
	'2',
	'fizz',
	'4',
	'buzz',
	'fizz',
	'7',
	'8',
	'fizz',
	'buzz',
	'11',
	'fizz',
	'13',
	'14',
	'fizzbuzz',
	'16',
	'17',
	'fizz',
	'19',
	'buzz',
	'fizz',
	'22',
	'23',
	'fizz',
	'buzz',
	'26',
	'fizz',
	'28',
	'29',
	'fizzbuzz',
	'31',
	'32',
	'fizz',
	'34',
	'buzz',
	'fizz',
	'37',
	'38',
	'fizz',
	'buzz',
	'41',
	'fizz',
	'43',
	'44',
	'fizzbuzz',
	'46',
	'47',
	'fizz',
	'49',
	'buzz',
	'fizz',
	'52',
	'53',
	'fizz',
	'buzz',
	'56',
	'fizz',
	'58',
	'59',
	'fizzbuzz',
	'61',
	'62',
	'fizz',
	'64',
	'buzz',
	'fizz',
	'67',
	'68',
	'fizz',
	'buzz',
	'71',
	'fizz',
	'73',
	'74',
	'fizzbuzz',
	'76',
	'77',
	'fizz',
	'79',
	'buzz',
	'fizz',
	'82',
	'83',
	'fizz',
	'buzz',
	'86',
	'fizz',
	'88',
	'89',
	'fizzbuzz',
	'91',
	'92',
	'fizz',
	'94',
	'buzz',
	'fizz',
	'97',
	'98',
	'fizz',
	'buzz',
];

results.forEach( (entry, i) => {
	const number = i+1;
	const result = result_for( number );

	console.assert( entry == result, `${number} should be ${entry} but is ${result}`)
});
