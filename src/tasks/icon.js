import React from 'react';
import Svg, { Circle, Path, Rect } from 'react-native-svg';

const base = { fill: 'none', viewBox: '0 0 24 24' };
const round = { strokeLinecap: 'round', strokeLinejoin: 'round' };

export function TasksIcon({ size = 22, color = '#9CA3AF', strokeWidth = 2 }) {
  return (
    <Svg width={size} height={size} {...base}>
      <Path
        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2"
        stroke={color}
        strokeWidth={strokeWidth}
        {...round}
      />
      <Rect x={9} y={3} width={6} height={4} rx={1} stroke={color} strokeWidth={strokeWidth} />
      <Path d="M9 12h6M9 16h4" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
    </Svg>
  );
}

export function PlusIcon({ size = 16, color = '#4F46E5', strokeWidth = 2 }) {
  return (
    <Svg width={size} height={size} {...base}>
      <Path d="M12 5v14M5 12h14" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
    </Svg>
  );
}

export function SearchIcon({ size = 18, color = '#6B7280', strokeWidth = 2 }) {
  return (
    <Svg width={size} height={size} {...base}>
      <Circle cx={11} cy={11} r={8} stroke={color} strokeWidth={strokeWidth} />
      <Path d="m21 21-4.35-4.35" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
    </Svg>
  );
}

export function BackIcon({ size = 20, color = '#111827', strokeWidth = 2 }) {
  return (
    <Svg width={size} height={size} {...base}>
      <Path d="M15 18l-6-6 6-6" stroke={color} strokeWidth={strokeWidth} {...round} />
    </Svg>
  );
}

export function ChevronRightIcon({ size = 16, color = '#9CA3AF', strokeWidth = 2 }) {
  return (
    <Svg width={size} height={size} {...base}>
      <Path d="M9 18l6-6-6-6" stroke={color} strokeWidth={strokeWidth} {...round} />
    </Svg>
  );
}

export function CheckIcon({ size = 12, color = '#FFFFFF', strokeWidth = 2.5 }) {
  return (
    <Svg width={size} height={size} {...base}>
      <Path d="M20 6L9 17l-5-5" stroke={color} strokeWidth={strokeWidth} {...round} />
    </Svg>
  );
}

export function CloseIcon({ size = 14, color = '#6B7280', strokeWidth = 2 }) {
  return (
    <Svg width={size} height={size} {...base}>
      <Path d="M18 6L6 18M6 6l12 12" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
    </Svg>
  );
}

export function MoreIcon({ size = 20, color = '#111827' }) {
  return (
    <Svg width={size} height={size} {...base}>
      <Circle cx={12} cy={5} r={1.5} fill={color} />
      <Circle cx={12} cy={12} r={1.5} fill={color} />
      <Circle cx={12} cy={19} r={1.5} fill={color} />
    </Svg>
  );
}

export function ClipboardEmptyIcon({ size = 36, color = '#C4B5FD' }) {
  return (
    <Svg width={size} height={size} {...base}>
      <Path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2" stroke={color} strokeWidth={1.5} />
      <Path d="M9 12h6M9 16h4" stroke={color} strokeWidth={1.5} strokeLinecap="round" />
    </Svg>
  );
}

export function AddTaskIcon({ size = 22, color = '#9CA3AF', strokeWidth = 2 }) {
  return (
    <Svg width={size} height={size} {...base}>
      <Circle cx={12} cy={12} r={9} stroke={color} strokeWidth={strokeWidth} />
      <Path d="M12 8v8M8 12h8" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
    </Svg>
  );
}

export function CompletedIcon({ size = 22, color = '#9CA3AF', strokeWidth = 2 }) {
  return (
    <Svg width={size} height={size} {...base}>
      <Circle cx={12} cy={12} r={9} stroke={color} strokeWidth={strokeWidth} />
      <Path d="M8 12.5l2.7 2.7L16 9.5" stroke={color} strokeWidth={strokeWidth} {...round} />
    </Svg>
  );
}

export function TrashIcon({ size = 18, color = '#EF4444', strokeWidth = 2 }) {
  return (
    <Svg width={size} height={size} {...base}>
      <Path d="M4 7h16M10 11v6M14 11v6" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
      <Path d="M6 7l1 12a2 2 0 002 2h6a2 2 0 002-2l1-12M9 7V4h6v3" stroke={color} strokeWidth={strokeWidth} {...round} />
    </Svg>
  );
}

export function CheckEmptyIcon({ size = 36, color = '#C4B5FD' }) {
  return (
    <Svg width={size} height={size} {...base}>
      <Circle cx={12} cy={12} r={9} stroke={color} strokeWidth={1.5} />
      <Path d="M8 12.5l2.7 2.7L16 9.5" stroke={color} strokeWidth={1.5} {...round} />
    </Svg>
  );
}

export function CalendarIcon({ size = 20, color = '#6B7280', strokeWidth = 2 }) {
  return (
    <Svg width={size} height={size} {...base}>
      <Rect x={3} y={5} width={18} height={16} rx={2} stroke={color} strokeWidth={strokeWidth} />
      <Path d="M16 3v4M8 3v4M3 10h18" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
    </Svg>
  );
}
