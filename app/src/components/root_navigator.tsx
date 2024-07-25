import React, { useState } from 'react';
import { FlatList } from 'react-native';

import TaskItem from './items/task_item';
import TaskModal from './modals/task_modal';
import AddButton from './buttons/add_button';

import TaskDTO from '@/dtos/task_dto';
import { useTaskStore } from '@/store/task_store';

const RootNavigator: React.FC = () => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [selected, setSelected] = useState<TaskDTO | null>(null);

  const { tasks } = useTaskStore();

  const handleOpenModal = (todo: typeof selected): void => {
    setSelected(todo);
    setModalVisible(true);
  };

  return (
    <>
      <FlatList
        data={tasks}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <TaskItem task={item} onEdit={() => handleOpenModal(item)} />
        )}
      />
      <TaskModal
        visible={modalVisible}
        setModalVisible={setModalVisible}
        task={selected}
      />
      <AddButton onPress={() => handleOpenModal(null)} />
    </>
  );
};

export default RootNavigator;
