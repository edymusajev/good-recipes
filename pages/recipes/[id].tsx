import { Text, Title } from '@mantine/core';
import { Recipe } from '@prisma/client';
import { GetStaticProps } from 'next';
import { prisma } from '../../lib/prisma';

export const getStaticPaths = async () => {
    const recipes = await prisma.recipe.findMany();
    return {
        paths: recipes.map(recipe => ({ params: { id: recipe.id } })),
        fallback: false,
    };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const recipe = typeof params?.id === 'string' && await prisma.recipe.findUnique({
        where: {
            id: params?.id,
        },
    });
    return {
        props: {
            recipe: JSON.parse(JSON.stringify(recipe)),
        },
        revalidate: 10,
    };
};
interface Props {
    recipe: Recipe
}
export default function RecipePage({ recipe }: Props) {
    return (
        <div>
            <Title>
                {recipe.name}
            </Title>
            <Title order={2}>Instructions:</Title>
            <Text>
                {recipe.description}
            </Text>
        </div>
    );
}
