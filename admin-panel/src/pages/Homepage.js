import React, { useEffect, useRef } from 'react';
import { useProducts } from '../ProductsContext';
import ProductList from '../components/ProductList';
import { gsap } from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import VideoFile from '../assets/Video.mov';
import './HomePage.css';

gsap.registerPlugin(ScrollTrigger);

const HomePage = () => {
  const { products, loading, fetchProducts } = useProducts();
  const videoRef = useRef(null);

  useEffect(() => {
    if (products.length === 0) {
      fetchProducts();
    }
  }, [products.length, fetchProducts]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const once = (el, event, fn, opts) => {
      const onceFn = function (e) {
        el.removeEventListener(event, onceFn);
        fn.apply(this, arguments);
      };
      el.addEventListener(event, onceFn, opts);
      return onceFn;
    };

    once(document.documentElement, 'touchstart', () => {
      video.play();
      video.pause();
    });

    let tl = gsap.timeline({
      scrollTrigger: {
        trigger: '#container',
        start: 'top top',
        end: 'bottom bottom',
        scrub: true,
      },
    });

    once(video, 'loadedmetadata', () => {
      tl.fromTo(video, { currentTime: 0 }, { currentTime: video.duration || 1 });
    });
  }, []);

  const groupedProducts = groupByCategory(products);

  return (
    <div id="container" className="home-page">
      {/* Video Background */}
      <video
        ref={videoRef}
        className="video-background"
        src={VideoFile}
        muted
        playsInline
        autoPlay
        loop
      />

      {/* Fullscreen Hero Overlay */}
      <div className="hero-section">
        <h1>"Look Good. Feel Confident. Trust Your Style."</h1>
        <p>→ Encourages trust in personal fashion sense</p>
      </div>

      {/* Scrollable Product Content */}
      <div className="products-wrapper">
        {loading ? (
          <p>Loading products...</p>
        ) : (
          Object.entries(groupedProducts).map(([category, items]) => (
            <div key={category} className="category-section">
              <h2>{capitalize(category)}</h2>
              <ProductList products={items} isHomePage={true} />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

const groupByCategory = (products) => {
  return products.reduce((acc, product) => {
    const cat = product.category || 'Other';
    acc[cat] = acc[cat] || [];
    acc[cat].push(product);
    return acc;
  }, {});
};

const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

export default HomePage;
