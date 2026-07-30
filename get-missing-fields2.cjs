const fs = require('fs');

const content = fs.readFileSync('src/pages/playground/index.astro', 'utf8');

const regex =
	/<label class='label grid[^>]*>.*?<span[^>]*>(?:<span class='font-light'>.*?<\/span>)(.*?)<\/span>.*?<(input|select)[^>]*class='([^']*)'/gs;

let match;
while ((match = regex.exec(content)) !== null) {
	const labelText = match[1].trim();
	const inputClass = match[3];
	if (!inputClass.includes('col-[7/13]')) {
		console.log(`Mismatch on ${labelText}: input has class ${inputClass}`);
	}
}
