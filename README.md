The application is a fully functional e-commerce platform with category browsing, product viewing, cart management, and order placement capabilities.

## Features Implemented

### Pages

- **Categories Page** (`/categories`)

- Displays all product categories from the Fake Store API
- Clean, card-based UI with hover effects

- **Category Products Page** (`/categories/{category_name}`)

- Shows all products within a selected category
- Displays product count
- Responsive grid layout with product cards

- **Product Detail Page** (`/categories/{category_name}/{product_id}`)

- Comprehensive product information display
- Quantity selector with increment/decrement controls
- "Add to Bag" functionality with dynamic price calculation

- **Cart Pages**

- Empty Cart View (`/cart` when cart is empty)

- Informative empty state with call-to-action

- Cart with Items View (`/cart` when items exist)

- List of cart items with quantity controls
- Item removal functionality
- "Remove All" option
- Order summary with subtotal, tax, and total
- "Place Order" button

- **Order Placed Page** (`/order-placed`)

- Success confirmation screen
- Illustration
- "Explore Categories" button to continue shopping

### State Management

- **Redux Implementation**

- Categories management
- Products listing
- Product details
- Cart functionality (add, remove, update quantity)
- Order processing

### API Integration

- Categories API: `https://fakestoreapi.com/products/categories`
- Category Products API: `https://fakestoreapi.com/products/category/{category}`
- Product Details API: `https://fakestoreapi.com/products/{id}`

## Technical Implementation

- React 18 with TypeScript for type safety
- Redux Toolkit for state management
- React Router for client-side navigation
- Material UI icons
- SCSS modules for component-scoped styling
- Vite for fast development and optimized builds

## Setup Instructions

1. Clone the repository
2. Run `npm install` to install dependencies
3. Run `npm run dev` to start the development server
4. Access the application at `http://localhost:5173`

## Future Improvements

- Implement user authentication
- Add product search functionality
- Enhance filter and sort capabilities
- Implement persistent cart storage
- Add unit and integration tests
