import { Anchor, Title } from '@mantine/core';
import { Recipe } from '@prisma/client';
import { GetStaticProps } from 'next';
import { prisma } from '../lib/prisma';

export const getStaticProps: GetStaticProps = async () => {
  const recipes = await prisma.recipe.findMany();
  return {
    props: {
      recipes: JSON.parse(JSON.stringify(recipes)),
    },
    revalidate: 10,
  };
};
interface Props {
  recipes: Recipe[];
}
export default function HomePage({ recipes }: Props) {
  const renderRecipes = () => recipes.map((recipe) =>
    <Anchor href={`/recipes/${recipe.id}`}>
      <Title>{recipe.name}</Title>
    </Anchor>);
  return (
    <>
      {renderRecipes()}
    </>
  );
}
