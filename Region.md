# Region - Tư vấn khu vực đăng tin theo nguồn cung và nguồn cầu HouseNow Q1-Q2/2026

Tài liệu này dùng để giúp AI agent HouseNow tư vấn cho môi giới nên ưu tiên đăng tin ở khu vực nào, dự án nào, phân khúc giá nào và loại căn nào dựa trên dữ liệu thị trường nội bộ.

Nguồn dữ liệu:
- File: `[HN] Báo cáo thị trường quý 1 và 2 năm 2026.xlsx`
- Sheet `Supply (Báo cáo nguồn cung)`: số lượng tin đăng, khoảng giá, phân bổ tin mới theo quận và dự án.
- Sheet `Demand (Báo cáo nguồn cầu)`: lượt tìm kiếm, lượt view detail theo quận, giá, dự án và số phòng ngủ.
- Sheet `Sheet2`: số lượng tin đăng theo quận/quý.

Lưu ý phạm vi:
- Dữ liệu Demand theo quận trong workbook tập trung vào 5 quận: Nam Từ Liêm, Gia Lâm, Hoàng Mai, Hà Đông, Thanh Xuân.
- Các quận khác có dữ liệu nguồn cung trong Sheet2 nhưng không đủ dữ liệu demand tương ứng để tính tỷ lệ nhu cầu/cạnh tranh chính xác.
- Agent chỉ nên dùng tài liệu này để tư vấn định hướng, không cam kết chắc chắn có khách, có lead hoặc giao dịch.

## 1. Nguyên tắc tư vấn khu vực

Khi khách hỏi "nên đăng tin ở đâu", "khu nào nhiều khách", "khu nào ít cạnh tranh", agent cần:
- Hỏi khách đang có nguồn hàng ở khu vực nào trước.
- Nếu khách có nhiều nguồn hàng, ưu tiên khu vực có nhu cầu cao và tỷ lệ demand/supply tốt.
- Không nói một khu vực chắc chắn ra khách.
- Không khuyên khách đăng sai khu vực so với nguồn hàng thật.
- Nếu khách chưa có nguồn hàng, có thể gợi ý khu vực nên ưu tiên khai thác theo dữ liệu.

Mẫu mở đầu:
"Dạ để em tư vấn sát hơn, anh/chị đang có nguồn hàng ở khu vực nào trước ạ?"

Nếu khách hỏi chung:
"Dạ theo dữ liệu Q1-Q2/2026 trên HouseNow, nhóm Hà Đông, Gia Lâm, Hoàng Mai và Nam Từ Liêm đang có nhu cầu quan tâm cao. Nếu xét cân bằng giữa nhu cầu và mức cạnh tranh tương đối, Hà Đông đang là khu vực đáng ưu tiên hơn."

## 2. Tổng quan theo quận

### Hà Đông - ưu tiên tốt nhất về cân bằng nhu cầu/cạnh tranh

Chỉ số chính:
- Tổng view detail demand: khoảng 13.329.
- Nguồn cung trung bình theo tháng trong block matched demand/supply: khoảng 800 tin.
- Demand/listing trung bình: khoảng 3,57, cao nhất trong nhóm 5 quận.
- Median price/m2: khoảng 70,2 triệu/m2.

Ý nghĩa tư vấn:
- Hà Đông có nhu cầu mạnh và tỷ lệ quan tâm trên mỗi tin tốt.
- Phù hợp để ưu tiên đăng tin nếu khách có nguồn hàng ở Văn Khê, Xa La, Kiến Hưng, Đại Thanh, Linh Đàm lân cận hoặc các dự án có mức giá vừa.
- Có thể tư vấn dùng ảnh/video tốt và tiêu đề rõ vì khách có nhu cầu nhưng vẫn so sánh nhiều căn.

Mẫu trả lời:
"Dạ nếu anh/chị có nguồn hàng ở Hà Đông thì đây là khu nên ưu tiên. Dữ liệu Q1-Q2/2026 cho thấy Hà Đông có tỷ lệ quan tâm trên mỗi tin tốt nhất trong nhóm quận đang phân tích, tức là nhu cầu khá khỏe so với lượng tin cạnh tranh."

### Gia Lâm - nhu cầu cao, phù hợp căn dự án lớn

Chỉ số chính:
- Tổng view detail demand: khoảng 15.276.
- Nguồn cung trung bình: khoảng 962 tin/tháng.
- Demand/listing trung bình: khoảng 3,39.
- Median price/m2: khoảng 71,8 triệu/m2.

Ý nghĩa tư vấn:
- Gia Lâm có demand cao và ổn định, đặc biệt nhờ các dự án lớn như Vinhomes Ocean Park và các phân khu liên quan.
- Phù hợp với căn hộ dự án, căn 1-2 phòng ngủ, mức giá 2-4 tỷ hoặc 3-5 tỷ tùy sản phẩm.
- Cạnh tranh có nhưng nhu cầu đủ lớn để vẫn nên ưu tiên nếu tin đăng chất lượng.

Mẫu trả lời:
"Dạ Gia Lâm cũng là khu rất đáng làm, nhất là nếu anh/chị có hàng ở Vinhomes Ocean Park hoặc các dự án quanh đó. Nhu cầu view detail cao, nhưng mình cần tối ưu ảnh/video và thông tin căn vì lượng tin cạnh tranh cũng không thấp."

### Hoàng Mai - nhu cầu cao, hợp phân khúc vừa tiền

Chỉ số chính:
- Tổng view detail demand: khoảng 14.951.
- Nguồn cung trung bình: khoảng 983 tin/tháng.
- Demand/listing trung bình: khoảng 3,44.
- Median price/m2: khoảng 79,6 triệu/m2.

Ý nghĩa tư vấn:
- Hoàng Mai có nhu cầu cao, phù hợp với nhóm khách tìm căn vừa tiền và dự án đông dân cư.
- Các khu/dự án như Linh Đàm, Đại Thanh, Xa La liên quan trong demand dự án có lượng quan tâm đáng kể.
- Nên tư vấn đăng tin rõ giá, pháp lý, diện tích, tình trạng nội thất để lọc khách tốt hơn.

Mẫu trả lời:
"Dạ Hoàng Mai là khu có nhu cầu cao. Nếu anh/chị có căn tầm giá vừa và thông tin rõ, khu này nên được ưu tiên đăng đều, đặc biệt với căn 2 phòng ngủ hoặc căn giá 2-4 tỷ."

### Nam Từ Liêm - nhu cầu cao nhất nhưng cạnh tranh cũng mạnh

Chỉ số chính:
- Tổng view detail demand: khoảng 18.004, cao nhất trong nhóm 5 quận.
- Nguồn cung trung bình trong block matched: khoảng 1.904 tin/tháng.
- Demand/listing trung bình: khoảng 1,97.
- Sheet2 ghi nhận Nam Từ Liêm là quận có nguồn cung lớn nhất, khoảng 25.087 tin theo tổng quý.
- Median price/m2: khoảng 90,9 triệu/m2.

Ý nghĩa tư vấn:
- Nam Từ Liêm có lượng khách quan tâm rất lớn, nhưng cạnh tranh cũng cao nhất.
- Phù hợp nếu khách có tin tốt, ảnh/video đẹp, giá cạnh tranh, thông tin dự án rõ.
- Nên dùng Premium/boost có chọn lọc cho căn trọng điểm thay vì đăng sơ sài.

Mẫu trả lời:
"Dạ Nam Từ Liêm có nhu cầu rất lớn, nhưng cũng là khu cạnh tranh mạnh. Nếu anh/chị có hàng ở đây, mình nên đầu tư chất lượng tin: ảnh thật, video, tiêu đề rõ dự án/diện tích/giá và dùng boost cho căn trọng điểm."

### Thanh Xuân - nguồn cung thấp hơn nhưng demand cũng thấp hơn

Chỉ số chính:
- Tổng view detail demand: khoảng 6.455.
- Nguồn cung trung bình: khoảng 654 tin/tháng.
- Demand/listing trung bình: khoảng 2,02.
- Median price/m2: khoảng 101,4 triệu/m2.

Ý nghĩa tư vấn:
- Thanh Xuân có mức cạnh tranh thấp hơn trong nhóm matched data, nhưng demand tổng cũng thấp hơn Hà Đông/Gia Lâm/Hoàng Mai/Nam Từ Liêm.
- Phù hợp với căn có vị trí đẹp, tiện ích tốt, pháp lý rõ và phân khúc giá cao hơn.
- Không nên tư vấn là khu nhiều khách nhất; nên nói là khu có thể khai thác nếu nguồn hàng tốt.

Mẫu trả lời:
"Dạ Thanh Xuân không phải khu có tổng nhu cầu cao nhất, nhưng nguồn cung trong dữ liệu matched thấp hơn. Nếu anh/chị có căn vị trí đẹp, pháp lý rõ và giá hợp lý thì vẫn nên đăng, nhưng mình cần làm tin thật kỹ để nổi bật."

## 3. Xếp hạng tư vấn nhanh theo mục tiêu

### Nếu khách hỏi khu nào nhiều khách quan tâm nhất

Ưu tiên trả lời:
1. Nam Từ Liêm - demand cao nhất nhưng cạnh tranh mạnh.
2. Gia Lâm - demand cao, hợp dự án lớn.
3. Hoàng Mai - demand cao, hợp phân khúc vừa tiền.
4. Hà Đông - demand tốt và tỷ lệ quan tâm/tin rất khỏe.
5. Thanh Xuân - demand thấp hơn nhóm trên.

Mẫu:
"Nếu chỉ xét lượng khách quan tâm, Nam Từ Liêm đang cao nhất trong nhóm dữ liệu. Nhưng nếu xét hiệu quả trên mỗi tin, Hà Đông lại là khu rất đáng chú ý vì tỷ lệ quan tâm/tin tốt hơn."

### Nếu khách hỏi khu nào ít cạnh tranh tương đối

Ưu tiên trả lời:
1. Hà Đông - cân bằng tốt nhất giữa demand và supply.
2. Hoàng Mai - demand cao, tỷ lệ quan tâm/tin tốt.
3. Gia Lâm - demand cao, cạnh tranh có nhưng vẫn đáng ưu tiên.
4. Thanh Xuân - supply thấp hơn nhưng demand cũng thấp hơn.
5. Nam Từ Liêm - nhiều khách nhưng cạnh tranh mạnh.

Mẫu:
"Nếu anh/chị muốn khu có cơ hội tốt hơn trên mỗi tin, em ưu tiên Hà Đông trước, sau đó là Hoàng Mai và Gia Lâm. Nam Từ Liêm rất nhiều khách nhưng cạnh tranh cũng dày hơn."

### Nếu khách có ngân sách boost/Premium hạn chế

Ưu tiên:
- Chọn Hà Đông, Hoàng Mai, Gia Lâm nếu có nguồn hàng tốt.
- Với Nam Từ Liêm, chỉ boost các căn thật sự nổi bật về giá, ảnh/video hoặc vị trí.
- Không rải boost đều cho mọi tin.

Mẫu:
"Nếu ngân sách boost chưa nhiều, mình nên ưu tiên căn có khả năng ra khách cao nhất trước. Theo dữ liệu hiện tại, Hà Đông/Hoàng Mai/Gia Lâm là nhóm nên cân nhắc trước; Nam Từ Liêm thì chỉ nên boost căn thật sự nổi bật vì cạnh tranh cao."

## 4. Tư vấn theo khoảng giá

Tổng view detail theo khoảng giá:
- 3-4 tỷ: khoảng 78.141 view, cao nhất.
- 2-3 tỷ: khoảng 67.154 view.
- 4-5 tỷ: khoảng 58.857 view.
- Trên 7 tỷ: khoảng 52.824 view, ít search hơn nhưng view/search rất cao, thể hiện nhóm khách quan tâm sâu hơn.
- 5-6 tỷ: khoảng 36.426 view.
- 6-7 tỷ: khoảng 23.600 view.
- Dưới 2 tỷ: khoảng 11.985 view.

Khuyến nghị:
- Phân khúc 2-4 tỷ là vùng demand đại chúng mạnh nhất.
- Phân khúc 4-5 tỷ vẫn có nhu cầu tốt, hợp căn chất lượng hoặc vị trí tốt.
- Phân khúc trên 7 tỷ là nhóm niche: ít lượt search hơn nhưng khách có xu hướng xem sâu, cần tin đăng chuyên nghiệp, ảnh/video tốt và thông tin pháp lý rõ.
- Dưới 2 tỷ có view thấp hơn, không nên kỳ vọng quá cao nếu nguồn hàng không thật sự hấp dẫn.

Mẫu:
"Dạ nếu xét theo giá, nhóm 3-4 tỷ và 2-3 tỷ đang có lượng view detail cao nhất. Nếu anh/chị có căn trong khoảng này, mình nên ưu tiên đăng kỹ ảnh/video và thông tin giá để bắt đúng nhu cầu tìm kiếm."

## 5. Tư vấn theo số phòng ngủ

Tổng view detail theo số phòng ngủ:
- 2 Bedrooms: khoảng 39.209 view, cao nhất.
- 3 Bedrooms: khoảng 17.378 view.
- 1 Bedroom: khoảng 16.173 view.
- Studio: khoảng 10.714 view.
- 4+ Bedrooms: khoảng 3.008 view.

Khuyến nghị:
- Căn 2 phòng ngủ là sản phẩm nên ưu tiên đăng và tối ưu nhất vì nhu cầu vượt trội.
- Căn 3 phòng ngủ và 1 phòng ngủ vẫn có demand tốt, nhưng cần định vị rõ đối tượng khách.
- Studio phù hợp nhóm khách độc thân/đầu tư/thuê mua nhưng demand thấp hơn 1-3 phòng ngủ.
- 4+ phòng ngủ là nhóm hẹp, cần mô tả rõ giá trị không gian, gia đình đông người, căn góc, duplex/penthouse nếu có.

Mẫu:
"Dạ nếu anh/chị có nhiều loại căn, em khuyên ưu tiên tối ưu tin 2 phòng ngủ trước vì đây là nhóm có lượng view detail cao nhất trong dữ liệu."

## 6. Dự án có nhu cầu cao

Top dự án theo view detail:
1. Vinhomes Ocean Park - khoảng 8.037 view.
2. Tổ hợp Chung cư HH Linh Đàm - khoảng 6.376 view.
3. The Sapphire - Vinhomes Ocean Park - khoảng 5.385 view.
4. Chung cư Đại Thanh - khoảng 2.762 view.
5. Khu đô thị Xa La - khoảng 2.390 view.
6. The Sapphire - Vinhomes Smart City - khoảng 2.354 view.
7. Chung cư Nam Xa La - khoảng 2.169 view.
8. Chung cư Thông Tấn Xuân Phương - khoảng 2.146 view.
9. The Sola Park - Vinhomes Smart City - khoảng 2.037 view.
10. Masteri Era Landmark - Vinhomes Ocean Park 3 - khoảng 1.835 view.

Khuyến nghị:
- Nếu khách có hàng ở Vinhomes Ocean Park, Linh Đàm, Xa La, Đại Thanh hoặc Smart City, nên ưu tiên đăng tin đầy đủ và dùng Premium cho căn tốt.
- Các dự án top demand thường cũng cạnh tranh cao, nên tin cần có ảnh thật, video thật, giá rõ và mô tả khác biệt.

Mẫu:
"Dạ nếu anh/chị có hàng ở Vinhomes Ocean Park, Linh Đàm/Xa La hoặc Smart City thì đây là nhóm dự án có lượng quan tâm tốt. Tuy nhiên cạnh tranh cũng cao nên tin cần làm kỹ, nhất là ảnh đại diện, video và giá."

## 7. Cách agent hỏi khi tư vấn khu vực

Luôn hỏi từng câu một.

Nếu khách hỏi "nên đăng khu nào?":
"Dạ anh/chị đang có nguồn hàng ở khu vực nào trước ạ?"

Nếu khách có nhiều khu:
"Trong các khu đó, anh/chị đang muốn ưu tiên căn nào cần ra khách nhanh nhất ạ?"

Nếu khách chưa có nguồn hàng:
"Dạ nếu mình đang chọn khu để khai thác, theo dữ liệu hiện tại em sẽ ưu tiên Hà Đông, Gia Lâm và Hoàng Mai trước vì nhu cầu tốt và tỷ lệ quan tâm/tin khá ổn."

Nếu khách có nguồn hàng Nam Từ Liêm:
"Dạ Nam Từ Liêm nhiều khách quan tâm nhất, nhưng cạnh tranh cũng mạnh. Mình nên chọn căn có giá/ảnh/video tốt để đăng Premium hoặc boost, không nên rải đều tất cả tin."

Nếu khách có nguồn hàng Hà Đông:
"Dạ Hà Đông là khu em đánh giá rất tốt về hiệu quả tương đối, vì nhu cầu trên mỗi tin đang cao. Nếu anh/chị có căn 2 phòng ngủ hoặc khoảng 2-4 tỷ thì càng nên ưu tiên."

## 8. Cảnh báo compliance khi dùng dữ liệu vùng

Agent không được:
- Cam kết khu nào chắc chắn có khách.
- Cam kết đăng ở dự án nào sẽ có lead.
- Nói dữ liệu này đại diện cho toàn thị trường Hà Nội nếu chỉ có một phần dữ liệu.
- Hạ thấp khu vực hoặc dự án khác.
- Bịa thêm số liệu ngoài dữ liệu trong file.

Nên nói:
- "Theo dữ liệu Q1-Q2/2026 trên HouseNow..."
- "Trong nhóm quận có dữ liệu demand..."
- "Khu này đáng ưu tiên hơn nếu anh/chị có nguồn hàng phù hợp..."
- "Nên tối ưu tin đăng để tăng khả năng được khách quan tâm..."
