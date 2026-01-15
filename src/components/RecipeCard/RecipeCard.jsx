"use client";
import styled from "styled-components";

const CardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 21px;
  width: 380px;
  background: white;
  box-shadow: 0px 4px 34px 30px rgba(0, 0, 0, 0.04);
  overflow: hidden;
  transition: 200ms;
  
  &:hover {
    box-shadow: 0px 4px 34px 30px rgba(0, 0, 0, 0.08);
  }
`;

const CardImageWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 253px;
  overflow: hidden;
`;

const CardImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const TimeTag = styled.div`
  position: absolute;
  color: black;
  top: 21px;
  right: 21px;
  background: #FFD15B;
  border-radius: 14px;
  padding: 5px 15px;
  font-size: 12px;
  font-weight: 500;
`;

const CardContent = styled.div`
  padding: 32px 25px 61px 25px;
`;

const CardTitle = styled.h3`
  font-family: 'Anton', sans-serif;
  font-size: 18px;
  font-weight: 400;
  color: #000;
  margin: 0 0 29px 0;
`;

const SectionTitle = styled.h4`
  font-family: 'Manrope', sans-serif;
  font-size: 12px;
  font-weight: 500;
  color: #7A7A7A;
  text-transform: uppercase;
  letter-spacing: 1.08px;
  margin: 0 0 15px 0;
`;

const RecipeDescription = styled.p`
  font-family: 'Manrope', sans-serif;
  font-size: 14px;
  font-weight: 400;
  line-height: 19px;
  color: #000;
  margin: 0 0 32px 0;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
`;

const IngredientsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 21px 0;
`;

const IngredientItem = styled.div`
  display: flex;
  flex-direction: column;
`;

const IngredientName = styled.span`
  font-family: 'Manrope', sans-serif;
  font-size: 14px;
  font-weight: 500;
  color: #000;
`;

const IngredientQuantity = styled.span`
  font-family: 'Manrope', sans-serif;
  font-size: 14px;
  font-weight: 400;
  color: #7A7A7A;
  margin-top: 5px;
`;

export default function RecipeCard({
    img,
    description,
    title,
    ingredients = [],
    time
}) {
    return (
        <CardWrapper>
            <CardImageWrapper>
                <CardImage src={img} alt={`${title} image`} />
                {time && <TimeTag>{time}min</TimeTag>}
            </CardImageWrapper>

            <CardContent>
                <CardTitle>{title}</CardTitle>

                <SectionTitle>RECETTE</SectionTitle>
                <RecipeDescription>{description}</RecipeDescription>

                <SectionTitle>INGRÉDIENTS</SectionTitle>
                <IngredientsGrid>
                    {ingredients.slice(0, 6).map((ing, idx) => (
                        <IngredientItem key={idx}>
                            <IngredientName>{ing.ingredient}</IngredientName>
                            <IngredientQuantity>
                                {ing.quantity ? `${ing.quantity}${ing.unit || ''}` : '-'}
                            </IngredientQuantity>
                        </IngredientItem>
                    ))}
                </IngredientsGrid>
            </CardContent>
        </CardWrapper>
    );
}