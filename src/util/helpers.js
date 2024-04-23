const skillsList = {
  css: "css",
  sass: "sass",
  javascript: "javascript",
  js: "javascript",
  react: "react",
  reactjs: "react",
  next: "nextjs",
  nextjs: "nextjs",
  node: "node",
  python: "python",
  mongodb: "mongodb",
  mongo: "mongodb",
  aws: "aws",
};

export function getSvg(skill) {
  const sk = skill.replace(" ", "").toLowerCase();

  if (skillsList.hasOwnProperty(sk)) return `/${skillsList[sk]}.svg`;

  return `/Award.svg`;
}
