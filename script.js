"use strict";

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// // Data
// const account1 = {
//   owner: 'Jonas Schmedtmann',
//   movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
//   interestRate: 1.2, // %
//   pin: 1111,
// };

// const account2 = {
//   owner: 'Jessica Davis',
//   movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
//   pin: 2222,
// };

// const account3 = {
//   owner: 'Steven Thomas Williams',
//   movements: [200, -200, 340, -300, -20, 50, 400, -460],
//   interestRate: 0.7,
//   pin: 3333,
// };

// const account4 = {
//   owner: 'Sarah Smith',
//   movements: [430, 1000, 700, 50, 90],
//   interestRate: 1,
//   pin: 4444,
// };

// const accounts = [account1, account2, account3, account4];

// // Elements
// const labelWelcome = document.querySelector('.welcome');
// const labelDate = document.querySelector('.date');
// const labelBalance = document.querySelector('.balance__value');
// const labelTimer = document.querySelector('.timer');

// const containerApp = document.querySelector('.app');
// const containerMovements = document.querySelector('.movements');

// const btnLogin = document.querySelector('.login__btn');
// const btnTransfer = document.querySelector('.form__btn--transfer');
// const btnLoan = document.querySelector('.form__btn--loan');
// const btnClose = document.querySelector('.form__btn--close');
// const btnSort = document.querySelector('.btn--sort');

// const inputLoginUsername = document.querySelector('.login__input--user');
// const inputLoginPin = document.querySelector('.login__input--pin');
// const inputTransferTo = document.querySelector('.form__input--to');
// const inputTransferAmount = document.querySelector('.form__input--amount');
// const inputLoanAmount = document.querySelector('.form__input--loan-amount');
// const inputCloseUsername = document.querySelector('.form__input--user');
// const inputClosePin = document.querySelector('.form__input--pin');

// /////////////////////////////////////////////////
// /////////////////////////////////////////////////
// // LECTURES

// const currencies = new Map([
//   ['USD', 'United States dollar'],
//   ['EUR', 'Euro'],
//   ['GBP', 'Pound sterling'],
// ]);

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// /////////////////////////////////////////////////
// console.log(document.querySelectorAll("button"));
const INTERESTRATE = 1.5;

const accounts = [
  {
    fullName: "Musa Abdulkabir Ayomide",
    transactions: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
    pin: 1111,
  },

  {
    fullName: "Ayodeji Amina Ayomide",
    transactions: [5000, -3400, -150, 300, 30],
    pin: 2222,
  },

  {
    fullName: "Desmond Solomon Abuchi",
    transactions: [100, 400, 20000],
    pin: 3333,
  },

  {
    fullName: "Bola Olaniyi Blessing",
    transactions: [2000, 3400, -150, 100000],
    pin: 4444,
  },

  {
    fullName: "Mr Akeem Olarenwaju",
    transactions: [900, 300, -1000, 300000],
    pin: 5555,
  },

  {
    fullName: "Akpobasa Samuel Victor",
    transactions: [300],
    pin: 6666,
  },

  {
    fullName: "Adeyemi Testimony Adebola",
    transactions: [300, 50000000],
    pin: 7777,
  },
];

// 1)
// first create username property on each user in the array
function genUsername() {
  accounts.forEach(function (user) {
    const splitted = user.fullName.split(" ");
    // console.log("Musa-Abdulkabir".split("-").join(" "));
    const finalResult = splitted.map((name) => {
      return name[0].toLowerCase(); // name.at(0) or charAt(0)
    });

    user["username"] = finalResult.join(""); // user.username = finalResult.join("")
  });
}
genUsername();

// Login Event
const btnLogin = document.querySelector(".login__btn");
const inputLoginUsername = document.querySelector(".login__input--user");
const inputLoginPin = document.querySelector(".login__input--pin");
const containerApp = document.querySelector(".app");
const labelWelcome = document.querySelector(".welcome");

let currentUser;

btnLogin.addEventListener("click", function (event) {
  event.preventDefault();

  const username = inputLoginUsername.value;
  const pin = inputLoginPin.value;

  // blocking request when one of the input is empty
  if (!username || !pin) return;

  // get user
  currentUser = accounts.find((user) => {
    return user.username === username.toLowerCase();
  });

  // if user does not exist
  if (!currentUser) {
    console.log("There is no user with that username :D");
    return;
  }

  // check for user's pin
  if (currentUser.pin !== Number(pin)) {
    return console.log("Incorrect Pin :D");
  }

  containerApp.style.opacity = 1;
  labelWelcome.textContent = `Welcome back, ${currentUser.username.toUpperCase()}`;
  inputLoginUsername.value = "";
  inputLoginPin.value = "";

  displayTransactionHistory(currentUser.transactions);
  displaySummary(currentUser.transactions);
});

const containerMovements = document.querySelector(".movements");
const labelSumIn = document.querySelector(".summary__value--in");
const labelSumOut = document.querySelector(".summary__value--out");
const labelSumInterest = document.querySelector(".summary__value--interest");

function displayTransactionHistory(transactions) {
  containerMovements.innerHTML = "";
  transactions.forEach(function (transaction, index) {
    const type = transaction > 0 ? "deposit" : "withdrawal";

    const html = `
        <div class="movements__row">
          <div class="movements__type movements__type--${type}">
            ${index + 1} ${type}
          </div>
          <div class="movements__date">24/01/2037</div>
          <div class="movements__value">${Math.abs(transaction)}€</div>
        </div>
    `;

    containerMovements.insertAdjacentHTML("afterbegin", html);
  });
}

function displaySummary(transactions) {
  const income = transactions
    .filter((transaction) => transaction > 0)
    .reduce((acc, cur) => acc + cur, 0);

  labelSumIn.textContent = income;

  const outgoing = transactions
    .filter((transaction) => transaction < 0)
    .reduce((acc, cur) => acc + cur, 0);

  labelSumOut.textContent = Math.abs(outgoing);

  const interest = (income * 30 * INTERESTRATE) / 100;

  labelSumInterest.textContent = interest;
}
