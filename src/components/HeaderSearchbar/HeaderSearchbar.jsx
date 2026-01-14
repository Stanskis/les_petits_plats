'use client';

import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";


const Searchbar = styled.div`
position: relative;
max-width: 954px;
margin: 2rem auto;
    .search-input {
        width: 100%;
        padding: 0 20px;
        padding-right: 60px;
        height: 60px;
        border-radius: 11px;
        border: none;
        background-color: var(--foreground);
        color: var(--background);
        outline: none;
    }

    .search-button {
        position: absolute;
        right: 10px;
        top: 50%;
        transform: translateY(-50%);
        height: 40px;
        width: 40px;
        border-radius: 10px;
        border: none;
        background-color: #1B1B1B;
        color: white;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        }

    .search-button:hover {
        background-color: #9ca3af;
    }
    .dropdown {
        position: absolute;
        top: 70px;
        left: 0;
        width: 100%;
        max-height: 300px;
        overflow-y: auto;
        background-color: var(--foreground);
        border-radius: 11px;
        box-shadow: 0 4px 6px rgba(0,0,0,0.2);
        z-index: 10;

        li {
        padding: 10px 20px;
        cursor: pointer;
        color: var(--background);
        }

        li:hover {
        background-color: #2a2a2a;
        }
    }
`;

export default function HeaderSearchbar({ data }) {
    const [searchTerm, setSearchTerm] = useState("");
    const ingredients = [
        ...new Set(
            data.flatMap((recipe) => recipe.ingredients.map((i) => i.ingredient.toLowerCase()))
        )
    ]

    const handleInputChange = (event) => {
        setSearchTerm(event.target.value);
    }

    const filteredIngredients = ingredients.filter((ingredient) =>
        ingredient.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <Searchbar>
            <form action="#" method="get" className="search-form" onSubmit={(e) => e.preventDefault()}>
                <input type="text"
                    id="search-input"
                    name="search"
                    placeholder="Rechercher une recette, un ingrédient, ..."
                    className="search-input"
                    value={searchTerm}
                    onChange={handleInputChange}
                />
                <button type="submit" className="search-button">
                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                </button>
            </form>
            {searchTerm && filteredIngredients.length > 0 && (
                <ul className="dropdown">
                    {filteredIngredients.map((ingredient, index) => (
                        <li key={index}>{ingredient}</li>
                    ))}
                </ul>
            )}
        </Searchbar>
    );
}