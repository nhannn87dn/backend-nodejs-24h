const isSuccess = true;

const getUsers = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const users = [
        { username: 'john', email: 'john@test.com' },
        { username: 'jane', email: 'jane@test.com' },
      ];
      if (isSuccess) {
        resolve(users); // Promise thành công
      } else {
        reject('Lỗi: Không thể tải dữ liệu'); // Promise thất bại
      }
    }, 2000);
  });
};

function findUser(username) {
  return getUsers()
    .then((users) => {
      const user = users.find((user) => user.username === username);
      return user;
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}

findUser('john')
.then((user) => {
    console.log(user);
})
.catch((error) => {
    console.error('Error:', error);
});