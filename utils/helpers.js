
/* MIT License

Copyright (c) 2020 Alan Miles and Contributors

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/


const format = (seconds) => {
    function pad(s){
    return (s < 10 ? '0' : '') + s;
    }
    var hours = Math.floor(seconds / (60*60));
    var minutes = Math.floor(seconds % (60*60) / 60);
    var seconds = Math.floor(seconds % 60);

    return pad(hours) + ':' + pad(minutes) + ':' + pad(seconds);
}

const rollDice = () => Math.floor(Math.random() * 6) + 1;

var today = new Date();
const time = () => today.getHours() + ":" + today.getMinutes()

// Sory array by property
// sortArrayBy('property', boolean, primer)
const sortArrayBy = (field, reverse, primer) => {

    var key = primer ? function (x) { 
        return primer(x[field]); 
    } 
    : function (x) { 
        return x[field]; 
    }
    reverse = !reverse ? 1 : -1;
    return function(a, b) {
      return a = key(a), b = key(b), reverse * ((a > b) - (b > a));
    }
  }

exports.helpers = {time, rollDice, format, sortArrayBy};