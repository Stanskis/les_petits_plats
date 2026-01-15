'use client';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";

const Searchbar = styled.div`
  position: relative;
  max-width: 954px;
  margin: 2rem auto;
  color: gray;

.input-wrapper {
  display: flex;
  align-items: center;
  padding: 5px 10px;
  border-radius: 11px;
  background-color: var(--foreground);
  min-height: 60px;
  width: 100%;
  position: relative;
}

.search-input {
  flex: 1;            
  min-width: 0;
  border: none;
  outline: none;
  box-shadow: none;
  background: transparent;
  color: gray;
  font-size: 16px;
  padding: 5px;
}

  .remove {
    margin-left: 10px;
    cursor: pointer;
    font-weight: bold;
    font-size: 20px;
    position: absolute;
    right: 60px;
    top: 50%;
    transform: translateY(-50%);
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
    background-color: #1b1b1b;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }

  .search-button:hover {
    background-color: #9ca3af;
  }
`;

export default function HeaderSearchbar({ searchTerm, setSearchTerm, onSearch }) {
  const handleClear = () => setSearchTerm("");

  return (
    <Searchbar>
      <form onSubmit={(e) => { e.preventDefault(); onSearch(); }} className="search-form">
        <div className="input-wrapper">
          <input
            type="text"
            placeholder="Rechercher une recette, un ingrédient..."
            className="search-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <span className="remove" onClick={handleClear}>
              ×
            </span>
          )}
        </div>
        <button
          type="button"
          className="search-button"
          onClick={onSearch}
        >
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </button>
      </form>
    </Searchbar>
  );
}
