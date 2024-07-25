import React, { useRef } from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import { List, IconButton } from 'react-native-paper';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { useTaskStore } from '@/store/task_store';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import TaskDTO from '@/dtos/task_dto';

const { width } = Dimensions.get('window');
const threshold = width * 0.1;

interface ITaskItem {
  task: TaskDTO;
  onEdit: () => void;
}

const TaskItem: React.FC<ITaskItem> = ({ task, onEdit }) => {
  const { tasks, setTasks } = useTaskStore();

  const ref = useRef<Swipeable>(null);

  const renderRightActions = () => (
    <>
      <IconButton
        icon="delete"
        onPress={() => {
          setTasks(tasks.filter(t => t.id !== task.id));
        }}
        style={styles.iconsPanel}
      />
      <IconButton
        icon="pencil"
        onPress={onEdit}
        style={styles.iconsPanel}
        onTouchEnd={() => ref.current?.close()}
      />
    </>
  );

  const renderLeftActions = () => (
    <IconButton
      icon={
        task.completed
          ? 'check-circle-outline'
          : 'checkbox-blank-circle-outline'
      }
      style={styles.iconsPanel}
      onPress={() => {
        task.completed = !task.completed;
        // Фильтруем задачи сначала текущие, потом выполненные
        const sorted = tasks.sort(
          (a, b) => Number(a.completed) - Number(b.completed),
        );

        setTasks([...sorted]);
      }}
      onTouchEnd={() => ref.current?.close()}
    />
  );

  return (
    <GestureHandlerRootView>
      <Swipeable
        renderRightActions={renderRightActions}
        renderLeftActions={renderLeftActions}
        leftThreshold={threshold}
        rightThreshold={threshold}
        overshootLeft={false}
        overshootRight={false}
        ref={ref}>
        <List.Item
          title={task.name}
          description={task.description}
          descriptionNumberOfLines={5}
          titleNumberOfLines={3}
          style={task.completed ? styles.completed : null}
        />
      </Swipeable>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  completed: {
    backgroundColor: '#d3d3d3',
    borderRadius: 10,
  },
  iconsPanel: {
    alignSelf: 'center',
  },
});

export default TaskItem;
