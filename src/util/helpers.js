import { citiesList } from "./cities";

const skillsList = {
  html: "html5",
  html5: "html5",
  css: "css3",
  css3: "css3",
  sass: "sass",
  javascript: "javascript",
  java: "java",
  react: "reactjs",
  reactquery: "reactquery",
  redux: "redux",
  next: "nextjs",
  angular: "angular",
  svelte: "sveltejs",
  angular: "angularjs",
  typescript: "typescript",
  vite: "vitejs",
  node: "nodejs",
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
  nest: "nest",
  vitest: "vitest",
  logrocket: "logrocket",
  kubernetes: "kubernetes",
  express: "express",
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
  mongoose: "mongoose",
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
    .replace(/\s+/g, "") //whitespace
    .replace(/-/g, "") // -
    .replace(/\+\+/g, "plus") // ++ pattern
    .replace(/#/g, "sharp") // #
    .replace(/js+$/i, "") // js at the end
    .toLowerCase();

  if (skillsList.hasOwnProperty(replacedSkill))
    return `/${skillsList[replacedSkill]}.svg`;

  return `/Award.svg`;
}

export function getCities(country) {
  if (citiesList.hasOwnProperty(country)) return citiesList[country];

  return ["Empty"];
}
