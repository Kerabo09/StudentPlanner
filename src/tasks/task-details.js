import React from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { BackIcon } from './icon';
import { PriorityBadge, Screen, confirmDelete, useApp, useSafeBack } from './tasks';
import { detailsStyles } from './tasks.styles';

export function TaskDetailsScreen() {
  const { taskId } = useLocalSearchParams();
  const router = useRouter();
  const goBack = useSafeBack();
  const { tasks, deleteTask } = useApp();

  const a = tasks.find(x => x.id === taskId);

  if (!a) {
    return (
      <Screen>
        <Pressable onPress={goBack} style={detailsStyles.notFoundBack} accessibilityRole="button" accessibilityLabel="Back">
          <BackIcon />
        </Pressable>
        <Text style={detailsStyles.notFound}>Task not found.</Text>
      </Screen>
    );
  }

  const handleDelete = () =>
    confirmDelete('Delete Task', `Delete "${a.title}"?`, 'Delete', () => {
      goBack();
      deleteTask(a.id);
    });

  return (
    <Screen>
      <View style={detailsStyles.topBar}>
        <Pressable onPress={goBack} style={detailsStyles.backBtn} accessibilityRole="button" accessibilityLabel="Back">
          <BackIcon />
        </Pressable>
        <Text style={detailsStyles.topBarTitle}>Task</Text>
        <Pressable
          onPress={() => router.push(`/task/edit/${a.id}`)}
          hitSlop={8}
          accessibilityRole="button"
        >
          <Text style={detailsStyles.editText}>Edit</Text>
        </Pressable>
      </View>

      <ScrollView style={detailsStyles.scroll} showsVerticalScrollIndicator={false}>
        <View style={detailsStyles.hero}>
          <View style={detailsStyles.heroMeta}>
            {a.subject ? (
              <View style={detailsStyles.subjBadge}>
                <Text style={detailsStyles.subjBadgeText}>Subject: {a.subject}</Text>
              </View>
            ) : null}
            <PriorityBadge priority={a.priority} label={`${a.priority} priority`} />
          </View>
          <Text style={detailsStyles.heroTitle}>{a.title}</Text>
          {a.dueDate ? <Text style={detailsStyles.heroSub}>Due {a.dueDate}</Text> : null}
        </View>

        {a.notes ? (
          <View style={detailsStyles.card}>
            <Text style={detailsStyles.cardTitle}>Notes</Text>
            <Text style={detailsStyles.notesText}>{a.notes}</Text>
          </View>
        ) : null}

        <Pressable style={detailsStyles.deleteBtn} onPress={handleDelete} accessibilityRole="button">
          <Text style={detailsStyles.deleteBtnText}>Delete task</Text>
        </Pressable>

        <View style={detailsStyles.bottomSpacer} />
      </ScrollView>
    </Screen>
  );
}
