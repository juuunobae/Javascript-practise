const $startScreen = document.querySelector("#start-screen");
const $gameMenu = document.querySelector("#game-menu");
const $battleMenu = document.querySelector("#battle-menu");
const $heroName = document.querySelector("#hero-name");
const $heroLevel = document.querySelector("#hero-level");
const $heroHp = document.querySelector("#hero-hp");
const $heroXp = document.querySelector("#hero-xp");
const $heroAtt = document.querySelector("#hero-att");
const $monsterName = document.querySelector("#monster-name");
const $monsterHp = document.querySelector("#monster-hp");
const $monsterAtt = document.querySelector("#monster-att");
const $message = document.querySelector("#message");

const hero = {
  name: "",
  lev: 1,
  maxHp: 100,
  hp: 100,
  xp: 0,
  att: 10,
  // tish를 사용할 때에는 화살표함수를 사용하면 window를 가리켜 에러가 날 수 있다.
  attack(monster) {
    monster.hp -= this.att;
    this.hp = monster.att;
  },
  heal(monster) {
    this.hp += 20;
    this.hp -= monster.att;
  },
};

let monster = null;
const monsterList = [
  { name: "슬라임", hp: 25, att: 10, xp: 10 },
  { name: "스켈레톤", hp: 50, att: 15, xp: 20 },
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
  $heroXp.textContent = `XP: ${hero.xp}/${15 * hero.lev}`;
  $heroAtt.textContent = `ATT: ${hero.att}`;
  hero.name = name;

  $gameMenu.addEventListener("submit", (e) => {
    e.preventDefault();
    const input = e.target["menu-input"].value;
    if (input === "1") {
      $gameMenu.style.display = "none";
      $battleMenu.style.display = "block";

      // 객체를 대입하면 참조관계가 된다.

      // 깊은 복사
      // 깊은 복사를 하게되면 모든 참조관계가 없어진다.
      // 객체안의 객체와의 참조관계도 없어진다.
      monster = JSON.parse(
        JSON.stringify(monsterList[Math.floor(Math.random() * monsterList.length)])
      );

      // 얕은 복사
      // 얕은 복사는 껍데기만 참조관계가 없어진다.
      // 객체안의 객체와의 참조관계는 그대로 유지된다.
      // monster = { ...monsterList };

      monster.maxHp = monster.hp; // 몬스터의 최대 체력
      $monsterName.textContent = monster.name;
      $monsterHp.textContent = `HP: ${monster.hp}/${monster.maxHp}`;
      $monsterAtt.textContent = `ATT: ${monster.att}`;
    } else if (input === "2") {
    } else if (input === "3") {
    }
  });

  $battleMenu.addEventListener("submit", (e) => {
    e.preventDefault();
    const input = e.target["battle-input"].value;
    e.target["battle-input"].value = "";
    if (input === "1") {
      hero.attack(monster);
      monster.attack(hero);
      $heroHp.textContent = `HP: ${hero.hp}/${hero.maxHp}`;
      $monsterHp = `HP: ${monster.hp}/${monster.maxHp}`;
      $message = `${hero.att}의 데미지를 주고, ${monster.att}의 데미지를 받았다.`;
    } else if (input === "2") {
    } else if (input === "3") {
    }
  });
});
