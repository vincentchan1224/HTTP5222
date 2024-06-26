import { addNewItem, getNumItem } from "./collectionModule.js";
import { nonBlocking, blocking } from "./blocking.js";

addNewItem("cherries");
addNewItem("Mango");
console.log(getNumItem());

nonBlocking();
blocking();
