import { Tabs } from "@chakra-ui/react";

export function TabComponent({ tabContent, defaultValue }) {
    return (
        <>
            <Tabs.Root defaultValue={defaultValue}>
                <Tabs.List>
                    {tabContent.map((tab) => (
                        <Tabs.Trigger
                            key={tab.id}
                            value={tab.id}>
                            {tab.title}
                        </Tabs.Trigger>
                    ))}
                </Tabs.List>
                {tabContent.map((tab) => (
                    <Tabs.Content value={tab.id}>{tab.Content}</Tabs.Content>
                ))}
            </Tabs.Root>
        </>
    );
}
