const botTextArea = document.getElementById('text-area');
const topTextArea = document.getElementById("inputed-area");

function setBottomText(text) {
  if (botTextArea.value == '0' && text !== '.') {
    botTextArea.value = text;
  }
  else if ((text == '.' && botTextArea.value.includes('.'))) {
  }
  else if (botTextArea.value.length <= 24) {
    botTextArea.value += text;
  }

  botTextArea.scrollTop = botTextArea.scrollHeight;
}

function setTopText(text) {
  if (topTextArea.value.length <= 50) {
    topTextArea.value = text;
  }
}

function setButtonListeners() {
  for (let i = 0; i <= 9; i++) {
    let buttonId = 'num-button' + i;
    let button = document.getElementById(buttonId);
    button.addEventListener('click', () => setBottomText(i.toString()));
  }
}

function setAddButtonListener() {
  let button = document.getElementById('add-button');
  button.addEventListener('click', () => {
    const num = botTextArea.value;
    setTopText(num + ' + ');
    botTextArea.value = 0;
  });
}

function setSubButtonListener() {
  let button = document.getElementById('sub-button');
  button.addEventListener('click', () => {
    const num = botTextArea.value;
    setTopText(num + ' - ');
    botTextArea.value = 0;
  });
}

function setMultButtonListener() {
  let button = document.getElementById('mult-button');
  button.addEventListener('click', () => {
    const num = botTextArea.value;
    setTopText(num + ' \u00D7 ');
    botTextArea.value = 0;
  });
}

function setDivButtonListener() {
  let button = document.getElementById('divide-button');
  button.addEventListener('click', () => {
    const num = botTextArea.value;
    setTopText(num + ' \u00F7 ');
    botTextArea.value = 0;
  });
}

function setClearButtonListener() {
  let button = document.getElementById('clear-button');
  button.addEventListener('click', () => {
    setTopText('');
    botTextArea.value = 0;
  });
}

function setBackspaceButtonListener() {
  let button = document.getElementById('backspace-button');
  button.addEventListener('click', () => {
    let text = botTextArea.value;
    if (text != '0') {
      if (text.length > 1) {
        botTextArea.value = text.substring(0, text.length - 1);
      }
      else {
        botTextArea.value = '0';
      }
    }
  });
}

function setSquaredButtonListener() {
  let button = document.getElementById('square-button');
  button.addEventListener('click', () => {
    let num = parseFloat(botTextArea.value);
    setTopText(num + "²" + '=');
    botTextArea.value = num * num;
  });
}

function setSignButtonListener() {
  let button = document.getElementById('sign-button');
  button.addEventListener('click', () => {
    let num = parseFloat(botTextArea.value);
    //setTopText('');
    botTextArea.value = (-1) * num;
  });
}

function setCommaButtonListener() {
  let button = document.getElementById('comma-button');
  button.addEventListener('click', () => {
    setBottomText('.');
  });
}

function setEqualButtonListener() {
  let button = document.getElementById('equal-button');
  button.addEventListener('click', () => {
    const prevTopText = topTextArea.value;
    const num1 = prevTopText.substring(0, prevTopText.length - 1);
    const num2 = botTextArea.value;
    let result;
    setTopText(prevTopText + num2 + ' = ');
    switch (prevTopText.charAt(prevTopText.length - 2)) {
      case '+':
        result = parseFloat(num1) + parseFloat(num2);
        break;
      case '-':
        result = parseFloat(num1) - parseFloat(num2);
        break;
      case '\u00D7':
        result = parseFloat(num1) * parseFloat(num2);
        break;
      case '\u00F7':
        if (parseFloat(num2) != 0) {
          result = parseFloat(num1) / parseFloat(num2);
        } else {
          alert("Can't divide by 0");
          document.getElementById('clear-button').click();
          result = 0;
        }
        break;
      default:
        topTextArea.value = ''

        result = num2;
    }
    botTextArea.value = result;
  });

}

function createKeyListeners(event) {
  //console.log(event.keyCode)
  const keyCode = event.keyCode;
  if (event.shiftKey && keyCode == 56) {
    document.getElementById('mult-button').click();
  }
  else if (event.shiftKey && keyCode == 187) {
    document.getElementById('add-button').click();

  }
  else if (keyCode >= 48 && keyCode <= 57) {
    let button = document.getElementById('num-button' + (keyCode - 48));
    button.click();

  } else {
    switch (keyCode) {
      case 190:
        document.getElementById('comma-button').click();
        break;
      case 189:
        document.getElementById('sub-button').click();
        break;
      case 191:
        document.getElementById('divide-button').click();
        break;
      case 187:
        document.getElementById('equal-button').click();
        break;
      case 13:
        document.getElementById('equal-button').click();
        break;
      case 8:
        document.getElementById('backspace-button').click();
        break;
      default:
        break;
    }
  }

}


setButtonListeners();
setAddButtonListener();
setSubButtonListener();
setMultButtonListener();
setCommaButtonListener();
setClearButtonListener();
setBackspaceButtonListener();
setSignButtonListener();
setDivButtonListener();
setSquaredButtonListener();
setEqualButtonListener();
document.addEventListener('keydown', createKeyListeners);
