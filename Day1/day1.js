const fs = require('fs');

function part1() {

    const list1 = [];
    const list2 = [];
    let distance = 0;

    const input = fs.readFileSync('./input.txt', 'utf-8')
        .split('\n');

    input.forEach(string => {
        const splitInput = string.split(' ');
        list1.push(parseInt(splitInput[0]));
        list2.push(parseInt(splitInput[3]));
    });

    list1.sort((a, b) => a - b);
    list2.sort((a, b) => a - b);

    for (let i = 0; i < list1.length-1; i++) {
        distance += Math.abs(list2[i] - list1[i]);
    }
    console.log("Part1: ", distance);
}

function part2() {

    const list1 = [];
    const list2 = [];
    let distance = 0;

    const input = fs.readFileSync('./input.txt', 'utf-8')
        .split('\n');

    input.forEach(string => {
        const splitInput = string.split(' ');
        list1.push(parseInt(splitInput[0]));
        list2.push(parseInt(splitInput[3]));
    });

    list1.sort((a, b) => a - b);
    list2.sort((a, b) => a - b);

    for (let i = 0; i < list1.length-1; i++) {
        const currVal = list1[i];
        let numberOfVals = 0;
        for(let j = 0; j < list2.length; j++) {
            if (currVal === list2[j]) {
                numberOfVals++;
            }
        }
        distance += (numberOfVals * currVal);
    }
    console.log("Part2: ", distance);
}

part1();
part2();