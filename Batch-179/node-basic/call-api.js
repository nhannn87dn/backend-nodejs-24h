 const fetchData = async ()=>{
    // const response = await fetch("https://jsonplaceholder.typicode.com/users");
    // const users =  await response.json();

    const users = await fetch("https://jsonplaceholder.typicode.com/users")
    .then(res => res).then(users => users.json());
    


    console.log(users);
 }


 fetchData();