const messagesEl = document.querySelector("#messages");
const form = document.querySelector("#chatForm");
const input = document.querySelector("#messageInput");
const sendButton = document.querySelector("#sendButton");
const resetButton = document.querySelector("#resetButton");
const statusText = document.querySelector("#statusText");
const promptButtons = document.querySelectorAll("[data-prompt]");

const welcomeMessage =
  "Dạ chào anh/chị, em là AI agent HouseNow. Em có thể tư vấn gói đăng tin, hướng dẫn đăng tin, cách nhận khách, cách tối ưu hiển thị và giới thiệu Homi. Anh/chị đang cần hỗ trợ phần nào ạ?";

let history = [{ role: "assistant", content: welcomeMessage }];

function renderMessage(role, content) {
  const node = document.createElement("article");
  node.className = `message ${role}`;
  node.textContent = content;
  messagesEl.appendChild(node);
  messagesEl.scrollTop = messagesEl.scrollHeight;
  return node;
}

function renderHistory() {
  messagesEl.innerHTML = "";
  history.forEach((message) => renderMessage(message.role, message.content));
}

function setLoading(isLoading) {
  sendButton.disabled = isLoading;
  sendButton.textContent = isLoading ? "..." : "Gửi";
  statusText.textContent = isLoading ? "Agent đang trả lời..." : "Sẵn sàng test";
}

function autosizeInput() {
  input.style.height = "auto";
  input.style.height = `${Math.min(input.scrollHeight, 170)}px`;
}

function wait(ms) {
  return new Promise((resolve) => window.setTimeout(resolve, ms));
}

async function renderAssistantMessages(messages) {
  const validMessages = messages
    .filter((message) => typeof message === "string" && message.trim())
    .map((message) => message.trim());

  for (const [index, message] of validMessages.entries()) {
    if (index > 0) {
      const typingNode = renderMessage("assistant typing", "Đang soạn phản hồi...");
      await wait(Math.min(900, 360 + message.length * 8));
      typingNode.remove();
    }
    renderMessage("assistant", message);
  }
}

async function sendMessage(content) {
  const trimmed = content.trim();
  if (!trimmed) return;

  history.push({ role: "user", content: trimmed });
  renderMessage("user", trimmed);
  input.value = "";
  autosizeInput();
  setLoading(true);

  const typingNode = renderMessage("assistant typing", "Đang soạn phản hồi...");

  try {
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages: history }),
    });
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Agent chưa phản hồi được");
    }

    typingNode.remove();
    const assistantMessages =
      Array.isArray(data.messages) && data.messages.length > 0
        ? data.messages
        : [data.reply];
    const combinedReply = assistantMessages.join("\n\n");

    history.push({ role: "assistant", content: combinedReply });
    await renderAssistantMessages(assistantMessages);
    statusText.textContent = `Đang dùng ${data.model}`;
  } catch (error) {
    typingNode.remove();
    renderMessage(
      "error",
      `Lỗi: ${error.message}\n\nNếu lỗi liên quan OPENAI_API_KEY, anh/chị kiểm tra biến môi trường trên Vercel. Nếu lỗi liên quan knowledge file, hãy redeploy bản mới nhất có thư mục api/*.md.`,
    );
    statusText.textContent = "Lỗi cấu hình/API";
  } finally {
    setLoading(false);
    input.focus();
  }
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  void sendMessage(input.value);
});

input.addEventListener("input", autosizeInput);

input.addEventListener("keydown", (event) => {
  if (event.key === "Enter" && !event.shiftKey) {
    event.preventDefault();
    form.requestSubmit();
  }
});

promptButtons.forEach((button) => {
  button.addEventListener("click", () => {
    void sendMessage(button.dataset.prompt || "");
  });
});

resetButton.addEventListener("click", () => {
  history = [{ role: "assistant", content: welcomeMessage }];
  renderHistory();
  input.focus();
});

renderHistory();
autosizeInput();
