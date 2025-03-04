const steamUser = require('steam-user');
const steamTotp = require('steam-totp');
const keep_alive = require('./keep_alive.js');


const username = process.env.username;
const password = process.env.password;
const shared_secret = process.env.shared;

const games = [730, 440, 365670, 218620, 612880, 356190, 4000, 418370, 359550, 1237970, 1659040, 1436990, 2157110];
const status = 7; // 1 - online, 7 - invisible

const user = new steamUser();

// Přihlášení uživatele
user.logOn({
    accountName: username,
    password: password,
    twoFactorCode: steamTotp.generateAuthCode(shared_secret)
});

user.on('loggedOn', () => {
    console.log(`Úspěšně přihlášen jako ${user.steamID}`);
    user.setPersona(status);
    user.gamesPlayed(games);
});

user.on('error', (err) => {
    console.error("Chyba při přihlášení:", err.message);
});
