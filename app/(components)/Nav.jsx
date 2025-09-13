"use client"; //forgive me nexjs for i have sinned against hydration
import { useState, useEffect } from "react";
import IconLogin from "../(icons)/IconLogin";
import logo from "../favicon.ico";
import newticket from "../../public/icon--create-new-ticket.png";

import Link from "next/link";
import Image from "next/image";

const Nav = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // If scrolled more than 10px from top, set true
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);

    // cleanup
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed z-[950] border-b border-white/15 backdrop-blur-sm transition-colors
     top-0 w-full max-w-[1200px] flex justify-between px-4 py-2 ${
       scrolled ? "bg-transparent border-none" : "bg-nav/60"
     }`}
    >
      <Link href="/">
        <Image width={45} height={45} src={logo} alt="logo" />
      </Link>
      <div className="flex items-center space-x-5 text-white text-2xl">
        <Link className="hover:opacity-80" href="/TicketPage/new">
          <Image width={28} height={28} src={newticket} alt="newticket" />
        </Link>
        <IconLogin />
      </div>
    </nav>
  );
};

export default Nav;
