# Todo App - Two API Approaches

This is a modern, minimal todo application built with Next.js 15 and dark theme design. It demonstrates two different approaches to working with APIs for todo management.

## Features

- ✅ Full CRUD operations (Create, Read, Update, Delete)
- 📄 Pagination with customizable items per page
- 🔍 Filter by status (All, Completed, Pending)
- 🌙 Dark theme with modern UI
- 📱 Responsive design
- ⚡ Two different API approaches

## API Approaches

### Option 1: JSON-Server (Local API)

- **File**: `components/JsonServerTodos.js`
- **Setup Required**: Yes, requires running json-server
- **Data Persistence**: Yes, data persists locally
- **Real CRUD**: Yes, actual database operations

**How to use:**

1. Start json-server: `npx json-server db.json --port 3001`
2. In `app/page.js`, keep `<JsonServerTodos />` uncommented
3. Comment out `<DummyJsonTodos />`

### Option 2: DummyJSON (External API)

- **File**: `components/DummyJsonTodos.js`
- **Setup Required**: No, works immediately
- **Data Persistence**: No, changes are simulated
- **Real CRUD**: Simulated, good for demos and testing

**How to use:**

1. In `app/page.js`, comment out `<JsonServerTodos />`
2. Uncomment `<DummyJsonTodos />`
3. No server setup required!

## Getting Started

1. **Install dependencies:**

   ```bash
   npm install
   ```

2. **Choose your approach:**
   Edit `app/page.js` and uncomment the desired component

3. **For JSON-Server approach:**

   ```bash
   # Start json-server (in one terminal)
   npx json-server db.json --port 3001

   # Start Next.js app (in another terminal)
   npm run dev
   ```

4. **For DummyJSON approach:**

   ```bash
   # Just start the Next.js app
   npm run dev
   ```

5. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

## API Comparison

| Feature          | JSON-Server     | DummyJSON         |
| ---------------- | --------------- | ----------------- |
| Setup            | Requires server | No setup          |
| Data Persistence | ✅ Local file   | ❌ Simulated      |
| Real CRUD        | ✅ Yes          | ⚠️ Simulated      |
| Offline Work     | ✅ Yes          | ❌ Needs internet |
| Learning         | Real backend    | API concepts      |
| Production Ready | ⚠️ Dev only     | ❌ Demo only      |

## Tech Stack

- **Framework**: Next.js 15.5.2
- **React**: 19.1.0
- **Styling**: Tailwind CSS 4
- **Local API**: json-server 1.0.0-beta.3
- **External API**: DummyJSON
- **Icons**: Heroicons (embedded SVG)

## Project Structure

```
├── app/
│   ├── page.js          # Main page with component selector
│   ├── layout.js        # App layout
│   └── globals.css      # Dark theme styles
├── components/
│   ├── JsonServerTodos.js   # Local json-server approach
│   └── DummyJsonTodos.js    # External DummyJSON approach
├── db.json              # Local data for json-server
└── package.json         # Dependencies
```

## Key Differences

### Pagination

- **JSON-Server**: Uses `_page` and `_per_page` parameters
- **DummyJSON**: Uses `limit` and `skip` parameters

### Data Structure

- **JSON-Server**: Direct array response with metadata
- **DummyJSON**: Nested response `{todos: [], total, skip, limit}`

### CRUD Operations

- **JSON-Server**: Real database operations, data persists
- **DummyJSON**: Simulated responses, no actual persistence

## Learning Path

1. **Start with DummyJSON** - No setup, immediate results
2. **Move to JSON-Server** - Learn local API development
3. **Compare both approaches** - Understand the differences

## Tips

- Use DummyJSON for quick prototyping and demos
- Use JSON-Server for learning backend concepts
- Both components have identical UI and functionality
- Switch between them easily by commenting/uncommenting in `page.js`

## Dark Theme Colors

- Background: `bg-gray-900`
- Cards: `bg-gray-800` with `border-gray-700`
- Inputs: `bg-gray-700` with `border-gray-600`
- Primary buttons: Purple (`bg-purple-600`)
- Success buttons: Emerald (`bg-emerald-600`)
- Text: White and gray variants

## Contributing

Feel free to experiment with both approaches and add new features! This project is designed to help understand different API integration patterns.
