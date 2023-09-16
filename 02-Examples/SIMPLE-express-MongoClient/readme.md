# Một số Lưu ý

Lấy thông tin chi tiết sản phẩm và danh mục bằng phép join

```js

    const product = await database.collection('products').aggregate([
      {
        $match: {
          _id: ObjectId(productId)
        }
      },
      {
        $lookup: {
          from: 'categories',
          localField: 'category_id',
          foreignField: '_id',
          as: 'category'
        }
      },
      {
        $unwind: '$category'
      }
    ]).toArray();

    console.log(product);

```

Phân trang

```js
const skip = (pageNumber - 1) * pageSize;
const limit = pageSize;
const result = await collection.find().skip(skip).limit(limit).toArray();
```