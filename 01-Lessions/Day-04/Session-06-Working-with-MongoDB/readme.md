# Session 5

## Mocking Up CURD

Tạo data TEST cho hệ thống CURD với thư viện <https://fakerjs.dev/>


## Upload hình ảnh - Multer

Step 1: Cài đặt

```bash
yarn add multer
```

Step 2: Cấu hình Upload

Trong thư mục gốc dự án, tạo folder public, và trong folder này tạo 2 folder con: images và files


Khi bạn upload images, CSS files, and JavaScript files lên server thì bạn cần public đường dẫn đến các tài nguyên tĩnh này thì mình sẽ khai báo:

```js
//Tại app.js
const path = require('path');
app.use(express.static(path.join(__dirname, 'public')));
```


Step 3: Tạo một Multer Configs


Xem: SIMPLE-express-mongosee tại configs


Step 4: Sử dụng Multer để upload

SIMPLE-express-mongosee tại routes/index.js

## Gửi email

Cài đặt 

```bash
yarn add nodemailer
```

Gửi mail


```js
const nodemailer = require('nodemailer');

/* cấu hình email */

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'ecshopvietnamese@gmail.com',
    pass: 'bhvksgtrvzrsukqk'
  }
});

/* 
Ví dụ send mail
*/
router.post('/sendmail', async (req, res,next) => {
  
  const mailOptions = {
    from: 'ecshopvietnamese@gmail.com',
    to: 'nhannn87dn@gmail.com',
    subject: 'Sending Email using Node.js',
    html: '<h1>Welcome</h1><p>That was easy!</p>'
  };


  transporter.sendMail(mailOptions, function(err, info){
    if (err) {
      console.log(err);
      res.status(500).json({ type: 'sendMailError', err});
    } else {
      res.status(200).json({ msg: 'Email sent: ' + info.response});
    }
  });


});
```



## Hoàn thiện các API

- Tạo các Model theo Mục: Cấu trúc database online-shop ở folder CURD-RESTful-API
- Sửa lại các Route tương ứng, lấy dữ liệu từ mogosee

