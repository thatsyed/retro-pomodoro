import React from 'react';
import {
  Check,
  X,
  Plus,
  Trash2,
  Play,
  Pause,
  RotateCcw,
  Volume2,
  VolumeX,
  Volume1,
  Radio,
  AlarmClock,
  BellPlus,
  CheckSquare,
  ClipboardList,
  CloudRain,
  Disc3,
  Waves,
  Coffee,
  Cat,
  Sprout,
  CassetteTape,
  Sun,
  Gamepad2,
  Zap,
  Tv,
  Disc,
  Flame,
  Clock,
  Keyboard,
  Sliders,
  Circle
} from 'lucide-react';

const ICON_MAP = {
  Check,
  X,
  Plus,
  Trash2,
  Play,
  Pause,
  RotateCcw,
  Volume2,
  VolumeX,
  Volume1,
  Radio,
  AlarmClock,
  BellPlus,
  CheckSquare,
  ClipboardList,
  CloudRain,
  Disc3,
  Waves,
  Coffee,
  Cat,
  Sprout,
  CassetteTape,
  Sun,
  Gamepad2,
  Zap,
  Tv,
  Disc,
  Flame,
  Clock,
  Keyboard,
  Sliders,
  Circle
};

export function SvgIcon({ name, size = 16, className = '', strokeWidth = 2, ...props }) {
  const IconComponent = ICON_MAP[name] || Circle;
  return (
    <IconComponent
      size={size}
      className={`inline-block flex-shrink-0 ${className}`}
      strokeWidth={strokeWidth}
      aria-hidden="true"
      {...props}
    />
  );
}
