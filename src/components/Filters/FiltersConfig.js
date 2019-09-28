const filtersSet = {
  react: {
    name: "React",
    id: "react",
    type: "MULTISELECT",
    selected: false,
    query: "React"
  },
  angular: {
    name: "Angular",
    id: "angular",
    type: "MULTISELECT",
    selected: false,
    query: "Angular"
  },
  vue: {
    name: "Vue",
    id: "vue",
    type: "MULTISELECT",
    selected: false,
    query: "Vue"
  },
  webComponents: {
    name: "Web Components",
    id: "webComponents",
    type: "MULTISELECT",
    selected: false,
    query: "Web Components"
  },
  fullTime: {
    name: "Full Time",
    id: "fullTime",
    selected: false,
    query: "&isPartTime=false"
  },
  partTime: {
    name: "Part Time",
    id: "partTime",
    selected: false,
    query: "&isPartTime=true"
  },
  contract: {
    name: "Contract",
    id: "contract",
    selected: false,
    query: "&isContract=true"
  },
  permanent: {
    name: "Permanent",
    id: "permanent",
    selected: false,
    query: "&isPermanent=true"
  },
  beginner: {
    name: "Beginner",
    id: "beginner",
    selected: true,
    query: "&level=0",
    level: 0
  },
  intermediate: {
    name: "Intermediate",
    id: "intermediate",
    selected: false,
    query: "&level=1",
    level: 1
  },
  expert: {
    name: "Expert",
    id: "expert",
    selected: false,
    query: "&level=2",
    level: 2
  }
};

export { filtersSet };
