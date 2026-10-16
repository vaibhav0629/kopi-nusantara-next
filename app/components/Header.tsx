"use client";

import { useEffect, useRef, useState } from "react";
import type { AnimationEvent, MouseEvent } from "react";

const links = [
  { href: "#hero", label: "Home" },
  { href: "#product", label: "Products" },
  { href: "#work", label: "Our Partner" },
  { href: "#faq", label: "FAQ" },
  { href: "#about", label: "About Us" },
];

// calc the offset (same logic as your original naturalTop)
const naturalTop = (el: HTMLElement) => {
  let top = el.parentElement!.getBoundingClientRect().top + window.scrollY;

  for (
    let s = el.previousElementSibling as HTMLElement | null;
    s;
    s = s.previousElementSibling as HTMLElement | null
  ) {
    top += s.offsetHeight;
  }

  return top;
};

export default function Header() {
  const [open, setOpen] = useState(false);
  const [pos, setPos] = useState("");
  const active = useRef<HTMLAnchorElement | null>(null);

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY === 0) {
        setPos("header-moved-top");
        active.current = null;
      } else {
        setPos("header-moved-bottom");
      }
    };

    // when resized to desktop, close the dropdown
    const mediaQuery = window.matchMedia("(width >= 992px)");
    const onMedia = (e: MediaQueryListEvent) => {
      if (e.matches) setOpen(false);
    };

    window.addEventListener("scroll", onScroll);
    mediaQuery.addEventListener("change", onMedia);

    return () => {
      window.removeEventListener("scroll", onScroll);
      mediaQuery.removeEventListener("change", onMedia);
    };
  }, []);

  const onAnimationEnd = (e: AnimationEvent<HTMLElement>) => {
    const head = e.currentTarget;
    head.style.backgroundColor = head.classList.contains("header-moved-top")
      ? "#21181100"
      : "#21181120";
  };

  const onLinkClick = (e: MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();

    const link = e.currentTarget;
    const target = document.querySelector(href) as HTMLElement | null;
    if (!target) return;

    const goingBack = active.current === link;

    window.scrollTo({
      top: goingBack ? 0 : naturalTop(target),
      behavior: "smooth",
    });

    active.current = goingBack ? null : link;
  };

  return (
    <header id="header" className={pos} onAnimationEnd={onAnimationEnd}>
      <div id="head-title">
        <img src="/assets/logo.png" alt="coffee" />
        <h1>Kopi Nusantara</h1>
      </div>

      <nav id="navbar">
        <ul>
          {links.map((l) => (
            <li key={l.href}>
              <a href={l.href} onClick={(e) => onLinkClick(e, l.href)}>
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div id="dropdown" onClick={() => setOpen(!open)}>
        <img src="/assets/3bar-black.png" alt="dropdown" id="3bar" />
      </div>

      <div id="dropContent" style={{ display: open ? "block" : "none" }}>
        <ul>
          {links.map((l) => (
            <li key={l.href}>
              <a href={l.href} onClick={(e) => onLinkClick(e, l.href)}>
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}