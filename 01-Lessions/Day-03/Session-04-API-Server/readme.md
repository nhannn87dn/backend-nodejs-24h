# Asynchronous programming and API server

Trong bài học này chúng ta tìm hiểu các vấn đề sau:

- Introducing the Event Loop
- Understanding callbacks and Error-First Pattern
- Using async.js Library
- Using promises
- Making AJAX calls
- Building RESTful Web Services
- Developing REST APIs
- Mocking Up CRUD
- Testing APIs with cURL


## 💛 Introducing the Event Loop

Event Loop là một khái niệm quan trọng trong Node.js. Nó là một cơ chế xử lý các tác vụ không đồng bộ (asynchronous) trong môi trường đơn luồng của Node.js. Event Loop cho phép Node.js xử lý đồng thời nhiều yêu cầu I/O (như đọc/ghi file, truy vấn cơ sở dữ liệu, gửi yêu cầu HTTP) mà không bị chờ đợi (blocking).

Khi một yêu cầu I/O không đồng bộ được gọi, Node.js không chờ đợi kết quả trả về. Thay vào đó, nó tiếp tục thực hiện các tác vụ khác. Khi I/O hoàn thành (ví dụ: dữ liệu đã được đọc từ file), một sự kiện (event) được tạo ra và đưa vào một hàng đợi sự kiện.

![event loop](../../Day-01/Session-01-Basic-of-Node.Js/img/node-flow.png)

Event Loop là trái tim của Node.js, nó lặp đi lặp lại để kiểm tra hàng đợi sự kiện. Nhiệm vụ của nó là xử lý các sự kiện trong hàng đợi theo trình tự và gọi các hàm xử lý (callback) tương ứng. Điều này cho phép Node.js thực hiện các tác vụ không đồng bộ mà không chặn việc thực thi các tác vụ khác.

Event Loop trong Node.js bao gồm các pha sau:

1. **Poll**: Event Loop bắt đầu bằng việc kiểm tra hàng đợi sự kiện (event queue). Nếu hàng đợi sự kiện không rỗng, Event Loop chuyển sang pha tiếp theo. Nếu hàng đợi sự kiện rỗng, Event Loop chờ đợi sự kiện mới được thêm vào hoặc tiếp tục kiểm tra các hẹn giờ (timers).

2. **Timers**: Kiểm tra và gọi các hàm callback được đặt bởi `setTimeout()` và `setInterval()`. Nếu các hẹn giờ đã đến hạn, hàm callback tương ứng được đẩy vào hàng đợi sự kiện.

3. **Pending Callbacks**: Xử lý các hàm callback từ I/O hoặc các tác vụ không đồng bộ khác mà đã hoàn thành. Các hàm callback này được đưa vào hàng đợi sự kiện để được thực thi.

4. **Idle, Prepare**: Các pha này không được sử dụng trong phiên bản hiện tại của Node.js và đang được dùng cho mục đích tương lai.

5. **Poll**: Kiểm tra lại hàng đợi sự kiện. Nếu hàng đợi sự kiện không rỗng, Event Loop chuyển sang pha tiếp theo. Nếu hàng đợi sự kiện rỗng, Event Loop chờ đợi sự kiện mới hoặc tiếp tục kiểm tra các hẹn giờ.

Event Loop trong Node.js giúp tận dụng tối đa sức mạnh của môi trường đơn luồng. Nó cho phép xử lý đồng thời hàng nghìn kết nối mạng mà không cần tạo ra một luồng cho mỗi kết nối. Điều này giúp Node.js trở thành một nền tảng phù hợp cho ứng dụng mạng có khả năng mở rộng cao.

## 💛 Understanding callbacks and Error-First Pattern

### Callbacks là gì?

Xem ở đây [Callbacks](2.Async-Await/callback-deep.md)

### Error-First Pattern

Error-First Pattern (mẫu lỗi đầu tiên) là một phong cách lập trình phổ biến trong Node.js và các ngôn ngữ khác khi làm việc với các hàm không đồng bộ (asynchronous functions) hoặc các hàm có khả năng xảy ra lỗi.

Theo Error-First Pattern, khi một hàm không đồng bộ được gọi, callback được truyền vào như một tham số cuối cùng. Callback này sẽ có hai tham số đầu tiên: một tham số để nhận lỗi (error) (nếu có) và một tham số để nhận kết quả (result) (nếu thành công). Nếu không có lỗi xảy ra, tham số lỗi sẽ là `null` hoặc `undefined`, và tham số kết quả sẽ chứa dữ liệu trả về. Ngược lại, nếu có lỗi xảy ra, giá trị của tham số lỗi sẽ là một đối tượng lỗi (error object), và tham số kết quả sẽ không được sử dụng.

Sử dụng Error-First Pattern giúp đảm bảo rằng lỗi được xử lý một cách thích hợp và không bị bỏ qua. Nó cũng giúp mã nguồn dễ đọc hơn và dễ hiểu hơn vì việc kiểm tra lỗi được thực hiện một cách rõ ràng.

Ví dụ minh họa sử dụng Error-First Pattern trong Node.js:

```javascript
function readFile(path, callback) {
  fs.readFile(path, 'utf8', function(error, data) {
    if (error) {
      callback(error); // Gọi callback với lỗi (error)
    } else {
      callback(null, data); // Gọi callback với kết quả (data)
    }
  });
}

// Sử dụng hàm readFile với Error-First Pattern
readFile('file.txt', function(error, data) {
  if (error) {
    console.error('Đã xảy ra lỗi:', error);
  } else {
    console.log('Dữ liệu:', data);
  }
});
```

Trong ví dụ trên, hàm `readFile` đọc một file từ đường dẫn được chỉ định và gọi callback với lỗi (nếu có) hoặc dữ liệu (nếu thành công). Trong hàm callback, chúng ta kiểm tra giá trị của tham số lỗi và thực hiện xử lý tương ứng.

Error-First Pattern là một quy ước được khuyến nghị trong Node.js và được sử dụng rộng rãi trong các thư viện và framework của Node.js để xử lý lỗi và kết quả của các hàm không đồng bộ.

***

## 💛 Xử lý tác vụ bất đồng bộ 


Trước tiên ta di tìm hiểu VÌ SAO lại cần xử lý BẤT ĐỒNG BỘ thông qua một ví dụ:

Tìm một người tên là 'john' có trong Database

```js
//Mô phỏng trả về một mảng users từ Database
function getUsers() {
  return [
    { username: 'john', email: 'john@test.com' },
    { username: 'jane', email: 'jane@test.com' },
  ];
}
// Định nghĩa hàm Tìm user có tên john
function findUser(username) {
  const users = getUsers(); 
  const user = users.find((user) => user.username === username);
  return user;
}
//Gọi hàm 
console.log(findUser('john'));

//Kết quả
{ username: 'john', email: 'john@test.com' }

```

Chúng ta thấy chưa có điều gì xảy ra với ví dụ trên. Vì `getUsers()` return về mảng user quá nhanh, để bạn có thể sử dụng find tìm.

Nhưng trong thực tế khi lấy mảng users từ Database nó phải mất một thời gian nhất định.

Để mô phỏng nó tốn thời gian để lấy dữ liệu xong mới trả về mình sửa `getUsers()` lại như sau:

```js
function getUsers() {
  let users = [];
  //Sử dụng setTimeout để Delay 3 giây
  setTimeout(() => {
    users = [
      { username: 'john', email: 'john@test.com' },
      { username: 'jane', email: 'jane@test.com' },
    ];
  }, 3000);
  return users;
}

console.log(findUser('john'));

//Output
undefined
```

Giải thích:

- Bản chất các tiến trình của Javascript là đồng bộ
- Tại hàm `findUser`, lấy mảng users và tìm user xảy ra đồng thời. Chứ nó không đợi tìm được users rồi mới đi tìm kiếm người tên `john` 
- Chính vì vậy kết quả là `undefined`

**💘 KHẮC PHỤC**

- Sử dụng Callback để xử lý bất động bộ ở trên. Tuy nhiên cách này có thể gây ra một vấn đề gọi là [Callback Hell](2.Async-Await/callback-hell-deep.md)
- Sử dụng Promises: ES6
- Sử dụng Async/await ES8

## 💛 Using promises

Xem ở đây [Promises](2.Async-Await/Promises.md)
## 💛 Using async.js Library

Xem ở đây [Async/await](2.Async-Await/async-await.md)

## 💛 Making AJAX calls

Cách gửi request lên server với một tác vụ bất đồng bộ.

## 💛 Building RESTful Web Services

Xem ở đây [RESTful](Restful-API.md)

## 💛 Developing REST APIs

Phát triển tiếp các API khác tại mục Homeworks/Database-Structure
## 💛 Mocking Up CRUD

Tạo data TEST cho hệ thống CURD với thư viện <https://fakerjs.dev/>

## 💛 Testing APIs with cURL