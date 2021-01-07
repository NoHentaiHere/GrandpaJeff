// Get a user using an approximate name using the Jaro-Winkler Distance algorithim and return the user.
// This is best used with "message.guild.members.cache.find(user => user.displayName === leven(message, args))"
// 
// Arguments: 
// message is a simple message object. This is passed to every command in this bot.
// args is the user's argument. This assumes that every argument following a command is of a single name. Passed to every command.
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

const jw = require('jaro-winkler')

const max = (score_func, arr) => {
  let max_score = null;
  let max_item = null;
  arr.forEach((item, idx) => {
    const score = score_func(item);
    if (max_score == null || score > max_score) {
      max_score = score;
      max_item = idx;
    }
  });
  return { index: max_item, score: max_score };
}

const best_match = (message, args) => {
  const name = args.join(' ')
  var userList = Array.from(message.guild.members.cache.mapValues(user => user.displayName))
  var { index, score } = max(x => jw(x[1], name, {caseSensitive: false}), userList)
  var username = userList[index][1]
  return { username, score };
}

exports.best_match = best_match