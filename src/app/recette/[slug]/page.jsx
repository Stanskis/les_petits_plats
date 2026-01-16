import { notFound } from 'next/navigation';
import recipesData from '@/data/recipes.json';
import Header from '@/components/Header/Header';
import styled from 'styled-components';
import Footer from '@/components/Footer/Footer';

const Container = styled.div`
  display: flex;
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
  gap: 60px;
  color: black;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;

  @media (max-width: 968px) {
    flex-direction: column;
    gap: 30px;
  }
`;

const ImageSection = styled.div`
  flex: 1;
  min-width: 0;
`;

const ImageWrapper = styled.div`
  width: 100%;
  aspect-ratio: 1;
  background: #d4e3e8;
  border-radius: 24px;
  overflow: hidden;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const ContentSection = styled.div`
  flex: 1;
  min-width: 0;
`;

const Title = styled.h1`
  font-size: 32px;
  font-weight: 700;
  margin: 0 0 24px 0;
  color: #000;
`;

const SectionLabel = styled.div`
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.5px;
  color: #888;
  margin-bottom: 12px;
  text-transform: uppercase;
`;

const TimeBadge = styled.div`
  display: inline-block;
  background: #ffd700;
  color: #000;
  padding: 6px 16px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 32px;
`;

const IngredientsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px 30px;
  margin-bottom: 32px;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const Ingredient = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const IngredientName = styled.div`
  font-size: 15px;
  font-weight: 500;
  color: #000;
`;

const IngredientQuantity = styled.div`
  font-size: 14px;
  color: #666;
`;

const Section = styled.div`
  margin-bottom: 32px;
`;

const ItemList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Item = styled.div`
  font-size: 15px;
  color: #000;
`;

const Description = styled.p`
  font-size: 15px;
  line-height: 1.6;
  color: #333;
  margin: 0;
`;

export default async function RecipePage({ params }) {
  const { slug } = await params;

  const recipe = recipesData.find(r => r.slug === slug);

  if (!recipe) {
    notFound();
  }

  return (
    <>
      <Header
      />
      <Container>
        <ImageSection>
          <ImageWrapper>
            <img
              src={`/images/JSON_recipes/${recipe.image}`}
              alt={recipe.name}
            />
          </ImageWrapper>
        </ImageSection>

        <ContentSection>
          <Title>{recipe.name}</Title>

          {recipe.time && (
            <>
              <SectionLabel>Temps de préparation</SectionLabel>
              <TimeBadge>{recipe.time}min</TimeBadge>
            </>
          )}

          {recipe.servings && (
            <Section>
              <SectionLabel>Portions</SectionLabel>
              <Item>{recipe.servings} {recipe.servings > 1 ? 'personnes' : 'personne'}</Item>
            </Section>
          )}

          {recipe.ingredients && recipe.ingredients.length > 0 && (
            <Section>
              <SectionLabel>Ingrédients</SectionLabel>
              <IngredientsGrid>
                {recipe.ingredients.map((ing, idx) => (
                  <Ingredient key={idx}>
                    <IngredientName>{ing.ingredient}</IngredientName>
                    <IngredientQuantity>
                      {ing.quantity
                        ? `${ing.quantity}${ing.unit ? ` ${ing.unit}` : ''}`
                        : '-'}
                    </IngredientQuantity>
                  </Ingredient>
                ))}
              </IngredientsGrid>
            </Section>
          )}

          {recipe.ustensils && recipe.ustensils.length > 0 && (
            <Section>
              <SectionLabel>Ustensiles nécessaires</SectionLabel>
              <ItemList>
                {recipe.ustensils.map((utensil, idx) => (
                  <Item key={idx}>{utensil}</Item>
                ))}
              </ItemList>
            </Section>
          )}

          {recipe.appliance && (
            <Section>
              <SectionLabel>Appareil nécessaire</SectionLabel>
              <ItemList>
                <Item>{recipe.appliance}</Item>
              </ItemList>
            </Section>
          )}

          {recipe.description && (
            <Section>
              <SectionLabel>Recette</SectionLabel>
              <Description>{recipe.description}</Description>
            </Section>
          )}
        </ContentSection>
      </Container>
      <Footer />
    </>
  );
}