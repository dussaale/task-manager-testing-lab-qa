import { useEffect, useRef, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Task } from '../types';
import { createTask } from '../services/taskService';
import { appConfig } from '../config/appConfig';

const STORAGE_KEY = 'tasks';

export function useCreateTask() {
  const [status, setStatus] = useState<'idle' | 'success'>('idle');
  const [tasks, setTasks] = useState<Task[]>([]);
  const loaded = useRef(false);

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY)
      .then((raw) => {
        if (raw) {
          setTasks(JSON.parse(raw));
        }
      })
      .catch(() => {})
      .finally(() => {
        loaded.current = true;
      });
  }, []);

  useEffect(() => {
    if (!loaded.current) return;
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(tasks)).catch(() => {});
  }, [tasks]);
const submit = async (title: string) => {
  try {
    if (appConfig.useApi) {
      // Modo Integración (MSW)
      const task = await createTask(title);

      setTasks((prev) => [...prev, task]);
    } else {
      // Modo Maestro (almacenamiento local)
      const task: Task = {
        id: Date.now().toString(),
        title,
        status: 'pending',
        createdAt: new Date().toISOString(),
      };

      setTasks((prev) => [...prev, task]);
    }

    setStatus('success');
  } catch (error) {
    console.error(error);
  }
};

  const removeTask = (id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  const toggleTask = (id: string) => {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === id
          ? {
              ...t,
              status: t.status === 'completed' ? 'pending' : 'completed',
            }
          : t
      )
    );
  };

  return {
    status,
    tasks,
    submit,
    removeTask,
    toggleTask,
  };
}