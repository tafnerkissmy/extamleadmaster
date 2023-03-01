function extractPhoneNumbers() {
  chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    const currentTabId = tabs[0].id;  

    chrome.scripting.executeScript(
      {
        target: { tabId: currentTabId },
        func: () => {
          const phoneNumbers = Array.from(document.querySelectorAll('span[jstcache="146"]')).map(span => span.innerText.trim());
          console.log
          phoneNumbers.forEach(phoneNumber => {
            const row = document.createElement('tr');
            const cell = document.createElement('td');
            cell.textContent = phoneNumber;
            row.appendChild(cell);
            document.querySelector('#phoneNumbersTable tbody').appendChild(row);
          });
        },
      },
      () => {
        if (chrome.runtime.lastError) {
          console.error(chrome.runtime.lastError);
        }
      }
    );
  });
}

document.addEventListener('DOMContentLoaded', function() {
  const extractButton = document.getElementById('extractButton');
  extractButton.addEventListener('click', extractPhoneNumbers);
});
