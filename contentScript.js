chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action === 'extractPhoneNumbers') {
      let phoneNumbers = [];
      let elements = document.getElementsByTagName('span');
  
      for (let i = 0; i < elements.length; i++) {
        let text = elements[i].textContent.trim();
        if (/^\(\d{2}\)\s\d{4,5}-\d{4}$/.test(text)) {
          phoneNumbers.push(text);
        }
      }
  
      sendResponse({phoneNumbers: phoneNumbers});
    }
  });
  