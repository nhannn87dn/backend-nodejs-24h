const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Home Page');
});

app.get('/about', (req, res) => {
    res.send('About Page');
});

app.get('/blog', (req, res) => {
    res.send('Blog Pagedsd');
});

//GET ==> lấy danh sách sản phẩm
app.get('/products', (req, res) => {
    res.send('Products List');
});

//POST ==> Thêm mới 1 sản phẩm
app.post('/products', (req, res) => {
    res.send('Add a new Product');
});

//PATH ==> Chỉnh sửa 1 sản phẩm
app.put('/products/:id', (req, res) => {
    res.send('Edit a Product');
});

//DELETE ==> Xóa 1 sản phẩm
app.delete('/products/:id', (req, res) => {
    res.send('Delete a Product');
});

// app.get('/:slug', (req, res) => {
//     const slug = req.params.slug
//     res.send(slug);
// });


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});