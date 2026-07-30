const fs = require('fs');

const content = fs.readFileSync('src/pages/playground/index.astro', 'utf8');

// The issue might be that I missed replacing SOME fields, or the user is looking at a specific one I missed.
const matches = content.match(/<label class='label grid grid-cols-10/g);
console.log('grid-cols-10 matches:', matches ? matches.length : 0);

const builderMatches = content.match(/<label class='label.*?>\s*<span.*?>\s*<span class='font-light'>Builder/g);
console.log('Builder fields total:', builderMatches ? builderMatches.length : 0);
