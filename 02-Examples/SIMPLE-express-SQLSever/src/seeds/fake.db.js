const faker = require('faker');
const dbConfig = require('../configs/db');
const sql = require('mssql');


// Tạo 10 bản ghi nhân viên giả mạo
const generateFakeEmployees = () => {
  const employees = [];
  for (let i = 0; i < 10; i++) {
    const firstName = faker.name.firstName();
    const lastName = faker.name.lastName();
    const email = faker.internet.email();
    const numberPhone = faker.phone.phoneNumber();
    const birthday = faker.date.past(30).toISOString().slice(0, 10);
    const address = faker.address.streetAddress();
    const password = faker.internet.password();

    employees.push({
      firstName,
      lastName,
      email,
      numberPhone,
      birthday,
      address,
      password,
    });
  }
  return employees;
};

// Kết nối với cơ sở dữ liệu và chèn dữ liệu nhân viên giả mạo
const insertFakeEmployees = async () => {
  try {
    // Kết nối cơ sở dữ liệu
    await sql.connect(dbConfig);

    // Tạo danh sách nhân viên giả mạo
    const fakeEmployees = generateFakeEmployees();

    // Chèn từng bản ghi nhân viên vào cơ sở dữ liệu
    for (const employee of fakeEmployees) {
      await sql.query`
        INSERT INTO employees (firstName, lastName, email, numberPhone, birthday, address, password)
        VALUES (${employee.firstName}, ${employee.lastName}, ${employee.email}, ${employee.numberPhone},
        ${employee.birthday}, ${employee.address}, ${employee.password});
      `;
    }

    console.log('Đã chèn nhân viên giả mạo thành công!');
  } catch (error) {
    console.error('Lỗi:', error);
  } finally {
    // Đóng kết nối cơ sở dữ liệu
    sql.close();
  }
};

// Gọi hàm chèn dữ liệu nhân viên giả mạo
insertFakeEmployees();