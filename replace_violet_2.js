const fs = require('fs');
const path = require('path');

const filesToUpdate = [
    "f:\\Vulcans\\app\\admin\\setup\\page.tsx",
    "f:\\Vulcans\\app\\admin\\login\\page.tsx",
    "f:\\Vulcans\\app\\admin\\dashboard\\page.tsx",
    "f:\\Vulcans\\app\\admin\\dashboard\\layout.tsx",
    "f:\\Vulcans\\app\\admin\\dashboard\\events\\page.tsx",
    "f:\\Vulcans\\app\\(public)\\team\\page.tsx",
    "f:\\Vulcans\\app\\(public)\\page.tsx",
    "f:\\Vulcans\\app\\(public)\\achievements\\page.tsx",
    "f:\\Vulcans\\app\\(public)\\about\\page.tsx",
    "f:\\Vulcans\\app\\(public)\\gallery\\page.tsx",
    "f:\\Vulcans\\app\\(public)\\contact\\page.tsx"
];

let totalChanges = 0;

filesToUpdate.forEach(file => {
    if(!fs.existsSync(file)) {
        console.log("File not found: " + file);
        return;
    }
    
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
        .replace(/shadow-violet-\d+\/(\d+)/g, 'shadow-[0_0_15px_var(--primary-glow)]')
        .replace(/shadow-lg shadow-violet-\d+\/\d+/g, 'shadow-[0_0_15px_var(--primary-glow)]')
        .replace(/shadow-xl shadow-violet-\d+\/\d+/g, 'shadow-[0_0_20px_var(--primary-glow)]')
        .replace(/shadow-violet-\d+/g, 'shadow-[var(--primary-glow)]')
        .replace(/bg-purple-\d+\/(\d+)/g, 'bg-[var(--primary)]/$1')
        .replace(/focus:border-violet-\d+\/(\d+)/g, 'focus:border-[var(--primary)]/$1')
        .replace(/hover:border-violet-\d+\/(\d+)/g, 'hover:border-[var(--primary)]/$1')
        .replace(/hover:bg-violet-\d+\/(\d+)/g, 'hover:bg-[var(--primary)]/$1')
        .replace(/hover:text-violet-\d+/g, 'hover:text-[var(--primary)]')
        .replace(/text-purple-\d+/g, 'text-[var(--primary)]');
        
    // Also handling specific cases found:
    newContent = newContent.replace(/from-violet-600 to-purple-700/g, 'from-[var(--primary)] to-[var(--primary)]/80');
    newContent = newContent.replace(/via-purple-500\/30/g, 'via-[var(--primary)]/30');

    if (content !== newContent) {
        fs.writeFileSync(file, newContent);
        console.log("Updated " + file);
        totalChanges++;
    }
});

console.log("Total files updated: " + totalChanges);
