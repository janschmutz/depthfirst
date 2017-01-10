var jsonParsed = require('./ha2.json');
var search = process.argv[2];
var searchValue = process.argv[3];
var path = [];
var lastSplit;
var counter;

function deleteKeys () {
    var deleteIndex = 21 - counter;
    var removed = path.splice(deleteIndex, counter);
}

function ObjectLength( object ) {
    var length = 0;
    for( var key in object ) {
        if( object.hasOwnProperty(key) ) {
            ++length;
        }
    }
    return length;
};

function find(source, value) {
   
    for (var key in source) {
//        "use strict";
        var item = source[key];
        path.push(key);
        
        
        var objLenght = ObjectLength(item);
//        console.log(objLenght);
        if (objLenght == 2) {
            lastSplit = key;
            counter = 0;
        } else {
            ++counter;
        }
        
        if (typeof item === 'number'){
            if (source[key] == value) {
                deleteKeys();
            } else {
                continue;
            }
        }
            
//        console.log(lastSplit);
        if (item == value) {
            return("found: " + value);
        } 
        else {
            var loop = find(item, value);
            if (loop) {
                return loop;
            }
        }
    }

    return null;
}
if (search == "-v") {
    var result = find(jsonParsed, searchValue);
    console.log(result); 
} else {
    console.log('error');
}
for (i in path) {
console.log(path[i] + "/");
}

console.log("Last Split: " + lastSplit);
console.log(counter);