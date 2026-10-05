/**
 * CALENDAR — deadline field with a calendar picker
 * --------------------------------------------------
 * <DeadlineField> = the label + a "YYYY-MM-DD" text box + a calendar icon button.
 * Tap the icon to open a month calendar, tap a day and the date is filled in
 * (you can still type the date by hand). Used by add-task.js and edit-task.js.
 * Styles: add-task.styles.js (calendarStyles, formStyles). Icons: tasks/icon.js.
 */
import React, { useState } from 'react';
import { Keyboard, Pressable, Text, TextInput, View } from 'react-native';
import { BackIcon, CalendarIcon, ChevronRightIcon } from '@/tasks/icon';
import { colors } from '@/tasks/tasks.styles';
import { calendarStyles, formStyles } from './add-task.styles';

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];
const WEEKDAYS = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

const pad = n => String(n).padStart(2, '0');
const toText = (year, month, day) => `${year}-${pad(month + 1)}-${pad(day)}`;

/** "2026-10-5" -> { year: 2026, month: 9, day: 5 } (month is 0-11). null when not a real date. */
function parseDate(text) {
  const m = (text ?? '').trim().match(/^(\d{4})-(\d{1,2})-(\d{1,2})$/);
  if (!m) return null;
  const year = Number(m[1]);
  const month = Number(m[2]) - 1;
  const day = Number(m[3]);
  const d = new Date(year, month, day);
  const real = d.getFullYear() === year && d.getMonth() === month && d.getDate() === day;
  return real ? { year, month, day } : null;
}

/** The month grid. Mounted only while open, so it always starts on the selected (or current) month. */
function MonthCalendar({ value, onPick }) {
  const selected = parseDate(value);
  const now = new Date();
  const today = { year: now.getFullYear(), month: now.getMonth(), day: now.getDate() };

  const [view, setView] = useState({
    year: (selected ?? today).year,
    month: (selected ?? today).month,
  });

  const moveMonth = step =>
    setView(v => {
      const d = new Date(v.year, v.month + step, 1);
      return { year: d.getFullYear(), month: d.getMonth() };
    });

  const firstWeekday = new Date(view.year, view.month, 1).getDay();
  const daysInMonth = new Date(view.year, view.month + 1, 0).getDate();
  const cells = [
    ...Array.from({ length: firstWeekday }, () => null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];

  const isSame = (a, day) => a && a.year === view.year && a.month === view.month && a.day === day;

  return (
    <View style={calendarStyles.panel}>
      <View style={calendarStyles.monthRow}>
        <Pressable
          onPress={() => moveMonth(-1)}
          style={calendarStyles.navBtn}
          accessibilityRole="button"
          accessibilityLabel="Previous month"
        >
          <BackIcon />
        </Pressable>
        <Text style={calendarStyles.monthTitle}>
          {MONTH_NAMES[view.month]} {view.year}
        </Text>
        <Pressable
          onPress={() => moveMonth(1)}
          style={calendarStyles.navBtn}
          accessibilityRole="button"
          accessibilityLabel="Next month"
        >
          <ChevronRightIcon />
        </Pressable>
      </View>

      <View style={calendarStyles.weekRow}>
        {WEEKDAYS.map((w, i) => (
          <Text key={i} style={calendarStyles.weekday}>
            {w}
          </Text>
        ))}
      </View>

      <View style={calendarStyles.grid}>
        {cells.map((day, i) => {
          if (day === null) return <View key={`blank-${i}`} style={calendarStyles.cell} />;
          const isSelected = isSame(selected, day);
          const isToday = isSame(today, day);
          return (
            <Pressable
              key={day}
              style={calendarStyles.cell}
              onPress={() => onPick(toText(view.year, view.month, day))}
              accessibilityRole="button"
              accessibilityLabel={`${MONTH_NAMES[view.month]} ${day}, ${view.year}`}
              accessibilityState={{ selected: isSelected }}
            >
              <View
                style={[
                  calendarStyles.dayCircle,
                  isToday && calendarStyles.dayToday,
                  isSelected && calendarStyles.daySelected,
                ]}
              >
                <Text
                  style={[
                    calendarStyles.dayText,
                    isToday && calendarStyles.dayTextToday,
                    isSelected && calendarStyles.dayTextSelected,
                  ]}
                >
                  {day}
                </Text>
              </View>
            </Pressable>
          );
        })}
      </View>

      <View style={calendarStyles.footer}>
        <Pressable onPress={() => onPick(toText(today.year, today.month, today.day))} hitSlop={8} accessibilityRole="button">
          <Text style={calendarStyles.footerText}>Today</Text>
        </Pressable>
        {value ? (
          <Pressable onPress={() => onPick('')} hitSlop={8} accessibilityRole="button">
            <Text style={calendarStyles.footerText}>Clear</Text>
          </Pressable>
        ) : null}
      </View>
    </View>
  );
}

/**
 * Props: label ("Deadline *"), value (the text, "YYYY-MM-DD"), onChange(text),
 *        error (red message under the field, '' for none).
 */
export function DeadlineField({ label = 'Deadline', value, onChange, error = '' }) {
  const [open, setOpen] = useState(false);

  const toggle = () => {
    Keyboard.dismiss();
    setOpen(o => !o);
  };

  return (
    <View>
      <Text style={formStyles.label}>{label}</Text>
      <View style={calendarStyles.inputRow}>
        <TextInput
          style={[formStyles.input, calendarStyles.inputFlex, !!error && formStyles.inputError]}
          placeholder="YYYY-MM-DD"
          placeholderTextColor={colors.faint}
          value={value}
          onChangeText={onChange}
          autoCapitalize="none"
          autoCorrect={false}
          maxLength={10}
          keyboardType="numbers-and-punctuation"
          accessibilityLabel="Deadline"
        />
        <Pressable
          onPress={toggle}
          style={[calendarStyles.iconBtn, open && calendarStyles.iconBtnActive]}
          accessibilityRole="button"
          accessibilityLabel="Open calendar"
          accessibilityState={{ expanded: open }}
        >
          <CalendarIcon color={open ? colors.primary : colors.muted} />
        </Pressable>
      </View>
      {error ? <Text style={formStyles.errorText}>{error}</Text> : null}

      {open ? (
        <MonthCalendar
          value={value}
          onPick={text => {
            onChange(text);
            setOpen(false);
          }}
        />
      ) : null}
    </View>
  );
}
