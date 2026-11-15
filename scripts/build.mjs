import { mkdir, readFile, writeFile } from 'node:fs/promises';

const root = new URL('../', import.meta.url);
const read = (path) => readFile(new URL(path, root), 'utf8');

const [template, css, app, data, icons, license] = await Promise.all([
  'src/template.html',
  'src/app.css',
  'src/app.js',
  'data/annotation-schema.json',
  'src/assets/icons.json',
  'src/assets/ICONS_LICENSE.txt',
].map(read));

const html = (`<!-- Chromium DevTools icon license\n${license}\n-->\n${template}`)
  .replace('<img data-icon="volume" alt="">', '声音')
  .replace('/*__CSS__*/', css)
  .replace('/*__DATA__*/', `const DATA=${JSON.stringify(JSON.parse(data))};\nconst ICONS=${JSON.stringify(JSON.parse(icons))};`)
  .replace('/*__JS__*/', app);

await mkdir(new URL('dist/', root), { recursive: true });
await Promise.all([
  writeFile(new URL('index.html', root), html, 'utf8'),
  writeFile(new URL('dist/泥沙水净化实验视频标注器.html', root), html, 'utf8'),
]);

console.log('Built index.html and dist/泥沙水净化实验视频标注器.html');
