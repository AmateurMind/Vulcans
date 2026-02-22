const fs = require('fs');
const path = require('path');

function walk(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);
        if (stat && stat.isDirectory() && !fullPath.includes('node_modules') && !fullPath.includes('.next')) {
            results = results.concat(walk(fullPath));
        } else if (file.endsWith('.tsx') || file.endsWith('.ts')) {
            results.push(fullPath);
        }
    });
    return results;
}

const files = walk('f:/Vulcans/app');
files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    
    let newContent = content
        .replace(/text-violet-\d+/g, 'text-[var(--primary)]')
        .replace(/bg-violet-\d+\/(\d+)/g, 'bg-[var(--primary)]/$1')
        .replace(/bg-violet-\d+/g, 'bg-[var(--primary)]')
        .replace(/border-violet-\d+\/(\d+)/g, 'border-[var(--primary)]/$1')
        .replace(/border-violet-\d+/g, 'border-[var(--primary)]')
        .replace(/from-violet-\d+\/(\d+)/g, 'from-[var(--primary)]/$1')
        .replace(/from-violet-\d+/g, 'from-[var(--primary)]')
        .replace(/via-purple-\d+\/(\d+)/g, 'via-[var(--primary)]/$1')
        .replace(/via-purple-\d+/g, 'via-[var(--primary)]')
        .replace(/to-purple-\d+\/(\d+)/g, 'to-[var(--primary)]/$1')
        .replace(/to-purple-\d+/g, 'to-[var(--primary)]')
        .replace(/to-purple-\d+/g, 'to-[var(--primary)]')
        .replace(/shadow-violet-\d+\/(\d+)/g, 'shadow-[0_0_15px_var(--primary-glow)]')
        .replace(/shadow-violet-\d+/g, 'shadow-[0_0_15px_var(--primary-glow)]')
        .replace(/bg-purple-\d+\/(\d+)/g, 'bg-[var(--primary)]/$1')
        .replace(/text-purple-\d+/g, 'text-[var(--primary)]')
        .replace(/bg-gradient-to-br from-\[var\(--primary\)\] to-\[var\(--primary\)\]/g, 'bg-[var(--primary)]');

    if (content !== newContent) {
        fs.writeFileSync(file, newContent);
        console.log(Updated  + file);
    }
});
