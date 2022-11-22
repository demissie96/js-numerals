var numbersInLetter = {
  0: ["zero"],
  1: ["one"],
  2: ["two", "twenty"],
  3: ["three", "thirty"],
  4: ["four", "forty"],
  5: ["five", "fifty"],
  6: ["six", "sixty"],
  7: ["seven", "seventy"],
  8: ["eight", "eighty"],
  9: ["nine", "ninety"],
  10: ["ten"],
  11: ["eleven"],
  12: ["twelve"],
  13: ["thirteen"],
  14: ["fourteen"],
  15: ["fifteen"],
  16: ["sixteen"],
  17: ["seventeen"],
  18: ["eighteen"],
  19: ["nineteen"],
};

function convert(num) {
  console.log(num);
  if (num !== "") {
    // Catch errors
    if (num.toString().includes(".")) {
      return "Use only whole number";
    } else if (num.length === 1) {
      return numbersInLetter[num][0];
    } else if (num.toString()[0] == 0) {
      return "Number starts with 0";
    }
    // Result between 0 - 19
    else if (num < 20) {
      return numbersInLetter[num][0];
    } 
    // Result between 20 - 99
    else if (num >= 20 && num < 100) {
      let first = parseInt(num.toString()[0]);
      let second = parseInt(num.toString()[1]);
      let final;
      if (second === 0) {
        final = numbersInLetter[first][1];
      } else {
        final = `${numbersInLetter[first][1]}-${numbersInLetter[second][0]}`;
      }
      return final;
    } else {
      return "Don't know";
    }
  } else {
    return "";
  }
}

var previousValue;

function numberInput(value) {
  if (previousValue !== value) {
    previousValue = value;
    var result = convert(value);
    document.getElementById("result").innerHTML = `${result}`;
    console.log("Number Input:" + value);
  }
}
