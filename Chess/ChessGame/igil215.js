const startUp = () => {
  document.getElementById("home").style.display = "block";
  document.getElementById("shop").style.display = "none";
  document.getElementById("registration").style.display = "none";
  document.getElementById("login").style.display = "none";
  document.getElementById("game").style.display = "none";
  document.getElementById("guest").style.display = "none";
  document.getElementById("buy-popup").style.display = "none";
};

const showHome = () => {
  document.getElementById("home").style.display = "block";
  document.getElementById("shop").style.display = "none";
  document.getElementById("registration").style.display = "none";
  document.getElementById("login").style.display = "none";
  document.getElementById("game").style.display = "none";
  document.getElementById("guest").style.display = "none";
  document.getElementById("buy-popup").style.display = "none";
};

const showShop = () => {
  document.getElementById("home").style.display = "none";
  document.getElementById("shop").style.display = "block";
  document.getElementById("registration").style.display = "none";
  document.getElementById("login").style.display = "none";
  document.getElementById("game").style.display = "none";
  document.getElementById("guest").style.display = "none";
  document.getElementById("buy-popup").style.display = "none";
};

const showReg = () => {
  document.getElementById("home").style.display = "none";
  document.getElementById("shop").style.display = "none";
  document.getElementById("registration").style.display = "block";
  document.getElementById("login").style.display = "none";
  document.getElementById("game").style.display = "none";
  document.getElementById("guest").style.display = "none";
  document.getElementById("buy-popup").style.display = "none";
};

const showLogin = () => {
  document.getElementById("home").style.display = "none";
  document.getElementById("shop").style.display = "none";
  document.getElementById("registration").style.display = "none";
  document.getElementById("login").style.display = "block";
  document.getElementById("game").style.display = "none";
  document.getElementById("guest").style.display = "none";
  document.getElementById("buy-popup").style.display = "none";
};

const showGame = () => {
  document.getElementById("home").style.display = "none";
  document.getElementById("shop").style.display = "none";
  document.getElementById("registration").style.display = "none";
  document.getElementById("login").style.display = "none";
  document.getElementById("game").style.display = "block";
  document.getElementById("guest").style.display = "none";
  document.getElementById("buy-popup").style.display = "none";
};

const showGuest = () => {
  document.getElementById("home").style.display = "none";
  document.getElementById("shop").style.display = "none";
  document.getElementById("registration").style.display = "none";
  document.getElementById("login").style.display = "none";
  document.getElementById("game").style.display = "none";
  document.getElementById("guest").style.display = "block";
  document.getElementById("buy-popup").style.display = "none";
};

const getVersion = () => {
  const fetchVersion = fetch("https://cws.auckland.ac.nz/gas/api/Version");
  const streamPromise = fetchVersion.then((response) => response.text());
  streamPromise.then((data) => showVersion(data));
};
getVersion();

const showVersion = (version) => {
  let htmlString = `<h4 class="versionJS">Version: ${version}</h4>`;
  const versionTag = document.getElementById("version");
  versionTag.innerHTML = htmlString;
};

const showBuy = () => {
  const htmlTag = document.getElementById("login-nav");
  if (htmlTag.text == `Login`) {
    showReg();
  } else {
    var div = (document.getElementById("buy-popup").style.display = "block");
    div.className = "show";
    setTimeout(function () {
      document.getElementById("buy-popup").style.display = "none";
    }, 2000);
  }
};

const showClose = () => {
  const getClose = document.getElementsByClassName("close")[0];
  getClose.onclick = function () {
    getModal.style.display = "none";
  };
};

const getItems = () => {
  const fetchAllItems = fetch("https://cws.auckland.ac.nz/gas/api/AllItems");
  const streamPromise = fetchAllItems.then((response) => response.json());
  streamPromise.then((data) => showAllItems(data));
};
getItems();

const showAllItems = (items) => {
  let htmlString = `
  <tr class='items'>
  <td class="col-header">Item Photo</td>
  <td class="col-header">Item ID</td>
  <td class="col-header">Name</td>
  <td class="col-header">Description</td>
  <td class="col-header">Price</td></tr>`;
  const showItem = (item) => {
    htmlString += `<tr>
                   <td><img
                   class="item-photo"
                   src="https://cws.auckland.ac.nz/gas/api/ItemPhoto/${item.id}"
                   alt="photo-of-item"
                 /></td>
                   <td>${item.id}</td>
                   <td>${item.name}</td>
                   <td>${item.description}</td>
                   <td>$${item.price}</td>
                   <td><button onclick="showBuy();">Buy</button></td>
                   </tr>
                   `;
  };
  items.forEach(showItem);
  const itemTable = document.getElementById("shopTable");
  itemTable.innerHTML = htmlString;
};

const registerUser = () => {
  document.addEventListener("DOMContentLoaded", (e) => {
    const form = document.getElementById("form");
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      const formData = new FormData(form);
      if ((formData.get("username") == "") & (formData.get("password") == "")) {
        alert("No username & password fields detected!");
      } else if (
        (formData.get("username") == "") &
        (formData.get("password") != "")
      ) {
        alert("No username field detected!");
      } else if (
        (formData.get("username") != "") &
        (formData.get("password") == "")
      ) {
        alert("No password field detected!");
      } else {
        fetch("https://cws.auckland.ac.nz/gas/api/Register", {
          method: "POST",
          body: JSON.stringify({
            username: formData.get("username"),
            password: formData.get("password"),
            address: formData.get("address"),
          }),
          headers: {
            Accept: "text/plain",
            "Content-Type": "application/json",
          },
        })
          .then((response) => response.text())
          .then((data) => redirectUser(data));
      }
    });
  });
};
registerUser();

const redirectUser = (data) => {
  if (data != "Username not available" && data != "Invalid username") {
    alert("Registration successful!\nClick OK to go to Login page.");
    showLogin();
  } else {
    alert("Username not available/invalid!");
  }
};

const userObject = (statusCode, username, password) => {
  if (statusCode != 200) {
    alert("Login unsuccessful!");
    return null;
  } else {
    let input_user = localStorage.setItem("username", username);
    let input_pass = localStorage.setItem("password", password);
    alert(`Login successful!\nWelcome ${username}`);
    const htmlTag = document.getElementById("login-nav");
    htmlTag.innerHTML = `<p class="loginWelcome">Welcome ${username}<br><button id="logoutButton" class="logoutNavButton" type="loginSubmit">Logout</button></p>`;
    const loginTag = document.getElementById("login-div");
    loginTag.innerHTML = `<p>You are already logged in!</p><button id="logoutButton" class="submitButton" type="loginSubmit">Logout</button>`;
    const logOutbtn = document.getElementById("logoutButton");
    logOutbtn.addEventListener("click", function (e) {
      htmlTag.innerHTML = `<p>Login</p>`;
      loginTag.innerHTML = `<form id="loginForm">
      <h2 class="regHeadings">Username</h2>
      <input
        class="inputBox"
        name="username"
        type="text"
        placeholder="Enter Username"
      />
      <h2 class="regHeadings">Password</h2>
      <input
        class="inputBox"
        name="password"
        type="password"
        placeholder="Enter Password"
      />
      <button class="submitButton" type="loginSubmit">Login</button>
    </form>`;
      location.reload();
    });
    var userObjectJSON = [
      {
        username: username,
        password: password,
      },
    ];
    showHome();
    return userObjectJSON;
  }
};

const userLogin = () => {
  document.addEventListener("DOMContentLoaded", (e) => {
    const form = document.getElementById("loginForm");
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      const formData = new FormData(form);
      const username = formData.get("username");
      const password = formData.get("password");
      const basicAuth = "Basic " + btoa(username + ":" + password);
      res = fetch("https://cws.auckland.ac.nz/gas/api/VersionA", {
        method: "GET",
        headers: {
          Accept: "text/plain",
          "Content-Type": "application/json",
          Authorization: basicAuth,
        },
      })
        .then((response) => response)
        .then((data) => userObject(data.status, username, password));
    });
  });
};
userLogin();

const sendMove = (move) => {
  if (typeof move == "undefined") {
    alert("You have not made a move yet.")
  }
};

const getMove = (move) => {
  if (typeof move == "undefined") {
    alert("Opponent has not made a move yet.")
  }
};

const checkGame = (gameData, quit, basicAuth) => {
  const p1 = gameData["player1"];
  const p2 = gameData["player2"];
  const id = gameData["gameId"];
  const state = gameData["state"];
  const lastP1 = gameData["lastMovePlayer1"];
  const lastP2 = gameData["lastMovePlayer2"];
  if (quit == true) {
    res = fetch(`https://cws.auckland.ac.nz/gas/api/QuitGame?gameId=${id}`, {
      method: "GET",
      headers: {
        Accept: "text/plain",
        "Content-Type": "application/json",
        Authorization: basicAuth,
      },
    }).then((response) => alert("Game over.."));
    const htmlString = document.getElementById("gameDiv");
    htmlString.innerHTML = `<button class="submitButton" type="pairSubmit" onclick="userDetails(${false})">Try Game</button>
      <h5 id="tryGameHeading" class="startPrompt">To start click try game!</h5>`;
  }
  if (
    state == "progress" &&
    quit == false &&
    p1 == window.localStorage.getItem("username")
  ) {
    const htmlString = document.getElementById("gameDiv");
    htmlString.innerHTML = `<h5 class="startPrompt"><u>GAME IN PROGRESS</u></h5>
      <h2 class="vs">(White) ${p1}  vs  ${p2} (Black)</h2>
      <button class="submitButton" type="pairSubmit" onclick="sendMove(${lastP1})">Send My Move</button>
      <button class="submitButton" type="pairSubmit" onclick="userDetails(${true})">Quit Game</button>`;
  } else if (
    state == "progress" &&
    quit == false &&
    p2 == window.localStorage.getItem("username")
  ) {
    const htmlString = document.getElementById("gameDiv");
    htmlString.innerHTML = `<h5 class="startPrompt"><u>GAME IN PROGRESS</u></h5>
      <h2 class="vs">(White) ${p1}  vs  ${p2} (Black)</h2>
      <button class="submitButton" type="pairSubmit" onclick="getMove(${lastP1})">Get Their Move</button>
      <button class="submitButton" type="pairSubmit" onclick="userDetails(${true})">Quit Game</button>`;
  }
};

const userDetails = (flag) => {
  const htmlTag = document.getElementById("login-nav");
  if (htmlTag.innerText == "Login") {
    alert("Please login or register to play!");
    showLogin();
  } else {
    if (flag == true) {
      const username = window.localStorage.getItem("username");
      const password = window.localStorage.getItem("password");
      const basicAuth = "Basic " + btoa(username + ":" + password);
      res = fetch("https://cws.auckland.ac.nz/gas/api/PairMe", {
        method: "GET",
        headers: {
          Accept: "text/plain",
          "Content-Type": "application/json",
          Authorization: basicAuth,
        },
      })
        .then((response) => response.json())
        .then((data) => checkGame(data, true, basicAuth));
    } else {
      const htmlString = document.getElementById("gameDiv");
      htmlString.innerHTML = `<button class="submitButton" type="pairSubmit" onclick="userDetails(${false})">Try Game</button>
    <button class="submitButton" type="pairSubmit" onclick="userDetails(${true})">Quit Game</button>
    <h5 id="tryGameHeading" class="startPrompt">Waiting for another player to join. Check 'Try Game' 
    intermittently to see if someone has been paired up with you. 
    Please do not spam.</h5>`;
      const username = window.localStorage.getItem("username");
      const password = window.localStorage.getItem("password");
      const basicAuth = "Basic " + btoa(username + ":" + password);
      res = fetch("https://cws.auckland.ac.nz/gas/api/PairMe", {
        method: "GET",
        headers: {
          Accept: "text/plain",
          "Content-Type": "application/json",
          Authorization: basicAuth,
        },
      })
        .then((response) => response.json())
        .then((data) => checkGame(data, false, basicAuth));
    }
  }
};

const loginNav = () => {
  document.addEventListener("DOMContentLoaded", (e) => {
    const htmlTag = document.getElementById("login-nav");
    htmlTag.innerHTML = "<p>Login</p>";
    showLogin();
  });
};
loginNav();

const showComments = (data) => {
  const commentsTable = document.getElementById("entryTable");
  let htmlString = `
  <td class="col-header">Comments</td>
  <td class="col-header">Users</td>`;
  for (i = 1; i < data.length - 2; i++) {
    const dataList = data[i].split("&#8212");
    const comment = dataList[0].slice(4);
    var username = dataList[1];
    username = username.slice(2, username.length - 4);
    htmlString += `<tr>
                   <td><textarea class="commentArea">${comment}</textarea></td>
                   <td>${username}</td>
                   </tr>`;
  }
  commentsTable.innerHTML = htmlString;
};

const populateComments = () => {
  const fetchVersion = fetch("https://cws.auckland.ac.nz/gas/api/Comments");
  const streamPromise = fetchVersion.then((response) => response.text());
  streamPromise.then((data) => showComments(data.split("\r")));
};
populateComments();

const getComments = () => {
  document.addEventListener("DOMContentLoaded", (e) => {
    const form = document.getElementById("guestForm");
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      const formData = new FormData(form);
      username = formData.get("username");
      comment = formData.get("comment");
      if (username == " ") {
        username = "&#x1F467;";
      }
      if (comment == "") {
        alert("ERROR! No comment entered!");
      } else {
        fetch("https://cws.auckland.ac.nz/gas/api/Comment", {
          method: "POST",
          body: JSON.stringify({
            comment: comment,
            name: username,
          }),
          headers: {
            Accept: "text/plain",
            "Content-Type": "application/json",
          },
        })
          .then((response) => response)
          .then((data) => alert("Comment submitted, thanks!\nClick Refresh to update recent entries and view your comment."));
          populateComments();
      }
    });
  });
};
getComments();

const getSearchBarData = (tableRows, cleanInputId) => {
  for (i = 0; i < tableRows.length; i++) {
    nameColumn = tableRows[i].getElementsByTagName("td")[2];
    if ((nameColumn != null && nameColumn != "") || nameColumn) {
      actualName = nameColumn.textContent.toLowerCase();
      if (!actualName || actualName == "" || actualName == null) {
        actualName = nameColumn.innerText.toLowerCase();
      }
      if (actualName.indexOf(cleanInputId) > -1) {
        tableRows[i].style.display = "";
      } else {
        tableRows[i].style.display = "none";
      }
    }
  }
};

const mydragstart = (ev) => {
  ev.dataTransfer.setData("text/plain", ev.target.id);
};

const mydragover = (ev) => {
  ev.preventDefault();
};

const mydrop = (ev) => {
  if (ev.dataTransfer != null) {
    const data = ev.dataTransfer.getData("text/plain");
    ev.target.appendChild(document.getElementById(data));
  }
};
const itemSearchBar = () => {
  const getTable = document.getElementById("shopTable");
  const tableRows = getTable.getElementsByTagName("tr");
  const getInputId = document.getElementById("usrSearch");
  const cleanInputId = getInputId.value.toLowerCase();
  getSearchBarData(tableRows, cleanInputId);
};
itemSearchBar();
