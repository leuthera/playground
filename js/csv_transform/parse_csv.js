/*global process */

const fs        = require('fs');
const parse     = require('csv-parse');
const transform = require('stream-transform');

let file_path = process.argv[2];
if ( !file_path ) {
    console.error('Need filepath');
    process.exit(-1);
}

let delimiter = process.argv[3] || ';';
console.error( `Using delimiter "${delimiter}" to parse "${file_path}"` );

let parser    = parse({ delimiter: delimiter });
let input     = fs.createReadStream( file_path );

const print = row => {
    return `do something w/ ${row}`;
};

let transformer = transform(( record, callback ) => {
    callback(
        null,
        print( record )
    );
}, { parallel: 100 });

input
    .pipe(parser)
    .pipe(transformer)
    .pipe(process.stdout);