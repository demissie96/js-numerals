var previousValue;

function numberInput(value) {
  if (previousValue !== value) {
    previousValue = value;
    document.getElementById("result").innerHTML = `${value}`;
    console.log("Number Input:" + value);
  }
}
