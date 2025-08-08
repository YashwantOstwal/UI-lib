const checkboxesData = [
  {
    id: "a",
    name: "Electronics",
    type: "directory",
    descendentFiles: 4,
    items: [
      {
        id: "aa",
        name: "Mobile phones",
        type: "directory",
        descendentFiles: 2,
        items: [
          {
            id: "aaa",

            name: "iPhone",
            type: "file",
            descendentFiles: 1,
          },
          {
            id: "aab",

            name: "Android",
            type: "file",
            descendentFiles: 1,
          },
        ],
      },
      {
        name: "Laptops",
        type: "directory",
        descendentFiles: 2,
        items: [
          {
            name: "MacBook",
            descendentFiles: 1,
            type: "file",
          },
          {
            name: "Surface Pro",
            type: "file",
            descendentFiles: 1,
          },
        ],
      },
    ],
  },
  {
    name: "Books",
    type: "directory",
    descendentFiles: 2,
    items: [
      {
        name: "Fiction",
        type: "file",
        descendentFiles: 1,
      },
      {
        name: "Non-fiction",
        type: "file",
        descendentFiles: 1,
      },
    ],
  },
  {
    name: "Toys",
    type: "file",
    descendentFiles: 1,
  },
];

// processing the Data would result in adding an id and no of descendent files
export default function MarkAsDone() {
  return <></>;
}
