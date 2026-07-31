const fs = require('fs');
const path = require('path');

const root = __dirname;
const publicDir = path.join(root, 'public');
const srcDir = path.join(root, 'src');

const dirsToCreate = [
    publicDir,
    path.join(publicDir, 'images', 'logos'),
    path.join(publicDir, 'images', 'projects'),
    path.join(publicDir, 'images', 'profile'),
    path.join(publicDir, 'documents', 'certificates'),
    path.join(publicDir, 'documents', 'resume'),
    srcDir,
    path.join(srcDir, 'css'),
    path.join(srcDir, 'js')
];

dirsToCreate.forEach(d => {
    if (!fs.existsSync(d)) fs.mkdirSync(d, { recursive: true });
});

const moves = [];
function addMove(src, dest) {
    if (fs.existsSync(path.join(root, src))) {
        moves.push({ src: path.join(root, src), dest: path.join(root, dest) });
    }
}

addMove('assets/index.css', 'src/css/main.css');
addMove('assets/script.js', 'src/js/main.js');
addMove('assets/bhumit-logo.svg', 'public/images/logos/bhumit-logo.svg');
addMove('assets/profile.jpg', 'public/images/profile/profile.jpg');
addMove('assets/profile.jpg.png', 'public/images/profile/profile.jpg.png');
addMove('reference/Bhumit_Vasava_Resume.pdf', 'public/documents/resume/Bhumit_Vasava_Resume.pdf');

['coregym_logo.png', 'coregym_logo.svg', 'dubvibe_logo.png', 'dubvibe_logo.svg', 'pixelforge_logo.png', 'pixelforge_logo.svg', 'skillbridge_logo.png', 'skillbridge_logo.svg', 'vocaberry_logo.png', 'vocaberry_logo.svg'].forEach(f => {
    addMove(`reference/${f}`, `public/images/logos/${f}`);
});

['screen.png'].forEach(f => {
    addMove(`reference/${f}`, `public/images/projects/${f}`);
});

['photo.jpg'].forEach(f => {
    addMove(`reference/${f}`, `public/images/profile/photo.jpg`);
});

['Bhumit_Vasava_AI_Studio_Certificate.pdf', 'Bhumit_Vasava_OS_Certificate.pdf', 'Bhumit_Vasava_Postman_Certificate.pdf'].forEach(f => {
    addMove(`certificates/${f}`, `public/documents/certificates/${f}`);
});

moves.forEach(m => {
    try {
        fs.renameSync(m.src, m.dest);
    } catch(e) {
        console.error('Failed moving', m.src, e.message);
    }
});

const indexHtmlPath = path.join(root, 'index.html');
if (fs.existsSync(indexHtmlPath)) {
    let html = fs.readFileSync(indexHtmlPath, 'utf8');
    
    html = html.replace(/href="assets\/index\.css[^"]*"/, 'href="/src/css/main.css"');
    html = html.replace(/src="assets\/script\.js[^"]*"/, 'src="/src/js/main.js"');
    
    const refReplacements = {
        'assets/bhumit-logo.svg': '/images/logos/bhumit-logo.svg',
        'reference/Bhumit_Vasava_Resume.pdf': '/documents/resume/Bhumit_Vasava_Resume.pdf',
        'reference/screen.png': '/images/projects/screen.png',
        'reference/profile.jpg.png': '/images/profile/profile.jpg.png',
        'reference/photo.jpg': '/images/profile/photo.jpg',
        'assets/profile.jpg': '/images/profile/profile.jpg',
        'certificates/Bhumit_Vasava_AI_Studio_Certificate.pdf': '/documents/certificates/Bhumit_Vasava_AI_Studio_Certificate.pdf',
        'certificates/Bhumit_Vasava_OS_Certificate.pdf': '/documents/certificates/Bhumit_Vasava_OS_Certificate.pdf',
        'certificates/Bhumit_Vasava_Postman_Certificate.pdf': '/documents/certificates/Bhumit_Vasava_Postman_Certificate.pdf',
    };
    
    ['coregym_logo.png', 'coregym_logo.svg', 'dubvibe_logo.png', 'dubvibe_logo.svg', 'pixelforge_logo.png', 'pixelforge_logo.svg', 'skillbridge_logo.png', 'skillbridge_logo.svg', 'vocaberry_logo.png', 'vocaberry_logo.svg'].forEach(f => {
        refReplacements[`reference/${f}`] = `/images/logos/${f}`;
    });
    
    for (const [oldPath, newPath] of Object.entries(refReplacements)) {
        html = html.split(oldPath).join(newPath);
    }
    
    fs.writeFileSync(indexHtmlPath, html);
    console.log('Updated index.html');
}

[ 'assets', 'reference', 'certificates' ].forEach(d => {
    try {
        fs.rmSync(path.join(root, d), { recursive: true, force: true });
    } catch(e) {}
});

console.log('Restructure complete.');
