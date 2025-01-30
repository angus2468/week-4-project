const form = document.getElementById("form");
const app = document.getElementById("app");
const API_URL = "https://week-4-project-server.onrender.com/messages";

async function handleSubmitMessage(event) {
  event.preventDefault();
  const formData = new FormData(form);
  const messageData = Object.fromEntries(formData);
  await fetch(`${API_URL}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(messageData),
  });
  getMessages();
}

async function getMessages() {
  app.innerHTML = "";
  const response = await fetch(`${API_URL}`);
  const data = await response.json();
  data.rows.forEach((message) => {
    const messageContainer = document.createElement("div");
    messageContainer.id = "message";
    const pTag = document.createElement("p");
    pTag.innerText = `${message.author} - ${message.message}`;
    messageContainer.appendChild(pTag);
    const deleteButton = document.createElement("button");
    deleteButton.id = "delete";
    deleteButton.innerText = "Delete";
    deleteButton.addEventListener("click", async () => {
      await fetch(`${API_URL}/${message.id}`, {
        method: "DELETE",
      });
      getMessages();
    });
    messageContainer.appendChild(deleteButton);
    app.appendChild(messageContainer);
  });
}

getMessages();
form.addEventListener("submit", handleSubmitMessage);
