# Woking with MongoDB

## 💛 Preparing MongoDB 


![mongodb](https://images.viblo.asia/29322fc4-a1b0-4416-9dce-0d4b34843cf6.png)

- MongoDB là một hệ quản trị cơ sở dữ liệu mã nguồn mở, là CSDL thuộc NoSql và được hàng triệu người sử dụng.
- MongoDB là một database hướng tài liệu (document), các dữ liệu được lưu trữ trong document kiểu JSON thay vì dạng bảng như CSDL quan hệ nên truy vấn sẽ rất nhanh.
- Với CSDL quan hệ chúng ta có khái niệm bảng, các cơ sở dữ liệu quan hệ (như MySQL hay SQL Server...) sử dụng các bảng để lưu dữ liệu thì với MongoDB chúng ta sẽ dùng khái niệm là collection thay vì bảng
- So với RDBMS thì trong MongoDB collection ứng với table, còn document sẽ ứng với row , MongoDB sẽ dùng các document thay cho row trong RDBMS.
- Các collection trong MongoDB được cấu trúc rất linh hoạt, cho phép các dữ liệu lưu trữ không cần tuân theo một cấu trúc nhất định.
- Thông tin liên quan được lưu trữ cùng nhau để truy cập truy vấn nhanh thông qua ngôn ngữ truy vấn MongoDB

###  Ưu điểm của mongoDB

- Dữ liệu lưu trữ phi cấu trúc, không có tính ràng buộc, toàn vẹn nên tính sẵn sàng cao, hiệu suất lớn và dễ dàng mở rộng lưu trữ.
- Dữ liệu được caching (ghi đệm) lên RAM, hạn chế truy cập vào ổ cứng nên tốc độ đọc và ghi cao

###  Nhược điểm của MongoDB

- Không ứng dụng được cho các mô hình giao dịch nào có yêu cầu độ chính xác cao do không có ràng buộc.
- Không có cơ chế transaction (giao dịch) để phục vụ các ứng dụng ngân hàng.
- Dữ liệu lấy RAM làm trọng tâm hoạt động vì vậy khi hoạt động yêu cầu một bộ nhớ RAM lớn.
- Mọi thay đổi về dữ liệu mặc định đều chưa được ghi xuống ổ cứng ngay lập tức vì vậy khả năng bị mất dữ liệu từ nguyên nhân mất điện đột xuất là rất cao.

###  Khi nào sử dụng MongoDB?

- Quản lý và truyền tải content – Quản lý đa dạng nhiều product của content chỉ trong một kho lưu trữ data cho phép thay đổi và phản hồi nhanh chóng mà không chịu thêm phức tạp thêm từ hệ thống content.
- Cấu trúc Mobile và Social – MongoDB cung cấp một platform có sẵn, phản xạ nhanh, và dễ mở rộng cho phép rất nhiều khả năng đột phá, phân tích real-time, và hỗ trợ toàn cầu.
- Quản lý data khách hàng – Tận dụng khả năng query nhanh chóng cho phân tích real-time trên cơ sở dữ liệu người dùng cực lớn vớ các mô hình data phức tạp bằng các schema linh hoạt và tự động sharding cho mở rộng chiều ngang.

###  Cài đặt MongoDB

To be able to experiment with the code examples, you will need access to a MongoDB database.

You can download a free MongoDB database at https://www.mongodb.com.

> <https://www.mongodb.com/try/download/community>


Compass Tool: Công cụ để quản lý MoogoDB bằng giao diện đồ họa

> <https://www.mongodb.com/products/compass>

Extension for VS Code:

> <https://www.mongodb.com/products/vs-code>

PaaS: Get started right away with a MongoDB cloud service at https://www.mongodb.com/cloud/atlas.

## 💛  Database Relationships

Trước khi đi tìm hiểu **Data Model Design** chúng ta cần biết mối quan hệ trong CSDL

#### 🔶 One to One - Một một

Kiểu quan hệ một một (one-to-one relationship) là một kiểu quan hệ giữa hai thực thể (entities) trong cơ sở dữ liệu, trong đó `mỗi` thực thể của một bảng dữ liệu chỉ liên kết với `MỘT` thực thể duy nhất của bảng dữ liệu khác. Nói cách khác, mỗi thực thể của bảng A chỉ được liên kết với `MỘT` thực thể duy nhất của bảng B, và ngược lại.

Ví dụ, trong một cơ sở dữ liệu quản lý nhân viên, mỗi nhân viên chỉ có một tài khoản lương duy nhất và mỗi tài khoản lương chỉ thuộc về một nhân viên duy nhất. Đây là một mối quan hệ một-một giữa bảng "Employees" và bảng "SalaryAccounts".

Ví dụ QL Sinh viên: Mỗi sinh viên chỉ có một hồ sơ sinh viên duy nhất và mỗi hồ sơ sinh viên chỉ thuộc về một sinh viên duy nhất. Đây là một mối quan hệ một-một giữa bảng "Students" và bảng "StudentProfiles".

#### 🔶 One to Many - Một nhiều

Kiểu quan hệ một nhiều (one-to-many relationship) là một kiểu quan hệ giữa hai thực thể trong cơ sở dữ liệu, trong đó `MỘT` thực thể của bảng dữ liệu có thể được liên kết với `NHIỀU` thực thể của bảng dữ liệu khác, nhưng mỗi thực thể của bảng dữ liệu khác lại chỉ liên kết với một thực thể duy nhất của bảng dữ liệu đầu tiên.

Ví dụ, trong một cơ sở dữ liệu quản lý khách sạn, một khách sạn có thể có nhiều phòng, nhưng mỗi phòng chỉ thuộc về một khách sạn duy nhất. Đây là một mối quan hệ một nhiều giữa bảng "Hotels" và bảng "Rooms".

#### 🔶 Many to Many - Nhiều nhiều

Kiểu quan hệ nhiều nhiều (many-to-many relationship) là một kiểu quan hệ giữa hai bảng dữ liệu trong cơ sở dữ liệu, trong đó mỗi thực thể của bảng dữ liệu A có thể liên kết với nhiều thực thể của bảng dữ liệu B, và mỗi thực thể của bảng dữ liệu B cũng có thể liên kết với nhiều thực thể của bảng dữ liệu A.

Ví dụ, trong một cơ sở dữ liệu quản lý đơn hàng trực tuyến, một đơn hàng có thể có nhiều sản phẩm, và một sản phẩm cũng có thể xuất hiện trong nhiều đơn hàng khác nhau. Đây là một mối quan hệ nhiều nhiều giữa bảng "Orders" và bảng "Products".

## 💛 Subdocument and References

Trong NoSQL, khái niệm bảng được thay thế bằng khái niệm collection (tập hợp). Một collection trong NoSQL tương đương với một bảng trong hệ quản trị cơ sở dữ liệu quan hệ (RDBMS).

Trong NoSQL, document là một đối tượng cơ bản trong cơ sở dữ liệu, tương đương với một bản ghi trong hệ quản trị cơ sở dữ liệu quan hệ (RDBMS). Một document thường được biểu diễn dưới dạng các cặp trường (field) và giá trị tương ứng, và được lưu trữ trong các collection.

Dựa trên mối quan hệ giữa CSDL, Cấu trúc của một Document sẽ được quyết định bởi 2 kiểu:

- Subdocuments (Hay còn gọi là embed)

![embed](img/embed-model.PNG)

Mô hình này có tốc độ truy vấn nhanh hơn. Nhưng nhược điểm là Data đúng chất NoSQL nó không có mối tương quan dữ liệu gì với các collection

- References

![embed](img/references-model.PNG)

Mặc dù mongoo được biết đến là NoSQL nhưng với mô hình này thì nó có quan hệ.
Tốc độ truy vấn trong mô hình này chậm hơn kiểu `embed` vì phải tham chiếu nhiều collection để lấy dữ liệu.

Data Model Design: <https://www.mongodb.com/docs/manual/core/data-model-design/#data-model-design>

Data Model: <https://www.mongodb.com/docs/manual/applications/data-models/>

## 💛 Using MoongoDB

Chi tiết xem: <https://www.w3schools.com/nodejs/nodejs_mongodb.asp>

Để kết nối thư viện MongoDB với Express.js, bạn cần thực hiện các bước sau:

1. Cài đặt MongoDB và thư viện MongoDB trong dự án của bạn bằng cách chạy lệnh sau trong terminal:

```bash
npm install mongodb
```
2. Tại các Routes

Ví dụ:


```js

const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/myStore";

// Ví dụ truy vấn và lấy dữ liệu từ MongoDB
router.get('/', (req, res, next) => {
     //Kết nối đến server MongoDB
     MongoClient.connect(url, function(err, db) {
      if (err) next(err);
      const dbo = db.db("myStore"); //chọn database
      dbo.collection("users").findOne({}, function(err, result) {
        if (err) next(err);
        res.json(result);
        db.close();//đóng kết nối
      });
    });
});
```

   Trong ví dụ trên, chúng ta đã truy vấn tất cả các tài khoản người dùng từ bảng `users` trong cơ sở dữ liệu và trả về kết quả dưới dạng JSON.



## 💛 Using Mongoose 


Sử dụng MongoDB qua thư viện Mongoose giúp thao tác dễ hơn về mặt cú pháp

```bash
npm install mongoose --save
yarn add mongoose --save
```


###  Kết nối với Database

Đưa đoạn code này vào server.js

```js
const mongoose = require('mongoose');

/// Start the server
const mongooseDbOptions = {
  autoIndex: true, // Don't build indexes
  maxPoolSize: 10, // Maintain up to 10 socket connections
  serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
  socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
  family: 4, // Use IPv4, skip trying IPv6
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
mongoose
  .connect('mongodb://127.0.0.1:27017/myapp', mongooseDbOptions)
  .then(() => {
    console.log('Connected to MongoDB');
    //should listen app here
  })
  .catch((err) => {
    console.error('Failed to Connect to MongoDB', err);
  });
```

Tips: Bạn có thể đưa đoạn code khởi tạo server của Express vào chổ `//should listen app here` để đảm bảo rằng. Phải kết nối server Mongoo thành công thì mới khởi tạo server NodeJs.

### Mongoose SchemaTypes

Tham khảo: <https://mongoosejs.com/docs/schematypes.html>

- String
- Number
- Date
- Buffer
- Boolean
- Mixed
- ObjectId
- Array
- Decimal128
- Map
- Schema

### Tạo một Model Schema với Mongoose

Doc: <https://mongoosejs.com/docs/guide.html#definition>

Tạo thư mục models, trong thư mục này tạo file user.model.js

Cú pháp

```js
new Schema({..}, options);

// or
const schema = new Schema({..});
schema.set(option, value);

```

Xem các options ở link sau: <https://mongoosejs.com/docs/guide.html#options>

Ví dụ về User Schema:

```js
const mongoose = require('mongoose');
const { Schema } = mongoose;

//Tạo Schema
const userSchema = new Schema(
  {
    name: String,
    email: String,
    password: String,
    role: String,
    isEmailVerified: Boolean,
  },
  { timestamps: true }
);
// Tạo Model User
const User = new mongoose.model('User', userSchema);
module.exports = User;
```


## 💛 MongoDB's ORM, Mongoose

Danh sách các phương thức truy vấn xem ở link sau
Doc: <https://mongoosejs.com/docs/queries.html>

Thay vì thao tác dữ liệu trên file, chúng ta chuyển qua kết nối với Database với Mongosee như sau:


### 🔶 Insert - Thêm mới

Bạn sửa route user tại route thêm Mới User như sau:
lại như sau:

```js
//Thêm vào trên đầu
const User = reuiqre('../models/user.model');


// Create a new user
// localhost:8686/api/v1/users
router.post('/users', authenticateToken, async (req, res,next) => {
  console.log('createUser',req.body);

  try {
    const payload = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    };
    // Lưu xuống database
    const user = await User.create(payload);
   
   res.status(200).json({
    codeStatus: 200,
    data: user
  });
    
  } catch (err) {
     next(err);
  }
});

```

### 🔶 Select - Truy vấn dữ liệu

#### Select All

Lấy tất cả Users

```js
// Get all users
// localhost:8686/api/v1/users
router.get('/users', async (req, res) => {
  const users = User.find();
  res.status(200).json({
    codeStatus: 200,
    data: users
  });
});

```

#### Select by ID

Lấy thông tin một User theo ID

```js

// Get a user by ID
// localhost:8686/api/v1/users/1
router.get('/users/:id', validateSchema(userValidation.getUserById), async (req, res,next) => {
  console.log('getUserById');
 
  try {
    const { id } = req.params;

    console.log('<<<< id>>>',id, typeof id)

    if (!id) {
      throw createError(400, 'Missing user ID');
    }

    const user = User.findById(parseInt(id));

    console.log('<<<< user >>>',user)

    if (!user) {
      throw createError(404, 'User not found');
    }

   res.status(200).json({
      codeStatus: 200,
      data: user
    });
  } catch (err) {
    next(err);
  }

});

```

### 🔶 Update

```js
// Update a user
// localhost:8686/api/v1/users/1
router.put('/users/:id', authenticateToken, async (req, res, next) => {
  console.log('upadteUserById');
  try {
    const { id } = req.params;

    
    /* Check exits user by id */
    const user = User.findById(parseInt(id));

    if (!user) {
      throw createError(404, `User not found with ID ${id}`);
    }

    const user = User.findByIdAndUpdate(parseInt(id), req.body, {
      new: true,
    })
    

   res.status(200).json({
      codeStatus: 200,
      data: user
    });

    
  } catch (err) {
     next(err);
  }
});

```

### 🔶 Delete

```js

// Delete a user
// localhost:8686/api/v1/users/1
router.delete('/users', authenticateToken, async (req, res, next) => {
  console.log('deleteUserById');

  try {
    const { id } = req.body;
    const user = User.findByIdAndDelete(id);

    if (!user) {
      throw createError(404, `User not found with ID ${id}`);
    }
    res.status(200).json({
      codeStatus: 200,
      data: user
    });
    
  } catch (err) {
    next(err);
  }
});


```


#### Select with Condition

Lấy thông tin có điều kiện

```js

  const users = User.find({
    role: 'user',
  });

```

Xem thêm [tại đây](MongoDB-Mongosee.md)

Xem thêm về truy vấn với [Moongosee](Query-and-Aggregation.md)


