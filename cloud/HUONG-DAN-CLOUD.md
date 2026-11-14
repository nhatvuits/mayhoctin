# Lưu góp ý trên mạng (Cloudflare, miễn phí)

Mặc định, Bảng góp ý của May Học Tin chỉ lưu trên từng máy. Làm theo hướng dẫn này thì góp ý được lưu ở một nơi chung, xem được từ mọi máy, và chủ trang có thể duyệt, phản hồi, đánh dấu đã xong.

Dùng gói miễn phí của Cloudflare, không cần thẻ. Giới hạn mỗi ngày của gói miễn phí: 100.000 lượt đọc và 1.000 lượt ghi, dung lượng 1 GB. Mỗi lần ai đó mở Bảng góp ý là 1 lượt đọc; mỗi góp ý mới, mỗi lần duyệt hay phản hồi là 1 lượt ghi.

Tên nút trong Cloudflare có thể khác đôi chút theo thời gian. Bước 3 và 4 (tạo Worker từ mẫu và sửa code ngay trên trang) mình chưa đối chiếu được từng tên nút với tài liệu hiện hành.

## Các bước

1. **Đăng nhập** https://dash.cloudflare.com bằng tài khoản Cloudflare của bạn.

2. **Tạo nơi lưu (KV).** Mở trang **Workers KV** (nằm trong nhóm Storage & Databases ở cột trái). Bấm **Create instance**, đặt tên `may-gopy`, bấm **Create**.

3. **Tạo Worker.** Mở trang **Workers & Pages**, bấm **Create application**. Chọn mẫu đơn giản nhất có chữ **Hello World**, đặt tên `may-gopy`, bấm **Deploy**.

4. **Dán code.** Mở Worker `may-gopy` vừa tạo, bấm **Edit code**. Xóa hết code mẫu, dán toàn bộ nội dung tệp `cloud/worker.js` (trong repo này) vào, rồi bấm **Deploy**.

5. **Gắn nơi lưu vào Worker.** Trong Worker `may-gopy`, mở tab **Bindings**, bấm **Add binding**, chọn **KV namespace**, bấm **Add binding**. Ô **Variable name** gõ đúng `FB` (viết hoa). Chọn namespace `may-gopy` trong danh sách, rồi bấm **Add binding**.

6. **Đặt mật khẩu quản trị.** Trong Worker, mở **Settings**. Ở mục **Variables and Secrets** bấm **Add**. Chọn loại **Secret**, ô **Variable name** gõ đúng `ADMIN_KEY`, ô **Value** gõ mật khẩu bạn tự nghĩ ra (ít nhất 6 ký tự, nên dài và khó đoán). Bấm **Deploy**.

7. **Kiểm tra.** Worker có địa chỉ dạng `https://may-gopy.<tên-của-bạn>.workers.dev`. Mở địa chỉ đó thêm `/notes` ở cuối. Nếu thấy `{"ok":true,"admin":false,"moderate":true,"notes":[]}` là đã chạy. Nếu thấy `"err":"no-kv"` thì bước 5 chưa đúng (tên phải là `FB`).

8. **Nối trang với Worker.** Mở tệp `fb.js`, tìm dòng `const FB_API='';` ở đầu tệp và điền địa chỉ Worker vào giữa hai dấu nháy, ví dụ:
   `const FB_API='https://may-gopy.ten-cua-ban.workers.dev';`
   Tăng số phiên bản trong `sw.js` rồi đưa lên như mọi lần cập nhật. Địa chỉ này không phải bí mật. **Mật khẩu quản trị thì không bao giờ ghi vào code.**

9. **Vào chế độ quản trị.** Mở trang, kéo xuống Bảng góp ý, bấm **Quản trị** và nhập mật khẩu ở bước 6. Từ lúc đó trên máy này bạn thấy cả góp ý đang chờ duyệt, và mỗi tờ có thêm **Duyệt** và **Phản hồi**. Mật khẩu được lưu trên máy đó cho tới khi bấm **Thoát quản trị**.

## Cách hoạt động

- Góp ý mới được gửi lên ngay, nhưng **chỉ hiện cho mọi người sau khi bạn bấm Duyệt**. Trên máy của người viết, tờ đó có nhãn "Chờ duyệt".
- Bấm **Phản hồi** để viết lời trả lời và chọn trạng thái Mới, Đang xem, Đã xong. Ai xem bảng cũng đọc được lời trả lời.
- Người viết xóa được góp ý của chính mình. Bạn xóa được mọi góp ý.
- Tên của bé không được gửi lên mạng; tờ góp ý chỉ ghi "Bé" hoặc "Phụ huynh".
- Mất mạng lúc viết thì góp ý nằm tạm trên máy với nhãn "Chưa gửi được" và tự gửi ở lần mở sau.

## Tùy chọn

- **Bỏ bước duyệt:** trong Settings, Variables and Secrets, thêm một biến loại Text tên `MODERATE` giá trị `0`. Khi đó góp ý hiện ngay cho mọi người. Vì đây là trang cho trẻ em và ai cũng gửi được, mình khuyên giữ bước duyệt.
- **Giới hạn có sẵn trong Worker:** tối đa 500 góp ý, 200 góp ý mới mỗi ngày, mỗi góp ý tối đa khoảng 60 KB.
- **Đổi mật khẩu:** sửa giá trị `ADMIN_KEY` ở bước 6 rồi nhập lại mật khẩu mới trên trang.
- **Tắt lưu trên mạng:** để lại `const FB_API='';`. Trang quay về lưu trên từng máy.
