/**
 * ICONS — small hand-drawn SVG icons used across the app
 * -------------------------------------------------------
 * Size / color / strokeWidth can be customised per use. Imported by tasks.js,
 * tabs.js, search-tab.js, task-details.js, add-task/ and completed/.
 */
import React from 'react';
import Svg, { Circle, Path, Rect } from 'react-native-svg';
import { colors } from './tasks.styles';

const svgBase = { fill: 'none', viewBox: '0 0 24 24' };
const round = { strokeLinecap: 'round', strokeLinejoin: 'round' };
const CLIPBOARD = 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2';

export function TasksIcon({ size = 22, color = colors.faint, strokeWidth = 2 }) {
  return (
    <Svg width={size} height={size} {...svgBase}>
      <Path d={CLIPBOARD} stroke={color} strokeWidth={strokeWidth} {...round} />
      <Rect x={9} y={3} width={6} height={4} rx={1} stroke={color} strokeWidth={strokeWidth} />
      <Path d="M9 12h6M9 16h4" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
    </Svg>
  );
}

export function AddTaskIcon({ size = 22, color = colors.faint, strokeWidth = 2 }) {
  return (
    <Svg width={size} height={size} {...svgBase}>
      <Circle cx={12} cy={12} r={9} stroke={color} strokeWidth={strokeWidth} />
      <Path d="M12 8v8M8 12h8" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
    </Svg>
  );
}

export function CompletedIcon({ size = 22, color = colors.faint, strokeWidth = 2 }) {
  return (
    <Svg width={size} height={size} {...svgBase}>
      <Circle cx={12} cy={12} r={9} stroke={color} strokeWidth={strokeWidth} />
      <Path d="M8 12.5l2.7 2.7L16 9.5" stroke={color} strokeWidth={strokeWidth} {...round} />
    </Svg>
  );
}

export function SearchIcon({ size = 18, color = colors.muted, strokeWidth = 2 }) {
  return (
    <Svg width={size} height={size} {...svgBase}>
      <Circle cx={11} cy={11} r={8} stroke={color} strokeWidth={strokeWidth} />
      <Path d="m21 21-4.35-4.35" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
    </Svg>
  );
}

export function BackIcon({ size = 20, color = colors.text, strokeWidth = 2 }) {
  return (
    <Svg width={size} height={size} {...svgBase}>
      <Path d="M15 18l-6-6 6-6" stroke={color} strokeWidth={strokeWidth} {...round} />
    </Svg>
  );
}

export function CheckIcon({ size = 12, color = colors.white, strokeWidth = 2.5 }) {
  return (
    <Svg width={size} height={size} {...svgBase}>
      <Path d="M20 6L9 17l-5-5" stroke={color} strokeWidth={strokeWidth} {...round} />
    </Svg>
  );
}

export function TrashIcon({ size = 18, color = colors.danger, strokeWidth = 2 }) {
  return (
    <Svg width={size} height={size} {...svgBase}>
      <Path d="M4 7h16M10 11v6M14 11v6" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
      <Path d="M6 7l1 12a2 2 0 002 2h6a2 2 0 002-2l1-12M9 7V4h6v3" stroke={color} strokeWidth={strokeWidth} {...round} />
    </Svg>
  );
}

/** Large empty-state clipboard (Tasks tab). */
export function ClipboardEmptyIcon({ size = 36, color = colors.lavender }) {
  return (
    <Svg width={size} height={size} {...svgBase}>
      <Path d={CLIPBOARD} stroke={color} strokeWidth={1.5} />
      <Path d="M9 12h6M9 16h4" stroke={color} strokeWidth={1.5} strokeLinecap="round" />
    </Svg>
  );
}

/** Large empty-state check circle (Completed tab). */
export function CheckEmptyIcon({ size = 36, color = colors.lavender }) {
  return (
    <Svg width={size} height={size} {...svgBase}>
      <Circle cx={12} cy={12} r={9} stroke={color} strokeWidth={1.5} />
      <Path d="M8 12.5l2.7 2.7L16 9.5" stroke={color} strokeWidth={1.5} {...round} />
    </Svg>
  );
}

export function CalendarIcon({ size = 20, color = colors.muted, strokeWidth = 2 }) {
  return (
    <Svg width={size} height={size} {...svgBase}>
      <Rect x={3} y={5} width={18} height={16} rx={3} stroke={color} strokeWidth={strokeWidth} />
      <Path d="M3 10h18M8 3v4M16 3v4" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
      <Circle cx={8.5} cy={14.5} r={1} fill={color} />
      <Circle cx={12} cy={14.5} r={1} fill={color} />
      <Circle cx={15.5} cy={14.5} r={1} fill={color} />
    </Svg>
  );
}

export function ChevronRightIcon({ size = 20, color = colors.text, strokeWidth = 2 }) {
  return (
    <Svg width={size} height={size} {...svgBase}>
      <Path d="M9 18l6-6-6-6" stroke={color} strokeWidth={strokeWidth} {...round} />
    </Svg>
  );
}
