document.addEventListener('DOMContentLoaded', function () {
  const readButton = document.getElementById('btnRead');
  const clearButton = document.getElementById('btnClear');
  const textbox = document.getElementById('txtResult');

  readButton.addEventListener('click', handleReadButtonClick);
  clearButton.addEventListener('click', handleClearButtonClick);

  function handleReadButtonClick() {
    readButton.disabled = true;

    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.scripting.executeScript(
        {
          target: { tabId: tabs[0].id },
          func: getActiveElementTextScript
        },
        (result) => {
          if (result && result[0] && result[0].result) {
            processText(result[0].result);
          } else {
            readButton.disabled = false;
            textbox.textContent = 'No text found in the active element or selection.';
          }
        }
      );
    });
  }

  function handleClearButtonClick() {
    textbox.textContent = '';
  }

  function getActiveElementTextScript() {
    var activeElement = document.activeElement;
    if (activeElement.matches('div, span, textarea, input, p')) {
      if (activeElement.matches('input, textarea')) {
        return activeElement.value;
      } else {
        return activeElement.textContent.trim();
      }
    } else {
      var selection = window.getSelection();
      if (selection && selection.rangeCount > 0) {
        return selection.toString().trim();
      }
      return null;
    }
  }

  function processText(input) {
    textbox.textContent = input;
    const ollamaEndpoint = 'http://localhost:11435/api/chat';

    fetch(ollamaEndpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: "llama3",
        stream: false,
        temperature: 0.5,
        max_tokens: -1,
        messages: [
          { role: "system", content: "Your task is to identify and correct any grammar errors" },
          { role: "user", content: input }
        ],
        options: { seed: 12345, temperature: 0.5 }
      })
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        textbox.textContent = data.message.content;
      })
      .catch(error => {
        console.error('Error:', error);
        textbox.textContent = 'Error processing text.';
      })
      .finally(() => {
        readButton.disabled = false;
      });
  }
});
