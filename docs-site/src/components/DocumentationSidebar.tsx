import React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Menu,
  X,
  Search,
  Play,
  Code2,
  Database,
  Gamepad2,
} from "lucide-react";

import { useContent, DocSection, DocItem } from "@/context/ContentContext";

const sectionIconMap = {
  Play,
  Code2,
  Database,
  Gamepad2,
};

interface DocumentationSidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedSection: string;
  selectedItem: string;
  filteredSections: DocSection[];
  onSectionItemClick: (sectionId: string, itemId: string) => void;
}

const DocumentationSidebar: React.FC<DocumentationSidebarProps> = ({
  sidebarOpen,
  setSidebarOpen,
  searchQuery,
  setSearchQuery,
  selectedSection,
  selectedItem,
  filteredSections,
  onSectionItemClick,
}) => {
  const renderSectionIcon = (iconName?: string) => {
    if (!iconName) return <Database className="h-5 w-5" />; // Default icon
    const IconComponent = sectionIconMap[iconName as keyof typeof sectionIconMap];
    return IconComponent ? <IconComponent className="h-5 w-5" /> : null;
  };

  return (
    <>

      <aside
        className={`${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } fixed lg:relative lg:translate-x-0 w-80 min-h-screen bg-surface border-r border-border transition-transform duration-200 ease-in-out z-30 mobile-sidebar-opaque`}
      >
        <div className="p-6">
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-foreground-tertiary" />
            <Input
              placeholder="Search documentation..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-background-secondary border-border-secondary"
            />
          </div>

          <nav className="space-y-6">
            {filteredSections.map((section) => (
              <div key={section.id}>
                <div className="flex items-center gap-2 mb-3">
                  <div className="text-foreground">{renderSectionIcon(section.icon)}</div>
                  <h3 className="font-semibold text-foreground">{section.title}</h3>
                </div>
                <div className="space-y-1 ml-7">
                  {section.items.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => onSectionItemClick(section.id, item.id)}
                      className={`w-full text-left p-2 rounded-md text-sm transition-colors ${
                        selectedSection === section.id && selectedItem === item.id
                          ? "bg-background-hover border-l-2 border-brand-primary text-foreground"
                          : "text-foreground-secondary hover:text-foreground hover:bg-background-hover"
                      }`}
                    >
                      <div className="font-medium">{item.title}</div>
                      {item.description && (
                        <div className="text-xs text-foreground-tertiary">
                          {item.description}
                        </div>
                      )}
                      <div className="flex gap-1 mt-1">
                        {item.tags && item.tags.slice(0, 2).map((tag) => (
                          <Badge
                            key={tag}
                            variant="outline"
                            className="text-xs py-0 px-1 h-4"
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </nav>
        </div>
      </aside>
    </>
  );
};

export default DocumentationSidebar;