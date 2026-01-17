'use client';
import { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

const Filter = styled.div`
  position: relative;
  width: 200px;
  color: black;
`;

const FilterBox = styled.div`
  position: relative;
  width: 200px;
`;

const FilterHeader = styled.button`
  width: 100%;
  height: 56px;
  background: white;
  border: none;
  padding: 0 16px;

  display: flex;
  align-items: center;
  justify-content: space-between;

  font-size: 16px;
  font-weight: 500;
  cursor: pointer;

  border-radius: ${({ $open }) =>
    $open ? "11px 11px 0 0" : "11px"};
`;

const Arrow = styled.span`
  font-size: 14px;
`;

const Dropdown = styled.div`
  position: absolute;
  left: 0;
  width: 100%;
  background: white;
  border-radius: 0 0 11px 11px;
  padding: 12px;
  z-index: 20;
`;

const SearchWrapper = styled.div`
  position: relative;
`;

const SearchInput = styled.input`
  width: 100%;
  height: 36px;
    color: gray;
  border-radius: 8px;
  border: 1px solid #cfcfcf;
  padding: 0 36px 0 10px;
  outline: none;
`;

const SearchIcon = styled.span`
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 14px;
  color: #9ca3af;
`;

const List = styled.ul`
  margin-top: 12px;
  max-height: 200px;
  overflow-y: auto;
`;

const Item = styled.li`
  padding: 8px;
  border-radius: 6px;
  cursor: pointer;

  &:hover {
    background: #ffd15b;
  }
`;

const Tags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 12px;
`;

const Tag = styled.div`
  background: #ffd15b;
  padding: 6px 10px;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 500;

  display: flex;
  align-items: center;
  gap: 6px;
`;

const Remove = styled.span`
  cursor: pointer;
  font-weight: bold;
`;

export default function IngredientFilter({ data = [], selectedIngredients = [], onIngredientsChange }) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

  const wrapperRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const ingredients = [
    ...new Set(
      (data || []).flatMap(recipe =>
        recipe.ingredients?.map(i => i.ingredient.toLowerCase()) || []
      )
    )
  ];

  const filteredIngredients = ingredients.filter(
    i =>
      i.includes(value.toLowerCase()) &&
      !selectedIngredients.includes(i)
  );

  const handleSelectIngredient = (ingredient) => {
    if (!selectedIngredients.includes(ingredient)) {
      onIngredientsChange([...selectedIngredients, ingredient]);
    }
    setValue("");
    setOpen(false);
  };

  const handleRemoveIngredient = (ingredient) => {
    onIngredientsChange(
      selectedIngredients.filter(i => i !== ingredient)
    );
  };

  const formatIngredient = (str) =>
    str.charAt(0).toUpperCase() + str.slice(1);

  return (
    <Filter ref={wrapperRef}>
      <FilterBox>
        <FilterHeader $open={open} onClick={() => setOpen(!open)}>
          <span>Ingrédients</span>
          <Arrow>
            {open ? (
              <svg width="14" height="8" viewBox="0 0 14 8" fill="none">
                <path
                  d="M0.5 6.68045L7 0.68045L13.5 6.68045"
                  stroke="#1B1B1B"
                  strokeLinecap="round"
                />
              </svg>
            ) : (
              <svg width="14" height="8" viewBox="0 0 14 8" fill="none">
                <path
                  d="M0.5 0.5L7 6.5L13.5 0.5"
                  stroke="#1B1B1B"
                  strokeLinecap="round"
                />
              </svg>
            )}
          </Arrow>
        </FilterHeader>

        {open && (
          <Dropdown>
            <SearchWrapper>
              <SearchInput
                type="text"
                value={value}
                onChange={(e) => setValue(e.target.value)}
              />
              <SearchIcon>
                <FontAwesomeIcon icon={faMagnifyingGlass} />
              </SearchIcon>
            </SearchWrapper>

            <List>
              {filteredIngredients.map((ingredient, idx) => (
                <Item
                  key={idx}
                  onClick={() => handleSelectIngredient(ingredient)}
                >
                  {formatIngredient(ingredient)}
                </Item>
              ))}
            </List>
          </Dropdown>
        )}
      </FilterBox>

      {selectedIngredients.length > 0 && (
        <Tags>
          {selectedIngredients.map((ingredient, idx) => (
            <Tag key={idx}>
              {formatIngredient(ingredient)}
              <Remove onClick={() => handleRemoveIngredient(ingredient)}>
                <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M11.0833 11.0833L6.08331 6.08334M6.08331 6.08334L1.08331 1.08334M6.08331 6.08334L11.0833 1.08334M6.08331 6.08334L1.08331 11.0833" stroke="#1B1B1B" strokeWidth="2.16667" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Remove>
            </Tag>
          ))}
        </Tags>
      )}
    </Filter>
  );
}