import {
  Laptop, Monitor, Shield, Cog, Printer, ScanLine, Server, Network,
  Camera, Cable, Box, HardDrive, BatteryCharging, Projector, Tv,
  AppWindow, Video, LayoutGrid, Construction, Speaker, Wifi, LucideIcon, Package
} from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  Laptop, Monitor, Shield, Cog, Printer, ScanLine, Server, Network,
  Camera, Cable, Box, HardDrive, BatteryCharging, Projector, Tv,
  AppWindow, Video, LayoutGrid, Construction, Speaker, Wifi, Package,
};

export const getIcon = (name: string): LucideIcon => iconMap[name] || Package;

export const iconOptions = Object.keys(iconMap);
