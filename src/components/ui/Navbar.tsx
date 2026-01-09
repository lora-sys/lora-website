'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';

const navLinks = [
    { name: 'Hero', href: '#hero' },
    { name: 'About', href: '#about' },
    { name: 'Work', href: '#work' },
    { name: 'Skills', href: '#skills' },
    { name: 'Preferences', href: '#preferences' },
    { name: 'Contact', href: '#contact' },
];

export function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToSection = (href: string) => {
        setMobileMenuOpen(false);
        const element = document.querySelector(href);
        if (element) {
            const offset = 80; // Navbar height
            const bodyRect = document.body.getBoundingClientRect().top;
            const elementRect = element.getBoundingClientRect().top;
            const elementPosition = elementRect - bodyRect;
            const offsetPosition = elementPosition - offset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    };

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${isScrolled ? 'py-4' : 'py-6'
                }`}
        >
            <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
                {/* Logo */}
                <Link href="/">
                    <motion.button
                        className="text-2xl font-bold font-mono tracking-tighter text-white z-[110]"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        Lora<span className="text-purple-500">.</span>
                    </motion.button>
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center gap-1 glass-effect px-2 py-1.5 rounded-full border border-white/10 backdrop-blur-xl">
                    {navLinks.map((link) => (
                        <button
                            key={link.name}
                            onClick={() => scrollToSection(link.href)}
                            className="px-4 py-2 text-sm font-medium text-gray-400 hover:text-white transition-colors rounded-full hover:bg-white/5"
                        >
                            {link.name}
                        </button>
                    ))}
                </div>

                {/* Desktop CTA */}
                <div className="hidden md:block">
                    <button
                        onClick={() => scrollToSection('#contact')}
                        className="px-6 py-2 bg-white text-black text-sm font-bold rounded-full hover:bg-gray-200 transition-all"
                    >
                        Hire Me
                    </button>
                </div>

                {/* Mobile Menu Toggle */}
                <button
                    className="md:hidden z-[110] p-2 text-white"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                    {mobileMenuOpen ? <X /> : <Menu />}
                </button>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="fixed inset-0 bg-[#050505] z-[105] pt-24 px-6 md:hidden"
                    >
                        <div className="flex flex-col gap-6">
                            {navLinks.map((link) => (
                                <button
                                    key={link.name}
                                    onClick={() => scrollToSection(link.href)}
                                    className="text-4xl font-bold text-left hover:text-purple-500 transition-colors"
                                >
                                    {link.name}
                                </button>
                            ))}
                            <div className="mt-8">
                                <button
                                    onClick={() => scrollToSection('#contact')}
                                    className="w-full py-4 bg-purple-500 text-white font-bold rounded-xl"
                                >
                                    Get in Touch
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
