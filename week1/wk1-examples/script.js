//DEMO BLOCKING VS NON-BLOCKING SCRIPT

console.log("1");

//This click handler is an example of non-blocaking code because it doesn't block line 12 from executing when no click has happened yet.
document.getElementById("click").addEventListener("click", function () {});
