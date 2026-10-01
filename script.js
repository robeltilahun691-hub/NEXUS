/* =========================================
   NEXUS 7.0
   CREATOR + STORE SYSTEM
========================================= */


/* PLAYER DATA */

let player = JSON.parse(localStorage.getItem("nexusPlayer")) || {
    name: "NEXUS PLAYER",
    xp: 0,
    level: 1,
    gamesPlayed: 0,
    favorites: [],
    achievements: []
};

function savePlayer() {
    localStorage.setItem("nexusPlayer", JSON.stringify(player));
}


/* LOADER */

window.addEventListener("load", () => {

    setTimeout(() => {

        const loader = document.getElementById("loader");

        if (loader) {
            loader.style.opacity = "0";

            setTimeout(() => {
                loader.style.display = "none";
            }, 600);
        }

    }, 900);

});


/* MOBILE MENU */

function toggleMenu() {

    const nav = document.getElementById("navLinks");

    nav.classList.toggle("open");
}


/* XP SYSTEM */

function addXP(amount) {

    player.xp += amount;

    while (player.xp >= 100) {

        player.xp -= 100;
        player.level++;

        showNotification(
            `LEVEL UP! You reached LEVEL ${player.level} 🚀`
        );
    }

    savePlayer();
    updatePlayerUI();
}


function updatePlayerUI() {

    document.getElementById("playerName").textContent =
        player.name;

    document.getElementById("playerLevel").textContent =
        `LEVEL ${player.level}`;

    document.getElementById("playerXP").textContent =
        `${player.xp} / 100 XP`;

    document.getElementById("xpProgress").style.width =
        `${player.xp}%`;

    updateProfileUI();
}


/* PROFILE */

function openProfile() {

    updateProfileUI();

    document
        .getElementById("profileModal")
        .classList.add("show");
}


function closeProfile() {

    document
        .getElementById("profileModal")
        .classList.remove("show");
}


function updateProfileUI() {

    const name = document.getElementById("profileName");

    if (!name) return;

    name.textContent = player.name;

    document.getElementById("profileLevel").textContent =
        `LEVEL ${player.level}`;

    document.getElementById("profileXP").textContent =
        `${player.xp} / 100 XP`;

    document.getElementById("profileXPProgress").style.width =
        `${player.xp}%`;

    document.getElementById("profileGames").textContent =
        player.gamesPlayed;

    document.getElementById("profileFavorites").textContent =
        player.favorites.length;

    document.getElementById("profileAchievements").textContent =
        player.achievements.length;
}


/* GAME DATA */

const gameData = {

    gta: {
        title: "Grand Theft Auto V",
        category: "ACTION",
        rating: "9.5",
        players: "150K+",
        image: "gta",
        description:
            "Explore a huge open world filled with missions, vehicles and endless possibilities."
    },

    pubg: {
        title: "PUBG: BATTLEGROUNDS",
        category: "BATTLE",
        rating: "9.1",
        players: "280K+",
        image: "pubg",
        description:
            "Drop into the battlefield, find equipment and fight to become the last player standing."
    },

    cyberpunk: {
        title: "Cyberpunk 2077",
        category: "RPG",
        rating: "9.3",
        players: "120K+",
        image: "cyberpunk",
        description:
            "Enter Night City and experience a futuristic action RPG adventure."
    },

    forza: {
        title: "Forza Horizon 5",
        category: "RACING",
        rating: "9.4",
        players: "95K+",
        image: "forza",
        description:
            "Race through an open world filled with cars, challenges and events."
    },

    rdr: {
        title: "Red Dead Redemption 2",
        category: "ACTION",
        rating: "9.8",
        players: "110K+",
        image: "rdr",
        description:
            "Explore the American frontier in an enormous story-driven adventure."
    },

    elden: {
        title: "Elden Ring",
        category: "RPG",
        rating: "9.7",
        players: "170K+",
        image: "elden",
        description:
            "Explore a dangerous fantasy world and face powerful enemies."
    }

};


/* GAME MODAL */

let currentGame = null;

function openGame(title, category, gameId) {

    const game = gameData[gameId];

    if (!game) return;

    currentGame = gameId;

    document.getElementById("modalImage").className =
        "modal-game-image " + game.image;

    document.getElementById("modalCategory").textContent =
        game.category;

    document.getElementById("modalTitle").textContent =
        game.title;

    document.getElementById("modalRating").textContent =
        game.rating;

    document.getElementById("modalPlayers").textContent =
        game.players;

    document.getElementById("modalDescription").textContent =
        game.description;

    document
        .getElementById("gameModal")
        .classList.add("show");

}


function closeModal() {

    document
        .getElementById("gameModal")
        .classList.remove("show");
}


function playGame() {

    player.gamesPlayed++;

    addXP(15);

    showNotification(
        `You played ${gameData[currentGame].title} 🎮 +15 XP`
    );

    closeModal();
}


/* SEARCH */

const search = document.getElementById("gameSearch");

if (search) {

    search.addEventListener("input", () => {

        const value =
            search.value.toLowerCase();

        document.querySelectorAll(".game-card")
            .forEach(card => {

                const name =
                    card.dataset.name.toLowerCase();

                const category =
                    card.dataset.category.toLowerCase();

                card.style.display =
                    name.includes(value) ||
                    category.includes(value)
                        ? ""
                        : "none";

            });

    });

}


/* FILTER */

function filterGames(category, button) {

    document
        .querySelectorAll(".categories button")
        .forEach(btn => btn.classList.remove("active"));

    button.classList.add("active");

    document
        .querySelectorAll(".game-card")
        .forEach(card => {

            if (
                category === "all" ||
                card.dataset.category === category
            ) {
                card.style.display = "";
            } else {
                card.style.display = "none";
            }

        });

}


/* FAVORITES */

function toggleFavorite(event, gameId) {

    event.stopPropagation();

    const index =
        player.favorites.indexOf(gameId);

    if (index === -1) {

        player.favorites.push(gameId);

        addXP(10);

        showNotification("Added to favorites ❤️");

    } else {

        player.favorites.splice(index, 1);

        showNotification("Removed from favorites");

    }

    savePlayer();

    updateFavoriteButtons();
    updateProfileUI();
}


function updateFavoriteButtons() {

    document
        .querySelectorAll(".favorite-btn")
        .forEach(button => {

            const card =
                button.closest(".game-card");

            if (!card) return;

            const id =
                card.dataset.game;

            button.textContent =
                player.favorites.includes(id)
                    ? "♥"
                    : "♡";

        });

}


/* STORE */

function buyGame(gameName) {

    showNotification(
        `${gameName} store link will be connected here.`
    );

    /*
       IMPORTANT:

       Later, replace this function with your
       real store / affiliate link.

       Example:

       window.open(
          "YOUR_REAL_AFFILIATE_LINK",
          "_blank"
       );
    */
}


/* COMMUNITY */

function joinCommunity() {

    addXP(20);

    showNotification(
        "Welcome to the NEXUS community! 👾 +20 XP"
    );

}


/* NOTIFICATIONS */

function showNotification(message) {

    const box =
        document.getElementById("notification");

    const text =
        document.getElementById("notificationText");

    text.textContent = message;

    box.classList.add("show");

    setTimeout(() => {

        box.classList.remove("show");

    }, 3000);

}


function showNotifications() {

    showNotification(
        "NEXUS is running normally 🔔"
    );

}


/* ONLINE PLAYERS */

let onlinePlayers = 24681;

setInterval(() => {

    onlinePlayers +=
        Math.floor(Math.random() * 80) - 35;

    document.getElementById("onlineCount").textContent =
        onlinePlayers.toLocaleString();

}, 4500);


/* =========================================
   NEXUS MINI GAME
========================================= */

let miniGameRunning = false;
let score = 0;
let timeLeft = 30;
let gameTimer = null;


function startMiniGame() {

    if (miniGameRunning) return;

    miniGameRunning = true;
    score = 0;
    timeLeft = 30;

    document.getElementById("gameScore").textContent = score;
    document.getElementById("gameTime").textContent = timeLeft;

    document.querySelector(".game-start").style.display = "none";

    const target =
        document.getElementById("target");

    target.style.display = "block";

    moveTarget();

    gameTimer = setInterval(() => {

        timeLeft--;

        document.getElementById("gameTime").textContent =
            timeLeft;

        if (timeLeft <= 0) {

            endMiniGame();

        }

    }, 1000);

}


function moveTarget() {

    if (!miniGameRunning) return;

    const area =
        document.getElementById("gameArea");

    const target =
        document.getElementById("target");

    const maxX =
        area.clientWidth - 60;

    const maxY =
        area.clientHeight - 80;

    const x =
        Math.random() * maxX;

    const y =
        Math.random() * maxY;

    target.style.left = `${x}px`;
    target.style.top = `${y}px`;

}


function hitTarget() {

    if (!miniGameRunning) return;

    score++;

    document.getElementById("gameScore").textContent =
        score;

    moveTarget();

}


function endMiniGame() {

    clearInterval(gameTimer);

    miniGameRunning = false;

    document.getElementById("target").style.display =
        "none";

    document.querySelector(".game-start").style.display =
        "grid";

    document.querySelector(".game-start h3").textContent =
        `GAME OVER — ${score} HITS`;

    if (score > 0) {

        addXP(Math.min(score * 2, 50));

        showNotification(
            `Game finished! ${score} hits 🎯`
        );

    }

}


/* MODAL OUTSIDE CLICK */

document.querySelectorAll(".modal")
    .forEach(modal => {

        modal.addEventListener("click", event => {

            if (event.target === modal) {
                modal.classList.remove("show");
            }

        });

    });


/* ESCAPE */

document.addEventListener("keydown", event => {

    if (event.key === "Escape") {

        document
            .querySelectorAll(".modal")
            .forEach(modal =>
                modal.classList.remove("show")
            );

    }

});


/* LOGIN */

function openLogin() {

    document
        .getElementById("loginModal")
        .classList.add("show");

}


function closeLogin() {

    document
        .getElementById("loginModal")
        .classList.remove("show");

}


function login() {

    const username =
        document.getElementById("username").value.trim();

    const password =
        document.getElementById("password").value.trim();

    if (!username || !password) {

        showNotification(
            "Enter your username and password."
        );

        return;
    }

    player.name = username;

    savePlayer();
    updatePlayerUI();

    closeLogin();

    showNotification(
        `Welcome to NEXUS, ${username} 🎮`
    );

}


/* INITIALIZE */

updatePlayerUI();
updateFavoriteButtons();

console.log(
    "NEXUS 7.0 — Creator + Store System Loaded"
);
