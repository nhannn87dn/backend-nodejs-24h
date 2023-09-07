# Folder structure using Express and Node.Js

Nội dung chính trong bài:

> Xây dựng cấu trúc RESTFul-APIs

> Middleware trong Express

> Express middleware phổ biến

> Errors Handling App


> Chuẩn hóa Response API

=====================

Xây dựng cấu trúc dự án RESTFul-APIs với Node.Js và Express CHUẨN đi làm

---

**Dự Án E-Commerce**

---

Tạo một thư mục dự án ví dụ: e-commerce-restful-apis

Khởi tạo dự án

```bash
npm init
```

## 💛 Xây dựng cấu trúc thư mục

Đối với ExpressJs chưa có một quy chuẩn nào để tạo ra một cấu trúc dự án CHUẨN bắt buộc, dưới đây là đơn giản bạn có thể tham khảo

Dành cho người mới học, đơn giản, dể tiếp cận để biết được cách tạp ra một API.

```code
e-commerce-restful-apis/
├─ node_modules/
├─ public/
├─ src/
│  ├─ models/
│  ├─ helpers/
│  ├─ validations/
│  ├─ routes/
│  ├─ app.js
├─ .env
├─ server.js
├─ .gitignore
├─ package.json
├─ README.md
```


### 1: Khởi tạo dự án

```bash
npm init -y
```

- Tạo biến môi trường .env

```bash
NODE_ENV= development
PORT= 8686

```

- Tạo thư mục dự án
- Tạo server Express src/app.js

```bash
npm i express --save
```

```js
const express = require('express');
const app = express();


// Calling the express.json() method for parsing
app.use(express.json());


module.exports = app;
```

- Tạo file server.js là entry point dự án

```bash
npm i dotenv --save
```

```js
require('dotenv').config();
const app = require('./src/app');

const { PORT } = process.env || 8686;



const server = app.listen(PORT, () => {
  console.log(`WSV start with port ${PORT}`);
});
```

- Cấu hình lại package.json

```bash
npm i nodemon --dev
```

nodemon là một tool giúp server tự khởi động lại khi thay đổi code trong quá trình dev.

```js
"scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "dev": "nodemon server.js"
  },
```

Start ứng dụng

```bash
npm run dev
```

### 🔶 2: Tạo Route đầu tiên

- "api/": xem phiên bản API hiện tại
- "api/users": xem danh sách Users

Tại src/routes tạo file index.js

```js
const express = require('express');
const router = express.Router();

const users = [
  { id: 1, name: 'Jonh', email: 'jonh@gmail.com' },
  { id: 2, name: 'Dara', email: 'dara@gmail.com' },
  { id: 3, name: 'Tim', email: 'tim@gmail.com' },
];

//Response version API
router.get('/', async (req, res) => {
  res.status(200).json({ version: '1.0' });
});

// Get all users
router.get('/users', async (req, res) => {
  res.status(200).json(users);
});

module.exports = router;
```


Gắn router vào app.js

```js
const FirstRouter = require('./routes/index');
//Các API sẽ bắt đầu bằng api
app.use('/api', FirstRouter);

//localhost:8686/api
//localhost:8686/api/users
```

### 🔶 3: Tự Tạo ra một Middleware

#### 🌻 3.0 Middleware là gì ?

Trong lấp trình ứng dụng WEB, Middleware sẽ đóng vai trò trung gian giữa request/response (tương tác với người dùng) và các xử lý logic bên trong web server.

Middleware sẽ là các hàm được dùng để tiền xử lý, lọc các request trước khi đưa vào xử lý logic hoặc điều chỉnh các response trước khi gửi về cho người dùng.

![middleware-partern](img/middleware-partern.png)

Hình trên mô tả 3 middleware có trong ExpressJS. Một request khi gửi đến Express sẽ được xử lý qua 5 bước như sau :

1. Tìm Route tương ứng với request
2. Dùng CORS Middleware để kiểm tra cross-origin Resource sharing của request
3. Dùng CRSF Middleware để xác thực CSRF của request, chống fake request
4. Dùng Auth Middleware để xác thực request có được truy cập hay không
5. Xử lý công việc được yêu cầu bởi request (Main Task)

Bất kỳ bước nào trong các bước 2,3,4 nếu xảy ra lỗi sẽ trả về response thông báo cho người dùng, có thể là lỗi CORS, lỗi CSRF hay lỗi auth tùy thuộc vào request bị dừng ở bước nào.

**Middleware trong ExpressJS** về cơ bản sẽ là một loạt các hàm Middleware được thực hiện liên tiếp nhau. Sau khi đã thiết lập, các request từ phía người dùng khi gửi lên ExpressJS sẽ thực hiện lần lượt qua các hàm Middleware cho đến khi trả về response cho người dùng. Các hàm này sẽ được quyền truy cập đến các đối tượng đại diện cho Request - req, Response - res, hàm Middleware tiếp theo - next, và đối tượng lỗi - err nếu cần thiết.

Một hàm Middleware sau khi hoạt động xong, nếu chưa phải là cuối cùng trong chuỗi các hàm cần thực hiện, sẽ cần gọi lệnh next() để chuyển sang hàm tiếp theo, bằng không xử lý sẽ bị treo tại hàm đó.

Trong Express, có 5 kiểu middleware có thể sử dụng :

- Application-level middleware (middleware cấp ứng dụng)
- Router-level middleware (middlware cấp điều hướng - router)
- Error-handling middleware (middleware xử lý lỗi)
- Built-in middleware (middleware sẵn có)
- Third-party middleware (middleware của bên thứ ba)

#### 🌻 3.1 Cách để tạo ra một middleware theo nhu cầu

Tại thư mục middleware, tạo một file tên: mylogger.middleware.js

```js
//Tạo và export luôn
module.exports = function (req, res, next) {
  //Logic Here
  console.log('LOGGED', req);

  //Có thể gắn Thêm vào request một biến
  req.aptech = { name: 'Softech', add: '38 yen bai' };

  //End with next() -> chuyển tiếp sang middleware khác nếu có
  next();
};
```

#### 🌻 3.2 Gắn middleware vào Application

Tại express app

```js
const myLogger require('./middlewares/mylogger.middleware');

//Gắn middleware vào app
app.use(myLogger);
```

#### 🌻 3.3 Lớp middleware

Tạo thêm 2 ví dụ về middleware nữa để thấy được sự chuyển tiếp giữa các lớp middleware

### 🔶 4: Express middleware

Sử dụng các thư viện phổ biến để làm middleware cho src/app.js

Tham khảo: <https://expressjs.com/en/resources/middleware.html>

- compression
- cors
- xss-clean
- helmet
- body-parser
- ...

### 🔶5: Errors Handling App

- Lỗi 40x
- Lỗi 50x

Sử dụng thư viện:

- http-errors

```bash
npm i http-errors --save
```

Tại App Express import vào

```js
const createError = require('http-errors');
```

Add đoạn này nằm NGAY TRƯỚC phần module.exports = app

```js
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send({ error: err.message });
});
```


## 💛 Tạo RESTFul-APIs theo phiên bản

Trong thực tế mỗi khi API đã được phát hành và chạy trên môi trường production thực tế. Bạn không thể đi sửa code các API trừ trường hợp bất khả kháng và phải có kế hoạch thông báo đến người dùng.

Tạo ra các phiên bản mới hơn như là để nâng cấp code cho phiên bản cũ.

- Trong thư mục src/routes tạo thêm một thư mục v1

- Maintenance các routes demo phần trước, đưa vào v1

- Resources User
  - GET : api/v1/users
  - GET : api/v1/users/:id
  - POST : api/v1/users/:id
  - PUT : api/v1/users/:id
  - DELETE: api/v1/users/:id

Tại src/routes/v1 tạo file user.route.js

```js
const express = require('express');
const router = express.Router();
const users = require('../data/users.json');
const fs = require('fs');

/* System file khởi chạy thì nó đứng ngay thư mục root server */
const fileNameUsers = './src/data/users.json';
console.log(fileNameUsers);

// Get all users
// localhost:8686/api/v1/users
router.get('/users', async (req, res) => {
  res.status(200).json(users);
});

// Create a new user
// localhost:8686/api/v1/users
router.post('/users', async (req, res,next) => {
  
  console.log('createUser');

  try {

    let randomInteger = Math.floor(Math.random() * 100) + 1;

    let payload = {
      id: randomInteger,
      name: req.body.name,
      email: req.body.email,
      password: '123456',
    };
    newUsers = [...users, payload];
    //Ghi lại file
    fs.writeFileSync(fileNameUsers, JSON.stringify(newUsers), function (err) {
      if (err) throw err;
      console.log('Saved!');
    });
    return newUsers;

    
  } catch (err) {
     next(err);
  }

});

// Get a user by ID
// localhost:8686/api/v1/users/1
router.get('/users/:id', async (req, res,next) => {
  try {
    const { id } = req.params;

    if (!id) {
      throw createError(400, 'Missing user ID');
    }

    const user = users.find((user) => user.id === id);

    if (!user) {
      throw createError(404, 'User not found');
    }

    res.status(200).json(user);
  } catch (err) {
    next(err);
  }

});

// Update a user
// localhost:8686/api/v1/users/1
router.put('/users/:id', async (req, res, next) => {
    try {
    const { id } = req.params;

    
    /* Check exits user by id */
    const user = users.find((user) => user.id === parseInt(id));

    if (!user) {
      throw createError(404, `User not found with ID ${id}`);
    }

    /**
     * Lặp qua mảng, tìm user có id để update
     * trả lại mảng mới sau khi update
     */
    const newUsers = users.map((user) => {
      if (user.id === parseInt(id)) {
        if (req.body.email) user.email = req.body.email;
        if (req.body.name) user.name = req.body.name;
      }
      return user;
    });

    console.log('after', newUsers);

    //Ghi lại file
    fs.writeFileSync(fileNameUsers, JSON.stringify(newUsers), function (err) {
      if (err) throw err;
      console.log('Saved!');
    });

    return newUsers;

    
  } catch (err) {
     next(err);
  }
});

// Delete a user
// localhost:8686/api/v1/users/1
router.delete('/users', async (req, res, next) => {
  console.log('deleteUserById');

  try {
    const { id } = req.body;

    /* Check exits user by id */
    const user = users.find((user) => user.id === parseInt(id));

    if (!user) {
      throw createError(404, `User not found with ID ${id}`);
    }

    /**
     * Lặp qua mảng, tìm user có id để update
     * trả lại mảng mới sau khi update
     */
    const newUsers = users.filter((user) => user.id !== parseInt(id));

    console.log('after', newUsers);

    //Ghi lại file
    fs.writeFileSync(fileNameUsers, JSON.stringify(newUsers), function (err) {
      if (err) throw err;
      console.log('Saved!');
    });

    return newUsers;

    
  } catch (err) {
    throw createError(500, err.message);
  }
});

module.exports = router;
```

Gắn router vào app.js

```js
const usersRoute = require('./routes/users.route');

//Response version API
app.get('/', async (req, res) => {
  res.status(200).json({ message: 'Hello World !' });
});

//Response version API
app.get('/api', async (req, res) => {
  res.status(200).json({ version: 'API 1.0' });
});

//Các API sẽ bắt đầu bằng api
app.use('/api/v1', usersRoute);
```

## 💛 TEST API

- REST Client (Huachao Mao) Extension
- PostMan: <https://www.postman.com/downloads/>


## 💛 Validate Requests

- validate Body parameter
- validate Path parameter
- validate Query parameter

**Bước 1:** Chúng ta cần tạo một Middleware để handle validate `src\middleware\validateSchema.middleware.js`

Sử dụng thư viện `joi` để validate

Chi tiết cách sử dụng joi xem ở [link sau](https://joi.dev/api/?v=17.9.1)

```js
const Joi = require('joi');
const _ = require('lodash');

//Midleware validateSchema
const validateSchema = (schema) => (req, res, next) => {
  //dùng pick để chỉ chọn ra các phần tử cần lấy
  const pickSchema = _.pick(schema, ['params', 'body', 'query']);
  const object = _.pick(req, Object.keys(pickSchema));
  const { value, error } = Joi.compile(pickSchema)
    .prefs({
      errors: {
        label: 'key',
      },

      abortEarly: false,
    })
    .validate(object);
  if (error) {
    const errorMessage = error.details
      .map((detail) => detail.message)
      .join(', ');
    return res.status(400).json({
      status: 400,
      type: 'validateSchema Joi',
      message: errorMessage,
    });
  }
  Object.assign(req, value);
  return next();
};

module.exports = validateSchema;
```

**Bước 2:** Tạo các Schema Validation

Tạo folder `src/validations`

Trong folder này tạo file `user.validation.js`

```js
const Joi = require('joi');

const getUserById = {
  params: Joi.object().keys({
    id: Joi.number().required(),
  }),
};

module.exports = {
  getUserById,
};
```

Giải thích: chúng ta Cần validate cho sự kiện getUserById khi gọi

```code
localhost:8686/api/v1/users/:id
```

Validate `id` phải được truyền vào yêu cầu là số

Chúng ta lần lượt tạo thêm các Schema cho từng route của user Resources

**Bước 2:** Validation cho từng Request

Tại users.route.js sửa lại như sau:

```js
//Thêm vào trên đầu
const validateSchema = require('../middleware/validateSchema.middleware')
const userValidation = require('../validations/users.validation')

//Sửa route

router.get('/users/:id', async (req, res,next) => {
  
}
//Thành như sau
router.get('/users/:id', validateSchema(userValidation.getUserById), async (req, res,next) => {

}
```

`validateSchema` là một middleware nên bạn phải ĐẶT TRƯỚC phần xử lý request /response

==> Làm tương tự cho các route còn lại


## 💛 User Authentication, Authorization

- Tạo user Token
- Tạo Middleware xác thực token
- Tạo Roles phân quyền truy cập routes

Trong thực tế khi xây dựng một hệ thống Restull API sẽ có:

- Các endpoint ở chế độ public tức ai cũng có thể truy cập vào
- Các endpoint ở chế độ private, chỉ những ai có quyền mới truy cập

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