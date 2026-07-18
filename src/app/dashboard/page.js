"use client";

import { useState, useEffect, useCallback } from "react";
import { Button } from "@heroui/react";
import TaskModal from "@/components/TaskModal";
import TaskRow from "@/components/TaskRow";

export default function DashboardPage() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  const fetchTasks = useCallback(async () => {
    try {
      const res = await fetch("/api/tasks");
      if (!res.ok) throw new Error("Failed to fetch");
      setTasks(await res.json());
    } catch {
      console.error("Failed to load tasks");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchTasks(); }, [fetchTasks]);

  const handleSave = async (data, id) => {
    const url = id ? `/api/tasks/${id}` : "/api/tasks";
    const method = id ? "PUT" : "POST";

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed to save");

      const saved = await res.json();
      if (id) {
        setTasks((prev) => prev.map((t) => (t._id === id ? saved : t)));
      } else {
        setTasks((prev) => [...prev, saved]);
      }
      setModalOpen(false);
      setEditingTask(null);
    } catch {
      console.error("Failed to save task");
    }
  };

  const handleToggle = async (task) => {
    try {
      const res = await fetch(`/api/tasks/${task._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isCompleted: !task.isCompleted }),
      });
      if (!res.ok) throw new Error("Failed to toggle");

      const updated = await res.json();
      setTasks((prev) => prev.map((t) => (t._id === task._id ? updated : t)));
    } catch {
      console.error("Failed to toggle task");
    }
  };

  const handleDelete = async (task) => {
    if (!confirm("Delete this task?")) return;

    try {
      const res = await fetch(`/api/tasks/${task._id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete");
      setTasks((prev) => prev.filter((t) => t._id !== task._id));
    } catch {
      console.error("Failed to delete task");
    }
  };

  const openCreate = () => { setEditingTask(null); setModalOpen(true); };
  const openEdit = (task) => { setEditingTask(task); setModalOpen(true); };

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-blue-400 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (tasks.length === 0) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center px-4">
        <div className="w-24 h-24 rounded-full bg-blue-50 flex items-center justify-center mb-6">
          <svg className="w-10 h-10 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15a2.25 2.25 0 0 1 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z" />
          </svg>
        </div>
        <h2 className="text-2xl font-semibold text-slate-900 mb-2">Your slate is clean</h2>
        <p className="text-slate-500 mb-8 text-center max-w-sm">
          No tasks yet. Tap the button below to create your first one.
        </p>
        <Button isIconOnly size="lg" color="primary" onPress={openCreate} aria-label="Add task" className="w-14 h-14 rounded-full text-2xl shadow-lg">
          +
        </Button>
        <TaskModal isOpen={modalOpen} onClose={() => setModalOpen(false)} onSave={handleSave} />
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col px-4 py-6">
      <div className="max-w-3xl mx-auto w-full space-y-2">
        {tasks.map((task) => (
          <TaskRow
            key={task._id}
            task={task}
            onToggle={handleToggle}
            onEdit={openEdit}
            onDelete={handleDelete}
          />
        ))}
      </div>

      <button
        onClick={openCreate}
        className="fixed bottom-8 right-8 w-14 h-14 rounded-full bg-blue-400 text-white text-2xl shadow-lg hover:bg-blue-500 transition-colors flex items-center justify-center"
        aria-label="Add task"
      >
        +
      </button>

      <TaskModal isOpen={modalOpen} onClose={() => { setModalOpen(false); setEditingTask(null); }} task={editingTask} onSave={handleSave} />
    </div>
  );
}
