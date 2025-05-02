# TipJar VitePress

A VitePress conversion of the TipJar application for calculating and distributing tips among partners.

## Features

- Upload tip distribution reports (images)
- Extract partner names and hours using OCR
- Calculate tips based on hours worked
- Distribute bills optimally among partners
- Save distribution history
- Download distribution as HTML table

## Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn

### Installation

1. Clone this repository
```
git clone https://github.com/yourusername/tipjar-vitepress.git
cd tipjar-vitepress
```

2. Install dependencies
```
npm install
```

3. Start the development server
```
npm run docs:dev
```

4. Build for production
```
npm run docs:build
```

5. Preview the production build
```
npm run docs:preview
```

## How to Use

1. Upload a tip distribution report image
2. The app will automatically extract partner names and hours
3. Enter the total tip amount for the week
4. Click "Calculate Tips" to generate the distribution
5. View the distribution details and bill breakdown
6. Save to history or download as a formatted HTML table

## Technologies Used

- VitePress (Vue-powered static site generator)
- Google Gemini API for OCR and text extraction
- Vanilla JavaScript
- Tailwind utility classes (via CDN)
- Animate.css for animations 