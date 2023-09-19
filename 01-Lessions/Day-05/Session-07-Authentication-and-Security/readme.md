# Authentication and Security

Trong bài hộc này tìm hiểu các vấn đề sau:

- Request Middleware
- Basic Authentication Systems
- Express Sessions
- Bycrypt


## 💛 Học tiếp session 6 nếu chưa hoàn thành

## 💛 Request Middleware

Trong bài học Session 3 chúng ta đã làm quen với khái niệm `Middleware` rồi.

Request Middleware trong Express.js là một khái niệm quan trọng và mạnh mẽ. Nó đại diện cho một loạt các chức năng trung gian (middleware functions) được chạy tuần tự trong quá trình xử lý một yêu cầu HTTP Request trước khi nó đến tay route handler cuối cùng. Middleware cho phép bạn thực hiện các hoạt động như xác thực, xử lý lỗi, ghi log, xử lý dữ liệu đầu vào, và nhiều tác vụ khác.

Middleware functions có thể được đăng ký và sử dụng bằng cách sử dụng phương thức `use()` của đối tượng `app` trong Express.js. Ví dụ:

```javascript
const express = require('express');
const app = express();

// Middleware function
const logger = (req, res, next) => {
  console.log('Yêu cầu đến:', req.method, req.url);
  next();
};

// Đăng ký middleware function
app.use(logger);

// Route handler
app.get('/', (req, res) => {
  res.send('Hello, world!');
});

// Khởi động máy chủ
app.listen(3000, () => {
  console.log('Máy chủ Express đã được khởi động');
});
```

Trong ví dụ trên, chúng ta đã tạo một middleware function có tên `logger`, nó sẽ in ra thông tin về yêu cầu đến bao gồm phương thức và URL. Middleware function này chạy trước route handler (`app.get('/')`) bằng cách sử dụng phương thức `app.use()`.

Middleware functions có thể được sử dụng không chỉ trên một route cụ thể mà còn trên toàn bộ ứng dụng. Điều này cho phép bạn áp dụng các chức năng chung cho tất cả các yêu cầu trước khi chúng đến tay các route handler riêng biệt.

Một middleware function có thể thực hiện một số việc sau:

- Gọi hàm `next()` để chuyển tiếp yêu cầu tới middleware function tiếp theo.
- Xử lý và sửa đổi đối tượng yêu cầu (`req`) hoặc đối tượng phản hồi (`res`).
- Kết thúc quá trình xử lý bằng cách gửi lại phản hồi cho client mà không gọi `next()`.
- Gửi phản hồi lỗi nếu có lỗi xảy ra.

Middleware trong Express.js cho phép bạn xây dựng các ứng dụng mạnh mẽ, linh hoạt và dễ quản lý, bằng cách tách các chức năng khác nhau thành các middleware function riêng biệt và kết hợp chúng để xử lý yêu cầu theo cách phù hợp với logic ứng dụng của bạn.

## 💛 Basic Authentication Systems
Trong thực tế khi xây dựng một hệ thống Restull API sẽ có:

- Các routes ở chế độ public tức ai cũng có thể truy cập vào
- Các routes ở chế độ private, chỉ những ai có quyền mới truy cập

Thì chúng ta gọi các vấn đề trên với một khái niệm là `Authentication` (Xác thực danh tính)

Đối với những User có quyền truy cập, thì lại có một vấn đề nữa là quyền hạn. User này có quyền truy cập đến những tài nguyên nào thì chúng ta gọi nó với một khái niệm là `Authorization`

**Bước 1: Mỗi User phải có một token (chìa khóa) để truy cập tới các private endpoint**

Để có được token, User phải đăng nhập vào hệ thống, nếu đúng email, password thì hệ thống sẽ sinh ra cho User một token.

User sẽ mang token này để truy cập tới các private endpoint

Tạo Schema Login src/validations/auth.validation.js

```js
const Joi = require('joi');

const userLogin = {
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
};

module.exports = {
  userLogin,
};
```

Tạo Route Auth src/routes/auth.route.js

```js
const express = require('express');
const createError = require('http-errors');
const router = express.Router();
const validateSchema = require('../middleware/validateSchema.middleware')
const authValidation = require('../validations/auth.validation')
const users = require('../data/users.json');
const fs = require('fs');
const jwt = require('jsonwebtoken');

//http://localhost:8686/api/v1/auth/login
router.post('/auth/login', async (req, res,next) => {
    console.log(body);
  //Tìm xem có tồn tại user có email không
  let user =  users.find((user) => user.email === body.email);

  if (!user) {
    throw createError(400, 'Invalid email or password');
  }

  // So tiếp mật khẩu có đúng không
  if (user.password !== body.password) {
    throw createError(400, 'Invalid email or password');
  }

  //Tồn tại thì trả lại thông tin user kèm token
  const token = jwt.sign(
    { _id: user.id, email: user.email },
    'secure_key'
    );

   res.status(200).json({
      user: { id: user.id, email: user.email },
      token
    });

})
  
module.exports = router;
```

Gắn route Auth vào app.js

```js
//...
const authRoute = require('./routes/auth.route');

app.use('/api/v1/auth', authRoute);
```


**Bước 3: Tạo Auth Middleware - Anh gác cổng cho App**

Tạo một file src/middleware/auth.middleware.js

```js
const jwt = require('jsonwebtoken');
const {JWT_SECRET} =  process.env;
const users = require('../data/users.json');
const createError = require('http-errors');

const authenticateToken = async (req, res, next) => {
    //Lấy thông tin authorization từ trong header request ra
    const authHeader = req.headers['authorization'];
     //trích xuất token từ trong chuỗi authorization vừa lấy được
    const token = authHeader && authHeader.split(' ')[1];

    //Kiểm tra token có tồn tại không
    if (!token) {
      return next(createError(401, 'Unauthorized'));
    }

    //Nếu token tồn tại thì kiểm tra tính hợp lệ
    try {
      //Giải mã token để lấy thông tin
      const decoded = jwt.verify(token, JWT_SECRET);
      console.log(decoded);

      //Kiểm tra xem có tồn tại user với userId lấy được từ token không
      //Để tránh token giả mạo
      const user =  users.find((user) => user.id === decoded._id);
     

      if (!user) {
        return next(createError(401, 'Unauthorized'));
      }

      req.user = user;
      next();
    } catch (err) {
      return next(createError(403, 'Forbidden'));
    }
};

const authorize = (roles = []) => {
    // roles param can be a single role string (e.g. Role.User or 'User') 
    // or an array of roles (e.g. [Role.Admin, Role.User] or ['Admin', 'User'])
    if (typeof roles === 'string') {
        roles = [roles];
    }

    return (req, res, next) => {
        if (roles.length && !roles.includes(req.user.role)) {
            return next(createError(403, 'Forbidden'));
        }
        // authentication and authorization successful
        next();
    }
}

module.exports = {
    authorize,
    authenticateToken,
};
```

**Bước 4: Bảo vệ Route với Auth Middleware**

Ví dụ bạn muốn bảo vệ các route có phương thức POST, PUT, DELETE của users.route.js

Sửa lại đoạn này

```js
router.put('/users/:id', async (req, res, next) => {

})
```

Thành như sau

```js
//Thêm vào trên đầu
const {authenticateToken} = require('../middleware/auth.middleware')
//Thêm middleware vào trước
router.put('/users/:id', authenticateToken,, async (req, res, next) => {

})
```

## 💛 Express Sessions

Sử dụng 2 thư viện này để lưu trữ phiên đăng nhập trong hệ thống backend với NodeJS

Dùng nó khi bạn làm ứng dụng web với Node.js, còn nếu làm API thì không cần đến.

- cookie-session: <https://expressjs.com/en/resources/middleware/cookie-session.html?
- express-session: <https://expressjs.com/en/resources/middleware/session.html>


```bash
yarn add express-session
```

Sau đó tại file app.js

```js
var session = require('express-session')
//Thêm đoạn này vào, cấu hình cho session
app.use(session({
  secret: 'mysecretkey',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false } //true https, false http
}));
```
Cách sử dụng:

```js

/* GET home page. */
router.get('/', function(req, res, next) {
  //Đăng ký một session ở route này
  req.session.views = 1;

  res.json({version: '1.0'})
});


router.get('/getsession', function(req, res, next) {
  //Sang bên này bạn nhận được session như sau
  console.log(req.session.views);
  
  res.json({page: 'getsession'})
});
```

Chi tiết xem: <https://expressjs.com/en/resources/middleware/session.html>


## 💛 Bycrypt

Cách sử dụng thư viện Bycrypt để mã hõa password

Chi tiết: [Bycrypt](https://www.npmjs.com/package/bcrypt)

## 💛 Chuẩn hóa định dạng JSON API trả về

Điều này khá quan trọng cho người sử dụng API. Nếu bạn cho ouput JSON trả về mỗi lúc mỗi kiểu ==> Khó khăn --> Không đồng nhất --> Thiếu Chuyên Nghiệp

Không có bất kỳ quy tắc nào để ràng buộc cách bạn trả về một chuổi JSON có cấu trúc như thế nào cả.

Tuy nhiên dưới đây là một số cách định dạng mà bạn có thể tham khảo:

[JSON API](http://jsonapi.org/) - JSON API covers creating and updating resources as well, not just responses.

[JSend](https://github.com/omniti-labs/jsend) - Simple and probably what you are already doing.

Bạn phải thể hiện được khi có lỗi thì cần trả về gì, khi thành công thì cần trả về cái gì ? Và tất cả các Endpoint API phải có cùng cấu trúc.

Ví dụ: Thành công

```json
{
  "statusCode": "0",
  "message": "Successfully"
}
```

Ví dụ: Thành công có gửi kèm data

```json
{
  "statusCode": "0",
  "message": "Successfully",
  "data": {
    "posts": [
      { "id": 1, "title": "A blog post", "body": "Some useful content" },
      { "id": 2, "title": "Another blog post", "body": "More content" }
    ]
  }
}
```

Ví dụ: Thất bại (không có lỗi, chỉ là nó chưa tuân thủ một quy tắc nào đó như là validations)

```json
{
  "statusCode": "400",
  "message": "A title is required"
}
```

Ví dụ: Lỗi (khiến code không thể xử lý)

```json
{
  "statusCode": "500",
  "message": "Can not connect to Datatabase"
}
```

## 💛 Bài tập về nhà

Xem phần Homeworks CURD-RESTful-API