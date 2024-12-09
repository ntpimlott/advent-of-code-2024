const fs = require("fs");

function part1() {
  const input = fs
    .readFileSync(
      "./input.txt",
      "utf-8"
    )
    .split("\n");

    let result = 0;

    for(let i = 0; i < input.length; i++) {
        for(let j = 0; j < input[i].length; j++) {
            if(input[i][j] === "X") {
                //Left 
                if(j >= 3 && input[i][j-1] === "M" && input[i][j-2] === "A" && input[i][j-3] === "S"){
                  result++;
                }
                //Right 
                if(j <= input[i].length-4 && input[i][j+1] === "M" && input[i][j+2] === "A" && input[i][j+3] === "S"){
                  result++;
                }
                //Up
                if(i >= 3 && input[i-1][j] === "M" && input[i-2][j] === "A" && input[i-3][j] === "S"){
                  result++;
                }
                //Down
                if(i <= input.length-4 && input[i+1][j] === "M" && input[i+2][j] === "A" && input[i+3][j] === "S"){
                  result++;
                }
                //Diagonal Left Up
                if(i >= 3 && j >= 3 && input[i-1][j-1] === "M" && input[i-2][j-2] === "A" && input[i-3][j-3] === "S"){
                  result++;
                }
                //Diagonal Left Down
                if(i <= input.length-4 && j >= 3 && input[i+1][j-1] === "M" && input[i+2][j-2] === "A" && input[i+3][j-3] === "S"){
                  result++;
                }
                //Diagonal Right Up
                if(i >= 3 && j <= input[i].length-4 && input[i-1][j+1] === "M" && input[i-2][j+2] === "A" && input[i-3][j+3] === "S"){
                  result++;
                }
                //Diagonal Right Down
                if(i <= input.length-4 && j <= input[i].length-4 && input[i+1][j+1] === "M" && input[i+2][j+2] === "A" && input[i+3][j+3] === "S"){
                  result++;
                }
            }
        }
    }
    console.log("Part 1: ",result);
}

function part2() {
  const input = fs
    .readFileSync(
      "./input.txt",
      "utf-8"
    )
    .split("\n");

    let result = 0;
    let masCount = 0;

    for(let i = 0; i < input.length; i++) {
        for(let j = 0; j < input[i].length; j++) {
            if(input[i][j] === "A" && i>0 && i<=input.length-2 && j>0 && j<=input[i].length-2) {
                //M Top Left
                if(input[i-1][j-1] === "M" && input[i+1][j+1] === "S"){
                  masCount++;
                }
                
                //M Top Right
                if(input[i-1][j+1] === "M" && input[i+1][j-1] === "S"){
                  masCount++;
                }

                //M Bottom Left
                if(input[i+1][j-1] === "M" && input[i-1][j+1] === "S"){
                  masCount++;
                }

                //M Bottom Right
                if(input[i+1][j+1] === "M" && input[i-1][j-1] === "S"){
                  masCount++;
                }

                if(masCount === 2){
                  result++;
                }
                masCount = 0;
            }
        }
    }
    console.log("Part 2: ",result);
}

part1();
part2();
