const initialData = {
  tasks: {
    task1: { id: "task1", content: "dog" },
    task2: { id: "task2", content: "doesn't" },
    task3: { id: "task3", content: "cats." },
    task4: { id: "task4", content: "The" },
    task5: { id: "task5", content: "like" },
  },
  columns: {
    column1: {
      id: "column1",
      title: "Scramble",
      taskIds: ["task1", "task2", "task3", "task4", "task5"],
    },
  },
  columnOrder: ["column1"],
};

export default initialData;
