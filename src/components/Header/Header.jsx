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
        </header>
    );
} 