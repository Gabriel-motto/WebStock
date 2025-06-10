import { Tabs } from "@chakra-ui/react";

export function TabComponent({ tabContent, defaultValue, dataFromChild }) {
    const handleTabsChange = (index) => {
        dataFromChild(index);
    };

    return (
        <>
            <Tabs.Root defaultValue={defaultValue} onValueChange={handleTabsChange}>
                <Tabs.List>
                    {tabContent.map((tab) => (
                        <Tabs.Trigger
                            key={tab.id}
                            value={tab.id}>
                            {tab.title}
                        </Tabs.Trigger>
                    ))}
                </Tabs.List>
            </Tabs.Root>
        </>
    );
}
