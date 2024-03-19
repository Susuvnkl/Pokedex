import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "./context/ThemeTroviderContext";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./pages/ErrorPage";
import Layout from "./pages/Layout";
import PokedexPage from "./pages/PokedexPage";
import PokemonPage from "./pages/PokemonPage";
import { PokemonProvider } from "./context/PokemonContext";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <PokedexPage />,
      },
      {
        path: ":pokemonId",
        element: <PokemonPage />, // Or your specific component for this route
      },
    ],
  },
]);

function App() {
  return (
    <>
      {/* Your app content */}
      <QueryClientProvider client={queryClient}>
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
          <PokemonProvider>
            <RouterProvider router={router} />
          </PokemonProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </>
  );
}

export default App;
