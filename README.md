# HouseNow AI Agent

Web demo AI sales & customer success agent cho HouseNow.

Agent dùng 3 file knowledge:
- `SaleScript.md`: kịch bản sale trung tâm, các skill khác phải follow theo script này.
- `Region.md`: tư vấn khu vực, dự án, phân khúc giá và số phòng ngủ theo báo cáo thị trường Q1-Q2/2026.
- `Skills_HN.md`: sales knowledge, gói hội viên, Premium, boost, ví HouseNow.
- `Agent_CS_Skill.md`: chăm sóc khách hàng, đăng tin, nhận khách, Homi.
- `VanPhong.md`: giọng văn tự nhiên, vui vẻ, gần người thật.

Trong bản deploy Vercel, nội dung các file knowledge được đóng gói vào `api/knowledge.js` để serverless function import trực tiếp. Cách này tránh lỗi Vercel không bundle file `.md` vào runtime.

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

6. Nếu muốn agent tự tạo QR thanh toán, thêm các Environment Variables:

```text
VIETQR_BANK_ID=970436
VIETQR_ACCOUNT_NO=123456789
VIETQR_ACCOUNT_NAME=HOUSENOW
PAYMENT_DESCRIPTION_PREFIX=HouseNow
```

`VIETQR_BANK_ID` là mã ngân hàng dùng cho VietQR, `VIETQR_ACCOUNT_NO` là số tài khoản nhận tiền. Khi khách có intent mua/thanh toán/quét QR và nội dung có gói/dịch vụ đủ rõ, API sẽ trả thêm QR để frontend hiển thị.

7. Deploy.

Sau khi deploy, mở URL Vercel và chat thử.

## Lưu ý bảo mật

- Không đặt OpenAI API key trong frontend.
- API key chỉ được lưu trong Vercel Environment Variables.
- File `api/chat.js` chạy server-side, frontend chỉ gọi `/api/chat`.
