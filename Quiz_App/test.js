let promoise = fetch('https://jsonplaceholder.typicode.com/todo/1');

      promoise.then(response => response.json())
      .then(json => console.log(json)).catch(function(error){
        console.log("Error")
      })

const getUserData = async () => {
  try {
    const promise = await fetch("https://jsonplaceholder.typicode.com/todo/1");
    console.log(promise);
    const response = await promise.json();
    console.log(response);
  } catch (err) {
    console.log(err);
  }
};

getUserData();