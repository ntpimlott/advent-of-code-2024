const fs = require("fs");

function part1() {
  let input = fs
    .readFileSync(
      "./input.txt",
      "utf-8"
    )
    .split("\n");
    
    input = input.map((string) => {
                return string.split(" ").map((value, index) => {
            if(index === 0){
                return parseInt(value.slice(0,value.length-1));
            }
            else{
                return parseInt(value);
            }
        });
    });

    let result = 0;

    input.forEach((inputArray) => {
        const totalValue = inputArray[0];
        let currentArray = [inputArray[1]];
        for(let i = 2;i<inputArray.length;i++){
            currentArray = currentArray.flatMap((x) => {
                return [x+inputArray[i], x*inputArray[i]];
            });
        }
        if(currentArray.includes(totalValue)){
            result += totalValue;
        }
    });

    console.log("Part 1: ", result);
}

function part2(){
    let input = fs
    .readFileSync(
      "./input.txt",
      "utf-8"
    )
    .split("\n");
    
    input = input.map((string) => {
                return string.split(" ").map((value, index) => {
            if(index === 0){
                return parseInt(value.slice(0,value.length-1));
            }
            else{
                return parseInt(value);
            }
        });
    });

    let result = 0;

    input.forEach((inputArray) => {
        const totalValue = inputArray[0];
        let currentArray = [inputArray[1]];
        for(let i = 2;i<inputArray.length;i++){
            currentArray = currentArray.flatMap((x) => {
                return [x+inputArray[i], x*inputArray[i], parseInt("" + x+inputArray[i])];
            });
        }
        if(currentArray.includes(totalValue)){
            result += totalValue;
        }
    });
    console.log("Part 2: ", result);
}

part1();
part2();
