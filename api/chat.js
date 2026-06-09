import { csSkill, salesSkill, voice } from "./knowledge.js";

const MODEL = process.env.OPENAI_MODEL || "gpt-4.1-mini";

let promptCache = "";

function buildSystemPrompt() {
  if (promptCache) return promptCache;

  promptCache = [
    "Bạn là AI sales & customer success agent của HouseNow.",
    "Mục tiêu: tư vấn khách hàng/môi giới về gói HouseNow, tin Premium, lượt đẩy, ví HouseNow, cách đăng tin, cách nhận khách và tính năng Homi.",
    "Luôn trả lời tiếng Việt. Xưng em, gọi khách là anh/chị. Văn phong tự nhiên, vui vẻ vừa đủ, gần người thật, nhưng không nói quá và không cam kết kết quả chắc chắn.",
    "Chỉ dùng knowledge base bên dưới làm nguồn sự thật. Nếu thiếu dữ liệu, nói cần kiểm tra thêm hoặc chuyển CS/human.",
    "Không tự bịa khuyến mãi, bonus, chính sách hoàn tiền, thuật toán chi tiết, tỷ lệ hiển thị, số lead chắc chắn hoặc cam kết giao dịch.",
    "USP cần thể hiện đúng ngữ cảnh: HouseNow tận dụng thuật toán tối ưu hiển thị theo chất lượng dữ liệu, độ phù hợp nhu cầu và tín hiệu tương tác, thay vì chỉ ưu tiên ai trả tiền nhiều hơn thì lên trước.",
    "Nếu khách gặp lỗi thanh toán, lỗi tài khoản, hoàn tiền, hóa đơn, dữ liệu cá nhân hoặc khiếu nại: thu thập số điện thoại tài khoản, mã tin/giao dịch nếu có, ảnh chụp lỗi/chứng từ, thời điểm phát sinh, rồi chuyển CS/human.",
    "Không yêu cầu OTP, mật khẩu hoặc thông tin nhạy cảm không cần thiết.",
    "Hãy chia câu trả lời thành 1-4 tin nhắn ngắn như người thật đang chat. Mỗi tin nhắn nên tự nhiên, không quá dài, không tách vụn câu vô nghĩa.",
    'Luôn trả về JSON hợp lệ đúng format: {"messages":["tin nhắn 1","tin nhắn 2"]}. Không bọc markdown, không thêm chữ ngoài JSON.',
    "\n--- SALES KNOWLEDGE ---\n",
    salesSkill,
    "\n--- CUSTOMER SUCCESS KNOWLEDGE ---\n",
    csSkill,
    "\n--- VOICE AND TONE ---\n",
    voice,
  ].join("\n\n");

  return promptCache;
}

function setCors(res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
}

function normalizeMessages(messages) {
  if (!Array.isArray(messages)) return [];

  return messages
    .filter(
      (message) =>
        message &&
        ["user", "assistant"].includes(message.role) &&
        typeof message.content === "string" &&
        message.content.trim(),
    )
    .slice(-16)
    .map((message) => ({
      role: message.role,
      content: message.content.trim().slice(0, 5000),
    }));
}

function splitReplyIntoMessages(reply) {
  const trimmed = String(reply || "").trim();
  if (!trimmed) return ["Dạ hiện em chưa tạo được phản hồi. Anh/chị thử hỏi lại giúp em nha."];

  try {
    const parsed = JSON.parse(trimmed);
    if (Array.isArray(parsed.messages)) {
      const messages = parsed.messages
        .filter((message) => typeof message === "string" && message.trim())
        .map((message) => message.trim())
        .slice(0, 4);

      if (messages.length > 0) return messages;
    }
  } catch {
    // Fall through to heuristic splitting for plain text responses.
  }

  const paragraphParts = trimmed
    .split(/\n{2,}/)
    .map((part) => part.trim())
    .filter(Boolean);

  if (paragraphParts.length > 1) return paragraphParts.slice(0, 4);

  const sentenceParts = trimmed
    .split(/(?<=[.!?ạ])\s+/)
    .map((part) => part.trim())
    .filter(Boolean);

  if (sentenceParts.length <= 2) return [trimmed];

  const messages = [];
  let current = "";

  for (const sentence of sentenceParts) {
    const next = current ? `${current} ${sentence}` : sentence;
    if (next.length > 190 && current) {
      messages.push(current);
      current = sentence;
    } else {
      current = next;
    }
  }

  if (current) messages.push(current);
  return messages.slice(0, 4);
}

async function callOpenAI(messages) {
  if (!process.env.OPENAI_API_KEY) {
    throw new Error("Missing OPENAI_API_KEY");
  }

  const response = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: MODEL,
      instructions: buildSystemPrompt(),
      input: messages.map((message) => ({
        role: message.role,
        content: message.content,
      })),
      temperature: 0.45,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    const message =
      data?.error?.message || `OpenAI API request failed: ${response.status}`;
    throw new Error(message);
  }

  const outputText =
    data.output_text ||
    data.output
      ?.flatMap((item) => item.content || [])
      .map((content) => content.text || "")
      .join("")
      .trim();

  return splitReplyIntoMessages(outputText);
}

export default async function handler(req, res) {
  setCors(res);

  if (req.method === "OPTIONS") {
    res.status(204).end();
    return;
  }

  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  try {
    const messages = normalizeMessages(req.body?.messages);
    const latest = [...messages].reverse().find((message) => message.role === "user");

    if (!latest) {
      res.status(400).json({ error: "Missing user message" });
      return;
    }

    const replyMessages = await callOpenAI(messages);

    res.status(200).json({
      reply: replyMessages.join("\n\n"),
      messages: replyMessages,
      model: MODEL,
      knowledgeFiles: ["Skills_HN.md", "Agent_CS_Skill.md", "VanPhong.md"],
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
      hint:
        error.message === "Missing OPENAI_API_KEY"
          ? "Set OPENAI_API_KEY in your local shell or Vercel Environment Variables."
          : undefined,
    });
  }
}
