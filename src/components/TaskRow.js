"use client";

import { Checkbox, Button } from "@heroui/react";

function getBadge(task) {
  if (task.isCompleted) return { label: "Done", classes: "bg-green-50 text-green-600 border-green-200" };
  const now = new Date();
  const deadline = new Date(task.deadline);
  if (now <= deadline) return { label: "Active", classes: "bg-yellow-50 text-yellow-600 border-yellow-200" };
  return { label: "Overdue", classes: "bg-red-50 text-red-600 border-red-200" };
}

function getAccent(task) {
  if (task.isCompleted) return "border-l-green-400";
  const now = new Date();
  const deadline = new Date(task.deadline);
  if (now <= deadline) return "border-l-yellow-400";
  return "border-l-red-400";
}

export default function TaskRow({ task, onToggle, onEdit, onDelete, onDetail, toggling }) {
  const badge = getBadge(task);

  return (
    <div
      className={`flex flex-col md:flex-row md:items-center gap-3 md:gap-4 px-4 py-3 bg-white rounded-2xl shadow-sm border border-slate-200 border-l-4 ${getAccent(task)} transition-shadow hover:shadow-md cursor-pointer`}
      onClick={() => onDetail(task)}
    >
      <div className="flex items-center gap-4 flex-1 min-w-0">
        <Checkbox
          isSelected={task.isCompleted}
          onChange={() => onToggle(task)}
          isDisabled={toggling}
          onClick={(e) => e.stopPropagation()}
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
      </div>

      <div className="flex items-center gap-2 ml-12 md:ml-0">
        <span className={`shrink-0 text-xs font-medium px-2.5 py-1 rounded-full border ${badge.classes}`}>
          {badge.label}
        </span>
        <Button size="sm" variant="light" onPress={() => onEdit(task)} className="text-slate-500" onClick={(e) => e.stopPropagation()}>
          Edit
        </Button>
        <Button size="sm" variant="light" onPress={() => onDelete(task)} className="text-red-500" onClick={(e) => e.stopPropagation()}>
          Delete
        </Button>
      </div>
    </div>
  );
}
