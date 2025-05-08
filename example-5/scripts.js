const todos = [
    { topic: "text", description: "test" },
    { topic: "test2", description: "test2" },
  ];
  const lists = document.querySelector("ul");
  const form = document.querySelector("#main-form");
  function showList() {
    todos.map((todo) => {
      const topic = document.createElement("h2");
      const description = document.createElement("p");
      const list = document.createElement("li");
      topic.innerText = todo.topic;
      description.innerText = todo.description;
      list.appendChild(topic);
      list.appendChild(description);
      lists.appendChild(list);
    });
  }
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    const formTopic = formData.get("topic");
    const formDesc = formData.get("detail");
    todos.push({ topic: formTopic, description: formDesc });
    lists.innerHTML = "";
    showList();
    form.reset();
  });
  showList();