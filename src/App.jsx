import { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import MenuOverlay from './components/MenuOverlay.jsx';
import SearchOverlay from './components/SearchOverlay.jsx';
import CartDrawer from './components/CartDrawer.jsx';
import SizeGuideModal from './components/SizeGuideModal.jsx';
import ScrollToTop from './components/ScrollToTop.jsx';
import Loader from './components/Loader.jsx';

const Home = lazy(() => import('./pages/Home.jsx'));
const Shop = lazy(() => import('./pages/Shop.jsx'));
const Product = lazy(() => import('./pages/Product.jsx'));
const About = lazy(() => import('./pages/About.jsx'));
const Journal = lazy(() => import('./pages/Journal.jsx'));
const Article = lazy(() => import('./pages/Article.jsx'));
const Checkout = lazy(() => import('./pages/Checkout.jsx'));
const NotFound = lazy(() => import('./pages/NotFound.jsx'));

function PageFallback() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <span className="font-serif text-2xl tracking-widest2 text-muted animate-fadeIn">avé</span>
    </div>
  );
}

export default function App() {
  return (
    <>
      <Loader />
      <ScrollToTop />
      <Header />
      <MenuOverlay />
      <SearchOverlay />
      <CartDrawer />
      <SizeGuideModal />

      <main id="main">
        <Suspense fallback={<PageFallback />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/products/:slug" element={<Product />} />
            <Route path="/about" element={<About />} />
            <Route path="/journal" element={<Journal />} />
            <Route path="/journal/:slug" element={<Article />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>

      <Footer />
    </>
  );
}