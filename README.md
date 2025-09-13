# 🤖 AI Web Scraper Chrome Extension

A powerful Chrome extension built with TypeScript, React, and Vite that allows users to scrape content from web pages using AI-powered extraction techniques.

## 🌟 Features

- **AI-Powered Web Scraping**: Extract structured data from any webpage using CSS selectors
- **Side Panel Interface**: Clean, intuitive React-based UI that opens in Chrome's side panel
- **Multiple Extraction Types**: 
  - Text content extraction
  - HTML attributes and metadata
  - Full HTML content extraction
- **Structured Data Export**: 
  - Export data as CSV files
  - Export data as JSON files
  - Save to browser local storage
- **LLM Model Configuration**: Configure different AI models in the options page
- **Real-time Results**: View extracted data in organized tables

## 🚀 Installation

1. **Build the Extension**:
   ```bash
   npm install
   npm run build
   ```

2. **Load in Chrome**:
   - Open Chrome and navigate to `chrome://extensions/`
   - Enable "Developer mode" in the top right
   - Click "Load unpacked" and select the `dist` folder
   - The AI Web Scraper extension should now appear in your extensions

## 📖 Usage

### Basic Scraping

1. **Open the Extension**: Click the AI Web Scraper icon in your Chrome toolbar
2. **Enter CSS Selector**: Input the CSS selector for elements you want to scrape (e.g., `.product-title`, `#main-content`)
3. **Choose Extraction Type**: Select what data to extract:
   - **Text Content**: Just the text inside elements
   - **Attributes & Text**: HTML attributes plus text content
   - **HTML Content**: Full HTML markup
4. **Extract Data**: Click "Extract Data" to scrape the current page
5. **View Results**: See extracted data in a structured table format

### Quick Selectors

Use the built-in quick selector buttons for common elements:
- **All Links** (`a`)
- **All Images** (`img`) 
- **All Headings** (`h1, h2, h3, h4, h5, h6`)
- **All Paragraphs** (`p`)
- **Table Rows** (`tr`)
- **List Items** (`li`)

### Exporting Data

Once data is extracted, you can:
- **Save to Storage**: Store data in browser local storage for later access
- **Download CSV**: Export as comma-separated values file
- **Download JSON**: Export as structured JSON file

### Configuration

Access the Options page to configure:
- **LLM Provider**: Choose from OpenAI, Anthropic, Google AI, or Local models
- **API Keys**: Securely store your AI service API keys
- **Model Parameters**: Adjust max tokens and temperature settings
- **Data Management**: Clear stored extraction history

## 🛠️ Development

### Project Structure

```
src/
├── components/           # React components
│   ├── SidePanelApp.tsx # Main sidepanel application
│   ├── ExtractionForm.tsx # Form for scraping parameters
│   ├── ResultsTable.tsx  # Data display table
│   ├── ExportControls.tsx # Export functionality
│   └── OptionsApp.tsx   # Settings page
├── styles/              # CSS stylesheets
│   ├── sidepanel.css   # Sidepanel styling
│   └── options.css     # Options page styling
├── background.ts        # Chrome extension background script
├── content.ts          # Content script for page interaction  
├── sidepanel.tsx       # Sidepanel entry point
└── options.tsx         # Options page entry point
```

### Build Commands

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Technologies Used

- **TypeScript** - Type-safe JavaScript
- **React 18** - UI framework with hooks
- **Vite** - Fast build tool and dev server
- **Chrome Extensions API** - Browser integration
- **CSS3** - Modern styling with flexbox and grid

## 🔧 Technical Details

### Chrome Extension Manifest V3

The extension uses Chrome's Manifest V3 with the following permissions:
- `activeTab` - Access current tab content
- `storage` - Save user settings and scraped data
- `sidePanel` - Display UI in Chrome's side panel

### Content Script Integration

The extension injects a content script that:
- Listens for scraping requests from the side panel
- Uses `document.querySelectorAll()` to find elements
- Extracts text, attributes, or HTML based on user selection
- Returns structured data back to the side panel

### Data Processing

Extracted data is processed into a consistent format:
```typescript
{
  data: Array<Record<string, string>>,    // Extracted content
  headers: string[],                      // Column headers
  totalElements: number                   // Count of scraped elements
}
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes and test thoroughly
4. Commit your changes: `git commit -am 'Add feature'`
5. Push to the branch: `git push origin feature-name`
6. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For issues, questions, or contributions, please visit the [GitHub repository](https://github.com/realharry/ai-web-scraper).
This Chrome extension allows users to scrape content from the current tab page using AI. It features a sidepanel window where users can input what they want to extract. The scraped content is presented in a structured form, such as tables, and can be saved to local storage or exported as CSV or JSON files.
