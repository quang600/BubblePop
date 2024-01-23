// HttpManager.ts

const { ccclass } = cc._decorator;

@ccclass
export default class HttpManager extends cc.Component {

    static sendHttpPostRequest(name: string, productId: string) {
        // Dữ liệu bạn muốn gửi đi (nếu có)
        let http: string = 'http://103.23.135.57:7880/v1/api';
        let packagebuy: string = '/game_package/buy';
        let apiUrl: string = http + packagebuy;

        const requestData = {
            clientId: "3ca742915ebae381ce660aee7faa18b41705999217977",
            productId: {
                "name": name,
                "productId": productId
            }
        };

        // Tạo đối tượng XMLHttpRequest
        const xhr = new XMLHttpRequest();

        // Thiết lập phương thức và URL
        xhr.open("POST", apiUrl, true);

        // Thiết lập tiêu đề cho yêu cầu (nếu cần thiết)
        xhr.setRequestHeader("Content-Type", "application/json");

        // Xử lý sự kiện khi yêu cầu được gửi đi
        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    // Xử lý dữ liệu từ máy chủ ở đây
                    const responseData = JSON.parse(xhr.responseText);
                    console.log("Data received:", responseData);
                } else {
                    // Xử lý lỗi nếu có
                    console.error("Error receiving data. Status code:", xhr.status);
                }
            }
        };

        // Chuyển đối tượng dữ liệu thành chuỗi JSON và gửi đi
        xhr.send(JSON.stringify(requestData));
    }
}
