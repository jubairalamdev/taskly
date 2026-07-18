"use client";

import { Checkbox, Button } from "@heroui/react";
import { useRouter } from "next/navigation";

function getBadge(task) {
  if (task.isCompleted) return { label: "Done", classes: "bg-green-100 text-green-700" };
  const now = new Date();
  const deadline = new Date(task.deadline);
  if (now <= deadline) return { label: "Active", classes: "bg-yellow-100 text-yellow-700" };
  return { label: "Overdue", classes: "bg-red-100 text-red-700" };
}

export default function TaskRow({ task, onToggle, onEdit, onDelete, toggling }) {
  const router = useRouter();
  const badge = getBadge(task);
  const isOverdue = !task.isCompleted && new Date(task.deadline) < new Date();

  return (
    <div className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-colors ${isOverdue ? "bg-red-50 border border-red-200" : "hover:bg-slate-50"}`}>
      <Checkbox
        isSelected={task.isCompleted}
        onValueChange={() => onToggle(task)}
        isDisabled={toggling}
      />
      <div className="flex-1 min-w-0">
        <p className={`font-medium truncate ${task.isCompleted ? "line-through text-slate-400" : "text-slate-900"}`}>
          {task.name}
        </p>
        {task.description && (
          <p className="text-sm text-slate-500 truncate">{task.description}</p>
        )}
        <p className="text-xs text-slate-400 mt-0.5">
          Due {new Date(task.deadline).toLocaleDateString()}
        </p>
      </div>
      <span className={`shrink-0 text-xs font-medium px-2.5 py-1 rounded-full ${badge.classes}`}>
        {badge.label}
      </span>
      <Button size="sm" variant="light" onPress={() => onEdit(task)} className="text-slate-500">
        Edit
      </Button>
      <Button size="sm" variant="light" onPress={() => onDelete(task)} className="text-red-500">
        Delete
      </Button>
    </div>
  );
}
