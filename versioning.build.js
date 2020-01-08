var fs = require('fs');
var path = require('path');
var replaceFile = require('replace-in-file');
var package = require("./package.json");
var angular = require("./angular.json");
var buildVersion = package.version;
var buildPath = '';
var defaultProject = angular.defaultProject;
var appendUrl = '?v=' + buildVersion;

const getNestedObject = (nestedObj, pathArr) => {
return pathArr.reduce((obj, key) =>
    (obj && obj[key] !== 'undefined') ? obj[key] : undefined, nestedObj);
}

const relativePath = getNestedObject(angular, ['projects',defaultProject,'architect','build','options','outputPath']); // to identify relative build path when angular make build
buildPath += relativePath.replace(/[/]/g, '\\');
var indexPath = /*__dirname +*/ buildPath + '/' + 'index.html';

console.log('Angular build path:',/* __dirname ,*/ buildPath);
console.log('Change by buildVersion:',buildVersion);

fs.readdir(/*__dirname + */buildPath, function(err, files) {

    for (var i=0; i < files.length; i++) {
        if (files[i].match(/^(main|polyfills|runtime|scripts|styles)+(-|\.|[a-z]|[0-9])*\.(js|css)$/g)) { // regex is identified by build files generated
            console.log('Current Filename:',files[i]);
            const currentPath = files[i];
            const changePath = files[i] + appendUrl;
            changeIndex(currentPath, changePath);
        }
    }

});

function changeIndex(currentfilename, changedfilename) {
    const options = {
        files: indexPath,
        from: '"'+ currentfilename + '"',
        to: '"'+ changedfilename + '"',
        allowEmptyPaths: false,
    };

    try {
        let changedFiles = replaceFile.sync(options);
        if (changedFiles == 0) {
            console.log("File updated failed");
        } else if (changedFiles[0].hasChanged === false) {
            console.log("File already updated");
        }
        console.log('Changed Filename:',changedfilename);
    }
    catch (error) {
        console.error('Error occurred:', error);
        throw error
    }
}