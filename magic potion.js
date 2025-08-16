// MAGIC POTION SHOP ADVENTURE GAME
// Helper: prompt 
function ask(message, def = "") {
  const v = prompt(message, def);
  return v === null ? "" : String(v).trim();
}
function askNumber(message, def = 0) {
  const v = ask(message, String(def));
  const n = Number(v);
  return Number.isFinite(n) ? n : def;
}

// 1. Start the Game (Variables, Template Literals, Type Conversion)
let playerName = ask("Welcome to the Magic Potion Shop! What's your name?", "Zara");
while (!playerName) playerName = ask("Please enter a valid name:", "Zara");

let playerAge = askNumber("How old are you?");

let favoriteElement = ask("What's your favorite element? (fire, water, earth, air)").toLowerCase();
const validElements = ["fire", "water", "earth", "air"];
if (!validElements.includes(favoriteElement)) favoriteElement = "fire";

alert(`Welcome ${playerName}! At ${playerAge}, you're just the right age to master the powers of ${favoriteElement}!`);

// Player gold tracker
let gold = 0;
let brewedCount = 0;
let servedCustomers = 0;

// 2. Stock Setup (Arrays, Objects, and Methods)
let potions = ["Healing Potion", "Mana Elixir", "Invisibility Draft", "Fire Resistance"];

let potionStock = {
  "Healing Potion": { quantity: 5, price: 10 },
  "Mana Elixir": { quantity: 3, price: 15 },
  "Invisibility Draft": { quantity: 2, price: 25 },
  "Fire Resistance": { quantity: 4, price: 20 },
};

// Helper: 
function getPotionMenu() {
  return potions
    .map((p, i) => `${i + 1}. ${p} - ${potionStock[p].price} gold (${potionStock[p].quantity} left)`)
    .join("\n");
}

// Helper: 
function resolvePotionName(input) {
  if (!input) return null;
  const lc = input.toLowerCase();
  return potions.find((p) => p.toLowerCase() === lc) || null;
}

// 3. Customer Orders (if/else, switch, loops) — 
for (let customer = 1; customer <= 3; customer++) {
  const yesNo = ask(`Customer ${customer} is here! Take their order? (yes/no)`).toLowerCase();
  if (yesNo !== "yes") {
    alert("You let the customer go.");
    continue;
  }

  alert("Here’s our menu:\n" + getPotionMenu());

  let orderInput = ask("Which potion would they like?");
  let chosenPotion = resolvePotionName(orderInput);

  
  if (!chosenPotion && orderInput && /^\d+$/.test(orderInput)) {
    const idx = Number(orderInput) - 1;
    if (idx >= 0 && idx < potions.length) chosenPotion = potions[idx];
  }

  if (!chosenPotion) {
    alert("Sorry, we don’t have that potion.");
    continue;
  }

  // switch/if 
  switch (chosenPotion) {
    case "Healing Potion":
      alert(potionStock[chosenPotion].quantity > 0 ? "Great choice for adventurers!" : "Oops, might be out!");
      break;
    case "Mana Elixir":
      alert("Excellent for mages!");
      break;
    case "Invisibility Draft":
      alert("Sneaky! Be careful out there.");
      break;
    case "Fire Resistance":
      alert("Stay cool in hot places!");
      break;
  }

  if (potionStock[chosenPotion].quantity > 0) {
    potionStock[chosenPotion].quantity--;
    gold += potionStock[chosenPotion].price;
    servedCustomers++;
    alert(`✅ Sold 1 ${chosenPotion}! You earned ${potionStock[chosenPotion].price} gold.`);
  } else {
    alert(`❌ Sorry, ${chosenPotion} is out of stock.`);
  }
}

// 4. Brewing Potions (Functions, Loops, Array Methods)
function brewPotion(potionName, amount) {
  if (!potionStock[potionName]) {
    alert(`We don’t know how to brew ${potionName}!`);
    return false;
  }
  if (!Number.isInteger(amount) || amount <= 0) {
    alert("Invalid amount to brew.");
    return false;
  }
  potionStock[potionName].quantity += amount;
  brewedCount += amount;
  alert(`🧪 Brewed ${amount} ${potionName}(s). We now have ${potionStock[potionName].quantity} in stock.`);
  return true;
}

let brewSessions = 0;
while (brewSessions < 3) {
  const brewChoice = ask("Do you want to brew more potions? (yes/no)").toLowerCase();
  if (brewChoice !== "yes") break;

  alert("Available recipes:\n" + potions.map((p, i) => `${i + 1}. ${p}`).join("\n"));

  let potionNameInput = ask("Which potion do you want to brew?");
  let potionName = resolvePotionName(potionNameInput);

  // انتخاب با شماره
  if (!potionName && /^\d+$/.test(potionNameInput)) {
    const idx = Number(potionNameInput) - 1;
    if (idx >= 0 && idx < potions.length) potionName = potions[idx];
  }

  if (!potionName) {
    alert("We don’t brew that potion here!");
    continue;
  }

  const amount = askNumber("How many do you want to brew?", 1);
  brewPotion(potionName, amount);
  brewSessions++;
}

// 5. End of Day Report (Objects, Destructuring, String Methods)
let stockReportLines = [];
for (let potion in potionStock) {
  const { quantity, price } = potionStock[potion]; 
  stockReportLines.push(`${potion}: ${quantity} left (price: ${price})`);
}
const stockReport = stockReportLines.join("\n");

alert(
  `📜 End of Day Report:\n` +
    `${stockReport}\n\n` +
    `Gold earned: ${gold} 💰\n` +
    `Great job, ${playerName}! You brewed ${brewedCount} potion(s) and helped ${servedCustomers} customer(s) today!`
);
