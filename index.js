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

function resultBetween0_99(num) {
  // Result between 0 - 19
  if (num < 20) {
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
  }
}

function resultBetween100_999(num) {
  let first = parseInt(num.toString()[0]);
  let second = parseInt(num.toString()[1]);
  let third = parseInt(num.toString()[2]);
  let final;
  if (second === 0 && third === 0) {
    final = `${numbersInLetter[first][0]} hundred`;
  } else {
    let result0_99 = resultBetween0_99(parseInt(`${second}${third}`));
    final = `${numbersInLetter[first][0]} hundred and ${result0_99}`;
  }
  return final;
}

function resultBetween1000_999999(num) {
  let final;
  let firstPart;
  let remainingPart;
  let resultfirstPart;

  if (num.length === 4) {
    firstPart = parseInt(num.toString()[0]);
    remainingPart = parseInt(num.toString().substring(1));
    resultfirstPart = resultBetween0_99(firstPart);
  } else if (num.length === 5) {
    firstPart = parseInt(num.substring(0, 2));
    remainingPart = parseInt(num.toString().substring(2));
    resultfirstPart = resultBetween0_99(firstPart);
  } else {
    firstPart = parseInt(num.substring(0, 3));
    remainingPart = parseInt(num.toString().substring(3));
    resultfirstPart = resultBetween100_999(firstPart);
  }
  console.log("remainingPart: " + remainingPart);
  if (remainingPart === 0) {
    final = `${resultfirstPart} thousand`;
  } else if (remainingPart > 99) {
    let resultRemainingPart = resultBetween100_999(remainingPart);
    final = `${resultfirstPart} thousand ${resultRemainingPart}`;
  } else {
    let resultRemainingPart = resultBetween0_99(remainingPart);
    final = `${resultfirstPart} thousand and ${resultRemainingPart}`;
  }

  return final;
}

function convert(num) {
  if (num !== "") {
    // Catch errors
    if (num.toString().includes(".")) {
      return "Use only whole number";
    } else if (num.length === 1) {
      return numbersInLetter[num][0];
    } else if (num.toString()[0] == 0) {
      return "Number starts with 0";
    }
    // Result between 0 - 99
    else if (num >= 0 && num < 100) {
      return resultBetween0_99(num);
    }
    // Result between 100 - 999
    else if (num >= 100 && num < 1000) {
      return resultBetween100_999(num);
    }
    // Result between 1000 - 999.999
    else if (num >= 1000 && num < 1000000) {
      return resultBetween1000_999999(num);
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
    // console.log("Number Input:" + value);
  }
}
