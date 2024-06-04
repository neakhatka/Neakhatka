// import * as fs from 'fs';
// import * as path from 'path';
// import { parse, stringify } from 'yaml';

// const projects = ['project1', 'project2'];
// const combinedSpec: any = {
//   openapi: '3.0.0',
//   info: {
//     title: 'Combined API',
//     version: '1.0.0'
//   },
//   paths: {},
//   components: {
//     schemas: {}
//   }
// };

// projects.forEach(project => {
//   const filePath = path.join(__dirname, '..', project, 'swagger', 'openapi.yaml');
//   const fileContents = fs.readFileSync(filePath, 'utf8');
//   const parsed = parse(fileContents);

//   Object.assign(combinedSpec.paths, parsed.paths);
//   Object.assign(combinedSpec.components.schemas, parsed.components.schemas);
// });

// const outputDir = path.join(__dirname, '..', 'docs');
// if (!fs.existsSync(outputDir)) {
//   fs.mkdirSync(outputDir);
// }
// const outputPath = path.join(outputDir, 'combined-openapi.yaml');
// fs.writeFileSync(outputPath, stringify(combinedSpec));
// console.log('Combined OpenAPI spec written to docs/combined-openapi.yaml');
