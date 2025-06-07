
import Link from "next/link";

export default function GeneroButton({ genero, tipo }) {
    return (
        <Link href={`/categoria/${tipo}/${genero.id}`}
        className="bg-red-600 text-white font-semibold px-3 py-1 rounded-full text-sm hover:bg-red-700 transition">
            {genero.name}
        </Link>
    );
}