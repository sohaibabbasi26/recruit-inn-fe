const skillsList = {
  html: "html5",
  html5: "html5",
  css: "css3",
  css3: "css3",
  sass: "sass",
  javascript: "javascript",
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
  const sk = skill.replace(" ", "").replace("++", "plus").toLowerCase();

  if (skillsList.hasOwnProperty(sk)) return `/${skillsList[sk]}.svg`;

  return `/Award.svg`;
}
