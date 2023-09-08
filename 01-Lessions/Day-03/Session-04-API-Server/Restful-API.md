# Folder structure using Express and Node.Js


**Dự Án E-Commerce**

---

Tạo một thư mục dự án ví dụ: e-commerce-restful-apis

Khởi tạo dự án

```bash
npm init
# Hoặc
yarn init
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

- Tạo biến môi trường .env

```bash
NODE_ENV= development
PORT= 8686
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
yarn run dev
#or
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

