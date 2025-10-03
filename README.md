# Filey CJE

A web-based application for converting CSV files, powered by Heli9 Labs 2025.

## Overview

Filey CJE is a web application that allows users to convert CSV files to different formats. It features a drag-and-drop interface for easy file uploading and conversion.

## Project Structure

```
web UI/
├── index.html          # Main HTML file
├── css/
│   ├── dragDrop.css   # Styles for drag and drop functionality
│   └── style.css      # Main stylesheet
└── scripts/
    ├── dragDrop.js    # Drag and drop functionality
    ├── links.js       # API endpoint configuration
    └── script.js      # Main application logic
```

## API Configuration

The application's API endpoints are configured in `scripts/links.js`. This file contains the base URL and specific endpoints for different functionalities.

### Current Configuration

```javascript
const mainLink = "http://localhost:8201"
const subLinks = {
    "download": `${mainLink}/download`,
    "upload": `${mainLink}/cje`
}
```

### Modifying API Endpoints

To modify the API endpoints for your environment:

1. Open `scripts/links.js`
2. Modify the `mainLink` constant to point to your API server:
   ```javascript
   const mainLink = "https://your-api-server.com"
   ```
3. If needed, modify the endpoint paths in `subLinks`:
   ```javascript
   const subLinks = {
       "download": `${mainLink}/custom-download-path`,
       "upload": `${mainLink}/custom-upload-path`
   }
   ```

> **Note**: Make sure your API server implements the expected endpoints with the correct functionality:
> - `/download` - For downloading converted files
> - `/cje` - For uploading and processing CSV files

## Features

- Drag and drop file upload
- CSV file conversion
- Custom filename input
- File type selection

## Requirements

- Modern web browser with JavaScript enabled
- Active connection to the API server