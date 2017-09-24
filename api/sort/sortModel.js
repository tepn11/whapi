'use strict';

var Promise = require('bluebird');
var lineArr = [];
var lineMap = new Map();

let initArray = () => {
  var asc = false;
  // TODO put in config
  var minAisle = 101;
  var maxAisle = 320;
  var minBin = 100;
  var maxBin = 550;

  for(var aisle = minAisle; aisle < maxAisle; aisle += 2) {
    var bin;
    var binObj = {
      asc: asc,
      aisle: aisle
    };
    if(asc){
      for(bin=minBin; bin<=maxBin; bin++) {
        binObj.bin = bin;
        lineArr.push('R'+aisle+'*'+bin);
        lineMap.set('R'+aisle+'*'+bin, binObj);
        lineArr.push(('R'+(aisle + 1))+'*'+bin);
        lineMap.set(('R'+(aisle + 1))+'*'+bin, binObj);
      }
      asc = false;
    } else {
      for(bin=maxBin; bin>=minBin; bin--) {
        binObj.bin = bin;
        lineArr.push('R'+aisle+'*'+bin);
        lineMap.set('R'+aisle+'*'+bin, binObj);
        lineArr.push(('R'+(aisle + 1))+'*'+bin);
        lineMap.set(('R'+(aisle + 1))+'*'+bin, binObj);
      }
      asc = true;
    }
  }
};

let sort = (unsorted) => {
  console.log('Begin sort');
  let sorted = [];
  let counter = 0;

  if (unsorted.length > 0){
    unsorted.forEach(function(v,k){
      let value = v.lineValues;
      value.push(v.matchedI);
      let matchedIndex = lineArr.indexOf(v.matchedI);
      if(matchedIndex){
        if(!sorted[matchedIndex]) {
          sorted[matchedIndex] = [];
        }
        sorted[matchedIndex].push(v);

      } else {
        console.log('Not matched', k);
      }
    });
  }

  sorted = sorted.filter(n => true);

  let formattedSort = [];
  let prev;
  sorted.forEach(function(sortedValArr,i){
    sortedValArr.forEach(function(v,i) {
      let binData = lineMap.get(v.lineValues[4]);
      if (prev && prev.asc === binData.asc && prev.aisle !== binData.aisle) {
        formattedSort.push('Go to next available aisle');
      }
      counter += 1;
      delete v.lineValues[4];
      v.lineValues.unshift(counter);
      formattedSort.push(v.lineValues);
      prev = binData;
    });
  });

  return Promise.resolve(formattedSort);
}

initArray();

module.exports = {
  sort
}