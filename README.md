# Property List App

Welcome to the Property List app!

## Table of Contents

1. [Introduction](#introduction)
2. [Installation](#installation)
3. [Running Unit Tests](#running-unit-tests)
4. [Pages Directory](#pages-directory)
5. [Components Directory](#components-directory)
6. [Utils Directory](#utils-directory)
7. [Additional Information](#additional-information)

## Introduction
The Property List app offers a user-friendly app demo for browsing real estate listings effortlessly. It features a clean and intuitive interface, allowing users to search for properties via Map or List panel.

## Installation

To get started with this project, follow these steps:

1. Clone the repository to your local machine:

   ```bash
   git clone <repository-url>
   ```

2. Navigate to the project directory:

   ```bash
   cd project-name
   ```

3. Install dependencies:

   ```bash
   npm install
   ```
   ```bash
   yarn install
   ```

4. Start the development server:

   ```bash
   npm run dev 
   ```
   ```bash
   yarn dev
   ```

5. Open your browser and visit [http://localhost:3000](http://localhost:3000) to view the project.

### Running Unit Tests

Run the following command to execute the unit tests for the project:

```bash
npm run test
```

```bash
yarn test
``` 

## Pages Directory

This directory contains Next.js pages and API routes for the project.

### File Structure

```
pages/
├── index.tsx
├── listings/
│   ├── index.tsx
│   └── listings.module.css
├── _app.tsx
```

### Description

1. **index.tsx**: The main landing page of the application.
2. **listings/**:
   - **index.tsx**: Page displaying property listings.
   - **listings.module.css**: Stylesheet for the property listings page.
3. **_app.tsx**: Custom App component used to initialize pages.

## Components Directory

This directory contains reusable React components used to build the UI of the application.

### File Structure

```
components/
├── Header/
│   ├── index.tsx
│   └── Header.module.css
├── MapPanel/
│   ├── index.tsx
│   └── MapPanel.module.css
└── PropertyList/
    ├── index.tsx
    └── PropertyList.module.css
```

### Description

1. **Header/**:
   - **index.tsx**: Header component for the application.
   - **Header.module.css**: Stylesheet for the header component.
2. **MapPanel/**:
   - **index.tsx**: Component for displaying a map panel.
   - **MapPanel.module.css**: Stylesheet for the map panel component.
3. **PropertyList/**:
   - **index.tsx**: Component for displaying a list of properties.
   - **PropertyList.module.css**: Stylesheet for the property list component.

## Utils Directory

This directory contains utility functions used throughout the project. These functions are written in pure JavaScript and avoid the use of third-party utilities like [lodash] for the purpose of this challenge.

### Utility Functions

1. **calculateTotalBaths.tsx**: This utility function calculates the total number of baths based on the number of full baths and half baths.
2. **extractPropertyData.tsx**: This utility function extracts relevant property data from a given dataset.
3. **formatDate.tsx**: This utility function formats a date string into the MM/DD/YY format.
4. **formatPrice.tsx**: This utility function formats a numeric price into a readable string format with appropriate units (e.g., thousand or million).
5. **getStateAbbreviation.tsx**: This utility function retrieves the abbreviation of a US state based on its full name.

## Additional Information
- Created a custom marker for the Map Panel

- Created a heart-stroke-red.svg for hover on/off state change for favorite icon

- Below are **warnings** that I didn't have the time to resolve due to time. Just an FYI to let the reviewer know I did notice them.

⚠️ **Warning:** As of February 21st, 2024, google.maps.Marker is deprecated. Please use google.maps.marker.AdvancedMarkerElement instead.

⚠️ **Warning:** The resource [https://use.typekit.net/af/efe4a5/00000000000000007735e609/30/l?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n4&v=3](https://use.typekit.net/af/efe4a5/00000000000000007735e609/30/l?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n4&v=3) was preloaded using link preload but not used within a few seconds from the window's load event. Please make sure it has an appropriate as value and it is preloaded intentionally.
