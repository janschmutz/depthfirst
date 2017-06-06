
printRandomNumber();
var fs = require("fs");
var content = fs.readFileSync("ha2.json");
var jsonParsed = JSON.parse(content);
var search = process.argv[2];
var searchValue = process.argv[3];
function findValue(data, value,path){
    if(typeof(data) != "object" || Object.keys(data).length == 0)
        return { "path" : "" , "value" : ""};
    for(var properties in data)  {
        if (data[properties] == value)
            return { "path" :  path + "/" + properties, "value" : value};
    }
    for(var properties in data) {
        var result = findValue(data[properties],value,path === undefined ? "/" + properties : path + "/" + properties);
        if (typeof(result) !== typeof(undefined) && result.value != "") {
            return result;
        }
    }
}
if (search == '-v') {
    var result = findValue(jsonParsed, searchValue);
    console.log(result);
} else {
    console.log('Bitte mit -v <value> starten');
}
