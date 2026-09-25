import React, { useMemo, useState } from 'react';
import { Pressable, ScrollView, Text, TextInput, View } from 'react-native';
import { colors, PRIORITIES } from '../constants/theme';
import { useApp } from '../context/AppContext';
import { BackIcon, CloseIcon, SearchIcon } from '../components/Icons';
import TaskCard from '../components/TaskCard';
import { Chip, Screen } from '../components/ui';
import type { Priority } from '../types';
import { sortByDeadline } from '../utils/dates';
import { useSafeBack } from '../utils/useSafeBack';
import { styles } from '../styles/search.styles';

/**
 * SEARCH SCREEN (opened from the magnifying-glass icon on the Tasks tab)
 * -------------------------------------------------------------------------
 * Lets the student search assignments by title, and/or filter by subject
 * and/or priority at the same time. Results are always sorted by nearest
 * deadline first, same rule as the Tasks tab.
 */
export default function SearchScreen() {
  const goBack = useSafeBack();
  const { assignments, subjects } = useApp();
  const [query, setQuery] = useState('');
  const [activeSubject, setActiveSubject] = useState<string | null>(null);
  const [activePriority, setActivePriority] = useState<Priority | null>(null);

  const subjectCodes = useMemo(() => [...new Set(subjects.map(s => s.code))], [subjects]);
  const hasFilters = activeSubject !== null || activePriority !== null;
  const q = query.trim();

  const results = useMemo(() => {
    const needle = q.toLowerCase();
    const list = assignments.filter(a => {
      if (activeSubject) {
        const subj = subjects.find(s => s.id === a.subjectId);
        if (subj?.code !== activeSubject) return false;
      }
      if (activePriority && a.priority !== activePriority) return false;
      if (needle) return a.title.toLowerCase().includes(needle);
      return true;
    });
    return sortByDeadline(list);
  }, [assignments, subjects, q, activeSubject, activePriority]);

  const clearAll = () => {
    setQuery('');
    setActiveSubject(null);
    setActivePriority(null);
  };

  return (
    <Screen>
      <View style={styles.header}>
        <Pressable onPress={goBack} hitSlop={8} accessibilityRole="button" accessibilityLabel="Back">
          <BackIcon />
        </Pressable>
        <Text style={styles.headerTitle}>Search</Text>
        {hasFilters ? (
          <Pressable onPress={clearAll} hitSlop={8} accessibilityRole="button">
            <Text style={styles.clearText}>Clear</Text>
          </Pressable>
        ) : (
          <View style={{ width: 44 }} />
        )}
      </View>

      <View style={styles.searchBox}>
        <SearchIcon size={16} color={colors.faint} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search assignments..."
          placeholderTextColor={colors.faint}
          value={query}
          onChangeText={setQuery}
          autoFocus
          returnKeyType="search"
        />
        {query.length > 0 && (
          <Pressable
            onPress={() => setQuery('')}
            hitSlop={8}
            accessibilityRole="button"
            accessibilityLabel="Clear search"
          >
            <CloseIcon />
          </Pressable>
        )}
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.filterScroll}
        contentContainerStyle={styles.filterContent}
        keyboardShouldPersistTaps="handled"
      >
        {subjectCodes.map(code => (
          <Chip
            key={code}
            label={code}
            active={activeSubject === code}
            onPress={() => setActiveSubject(activeSubject === code ? null : code)}
          />
        ))}
        {PRIORITIES.map(p => (
          <Chip
            key={p}
            label={`${p} priority`}
            active={activePriority === p}
            onPress={() => setActivePriority(activePriority === p ? null : p)}
          />
        ))}
      </ScrollView>

      <ScrollView
        style={{ flex: 1 }}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {q || hasFilters ? (
          <>
            <View style={styles.resultsHeader}>
              <Text style={styles.resultsCount}>
                {results.length} result{results.length !== 1 ? 's' : ''}
              </Text>
              {q ? <Text style={styles.resultsFor}>for "{q}"</Text> : null}
            </View>

            {results.length === 0 ? (
              <View style={styles.noResults}>
                <Text style={styles.noResultsText}>No assignments found.</Text>
              </View>
            ) : (
              results.map(a => <TaskCard key={a.id} assignment={a} />)
            )}
          </>
        ) : (
          <View style={styles.promptState}>
            <Text style={styles.promptText}>Type to search assignments, or tap a filter above.</Text>
          </View>
        )}
        <View style={{ height: 32 }} />
      </ScrollView>
    </Screen>
  );
}
