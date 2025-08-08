"use client"
import type React from "react"
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { motion, AnimatePresence} from "framer-motion"
import { useSpring, animated } from "@react-spring/web"
import { Button } from "@/Components/ui/button"

import { Sheet, SheetTrigger, SheetContent } from "@/Components/ui/sheet"
import { Input } from "@/Components/ui/input"
import {   ChevronDown, Zap, Search } from "lucide-react"

import logo from "../assets/Logo.png"

interface NavigationItem {
  label: string
  href: string
}

interface NavigationSection {
  title: string
  items: NavigationItem[]
}

const navigationSections: NavigationSection[] = [
  {
    title: "Conference",
    items: [
      { label: "Program", href: "/program" },
      { label: "Speakers", href: "/speakers" },
    ],
  },
  {
    title: "Participation",
    items: [
      { label: "Registration", href: "/registration" },
      { label: "Call for Papers", href: "/call-for-papers" },
      { label: "Abstract Guidelines", href: "/abstract-guidelines" },
    ],
  },
  {
    title: "Information",
    items: [
      { label: "Organizers", href: "/organizers" },
      { label: "Gallery", href: "/gallery" },
    ],
  },
  {
    title: "Contact",
    items: [{ label: "Contact Us", href: "/contact" }],
  },
]

/* -------------------------------------------------------------------------- */
/*                               Animation variants                           */
/* -------------------------------------------------------------------------- */



/* -------------------------------------------------------------------------- */
const Header: React.FC = () => {
  /* ---------------------------------------------------------------------- */
  /*                                   STATE                                  */
  /* ---------------------------------------------------------------------- */
  const [anchorOpen, setAnchorOpen] = useState<Record<string, boolean>>({})
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false)
  const [mobileExpanded, setMobileExpanded] = useState<Record<string, boolean>>({})
  const [scrolled, setScrolled] = useState(false)

  scrolled;
  anchorOpen;
  /* ---------------------------------------------------------------------- */
  /*                                SCROLL EFFECT                             */
  /* ---------------------------------------------------------------------- */
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, []);

  // Prevent background scroll when mobileDrawerOpen
  useEffect(() => {
    if (mobileDrawerOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileDrawerOpen]);



  /* ---------------------------------------------------------------------- */
  /*                                SPRING ANI                                */
  /* ---------------------------------------------------------------------- */
  const logoSpring = useSpring({
    from: { opacity: 0, transform: "translateY(-20px)" },
    to: { opacity: 1, transform: "translateY(0px)" },
    config: { tension: 250, friction: 20 },
  })

  const headerSpring = useSpring({
    backgroundColor: "#6e58a5",
    config: { tension: 300, friction: 30 },
  })

  /* ---------------------------------------------------------------------- */
  /*                               EVENT HANDLERS                             */
  /* ---------------------------------------------------------------------- */
  const toggleSection = (title: string, stateSetter: typeof setAnchorOpen) =>
    stateSetter((p) => ({ ...p, [title]: !p[title] }))

  const smoothScroll = (href: string) => {
    if (href.startsWith("#")) {
      const element = document.querySelector(href)
      if (element) {
        element.scrollIntoView({ behavior: "smooth" })
      }
    }
  }

  /* ---------------------------------------------------------------------- */
  /*                                    UI                                    */
  /* ---------------------------------------------------------------------- */
  return (
    <>
      <animated.header
        style={headerSpring}
        className="fixed top-0 left-0 right-0 z-50 shadow-2xl transition-all duration-300 bg-[#6e58a5]"
      >
        <div className="container mx-auto flex h-20 items-center justify-between px-6 py-5 relative">
          {/* Logo --------------------------------------------------------- */}
          <animated.div style={logoSpring} className="flex-shrink-0 z-10">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-3 cursor-pointer"
            >
              <Link to="/" className="flex items-center gap-3">
                <img src={logo} alt="Logo" className="h-16 w-auto" />
                <div className="flex flex-col">
                  {/* Desktop / Tablet Title */}
                  <span className="hidden md:inline text-xl font-black leading-tight">
                    <span className="text-white">Food Science and Nutrition </span>
                    <span className="text-yellow-500">Conference</span>
                  </span>
                  {/* Mobile Title */}
                  <span className="md:hidden text-xl font-black leading-tight text-white">FSN&nbsp;Conference</span>
                </div>
              </Link>
            </motion.div>
          </animated.div>



          {/* Desktop nav - Centered -------------------------------------------------- */}
          <div className="hidden lg:flex flex-1 items-center justify-end gap-1">
            {navigationSections.flatMap(section => section.items).map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: -12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07, duration: 0.4 }}
                whileHover={{ y: -2, scale: 1.05 }}
                whileTap={{ y: 0, scale: 0.98 }}
              >
                <Button
                  variant="ghost"
                  asChild
                  className="relative rounded-xl px-3 py-2 text-sm font-semibold text-slate-200 transition-all duration-300 hover:bg-yellow-500/20 hover:text-yellow-200 hover:shadow-lg backdrop-blur-sm border border-transparent hover:border-white/20"
                >
                  <Link to={item.href} className="w-full h-full block">
                    {item.label}
                  </Link>
                </Button>
              </motion.div>
            ))}
          </div>

          {/* Search & mobile menu ---------------------------------------- */}
          <div className="flex items-center gap-4 flex-shrink-0 z-10">
           
            

            {/* Mobile trigger */}
            <Sheet open={mobileDrawerOpen} onOpenChange={setMobileDrawerOpen}>
              <SheetTrigger asChild className="lg:hidden">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <button
  aria-label={mobileDrawerOpen ? "Close navigation menu" : "Open navigation menu"}
  aria-expanded={mobileDrawerOpen}
  aria-controls="mobile-navbar"
  className="relative flex h-12 w-12 items-center justify-center rounded-full bg-white/10 backdrop-blur-md p-2 text-white shadow-lg transition-all duration-300 hover:bg-white/20 hover:shadow-xl border border-white/20 focus:outline-none lg:hidden"
  onClick={() => setMobileDrawerOpen((open) => !open)}
>
  <span className="sr-only">Menu</span>
  <span className="block relative w-7 h-7">
    <span
      className={`absolute left-1/2 top-2 w-6 h-0.5 bg-white rounded transition-all duration-300 ${mobileDrawerOpen ? 'rotate-45 top-3.5' : '-translate-x-1/2 -translate-y-2.5'}`}
    />
    <span
      className={`absolute left-1/2 top-1/2 w-6 h-0.5 bg-white rounded transition-all duration-300 ${mobileDrawerOpen ? 'opacity-0' : '-translate-x-1/2 -translate-y-1/2'}`}
    />
    <span
      className={`absolute left-1/2 bottom-2 w-6 h-0.5 bg-white rounded transition-all duration-300 ${mobileDrawerOpen ? '-rotate-45 bottom-3.5' : '-translate-x-1/2 translate-y-2.5'}`}
    />
  </span>
</button>
                </motion.div>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="w-80 border-l border-slate-700/50 bg-slate-900/95 backdrop-blur-xl p-0 shadow-2xl"
              >
                <motion.div
                  initial={{ x: 300, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: 300, opacity: 0 }}
                  transition={{ type: "spring", damping: 28, stiffness: 320 }}
                  className="flex h-full flex-col"
                >
                  {/* Mobile Header */}
                  <div className="flex items-center justify-between p-6 border-b border-slate-700/50">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl">
                        <Zap className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <span className="text-lg font-bold text-white">FSN Conference</span>
                        
                      </div>
                    </div>
                    
                  </div>

                  {/* Mobile Search */}
                  <div className="p-6 border-b border-slate-700/50">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                      <Input
                        type="text"
                        placeholder="Search..."
                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-600/50 bg-slate-800/80 text-slate-200 placeholder:text-slate-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/30"
                      />
                    </div>
                  </div>

                  {/* Mobile Navigation */}
                  <nav className="flex-1 overflow-y-auto p-4">
                    <ul className="space-y-2">
                      {navigationSections.map((section, i) => (
                        <motion.li
                          key={section.title}
                          initial={{ opacity: 0, x: 30 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.1, duration: 0.3 }}
                        >
                          <Button
                            variant="ghost"
                            className="w-full justify-between rounded-xl bg-slate-800/50 backdrop-blur-sm px-4 py-4 text-left font-semibold text-slate-200 transition-all duration-300 hover:bg-slate-700/50 hover:text-white border border-slate-700/30 hover:border-slate-600/50"
                            onClick={() => toggleSection(section.title, setMobileExpanded)}
                          >
                            <span className="flex items-center gap-3">
                              <div className="w-2 h-2 bg-blue-400 rounded-full" />
                              {section.title}
                            </span>
                            <motion.div
                              animate={{ rotate: mobileExpanded[section.title] ? 180 : 0 }}
                              transition={{ duration: 0.25 }}
                            >
                              <ChevronDown className="h-5 w-5" />
                            </motion.div>
                          </Button>

                          <AnimatePresence>
                            {mobileExpanded[section.title] && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                className="overflow-hidden"
                              >
                                <ul className="mt-2 space-y-1 pl-6">
                                  {section.items.map((item, j) => (
                                    <motion.li
                                      key={item.label}
                                      initial={{ opacity: 0, x: 20 }}
                                      animate={{ opacity: 1, x: 0 }}
                                      transition={{ delay: j * 0.05, duration: 0.2 }}
                                    >
                                      <Button
                                        asChild
                                        variant="ghost"
                                        className="w-full justify-start rounded-lg px-4 py-3 text-slate-300 transition-all duration-300 hover:bg-slate-700/30 hover:text-white hover:translate-x-1"
                                        onClick={(e) => {
                                          if (item.href !== "#registration") {
                                            e.preventDefault()
                                            setMobileDrawerOpen(false)
                                            setTimeout(() => smoothScroll(item.href), 100)
                                          } else {
                                            setMobileDrawerOpen(false)
                                          }
                                        }}
                                      >
                                        <a href={item.href} className="flex items-center gap-3">
                                          <div className="w-1 h-1 bg-slate-400 rounded-full" />
                                          {item.label}
                                        </a>
                                      </Button>
                                    </motion.li>
                                  ))}
                                </ul>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </motion.li>
                      ))}
                    </ul>
                  </nav>

                  {/* Mobile CTA */}
                  <div className="p-6 border-t border-slate-700/50">
                    <Button
                      asChild
                      onClick={() => setMobileDrawerOpen(false)}
                      className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      <a href="#registration">Register for Conference</a>
                    </Button>
                  </div>
                </motion.div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </animated.header>

      {/* Spacer to offset fixed header */}
      <div className="h-20" />
    </>
  )
}



export default Header
