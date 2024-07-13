// Listen for messages from other parts of the extension (e.g., popup or content scripts)
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === 'GREETING') {
        console.log('Received greeting:', message.greeting);
        sendResponse({ response: 'Hello from the background script!' });
    } else {
        console.warn('Unknown message type:', message.type);
    }
});

// Example of handling an event
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === 'complete' && tab.active) {
        console.log('Tab updated:', tab);
        // Additional functionality can be added here if needed
    }
});
