const stackIcons = [
  { name: "React", icon: "react.png" },
  { name: "html", icon: "html.png" },
  { name: "html5", icon: "html5.png" },
  { name: "css", icon: "css.png" },
  { name: "css3", icon: "css3.png" },
  { name: "sass", icon: "sass.png" },
  { name: "node", icon: "node.png" },
  { name: "mongodb", icon: "mongodb.png" },
  { name: "mongoose", icon: "mongoose.png" },
  { name: "redux", icon: "redux.png" },
  { name: "Vue.js", icon: "vue.png" },
  { name: "Angular", icon: "angular.png" },
  { name: "test", icon: "test.png" },
  { name: "test1", icon: "test1.png" },
  { name: "test2", icon: "test2.png" },
  { name: "test3", icon: "test3.png" },
  { name: "test4", icon: "test4.png" },
  { name: "test5", icon: "test5.png" },
  { name: "test6", icon: "test6.png" },
  { name: "test7", icon: "test7.png" },
];

export default function handler(req, res) {
  const { query } = req.body;

  console.log(req.body);

  if (!query) {
    // If query is not provided
    return res.status(400).json({ error: "Query is required" });
  }

  // Filter
  const filteredIcons = stackIcons.filter((icon) =>
    icon.name.toLowerCase().includes(query.toLowerCase())
  );

  console.log(filteredIcons);

  // Return
  res.status(200).json(filteredIcons);
}
