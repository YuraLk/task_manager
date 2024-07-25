import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button, Portal, Modal } from 'react-native-paper';

import { useTaskStore } from '@/store/task_store';
import TaskDTO from '@/dtos/task_dto';

interface ITaskModal {
  visible: boolean;
  setModalVisible: (bool: boolean) => void;
  task: TaskDTO | null;
}

const TaskModal: React.FC<ITaskModal> = ({
  visible,
  setModalVisible,
  task,
}) => {
  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');

  const { tasks, setTasks } = useTaskStore();

  useEffect(() => {
    if (visible && task) {
      setName(task.name);
      setDescription(task.description);
    }
  }, [visible, task]);

  const handleAction = (): void => {
    if (!name) {
      return;
    }

    if (task) {
      task.name = name;
      task.description = description;

      setTasks([...tasks]);
    } else {
      const arr = [
        ...tasks,
        new TaskDTO({
          id: Date.now(),
          name,
          description,
          completed: false,
        }),
      ];
      const sorted = arr.sort(
        (a, b) => Number(a.completed) - Number(b.completed),
      );

      setTasks(sorted);
    }

    setDescription('');
    setName('');
    setModalVisible(false);
  };

  const onDismiss = (): void => {
    setDescription('');
    setName('');
    setModalVisible(false);
  };

  return (
    <Portal>
      <Modal visible={visible}>
        <View style={styles.container}>
          <TextInput
            label="Название"
            value={name}
            numberOfLines={3}
            multiline
            onChangeText={setName}
            style={styles.input}
          />
          <TextInput
            label="Описание"
            value={description}
            numberOfLines={10}
            scrollEnabled
            multiline
            onChangeText={setDescription}
            style={styles.input}
          />
          <View style={styles.buttonPanel}>
            <Button
              mode="text"
              style={styles.buttonLabel}
              onPress={handleAction}
              contentStyle={styles.contentButton}>
              {'Добавить'}
            </Button>
            <Button
              mode="text"
              style={styles.buttonLabel}
              labelStyle={{ color: 'red' }}
              onPress={onDismiss}
              contentStyle={styles.contentButton}>
              {'Закрыть'}
            </Button>
          </View>
        </View>
      </Modal>
    </Portal>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: '3%',
    backgroundColor: 'white',
    width: '85%',
    alignSelf: 'center',
    borderRadius: 20,
  },
  input: {
    margin: '3%',
    backgroundColor: 'white',
  },
  contentButton: {
    marginVertical: '5%',
  },
  buttonPanel: {
    flexDirection: 'row',
  },
  buttonLabel: {
    flex: 1,
    alignSelf: 'center',
  },
});

export default TaskModal;
