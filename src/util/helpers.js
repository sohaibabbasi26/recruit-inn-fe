import { citiesList } from "./cities";

const skillsList = {
  html: "html5",
  html5: "html5",
  css: "css3",
  css3: "css3",
  sass: "sass",
  javascript: "javascript",
  java: "java",
  reactjs: "reactjs",
  react: "reactjs",
  reactquery: "reactquery",
  redux: "redux",
  nextjs: "nextjs",
  angular: "angular",
  sveltejs: "sveltejs",
  angularjs: "angularjs",
  angular: "angularjs",
  typescript: "typescript",
  vitejs: "vitejs",
  vite: "vitejs",
  node: "nodejs",
  nodejs: "nodejs",
  python: "python",
  figma: "figma",
  jquery: "jquery",
  bootstrap: "bootstrap",
  git: "git",
  mongodb: "mongodb",
  php: "php",
  aws: "aws",
  maze: "maze",
  npm: "npm",
  cplus: "cplus",
  nim: "nim",
  nestjs: "nest",
  nest: "nest",
  vitest: "vitest",
  logrocket: "logrocket",
  kubernetes: "kubernetes",
  "react-query": "reactquery",
  reactquery: "reactquery",
  prisma: "prisma",
  trpc: "trpc",
  zod: "zod",
  stream: "stream",
  lunacy: "lunacy",
  netlify: "netlify",
  serverless: "serverless",
  openai: "openai",
  astro: "astro",
  azure: "azure",
  jest: "jest",
  codeigniter: "codeigniter",
  backbone: "backbone",
  cakephp: "cakephp",
  mocha: "mocha",
  hexo: "hexo",
  gridsome: "gridsome",
  flask: "flask",
  electron: "electron",
  ionic: "ionic",
  ember: "ember",
  ruby: "ruby",
  rails: "rails",
  tailwind: "tailwind",
  docker: "docker",
  linux: "linux",
  go: "go",
  insomnia: "insomnia",
  laravel: "laravel",
  postman: "postman",
  postgresql: "postgresql",
  mysql: "mysql",
  kotlin: "kotlin",
  rust: "rust",
  flutter: "flutter",
  csharp: "csharp",
  swift: "swift",
  graphql: "graphql",
  invision: "invision",
  framer: "framer",
  json: "json",
  django: "django",
  hotjar: "hotjar",
};

export function getSvg(skill) {
  // replace white spaces and ++ sequence
  const replacedSkill = skill
    .replace(/\s+/g, "")
    .replace(/\+\+/g, "plus")
    .toLowerCase();

  if (skillsList.hasOwnProperty(replacedSkill))
    return `/${skillsList[replacedSkill]}.svg`;

  return `/Award.svg`;
}

export function getCities(country) {
  if (citiesList.hasOwnProperty(country)) return citiesList[country];

  return ["Empty"];
}
