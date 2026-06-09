# HouseNow AI Agent

Web demo AI sales & customer success agent cho HouseNow.

Agent dùng 3 file knowledge:
- `Skills_HN.md`: sales knowledge, gói hội viên, Premium, boost, ví HouseNow.
- `Agent_CS_Skill.md`: chăm sóc khách hàng, đăng tin, nhận khách, Homi.
- `VanPhong.md`: giọng văn tự nhiên, vui vẻ, gần người thật.

Trong bản deploy Vercel, nội dung 3 file này được đóng gói vào `api/knowledge.js` để serverless function import trực tiếp. Cách này tránh lỗi Vercel không bundle file `.md` vào runtime.

## Chạy local

```bash
cd HouseNow_Ai_Agent
OPENAI_API_KEY=sk-... npm start
```

Mở:

```text
http://localhost:4174
```

Tuỳ chọn model:

```bash
OPENAI_MODEL=gpt-4.1-mini OPENAI_API_KEY=sk-... npm start
```

## Deploy lên Vercel

1. Tạo repository GitHub chứa folder `HouseNow_Ai_Agent`.
2. Vào Vercel, chọn **Add New Project** và import repository.
3. Trong phần project settings, đặt **Root Directory** là:

```text
HouseNow_Ai_Agent
```

4. Thêm Environment Variable:

```text
OPENAI_API_KEY=sk-...
```

5. Tuỳ chọn thêm:

```text
OPENAI_MODEL=gpt-4.1-mini
```

6. Deploy.

Sau khi deploy, mở URL Vercel và chat thử.

## Lưu ý bảo mật

- Không đặt OpenAI API key trong frontend.
- API key chỉ được lưu trong Vercel Environment Variables.
- File `api/chat.js` chạy server-side, frontend chỉ gọi `/api/chat`.
