
import { useState } from "react";
import { Input } from "../ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { Paintbrush } from "lucide-react";

interface ColorPickerProps {
  color: string;
  onChange: (color: string) => void;
}

export function ColorPicker({ color, onChange }: ColorPickerProps) {
  const [currentColor, setCurrentColor] = useState(color);
  const [isOpen, setIsOpen] = useState(false);

  // Predefined colors relevant to the IT Health theme (gold, navy, pink)
  const presetColors = [
    "#FF246B", // pink
    "#133258", // navy
    "#EDB600", // gold
    "#0088cc", // blue
    "#6c5ce7", // purple
    "#00cec9", // teal
    "#e17055", // coral
    "#2ecc71", // green
    "#d63031", // red
    "#222222", // dark gray
  ];

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newColor = e.target.value;
    setCurrentColor(newColor);
    onChange(newColor);
  };

  const handlePresetClick = (presetColor: string) => {
    setCurrentColor(presetColor);
    onChange(presetColor);
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button 
          variant="outline" 
          size="sm"
          className="flex items-center gap-1 w-28"
        >
          <div 
            className="w-4 h-4 rounded-full border"
            style={{ backgroundColor: currentColor }}
          />
          <Paintbrush className="h-3 w-3" />
          <span className="ml-1">{currentColor.toUpperCase()}</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-64 p-3">
        <div className="space-y-2">
          <div>
            <label className="text-xs">Color</label>
            <div className="flex mt-1">
              <Input
                type="color"
                value={currentColor}
                onChange={handleColorChange}
                className="w-10 h-10 p-1 border rounded cursor-pointer"
              />
              <Input
                type="text"
                value={currentColor.toUpperCase()}
                onChange={(e) => {
                  const valid = /^#[0-9A-F]{6}$/i.test(e.target.value);
                  if (valid) {
                    setCurrentColor(e.target.value);
                    onChange(e.target.value);
                  }
                }}
                className="ml-2 flex-1"
              />
            </div>
          </div>
          
          <div>
            <label className="text-xs">Preset Colors</label>
            <div className="grid grid-cols-5 gap-2 mt-1">
              {presetColors.map((presetColor) => (
                <button
                  key={presetColor}
                  className="w-8 h-8 rounded-md border overflow-hidden"
                  style={{ backgroundColor: presetColor }}
                  onClick={() => handlePresetClick(presetColor)}
                  type="button"
                />
              ))}
            </div>
          </div>
          
          <div className="flex justify-end mt-3">
            <Button 
              size="sm" 
              onClick={() => setIsOpen(false)}
            >
              Apply
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
