"use client";

import Image from "next/image";
import React, { useEffect, useRef } from "react";

export default function Home() {
  const heroVideoRef = useRef<HTMLVideoElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const conceptRef = useRef<HTMLElement>(null);
  const GALLERY_COUNT = 5;

  const handleVideoEnded = () => {
    setTimeout(() => {
      heroVideoRef.current?.play();
    }, 5000);
  };

  // Desktop fan-out animation
  useEffect(() => {
    if (window.innerWidth <= 767) return;
    const el = galleryRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("is-visible");
        } else {
          el.classList.remove("is-visible");
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Mobile scroll-driven gallery
  useEffect(() => {
    if (window.innerWidth > 767) return;
    const section = conceptRef.current;
    const gallery = galleryRef.current;
    if (!section || !gallery) return;

    const handleScroll = () => {
      const rect = section.getBoundingClientRect();
      const scrollable = section.offsetHeight - window.innerHeight;
      const progress = Math.max(0, Math.min(1, -rect.top / scrollable));
      const imageWidth = window.innerWidth * 0.75 + 16;
      gallery.style.transform = `translateX(${-progress * imageWidth * (GALLERY_COUNT - 1)}px)`;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <div className="fixed-bg" />

      {/* HEADER */}
      <header className="header">
        <div className="header-inner">
          <a href="/" style={{ marginRight: 60 }}>
            <Image
              src="/images/logo-nova-burger.svg"
              alt="Nova Burger logo"
              className="nav-logo-image"
              width={120}
              height={120}
            />
          </a>
          <nav className="menu-wrapper">
            <a href="#CONCEPT" className="nav-link">CONCEPT</a>
            <span className="nav-link" style={{ cursor: "default" }}>MENU</span>
          </nav>
          <div className="nav-right">
            <span className="white-button" style={{ cursor: "default" }}>
              <div className="button-text-wrap">
                <span className="btn-front is-dark">RÉSERVER</span>
                <span className="btn-hidden is-dark">RÉSERVER</span>
              </div>
            </span>
          </div>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="section-hero">
        <div className="background-video">
          <div className="gradient-top" />
          <div className="gradient-bottom" />
          <video
            ref={heroVideoRef}
            autoPlay
            muted
            playsInline
            onEnded={handleVideoEnded}
            style={{ width: "100%", height: "100%", objectFit: "cover", position: "absolute", inset: 0 }}
          >
            <source
              src="https://d8j0ntlcm91z4.cloudfront.net/user_3DHhT3EJPzYGodVzhAVwQwAcFA3/hf_20260516_190308_01149ee0-f793-41f7-84e2-f4deb03d8785.mp4"
              type="video/mp4"
            />
          </video>
        </div>
        <div className="hero-container">
          <div>
            <h1 className="hero-title-text">
              UN BURGER<br />INTERSTELLAIRE
            </h1>
          </div>
          <div className="hero-buttons">
            <span className="green-button" style={{ cursor: "default" }}>
              <div className="button-text-wrap">
                <span className="btn-front is-beige">COMMANDER</span>
                <span className="btn-hidden is-beige">COMMANDER</span>
              </div>
            </span>
            <span className="white-button" style={{ cursor: "default" }}>
              <div className="button-text-wrap">
                <span className="btn-front is-dark">VOIR LE MENU</span>
                <span className="btn-hidden is-dark">VOIR LE MENU</span>
              </div>
            </span>
          </div>
        </div>
      </section>

      {/* CONCEPT SECTION */}
      <section id="CONCEPT" className="section-concept" ref={conceptRef as React.RefObject<HTMLDivElement>}>
        <div className="sticky-wrapper">
          <div className="text-container">
            <h1 className="heading is-1">À PROPOS</h1>
            <div className="concept-text">
              Chez Nova Burger, on ne fait pas de simples burgers. Nos recettes viennent d&apos;un autre univers. Chaque création est pensée comme une expérience : fermée, surprenante, et conçue pour exploser en saveurs dès la première bouchée. Ici, on ne mange pas un burger… on découvre un autre monde.
            </div>
            <span className="white-button" style={{ cursor: "default" }}>
              <div className="button-text-wrap">
                <span className="btn-front is-dark">VOYAGER</span>
                <span className="btn-hidden is-dark">VOYAGER</span>
              </div>
            </span>
            <h1 className="heading is-brand">NOVA BURGER</h1>
          </div>

          <div className="horizontal-track" ref={galleryRef}>
            <img src="/images/burger1.jpg" alt="" className="image-type-1" />
            <img src="/images/burger2.jpg" alt="" className="image-type-2" />
            <img src="/images/burger3.jpg" alt="" className="image-type-1 is-2" />
            <img src="/images/burger4.jpg" alt="" className="image-type-2" />
            <img src="/images/burger5.jpg" alt="" className="image-type-1" />
          </div>
        </div>
      </section>

      {/* LOGO SPACER — transparent gap that reveals fixed-bg */}
      <div className="logo-spacer" />

      {/* LOCATION SECTION */}
      <section className="section-location">
        <div className="location-inner">
          <div className="location-photo">
            <img src="/images/location-photo.jpg" alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>
          <div className="location-info-col">
            <h2 className="location-brand">NOVA BURGER</h2>
            <div className="location-block">
              <span className="location-label">Nos horaires de livraison</span>
              <span className="location-value">Du Lundi au Dimanche</span>
              <span className="location-value">19h00 — 03h00</span>
              <span className="location-sub">Ouverture des précommandes dès 17h00</span>
            </div>
            <div className="location-block">
              <span className="location-label">Zones de livraison</span>
              <span className="location-value">Paris 13e · Paris 14e · Paris 15e</span>
              <span className="location-value">Ivry-sur-Seine · Vitry · Le Kremlin-Bicêtre</span>
            </div>
            <div className="location-block">
              <span className="location-label">Moyen de paiement</span>
              <span className="location-value">Espèces · CB · Lien SumUp</span>
            </div>
          </div>
        </div>
      </section>

      {/* MARQUEE SECTION */}
      <section className="section-marquee">
        <div className="marquee-track">
          {[0, 1, 2].map((i) => (
            <div key={i} className="marquee-group">
              <span className="marquee-text">VOYAGER</span>
              <span className="marquee-btn">COMMANDER</span>
              <span className="marquee-text">VOYAGER</span>
              <span className="marquee-btn">COMMANDER</span>
            </div>
          ))}
        </div>
      </section>

      {/* MENU SECTION */}
      <section id="MENU" className="section-menu">
        <div className="menu-text-div">
          <h1 className="menu-heading">Pas besoin d&apos;en faire trop.</h1>
          <p className="menu-subtext">
            De bons burgers, des bonnes frites, et une vraie envie d&apos;y retourner.
          </p>
          <span className="white-button" style={{ cursor: "default" }}>
            <div className="button-text-wrap">
              <span className="btn-front is-dark">VOIR LE MENU</span>
              <span className="btn-hidden is-dark">VOIR LE MENU</span>
            </div>
          </span>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="section-footer">
        <div className="footer-grid">
          <div className="left-footer">
            <h2 className="eyebrow-frunch">Nos Réseaux</h2>
            <div className="footer-social-div">
              <div className="footer-social">
                <span className="footer-social-icon">
                  <Image
                    src="/images/Instagram.svg"
                    alt="Instagram"
                    width={30}
                    height={30}
                    loading="lazy"
                  />
                </span>
                <span className="footer-text">NOVA_BURGER</span>
              </div>
              <div className="footer-social">
                <span className="footer-social-icon">
                  <Image
                    src="/images/tiktok.svg"
                    alt="TikTok"
                    width={30}
                    height={30}
                    loading="lazy"
                  />
                </span>
                <span className="footer-text">NOVA_BURGER</span>
              </div>
            </div>
          </div>

          <div className="footer-center-only">
            <Image
              src="/images/logo-nova-burger.svg"
              alt="Nova Burger"
              className="kebab-image-footer"
              width={200}
              height={200}
              loading="lazy"
            />
          </div>

          <div className="right-footer">
            <h2 className="eyebrow-frunch">Contact</h2>
            <div className="footer-social-div">
              <div className="footer-social">
                <span className="footer-social-icon">
                  <svg viewBox="0 0 24 24" fill="#25D366" width="30" height="30" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.126.554 4.121 1.524 5.855L.057 23.903l6.201-1.43A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.9a9.865 9.865 0 01-5.031-1.378l-.361-.214-3.741.981.998-3.648-.235-.374A9.867 9.867 0 012.1 12C2.1 6.534 6.534 2.1 12 2.1c5.467 0 9.9 4.434 9.9 9.9 0 5.467-4.433 9.9-9.9 9.9z"/>
                  </svg>
                </span>
                <span className="footer-text">WHATSAPP</span>
              </div>
            </div>
          </div>
        </div>

        <div className="incipit-div">
          <p className="incipit-text">
            NOVA BURGER — TOUS DROITS RÉSERVÉS.
          </p>
        </div>
      </footer>
    </>
  );
}
