//Header da página
'use client';
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

export default function Header() {
    const pathname = usePathname();
    const isHome = pathname === '/';
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const onScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, []);


    const toggleMenu = () => {
        setMenuOpen((prev) => !prev);
    };

    const closeMenu = () => setMenuOpen(false);


    return (
        <>
                  <header className={`fixed w-full top-0 left-0 z-50 px-6 py-4 flex items-center justify-between transition-all duration-300 ${scrolled ? 'bg-black/80 text-white shadow-md backdrop-blur-md' : 'bg-transparent text-white'}`}>
            
            <Link href={'/'} className="text-2xl fonte-bold" onClick={closeMenu}>
                FilmFlow
            </Link>

            {/*Desktop menu */}
            <nav className="hidden md:flex space-x-6">
                <Link href={"/"} className="bg-red-600 text-white rounded hover:bg-red-700 transition py-2 px-4">Início</Link>
                <Link href={"/search"} className="bg-red-600 text-white rounded hover:bg-red-700 transition py-2 px-4">Buscar</Link>
                <Link href={"/movies"} className="bg-red-600 text-white rounded hover:bg-red-700 transition py-2 px-4">Filmes</Link>
                <Link href={"/tv"} className="bg-red-600 text-white rounded hover:bg-red-700 transition py-2 px-4">Séries</Link>
            </nav>

            {/* Mobile menu button */}
            <button
                className="md:hidden text-white z-[60]"
                onClick={toggleMenu}
                aria-label="Abrir menu"
            >
             {menuOpen ? <X size={28} /> : <Menu size={28} />}   
            </button>    

        </header>

        {/*Overlay escuro ao fundo quando menu está aberto */}
        <div className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity duration-300 ${menuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'} md:hidden`}
        onClick={closeMenu} />

        {/* Drawer manu lateral direito */}
        <div className={`fixed top-0 right-0 h-full w-64 bg-black text-white z-50 p-6 transition-transform duration-300 md:hidden ${menuOpen ? 'translate-x-0' : 'translate-x-full'}`}>

            <button className="absolute top-4 right-4 text-white"
                onClick={closeMenu}
                aria-label="Fechar menu"
            >
                <X size={28} />
            </button>    


            <nav className="flex flex-col space-y-4 mt-16 text-lg font-medium">
                <Link href={"/"} onClick={closeMenu}>Início</Link>
                <Link href={"/search"} onClick={closeMenu}>Buscar</Link>
                <Link href={"/movies"} onClick={closeMenu}>Filmes</Link>
                <Link href={"/tv"} onClick={closeMenu}>Séries</Link>
            </nav>
        </div>





        </>

       

    );
}