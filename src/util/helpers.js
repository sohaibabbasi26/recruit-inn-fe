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

// packages
export const packages = {
  availableOptions: [
    "4 reports of candidates",
    "add upto 4 skills",
    "4 reports of candidates",
    "add upto 4 skills",
    "4 reports of candidates",
    "add upto 4 skills",
  ],
  availablePackages: [
    {
      buttonText: "selected package",
      name: "free",
      price: "0",
      options: ["4 reports of candidates", "add upto 4 skills"],
    },
    {
      buttonText: "get started",
      name: "standard",
      price: "49",
      options: [
        "4 reports of candidates",
        "add upto 4 skills",
        "4 reports of candidates",
      ],
    },
    {
      buttonText: "get started",
      name: "pro",
      price: "99",
      options: [
        "4 reports of candidates",
        "add upto 4 skills",
        "4 reports of candidates",
        "add upto 4 skills",
        "4 reports of candidates",
      ],
    },
    {
      buttonText: "contact sales",
      name: "enterprise",
      price: "contact us",
      options: [
        "4 reports of candidates",
        "add upto 4 skills",
        "4 reports of candidates",
        "add upto 4 skills",
        "4 reports of candidates",
        "add upto 4 skills",
      ],
    },
  ],
};
