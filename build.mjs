import {readFile,writeFile} from 'node:fs/promises';
const read=p=>readFile(new URL(p,import.meta.url),'utf8');
const [template,css,app,data,icons]=await Promise.all(['src/template.html','app.css','app.js','标注词典.json','assets/icons.json'].map(read));
const license=await read('assets/ICONS_LICENSE.txt');
const html=('<!-- Chromium DevTools icon license\n'+license+'\n-->\n'+template).replace('<img data-icon="volume" alt="">','声音').replace('/*__CSS__*/',css).replace('/*__DATA__*/','const DATA='+JSON.stringify(JSON.parse(data))+';\nconst ICONS='+JSON.stringify(JSON.parse(icons))+';').replace('/*__JS__*/',app);
for(const path of ['index.html','泥沙水净化实验视频标注器.html'])await writeFile(new URL(path,import.meta.url),html,'utf8');
console.log('Built index.html and standalone HTML');
