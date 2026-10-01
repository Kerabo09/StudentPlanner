/**
 * ICONS
 * ------
 * Small, hand-drawn SVG icons used across the app (tab bar, buttons, headers, etc.).
 * Each icon is just a function component so its size/color/strokeWidth can be
 * customized per screen without needing an icon font or extra image assets.
 */
import React from 'react';
import type { ColorValue } from 'react-native';
import Svg, { Circle, Path, Rect } from 'react-native-svg';

interface IconProps {
  size?: number;
  color?: ColorValue;
  strokeWidth?: number;
}

const base = { fill: 'none' as const, viewBox: '0 0 24 24' };
const round = { strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const };

export function TasksIcon({ size = 22, color = '#9CA3AF', strokeWidth = 2 }: IconProps) {
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

export function SubjectsIcon({ size = 22, color = '#9CA3AF', strokeWidth = 2 }: IconProps) {
  return (
    <Svg width={size} height={size} {...base}>
      <Path
        d="M3 3h7v7H3zM14 3h7v7h-7zM3 14h7v7H3zM14 14h7v7h-7z"
        stroke={color}
        strokeWidth={strokeWidth}
        {...round}
      />
    </Svg>
  );
}

export function PlusIcon({ size = 16, color = '#4F46E5', strokeWidth = 2 }: IconProps) {
  return (
    <Svg width={size} height={size} {...base}>
      <Path d="M12 5v14M5 12h14" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
    </Svg>
  );
}

export function SearchIcon({ size = 18, color = '#6B7280', strokeWidth = 2 }: IconProps) {
  return (
    <Svg width={size} height={size} {...base}>
      <Circle cx={11} cy={11} r={8} stroke={color} strokeWidth={strokeWidth} />
      <Path d="m21 21-4.35-4.35" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
    </Svg>
  );
}

export function BackIcon({ size = 20, color = '#111827', strokeWidth = 2 }: IconProps) {
  return (
    <Svg width={size} height={size} {...base}>
      <Path d="M15 18l-6-6 6-6" stroke={color} strokeWidth={strokeWidth} {...round} />
    </Svg>
  );
}

export function ChevronRightIcon({ size = 16, color = '#9CA3AF', strokeWidth = 2 }: IconProps) {
  return (
    <Svg width={size} height={size} {...base}>
      <Path d="M9 18l6-6-6-6" stroke={color} strokeWidth={strokeWidth} {...round} />
    </Svg>
  );
}

export function CheckIcon({ size = 12, color = '#FFFFFF', strokeWidth = 2.5 }: IconProps) {
  return (
    <Svg width={size} height={size} {...base}>
      <Path d="M20 6L9 17l-5-5" stroke={color} strokeWidth={strokeWidth} {...round} />
    </Svg>
  );
}

export function CloseIcon({ size = 14, color = '#6B7280', strokeWidth = 2 }: IconProps) {
  return (
    <Svg width={size} height={size} {...base}>
      <Path d="M18 6L6 18M6 6l12 12" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
    </Svg>
  );
}

export function MoreIcon({ size = 20, color = '#111827' }: IconProps) {
  return (
    <Svg width={size} height={size} {...base}>
      <Circle cx={12} cy={5} r={1.5} fill={color} />
      <Circle cx={12} cy={12} r={1.5} fill={color} />
      <Circle cx={12} cy={19} r={1.5} fill={color} />
    </Svg>
  );
}

export function PaperclipIcon({ size = 16, color = '#6B7280', strokeWidth = 2 }: IconProps) {
  return (
    <Svg width={size} height={size} {...base}>
      <Path
        d="M21.44 11.05l-9.19 9.19a6 6 0 01-8.49-8.49l9.19-9.19a4 4 0 015.66 5.66l-9.2 9.19a2 2 0 01-2.83-2.83l8.49-8.48"
        stroke={color}
        strokeWidth={strokeWidth}
        {...round}
      />
    </Svg>
  );
}

/** Large empty-state clipboard (Tasks). */
export function ClipboardEmptyIcon({ size = 36, color = '#C4B5FD' }: IconProps) {
  return (
    <Svg width={size} height={size} {...base}>
      <Path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2" stroke={color} strokeWidth={1.5} />
      <Path d="M9 12h6M9 16h4" stroke={color} strokeWidth={1.5} strokeLinecap="round" />
    </Svg>
  );
}

/** Large empty-state book (Subjects). */
export function BookEmptyIcon({ size = 36, color = '#C4B5FD' }: IconProps) {
  return (
    <Svg width={size} height={size} {...base}>
      <Path d="M4 19.5A2.5 2.5 0 016.5 17H20" stroke={color} strokeWidth={1.5} {...round} />
      <Path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" stroke={color} strokeWidth={1.5} {...round} />
    </Svg>
  );
}
