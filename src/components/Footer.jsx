'use client'
import { usePathname } from "next/navigation";

export default function Footer() {
    const pathname = usePathname();
    const isHome = pathname === '/';

    return (
        <footer className= {`w-full bottom-0 px-6 py-4 flex flex-col
        items-start ${isHome ? 'bg-black' : 'bg-transparent'} relative z-20`}>
            <p className="text-gray-300 text-sm">FilmFlow - Todos os direitos reservados &copy;2025</p>
            <p className="text-gray-300 text-sm">Desenvolvido por <strong> Lucas Franco</strong></p>
        </footer>
    );
}