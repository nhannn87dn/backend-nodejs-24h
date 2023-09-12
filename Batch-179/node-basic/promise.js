// const myPromise = new Promise((resolve, reject) => {
//     // Thực hiện các công việc không đồng bộ
//     // Nếu thành công, gọi resolve(value)
//     // Nếu thất bại, gọi reject(error)
// });

// myPromise
// //Nếu thành công rời vào then
// .then(value => {
//     console.log(value);
// })
// //xảy ra lỗi thì rơi vào catch
// .catch(err => console.log(err))


const getUsers = new Promise((resolve, reject) => {
      setTimeout(() => {
        const users = [
          { username: 'john', email: 'john@test.com' },
          { username: 'jane', email: 'jane@test.com' },
        ];
        resolve(users); // Trả về mảng users
      }, 3000);
    });
  
function findUser(username) {
        return getUsers
            .then((users) => {
            const user = users.find((user) => user.username === username);
            return user;
            })
            .catch((error) => {
            console.error('Error:', error);
            });
}

findUser('john')
.then(user => {
    console.log(user);
})
