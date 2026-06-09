import http from "node:http";
import { existsSync, createReadStream } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import chatHandler from "./api/chat.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PUBLIC_DIR = path.join(__dirname, "public");
const PORT = Number(process.env.PORT || 4174);

function mimeType(filePath) {
  const ext = path.extname(filePath);
  return (
    {
      ".html": "text/html; charset=utf-8",
      ".css": "text/css; charset=utf-8",
      ".js": "application/javascript; charset=utf-8",
      ".json": "application/json; charset=utf-8",
      ".svg": "image/svg+xml",
    }[ext] || "application/octet-stream"
  );
}

function getBody(req) {
  return new Promise((resolve, reject) => {
    let data = "";
    req.on("data", (chunk) => {
      data += chunk;
      if (data.length > 1_000_000) {
        reject(new Error("Request body too large"));
        req.destroy();
      }
    });
    req.on("end", () => resolve(data));
    req.on("error", reject);
  });
}

function createLocalResponse(res) {
  return {
    setHeader: (...args) => res.setHeader(...args),
    status(code) {
      res.statusCode = code;
      return this;
    },
    json(payload) {
      res.setHeader("Content-Type", "application/json; charset=utf-8");
      res.end(JSON.stringify(payload));
    },
    end(payload) {
      res.end(payload);
    },
  };
}

async function handleApi(req, res) {
  try {
    const raw = await getBody(req);
    req.body = raw ? JSON.parse(raw) : {};
    await chatHandler(req, createLocalResponse(res));
  } catch (error) {
    res.writeHead(500, { "Content-Type": "application/json; charset=utf-8" });
    res.end(JSON.stringify({ error: error.message }));
  }
}

function serveStatic(req, res) {
  const url = new URL(req.url, `http://${req.headers.host}`);
  const cleanPath = decodeURIComponent(url.pathname).replace(/^\/+/, "");
  const requestedPath = cleanPath || "index.html";
  const filePath = path.normalize(path.join(PUBLIC_DIR, requestedPath));

  if (!filePath.startsWith(PUBLIC_DIR) || !existsSync(filePath)) {
    res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
    res.end("Not found");
    return;
  }

  res.writeHead(200, { "Content-Type": mimeType(filePath) });
  if (req.method === "HEAD") {
    res.end();
    return;
  }
  createReadStream(filePath).pipe(res);
}

const server = http.createServer((req, res) => {
  if (req.url === "/api/chat") {
    void handleApi(req, res);
    return;
  }

  if (req.method === "GET" || req.method === "HEAD") {
    serveStatic(req, res);
    return;
  }

  res.writeHead(405, { "Content-Type": "text/plain; charset=utf-8" });
  res.end("Method not allowed");
});

server.listen(PORT, () => {
  console.log(`HouseNow AI Agent: http://localhost:${PORT}`);
  console.log(
    process.env.OPENAI_API_KEY
      ? `OpenAI model: ${process.env.OPENAI_MODEL || "gpt-4.1-mini"}`
      : "OPENAI_API_KEY is not set. Chat API will return a setup error.",
  );
});
