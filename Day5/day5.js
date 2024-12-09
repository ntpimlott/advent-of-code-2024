const fs = require("fs");

function part1() {
  const input = fs
    .readFileSync(
      "./input.txt",
      "utf-8"
    )
    .split("\n");

  const rules = new Map();
  const inputs = [];
  let shouldNotSee = [];
  let results = 0;

  while (input.length > 0) {
    if (input[0] === "") {
      input.shift();
      break;
    } else {
      const [value, key] = input[0].split("|");
      if(rules.has(key)){
        rules.get(key).push(value);
      }
      else{
        rules.set(key, [value]);
      }
      input.shift();
    }
  }

  for (let i = 0; i < input.length; i++) {
    inputs.push(input[i].split(","));
  }

  for(let i = 0;i<inputs.length;i++){
    let failed = false;
    shouldNotSee = [];
    for(let j = 0;j<inputs[i].length;j++){
      if(shouldNotSee.indexOf(inputs[i][j]) !== -1){
        failed = true;
      }
      else if(rules.has(inputs[i][j])){
        shouldNotSee = [...shouldNotSee, ...rules.get(inputs[i][j])];
      }
    
    }
    if(failed === false){
      results+=parseInt(inputs[i][Math.floor(inputs[i].length/2)]);
    }
  }
  
  console.log("Part 1: ",results);
}

function part2() {
  const input = fs
    .readFileSync(
      "./input.txt",
      "utf-8"
    )
    .split("\n");

    const behindRules = new Map();
    const inputs = [];
    let shouldNotSee = [];
    let results = 0;
  
    while (input.length > 0) {
      if (input[0] === "") {
        input.shift();
        break;
      } else {
        const [value, key] = input[0].split("|");
        if(behindRules.has(key)){
          behindRules.get(key).push(value);
        }
        else{
          behindRules.set(key, [value]);
        }
        input.shift();
      }
    }

    for (let i = 0; i < input.length; i++) {
      inputs.push(input[i].split(","));
    }

    for(let i = 0;i<inputs.length;i++){
      let currentRow = inputs[i];
      let failed = false;
      shouldNotSee = [];

      
      for(let j = 0;j<currentRow.length;j++){
        if(shouldNotSee.indexOf(currentRow[j]) !== -1){
          failed = true;

          const tempValue = currentRow[j];
          currentRow[j] = currentRow[j-1];
          currentRow[j-1] = tempValue;

          j = 0;
          shouldNotSee = [];
        }
        if(behindRules.has(currentRow[j])){
          shouldNotSee = [...shouldNotSee, ...behindRules.get(currentRow[j])];
        }
      }

      if(failed === true){
        results+=parseInt(currentRow[Math.floor(currentRow.length/2)]);
      }
    }

    console.log("Part 2: ",results);
}

part1();
part2();
