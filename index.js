#!/usr/bin/env node

import { fileURLToPath } from "node:url";
import path from "node:path";
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const fileName = process.argv[2];
const content = fs.readFileSync(path.join(
  __dirname,
  fileName
), 'utf-8');

// BEGIN
const strings = content.split('\r\n');

//РЕАЛИЗАЦИЯ ЧЕРЕЗ ОБЪЕКТЫ
const getCreatures = (arrayOfStrings) => {
  const makeArray = (str) => str
    .split('|')
    .filter((elem) => elem.length > 0)
    .map((elem) => elem.slice(1, -1));

  const arrayOfArrays = arrayOfStrings
    .filter((str) => str.length > 0)
    .map(makeArray);

  const [keys, ...values] = arrayOfArrays;

  const creatures = values.map((value) =>
    Object.fromEntries(keys.map((key, index) => [key, value[index]])));
  return creatures;
};
//РЕАЛИЗАЦИЯ ЧЕРЕЗ ОБЪЕКТЫ

//РЕАЛИЗАЦИЯ ЧЕРЕЗ МАССИВЫ
// const getCreatures = (arrayOfStrings) => {
//   const makeArray = (str) => str
//     .split(' ')
//     .filter((elem) => elem.length > 0 && elem !== '|')

//   const creatures = arrayOfStrings
//     .filter((str) => str.length > 0)
//     .slice(1)
//     .map(makeArray);
//   return creatures;
// }
//РЕАЛИЗАЦИЯ ЧЕРЕЗ МАССИВЫ

const creatures = getCreatures(strings);

// ИНТЕРФЕЙС ДЛЯ ОБЪЕКТОВ
const getForce = (creature) => Number(creature['Сила']);
const getPrice = (creature) => Number(creature['Цена найма']);
const getWeight = (creature) => Number(creature['Средний вес']);
const getSquadNumber = (creature) => Number(creature['Кол-во человек в отряде']);
// ИНТЕРФЕЙС ДЛЯ ОБЪЕКТОВ

// ИНТЕРФЕЙС ДЛЯ МАССИВОВ
// const getForce = (creature) => Number(creature[2]);
// const getPrice = (creature) => Number(creature[6]);
// const getWeight = (creature) => Number(creature[5]);
// const getSquadNumber = (creature) => Number(creature[3]);
// ИНТЕРФЕЙС ДЛЯ МАССИВОВ

const getNumberOfCreatures = (creatures) => creatures.length;

const getPriceOfTenStrongestCreatures = (creatures) => {
  const theStrongestCreature = creatures.reduce((acc, creature) =>
    getForce(creature) > getForce(acc) ? creature : acc
  );

  return getPrice(theStrongestCreature) * 10;
};

const getPriceOfTwentySecondStrongestCreatures = (creatures) => {
  const theStrongestCreature = creatures.reduce((acc, creature) =>
    getForce(creature) > getForce(acc) ? creature : acc
  );
  const arrayWithoutStrongest = creatures.filter((creature) => creature !== theStrongestCreature);
  const theSecondStrongestCreature = arrayWithoutStrongest.reduce((acc, creature) =>
  getForce(creature) > getForce(acc) ? creature : acc
);

  return getPrice(theSecondStrongestCreature) * 10;
};

const getFattest = (creatures) =>
  creatures.reduce((acc, creature) =>
    getWeight(creature) > getWeight(acc) ? creature : acc
  );

const getThinnest = (creatures) =>
  creatures.reduce((acc, creature) =>
    getWeight(creature) < getWeight(acc) ? creature : acc
);

const getCostOfHiringASquad = (creature) => getPrice(creature) * getSquadNumber(creature);

const getMostProfitable = (creatures) =>
  creatures.reduce((acc, creature) =>
    getPrice(creature) / getForce(creature) < getPrice(acc) / getForce(acc) ? creature : acc
  );

const getMostUnprofitable = (creatures) =>
  creatures.reduce((acc, creature) =>
    getPrice(creature) / getForce(creature) > getPrice(acc) / getForce(acc) ? creature : acc
  );

const getStrongestArmyFromCost = (creatures, cost) =>
  creatures.reduce((acc, creature) =>
    cost / getPrice(creature) * getForce(creature) > cost / getPrice(acc) * getForce(acc) ? creature : acc
  );


console.log(getNumberOfCreatures(creatures));
console.log(getPriceOfTenStrongestCreatures(creatures));
console.log(getPriceOfTwentySecondStrongestCreatures(creatures));
console.log(getFattest(creatures));
console.log(getCostOfHiringASquad(getFattest(creatures)));
console.log(getThinnest(creatures));
console.log(getCostOfHiringASquad(getThinnest(creatures)));
console.log(getMostProfitable(creatures));
console.log(getMostUnprofitable(creatures));
console.log(getStrongestArmyFromCost(creatures, 10000));

// console.log(creatures);
// END
