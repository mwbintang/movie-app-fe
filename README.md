# movie-app-fe

## Requirements
- Node.js (>=24.0.0)
- npm (>=8.11.0)

## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/mwbintang/movie-app-fe
    cd movie-app-fe
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Set up environment variables:
    Create a `.env` file in the root directory and configure it based on your environment. Refer to the `.env.example` file for required variables.

## Running the Service Locally

1. Start the development server:
    ```bash
    npm run start
    ```

2. The API will be available at `http://localhost:3000`.

3. Use tools like Postman or cURL to interact with the API endpoints.

Note: make sure that PORT `3000` is available, because by default this development environment use PORT `3000` for running the Javascript Engine.

## Architecture and Trade-offs

### Architecture
The application is built using **React** with **TypeScript**, following a modular component-based architecture to ensure maintainability and scalability.

- **Pages**: Top-level route components (`Home`, `MovieDetail`) manage page-specific state and orchestrate data fetching.
- **Components**: Reusable, presentational UI elements (e.g., `Card`, `SearchBar`, `Layout`) are decoupled from business logic.
- **Services**: A dedicated service layer (`MovieService`) abstracts API communication, ensuring type safety and separating interactions from UI code.
- **Hooks**: Custom hooks (e.g., `useDebounce`) encapsulate reusable logic like search input delaying.
- **Styling**: **Tailwind CSS** provides a utility-first approach for rapid, consistent UI development.

### Trade-offs
- **Client-Side Rendering (CSR) vs. SSR**: 
  - *Decision*: We utilized standard React (CRA/Vite approach) for a simpler build process and fluid, app-like user navigation.
  - *Trade-off*: Initial load times and SEO are slightly less optimized compared to Server-Side Rendering (e.g., Next.js), but this reduces infrastructure complexity for this specific use case.

- **Tailwind CSS**:
  - *Decision*: Adopted for its developer efficiency and small CSS bundle size via purging.
  - *Trade-off*: JSX markup becomes more verbose with class names, but this avoids style leakage and context switching between CSS files.

- **Custom ApiClient vs. Axios**:
  - *Decision*: Implemented a lightweight wrapper around the native `fetch` API.
  - *Trade-off*: This minimizes bundle size by avoiding heavy dependencies. However, advanced features like automatic retries or request interceptors need to be implemented manually if required in the future.