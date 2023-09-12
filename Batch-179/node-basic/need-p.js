
const getUsers = new Promise((resolve, reject) => {
  setTimeout(() => {
    const users = [
      { username: 'john', email: 'john@test.com' },
      { username: 'jane', email: 'jane@test.com' },
    ];
    resolve(users); // Trả về mảng users
  }, 3000);
});

async function findUser(username) {
  const users = await getUsers();
  const user = users.find((user) => user.username === username);
  return user;
}

findUser('john')
.then((user) =>console.log(user))