const $startScreen = document.querySelector("#start-screen");
const $gameMenu = document.querySelector("#game-menu");
const $battleMenu = document.querySelector("#battle-menu");
const $heroName = document.querySelector("#hero-name");
const $heroLevel = document.querySelector("#hero-level");
const $heroHp = document.querySelector("#hero-hp");
const $heroXp = document.querySelector("#hefo-xp");
const $heroAtt = document.querySelector("#hero-att");
const $monsterName = document.querySelector("#monster-name");
const $monsterHp = document.querySelector("#monster-hp");
const $monsterAtt = document.querySelector("#monster-Att");
const $message = document.querySelector("#message");

const hero = {
  name: "",
  lev: 1,
  maxHp: 100,
  hp: 100,
  mp: 100,
  xp: 0,
  att: 10,
};

let monster = null;
const monsterList = [
  { name: "슬라임", hp: 25, att: 10, xp: 10 },
  { name: "스켈레톤", hp: 50, att: 15, xp: 20 },
  { name: "마왕", hp: 150, att: 35, xp: 50 },
  { name: "마왕", hp: 150, att: 35, xp: 50 },
];

$startScreen.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = e.target["name-input"].value;
  $startScreen.style.display = "none";
  $gameMenu.style.display = "block";
  $heroName.textContent = name;
  $heroLevel.textContent = `Lev. ${hero.lev}`;
  $heroHp.textContent = `HP: ${hero.hp}/${hero.maxHp}`;
  $heroXp.textContent = `XP: ${hero.XP}/${15 * hero.lev}`;
  $heroAtt.textContent = `ATT: ${hero.att}`;
});
