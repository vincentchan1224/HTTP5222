export function nonBlocking() {
  console.log("non-blocking-Order:1");

  //The setTimeout() function should make the function to run after 3s(3000ms),
  //but JavaScript won't wait for it and it will execute the next lines.
  setTimeout(() => {
    console.log("non-blocking-Order:2");
  }, 3000);

  console.log("non-blocking-Order:3");
}

//ref: https://stackoverflow.com/questions/10527503/how-do-i-write-a-blocking-synchronous-method-in-javascript
// For the blocking function, we use while loop to make sure Javascript wait for 3s(3000ms)
export function blocking() {
  console.log("blocking-Order:1");
  var startTime = new Date().getTime();
  while (new Date().getTime() < startTime + 3000);
  console.log("blocking-Order:2");
  console.log("blocking-Order:3");
}
