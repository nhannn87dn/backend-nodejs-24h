# Bài tập CRUD với RESTful API


Dưới đây là ví dụ về RESTful API cho các tài nguyên Categories, Suppliers, Customers, Employees, Products và Orders. Mỗi tài nguyên sẽ có các endpoint tương ứng để thực hiện các hoạt động CRUD (Create, Read, Update, Delete).

## 1. RESTful API cho Categories

- Get all Categories:

  ````
  GET /categories
  ````

- Get Category by id:

  ```
  GET /categories/:id
  ```

- Create a new Category:

  ```
  POST /categories
  ```

- Update Category by id:

  ```
  PUT /categories/:id
  ```

- Delete Category by id:

  ```
  DELETE /categories/:id
  ```

## 2. RESTful API cho Suppliers

- Get all Suppliers:

  ```
  GET /suppliers
  ```

- Get Supplier by id:

  ```
  GET /suppliers/:id
  ```

- Create a new Supplier:

  ```
  POST /suppliers
  ```

- Update Supplier by id:

  ```
  PUT /suppliers/:id
  ```

- Delete Supplier by id:

  ```
  DELETE /suppliers/:id
  ```


## 3. RESTful API cho Products

- Get all Products:

  ```
  GET /products
  ```

- Get Product by id:

  ```
  GET /products/:id
  ```

- Create a new Product:

  ```
  POST /products
  ```

- Update Product by id:

  ```
  PUT /products/:id
  ```

- Delete Product by id:

  ```
  DELETE /products/:id
  ```

## 4. RESTful API cho Customers

- Get all Customers:

  ```
  GET /customers
  ```

- Get Customer by id:

  ```
  GET /customers/:id
  ```

- Create a new Customer:

  ```
  POST /customers
  ```

- Update Customer by id:

  ```
  PUT /customers/:id
  ```

- Delete Customer by id:

  ```
  DELETE /customers/:id
  ```

## 5. RESTful API cho Employees

- Get all Employees:

  ```
  GET /employees
  ```

- Get Employee by id:

  ```
  GET /employees/:id
  ```

- Create a new Employee:

  ```
  POST /employees
  ```

- Update Employee by id:

  ```
  PUT /employees/:id
  ```

- Delete Employee by id:

  ```
  DELETE /employees/:id
  ```


## 6. RESTful API cho Orders

- Get all Orders:

  ```
  GET /orders
  ```

- Get Order by id:

  ```
  GET /orders/:id
  ```

- Create a new Order:

  ```
  POST /orders
  ```

- Update Order by id:

  ```
  PUT /orders/:id
  ```

- Delete Order by id:

  ```
  DELETE /orders/:id
  ```


**Cấu trúc database online-shop**



## Categories

| Id | Column Name | Data Type     | Null | Key | Default | Constraint |
|----|-------------|---------------|------|-----|---------|------------|
| 1  | Id          | int           |      | PK  |         | AUTONUMBER |
| 2  | Name        | nvarchar(50)  |      |     |         | UNIQUE     |
| 3  | Description | nvarchar(500) | yes  |     |         |            |

## Suppliers

| Id | Column Name | Data Type     | Null | Key | Default | Constraint |
|----|-------------|---------------|------|-----|---------|------------|
| 1  | Id          | int           |      | PK  |         | AUTONUMBER |
| 2  | Name        | nvarchar(100) |      |     |         |            |
| 3  | Email       | varchar(50)   |      |     |         | UNIQUE     |
| 4  | PhoneNumber | varchar(50)   |      |     |         | UNIQUE     |
| 5  | Address     | nvarchar(500) |      |     |         |            |


## Customers

| Id | Column Name | Data Type     | Null | Key | Default | Constraint |
|----|-------------|---------------|------|-----|---------|------------|
| 1  | Id          | int           |      | PK  |         | AUTONUMBER |
| 2  | FirstName   | nvarchar(50)  |      |     |         |            |
| 3  | LastName    | nvarchar(50)  |      |     |         |            |
| 4  | Email       | varchar(50)   |      |     |         | UNIQUE     |
| 5  | PhoneNumber | varchar(50)   |      |     |         | UNIQUE     |
| 6  | Address     | nvarchar(500) |      |     |         |            |
| 7  | Birthday    | datetime      | yes  |     |         |            |

## Employees

| Id | Column Name | Data Type     | Null | Key | Default | Constraint |
|----|-------------|---------------|------|-----|---------|------------|
| 1  | Id          | int           |      | PK  |         | AUTONUMBER |
| 2  | FirstName   | nvarchar(50)  |      |     |         |            |
| 3  | LastName    | nvarchar(50)  |      |     |         |            |
| 4  | Email       | varchar(50)   |      |     |         | UNIQUE     |
| 5  | PhoneNumber | varchar(50)   |      |     |         | UNIQUE     |
| 6  | Address     | nvarchar(500) |      |     |         |            |
| 7  | Birthday    | datetime      | yes  |     |         |            |

## Products

| Id | Column Name | Data Type     | Null | Key | Default | Constraint                  |
|----|-------------|---------------|------|-----|---------|-----------------------------|
| 1  | Id          | int           |      | PK  |         | AUTONUMBER                  |
| 2  | Name        | nvarchar(100) |      |     |         |                             |
| 3  | Price       | money         |      |     |         | n > 0                       |
| 4  | Discount    | decimal(18,2) |      |     | 0       | 0 <= n <= 90                |
| 5  | Stock       | decimal(18,2) |      |     | 0       | n >= 0                      |
| 6  | Description | nvarchar(max) | yes  |     |         |                             |
| 7  | CategoryId  | int           |      | FK  |         | Refrence to Categories (Id) |
| 8  | SupplierId  | int           |      | FK  |         | Refrence to Suppliers (Id)  |

## Orders


| Id | Column Name     | Data Type     | Null | Key | Default | Constraint                         |
|----|-----------------|---------------|------|-----|---------|------------------------------------|
| 1  | Id              | int           |      | PK  |         | AUTONUMBER                         |
| 2  | CreatedDate     | datetime      |      |     | NOW     |                                    |
| 3  | ShippedDate     | datetime      | yes  |     |         | n < CreatedDate                    |
| 4  | Status          | varchar(50)   |      |     | WAITING | n in [WAINTING, COMPLETED, CANCEL] |
| 5  | Description     | nvarchar(max) |      |     |         |                                    |
| 6  | ShippingAddress | nvarchar(500) | yes  |     |         |                                    |
| 7  | ShippingCity    | nvarchar(50)  |      |     |         |                                    |
| 8  | PaymentType     | varchar(20)   |      |     | CASH    | n in [CASH, CREDIT CARD]           |
| 9  | CustomerId      | int           |      | FK  |         | Refrence to Customers (Id)         |
| 10 | EmployessId     | int           |      | FK  |         | Refrence to Employees (Id)         |

## Order Details

| Id | Column Name | Data Type     | Null | Key     | Default | Constraint                |
|----|-------------|---------------|------|---------|---------|---------------------------|
| 1  | OrderId     | int           |      | PK + FK |         | Refrence to Orders (Id)   |
| 2  | ProductId   | int           |      | PK + FK |         | Refrence to Products (Id) |
| 3  | Quantity    | decimal(18,2) |      |         |         | n > 0                     |
| 4  | Price       | decimal(18,2) |      |         |         | n > 0                     |
| 5  | Discount    | decimal(18,2) |      |         |         | 0 <= n <=90               |


