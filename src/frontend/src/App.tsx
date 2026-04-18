import { RouterProvider, createRouter } from "@tanstack/react-router";
import { createRootRoute, createRoute } from "@tanstack/react-router";
import { Layout } from "./components/Layout";
import AboutSection from "./pages/AboutSection";
import ContactSection from "./pages/ContactSection";
import HeroSection from "./pages/HeroSection";
import MenuSection from "./pages/MenuSection";
import OrderPage from "./pages/OrderPage";

function HomePage() {
  return (
    <Layout>
      <HeroSection />
      <MenuSection />
      <AboutSection />
      <ContactSection />
    </Layout>
  );
}

const rootRoute = createRootRoute();

const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: HomePage,
});

const orderRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/order",
  component: OrderPage,
});

const routeTree = rootRoute.addChildren([homeRoute, orderRoute]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}
