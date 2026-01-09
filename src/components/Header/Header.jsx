'use client';
import Link from "next/link";

export default function Header() {
    return (
        <header className="header">
            <div className="logoContainer">
                <Link href="/" className="logo">
                    Les Petits Plats
                </Link>
            </div>
            <div className="text-center">
                <h1>Découvrez nos recettes du quotidien, simples et délicieuses</h1>
            </div>
            <div className="searchbar text-center m-4">
                <input type="text" placeholder="Rechercher une recette..." />
                {/* Barre de recherche à implémenter ici */}
            </div>
        </header>
    );
} 