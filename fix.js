const fs = require('fs');
let code = fs.readFileSync('src/components/ScannerSection.tsx', 'utf8');
code = code.replace(/\\`/g, '`');
code = code.replace(/\\\${/g, '${');
fs.writeFileSync('src/components/ScannerSection.tsx', code);
