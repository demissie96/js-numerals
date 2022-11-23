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

function resultBetween_Million_Sextillion(num) {
  let thousand_sextillion_list = [
    "thousand",
    "million",
    "billion",
    "trillion",
    "quadrillion",
    "quintillion",
    "sextillion",
  ];
  let final;
  let numList = [];

  let numInString = num.toString();
  let metricJump = Math.floor(numInString.length / 3);
  let firstElementLength = num.length - metricJump * 3;

  for (let index = 0; index <= metricJump; index++) {
    if (index === 0 && firstElementLength !== 0) {
      numList.push(parseInt(numInString.substring(0, firstElementLength)));
    } else if (index === 0 && firstElementLength === 0) {
      numList.push(parseInt(numInString.substring(index, index + 3)));
    } else if (index === 1 && firstElementLength !== 0) {
      numList.push(
        parseInt(
          numInString.substring(firstElementLength, firstElementLength + 3)
        )
      );
    } else if (firstElementLength === 0 && index === 0) {
      numList.push(parseInt(numInString.substring(index * 3, index * 3 + 3)));
    } else if (firstElementLength === 1) {
      numList.push(
        parseInt(
          numInString.substring(
            index * 3 - firstElementLength - 1,
            index * 3 + 3 - firstElementLength - 1
          )
        )
      );
    } else if (firstElementLength === 2) {
      numList.push(
        parseInt(numInString.substring(index * 3 - 1, index * 3 + 3 - 1))
      );
    } else if (firstElementLength === 0 && index !== metricJump) {
      numList.push(parseInt(numInString.substring(index * 3, index * 3 + 3)));
    }
  }

  final = "";

  for (let index = 0; index < numList.length; index++) {
    let naming_index = numList.length - 2;
    naming_index -= index;
    if (numList[index] === 0) {
    } else if (numList[index] < 100 && naming_index >= 0) {
      final += `${resultBetween0_99(numList[index])} ${
        thousand_sextillion_list[naming_index]
      } `;
    } else if (naming_index >= 0) {
      final += `${resultBetween100_999(numList[index])} ${
        thousand_sextillion_list[naming_index]
      } `;
    } else if (numList[index] < 100 && index + 1 === numList.length) {
      final += `and ${resultBetween0_99(numList[index])}`;
    } else if (numList[index] < 100) {
      final += `${resultBetween0_99(numList[index])}`;
    } else {
      final += `${resultBetween100_999(numList[index])}`;
    }
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
    }
    // Result between 1.000.000 - 999,999,999,999,999,999,999,999
    else if (num >= 1000000 && num < 1000000000000000000000000n) {
      return resultBetween_Million_Sextillion(num);
    } else {
      return "Sorry, I have no idea. 🤔";
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
  }
}

// ######################### Test Code ######################################

let test_list_num = [7, 42, 1999, 2001, 17999, 100001, 342251, 1300420];
let test_list_letter = [
  "seven",
  "forty-two",
  "one thousand nine hundred and ninety-nine",
  "two thousand and one",
  "seventeen thousand nine hundred and ninety-nine",
  "one hundred thousand and one",
  "three hundred and forty-two thousand two hundred and fifty-one",
  "one million three hundred thousand four hundred and twenty",
];

let message = "*** All Good ***";
for (let index = 0; index < test_list_num.length; index++) {
  let result = convert(`${test_list_num[index]}`);
  if (test_list_letter[index] === result) {
    console.log(`Test ${index + 1} ✅`);
  } else {
    console.log(`Test ${index + 1} ❌`);
    message = "*** Not Good ***";
  }
}
console.log(message);
