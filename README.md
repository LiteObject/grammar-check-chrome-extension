# A Simple Google Chrome Extension

Here's an example of a small Google Chrome extension that displays a "Hello, World!" message when the extension icon is clicked.

### 1. Create a project folder

A new folder for your extension and name it "HelloWorldExtension".

### 2. Add a `manifest.json` file

Inside the root folder, create a new file named `manifest.json` and add the following content:

```json
{
    "manifest_version": 2,
    "name": "Grammar Check Extension",
    "version": "1.0",
    "description": "A simple grammar check tool",
    "icons": {
      "16": "icon.png",
      "48": "icon.png",
      "128": "icon.png"
    },
    "browser_action": {
      "default_title": "Read text",
      "default_icon": {
        "16": "icon.png",
        "48": "icon.png",
        "128": "icon.png"
      },
      "default_popup": "popup.html"
    },
    "permissions": ["activeTab"]    
  }
```

### 3. Create a new file named `popup.html` and add the following content:

```html
<!DOCTYPE html>
<html>
<head>
  <title>Hello World Extension</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      text-align: center;
    }
  </style>
  <script src="popup.js"></script>
</head>
<body>
  <h1>Hello, World!</h1>
</body>
</html>
```

### 4. Create a new file named "popup.js" and add the following content:

```javascript
document.addEventListener('DOMContentLoaded', function() {
  var h1Element = document.querySelector('h1');
  h1Element.addEventListener('click', function() {
    alert('Hello, World!');
  });
});
```

### 5. Place an image file named "icon.png" (preferably 16x16 pixels) in the root folder.

### 6. Open Google Chrome and navigate to [chrome://extensions](chrome://extensions/).

### 7. Enable _Developer mode_ by toggling the switch in the top right corner.

### 8. Click on _Load unpacked_ and select the "HelloWorldExtension" folder.

### 9. The extension should now appear in the list of installed extensions. You can click on the extension icon to see the "Hello, World!" message and clicking on the message will display an alert saying "Hello, World!".

That's it! You've created a basic Google Chrome extension. Feel free to modify the code and experiment with different functionalities. Remember to reload the extension on the chrome://extensions page whenever you make changes to the code.

---
### Set the following env variable to avoid CORS issue

    $env:OLLAMA_ORIGINS = "*"  

### Set the following env variable to run ollama on a different port

    $env:OLLAMA_HOST = "127.0.0.1:11435" 

---

## Troubleshooting:
Ensure that the ollama server is properly reading the CORS environment settings and applying the headers.

    curl -i -X OPTIONS http://localhost:11435/api/generate -H "Origin: http://localhost" -H "Access-Control-Request-Method: POST"

## Ollama Endpoints:
https://github.com/ollama/ollama/blob/main/docs/api.md#list-local-models
