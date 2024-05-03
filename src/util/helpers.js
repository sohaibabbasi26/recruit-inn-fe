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
  node: "nodejs",
  nodejs: "nodejs",
  python: "python",
  figma: "figma",
  git: "git",
  mongodb: "mongodb",
  php: "php",
  aws: "aws",
  maze: "maze",
  npm: "npm",
  cplus: "cplus",
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
