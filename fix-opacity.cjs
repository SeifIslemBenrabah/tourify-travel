const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    file = path.join(dir, file);
    if (fs.statSync(file).isDirectory()) {
      results = results.concat(walk(file));
    } else if (file.endsWith('.tsx') || file.endsWith('.ts')) {
      results.push(file);
    }
  });
  return results;
}

const files = walk('C:\\\\Users\\\\admin\\\\Desktop\\\\new client\\\\tourify_travel\\\\src');

for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');

  // Fix the missing numbers caused by PowerShell evaluating $1 as empty string
  content = content.replace(/text-primary\/(?=[ \"])/g, 'text-primary/60');
  content = content.replace(/border-primary\/(?=[ \"])/g, 'border-primary/10');
  
  fs.writeFileSync(file, content, 'utf8');
}
console.log('Fixed missing opacity values');
