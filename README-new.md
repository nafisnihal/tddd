# Modern Todo App

This is a modern, minimal todo application built with Next.js 15 and dark theme design. It uses DummyJSON API with local storage persistence for a perfect balance of learning and functionality.

## Features

- ✅ Full CRUD operations (Create, Read, Update, Delete)
- 📄 Pagination with customizable items per page
- 🔍 Filter by status (All, Completed, Pending)
- 🌙 Dark theme with modern UI
- 📱 Responsive design
- 💾 Local storage persistence (changes survive page refreshes!)
- 🔄 Reset functionality to clear all local changes

## Getting Started

1. **Install dependencies:**

   ```bash
   npm install
   ```

2. **Start the app:**

   ```bash
   npm run dev
   ```

3. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

## How It Works

### **Hybrid DummyJSON + Local Storage Approach**

- **Initial Data**: Fetched from DummyJSON API for realistic learning
- **Changes Persistence**: All modifications saved to browser localStorage
- **Page Refresh**: Your changes persist across browser sessions!
- **No Setup Required**: Works immediately without any backend configuration

## Tech Stack

- **Framework**: Next.js 15.5.2
- **React**: 19.1.0
- **Styling**: Tailwind CSS 4
- **API**: DummyJSON (with local storage persistence)
- **Icons**: Heroicons (embedded SVG)

## Project Structure

```
├── app/
│   ├── page.js          # Main application page
│   ├── layout.js        # App layout
│   └── globals.css      # Dark theme styles
├── components/
│   ├── DummyJsonTodos.js    # Main todo component
│   └── ui/                  # Reusable UI components
│       ├── TodoHeader.js
│       ├── AddTodoForm.js
│       ├── TodoFilters.js
│       ├── TodoList.js
│       ├── TodoItem.js
│       ├── TodoPagination.js
│       └── ResetButton.js
├── hooks/
│   └── useTodos.js          # Custom hook for state management
├── lib/
│   ├── dummyjson-api.js     # API functions with local persistence
│   ├── local-storage.js     # Local storage utilities
│   ├── todo-utils.js        # Todo manipulation utilities
│   └── url-utils.js         # URL parameter helpers
└── package.json             # Dependencies
```

## Key Features Explained

### **Data Persistence**

Your todos persist across page refreshes and browser sessions using a hybrid approach:

- Initial data comes from DummyJSON (30 realistic todos)
- All your changes are saved locally in browser storage
- Changes are automatically applied when you reload the page

### **Modern Architecture**

- **Component-based**: Each UI piece is a reusable component
- **Custom Hooks**: State management separated from UI
- **Utility Libraries**: Pure functions for business logic
- **Separation of Concerns**: Clean, maintainable code structure

### **Dark Theme**

- Background: `bg-gray-900`
- Cards: `bg-gray-800` with `border-gray-700`
- Inputs: `bg-gray-700` with `border-gray-600`
- Primary buttons: Blue (`bg-blue-600`)
- Success buttons: Emerald (`bg-emerald-600`)
- Text: White and gray variants

## API Integration Learning

This project demonstrates modern API integration patterns:

- **HTTP Methods**: GET, POST, PUT, DELETE
- **Pagination**: Using limit/skip parameters
- **State Management**: Optimistic updates with error handling
- **Data Persistence**: Local storage as a persistence layer
- **Error Handling**: Graceful error states and user feedback

## Reset Functionality

Use the "Reset Data" button to:

- Clear all local changes
- Reload original DummyJSON data
- Test the app with fresh data
- Useful for demonstrations and testing

## Contributing

This project showcases modern React development practices including:

- Functional components with hooks
- Custom hooks for business logic
- Component composition
- Separation of concerns
- Error boundary patterns
- Optimistic UI updates

Feel free to explore, modify, and enhance the codebase!
