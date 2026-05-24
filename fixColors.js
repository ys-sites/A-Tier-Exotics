const fs = require('fs');
let code = fs.readFileSync('src/components/ScannerSection.tsx', 'utf8');
code = code.replace(/hue = 268/g, 'hue = 40');
code = code.replace(/196, 181, 253/g, '224, 205, 173');
code = code.replace(/139, 92, 246/g, '197, 176, 138');
code = code.replace(/Stop Settling For/g, 'Stop Wasting Cash On');
code = code.replace(/Ordinary Journeys/g, 'Bad Services');
fs.writeFileSync('src/components/ScannerSection.tsx', code);
