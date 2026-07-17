
const chatBox = document.getElementById("chatBox");
const userInput = document.getElementById("userInput");
const sendBtn = document.getElementById("sendBtn");

function addMessage(message, sender) {
  const div = document.createElement("div");
  div.className = "message " + sender;
  div.innerHTML = message;
  chatBox.appendChild(div);
  chatBox.scrollTop = chatBox.scrollHeight;
}

async function sendMessage() {
  const message = userInput.value.trim();

  if (!message) return;

  addMessage(message, "user");
  userInput.value = "";

  addMessage("Thinking...", "bot");

  try {
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        message: message
      })
    });

    const data = await response.json();

    document.querySelector(".bot:last-child").remove();

    addMessage(data.reply, "bot");

  } catch (error) {

    document.querySelector(".bot:last-child").remove();

    addMessage("Connection Error!", "bot");
  }
}

sendBtn.addEventListener("click", sendMessage);

userInput.addEventListener("keypress", function(e) {
  if (e.key === "Enter") {
    sendMessage();
  }
});
