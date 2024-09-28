import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Settings } from 'lucide-react'

export function ConfigMenuModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [config, setConfig] = useState({
    darkMode: false,
    notificationsEnabled: true,
    searchRadius: 25,
    preferredUnit: 'miles'
  });

  const handleConfigChange = (key: string, value: any) => {
    setConfig(prevConfig => ({ ...prevConfig, [key]: value }));
    // Here you would typically save the config to local storage or send it to a backend
    console.log('Config updated:', { ...config, [key]: value });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <Settings className="h-[1.2rem] w-[1.2rem]" />
          <span className="sr-only">Open configuration</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Configuration</DialogTitle>
          <DialogDescription>
            Adjust your FarmFinder settings here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="dark-mode" className="flex flex-col">
              <span>Dark Mode</span>
              <span className="font-normal text-sm text-gray-500">Enable dark mode for the app</span>
            </Label>
            <Switch
              id="dark-mode"
              checked={config.darkMode}
              onCheckedChange={(checked) => handleConfigChange('darkMode', checked)}
            />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="notifications" className="flex flex-col">
              <span>Notifications</span>
              <span className="font-normal text-sm text-gray-500">Receive updates from favorite farms</span>
            </Label>
            <Switch
              id="notifications"
              checked={config.notificationsEnabled}
              onCheckedChange={(checked) => handleConfigChange('notificationsEnabled', checked)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="search-radius">Search Radius ({config.searchRadius} {config.preferredUnit})</Label>
            <Slider
              id="search-radius"
              min={5}
              max={100}
              step={5}
              value={[config.searchRadius]}
              onValueChange={([value]) => handleConfigChange('searchRadius', value)}
            />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="preferred-unit">Preferred Unit</Label>
            <Select
              value={config.preferredUnit}
              onValueChange={(value) => handleConfigChange('preferredUnit', value)}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select unit" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="miles">Miles</SelectItem>
                <SelectItem value="kilometers">Kilometers</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <Button onClick={() => setIsOpen(false)}>Save changes</Button>
      </DialogContent>
    </Dialog>
  );
}