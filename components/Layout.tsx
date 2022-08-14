import { Anchor, AppShell, Header } from '@mantine/core';
import { NextLink } from '@mantine/next';

interface Props {
    children: React.ReactNode;
}
export default function Layout({ children }: Props) {
    return (
        <AppShell header={
            <Header height={60}>
                <Anchor component={NextLink} href="/">Recipes</Anchor>

            </Header>
        }
        >{children}
        </AppShell>
    );
}
