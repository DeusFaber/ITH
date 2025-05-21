
import React from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./tabs";
import { 
  HomeIcon, 
  SettingsIcon, 
  UsersIcon, 
  BarChartIcon, 
  FileTextIcon 
} from "lucide-react";

interface TabItem {
  value: string;
  label: string;
  icon: React.ReactNode;
  content: React.ReactNode;
}

interface TabsWithIconsProps {
  tabs: TabItem[];
  defaultValue?: string;
  className?: string;
}

export function TabsWithIcons({ tabs, defaultValue, className }: TabsWithIconsProps) {
  return (
    <Tabs defaultValue={defaultValue || tabs[0].value} className={className}>
      <TabsList className="w-full">
        {tabs.map((tab) => (
          <TabsTrigger key={tab.value} value={tab.value}>
            {tab.icon}
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>
      {tabs.map((tab) => (
        <TabsContent key={tab.value} value={tab.value}>
          {tab.content}
        </TabsContent>
      ))}
    </Tabs>
  );
}

// Usage example component
export function TabsWithIconsExample() {
  const tabs = [
    {
      value: "dashboard",
      label: "Dashboard",
      icon: <HomeIcon className="h-4 w-4" />,
      content: <div className="p-4">Dashboard content goes here</div>
    },
    {
      value: "reports",
      label: "Reports",
      icon: <BarChartIcon className="h-4 w-4" />,
      content: <div className="p-4">Reports content goes here</div>
    },
    {
      value: "documents",
      label: "Documents",
      icon: <FileTextIcon className="h-4 w-4" />,
      content: <div className="p-4">Documents content goes here</div>
    },
    {
      value: "users",
      label: "Users",
      icon: <UsersIcon className="h-4 w-4" />,
      content: <div className="p-4">Users content goes here</div>
    },
    {
      value: "settings",
      label: "Settings",
      icon: <SettingsIcon className="h-4 w-4" />,
      content: <div className="p-4">Settings content goes here</div>
    }
  ];

  return <TabsWithIcons tabs={tabs} />;
}
