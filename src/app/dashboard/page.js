"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@heroui/react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import TaskModal from "@/components/TaskModal";
import EditTaskModal from "@/components/EditTaskModal";
import DeleteTaskModal from "@/components/DeleteTaskModal";
import TaskDetailModal from "@/components/TaskDetailModal";
import TaskRow from "@/components/TaskRow";

export default function DashboardPage() {
  const router = useRouter();
  const { data: session } = authClient.useSession();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [createOpen, setCreateOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [deletingTask, setDeletingTask] = useState(null);
  const [viewingTaskId, setViewingTaskId] = useState(null);
  const [togglingIds, setTogglingIds] = useState(new Set());
  const viewingTask = viewingTaskId ? tasks.find((t) => t._id === viewingTaskId) : null;
  const fetchedRef = useRef(false);

  useEffect(() => {
    if (fetchedRef.current) return;
    fetchedRef.current = true;

    (async () => {
      try {
        const res = await fetch("/api/tasks");
        if (res.status === 401) {
          router.push("/auth/signin");
          return;
        }
        if (!res.ok) throw new Error("Failed to fetch");
        setTasks(await res.json());
      } catch {
        toast.error("Failed to load tasks");
      } finally {
        setLoading(false);
      }
    })();
  }, [router]);

  const handleCreate = async (data) => {
    try {
      const res = await fetch("/api/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.status === 401) { router.push("/auth/signin"); return; }
      if (!res.ok) throw new Error("Failed to create");

      const saved = await res.json();
      setTasks((prev) => [...prev, saved]);
      toast.success("Task created");
    } catch {
      toast.error("Failed to create task");
    }
  };

  const handleUpdate = async (data, id) => {
    const original = tasks;
    setTasks((prev) =>
      prev.map((t) => (t._id === id ? { ...t, ...data } : t))
    );

    try {
      const res = await fetch(`/api/tasks/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.status === 401) { router.push("/auth/signin"); return; }
      if (!res.ok) throw new Error(`Update failed: ${res.status} ${await res.text()}`);

      toast.success("Task updated");
    } catch (err) {
      console.error("handleUpdate error:", err);
      setTasks(original);
      toast.error("Failed to update task");
    }
  };

  const handleToggle = async (task) => {
    const original = tasks;
    const wasCompleted = task.isCompleted;
    setTogglingIds((prev) => new Set(prev).add(task._id));
    setTasks((prev) =>
      prev.map((t) => (t._id === task._id ? { ...t, isCompleted: !t.isCompleted } : t))
    );

    try {
      const res = await fetch(`/api/tasks/${task._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isCompleted: !task.isCompleted }),
      });
      if (res.status === 401) { router.push("/auth/signin"); return; }
      if (!res.ok) throw new Error(`Toggle failed: ${res.status} ${await res.text()}`);

      toast.success(task.isCompleted ? "Task uncompleted" : "Task completed");
    } catch (err) {
      console.error("handleToggle error:", err);
      setTasks(original);
      toast.error("Failed to update task");
    } finally {
      setTogglingIds((prev) => { const next = new Set(prev); next.delete(task._id); return next; });
    }
  };

  const handleDeleteConfirm = async (task) => {
    if (viewingTaskId === task._id) setViewingTaskId(null);
    setTasks((prev) => prev.filter((t) => t._id !== task._id));

    try {
      const res = await fetch(`/api/tasks/${task._id}`, { method: "DELETE" });
      if (res.status === 401) { router.push("/auth/signin"); return; }
      if (!res.ok) throw new Error("Failed to delete");
      toast.success("Task deleted");
    } catch {
      setTasks((prev) => [...prev, task]);
      toast.error("Failed to delete task");
    }
  };

  const openCreate = () => setCreateOpen(true);
  const openEdit = (task) => setEditingTask(task);
  const openDelete = (task) => setDeletingTask(task);
  const openDetail = (task) => setViewingTaskId(task._id);

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
        <Button isIconOnly size="lg" onPress={openCreate} aria-label="Add task" className="w-14 h-14 rounded-full text-2xl shadow-lg bg-gradient-to-r from-blue-400 to-blue-500 text-white hover:from-blue-500 hover:to-blue-600">
          +
        </Button>
        <TaskModal isOpen={createOpen} onClose={() => setCreateOpen(false)} onSave={handleCreate} />
      </div>
    );
  }

  const userName = session?.user?.name?.split(" ")[0] || "there";

  return (
    <div className="flex-1 flex flex-col px-4 py-6">
      <div className="max-w-3xl mx-auto w-full mb-6">
        <h1 className="text-2xl font-bold text-slate-900">Welcome back, {userName}</h1>
        <p className="text-sm text-slate-500 mt-1">Manage your tasks, track deadlines, and stay on top of your day.</p>
      </div>
      <div className="max-w-3xl mx-auto w-full space-y-2">
        {tasks.map((task) => (
          <TaskRow
            key={task._id}
            task={task}
            onToggle={handleToggle}
            onEdit={openEdit}
            onDelete={openDelete}
            onDetail={openDetail}
            toggling={togglingIds.has(task._id)}
          />
        ))}
      </div>

      <button
        onClick={openCreate}
        className="fixed bottom-8 right-8 w-14 h-14 rounded-full bg-gradient-to-r from-blue-400 to-blue-500 text-white text-2xl shadow-lg hover:from-blue-500 hover:to-blue-600 transition-all flex items-center justify-center"
        aria-label="Add task"
      >
        +
      </button>

      <TaskModal isOpen={createOpen} onClose={() => setCreateOpen(false)} onSave={handleCreate} />

      <EditTaskModal
        isOpen={!!editingTask}
        onClose={() => setEditingTask(null)}
        task={editingTask}
        onSave={handleUpdate}
      />

      <DeleteTaskModal
        isOpen={!!deletingTask}
        onClose={() => setDeletingTask(null)}
        task={deletingTask}
        onConfirm={handleDeleteConfirm}
      />

      <TaskDetailModal
        isOpen={!!viewingTask}
        onClose={() => setViewingTaskId(null)}
        task={viewingTask}
        onToggle={handleToggle}
        onEdit={openEdit}
        onDelete={openDelete}
      />
    </div>
  );
}
