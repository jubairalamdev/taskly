"use client";

import { Button, Modal } from "@heroui/react";

function getBadge(task) {
  if (task.isCompleted) return { label: "Done", classes: "bg-green-50 text-green-600 border-green-200" };
  const now = new Date();
  const deadline = new Date(task.deadline);
  if (now <= deadline) return { label: "Active", classes: "bg-yellow-50 text-yellow-600 border-yellow-200" };
  return { label: "Overdue", classes: "bg-red-50 text-red-600 border-red-200" };
}

export default function TaskDetailModal({ isOpen, onClose, task, onToggle, onEdit, onDelete }) {
  if (!task) return null;

  const badge = getBadge(task);
  const deadline = new Date(task.deadline);
  const isOverdue = !task.isCompleted && deadline < new Date();

  return (
    <Modal isOpen={isOpen} onOpenChange={onClose}>
      <Modal.Backdrop>
        <Modal.Container size="lg">
          <Modal.Dialog>
            <Modal.CloseTrigger />
            <Modal.Header>
              <Modal.Icon className="bg-accent-soft text-accent-soft-foreground">
                <svg className="size-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0 1 18 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3 1.5 1.5 3-3.75" />
                </svg>
              </Modal.Icon>
              <Modal.Heading>{task.name}</Modal.Heading>
            </Modal.Header>
            <Modal.Body>
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-2">
                  <span className={`text-xs font-medium px-2.5 py-1 rounded-full border ${badge.classes}`}>
                    {badge.label}
                  </span>
                  {isOverdue && (
                    <span className="text-xs text-red-500 font-medium">Overdue</span>
                  )}
                </div>

                {task.description && (
                  <div>
                    <p className="text-sm font-medium text-slate-700 mb-1">Description</p>
                    <p className="text-sm text-slate-600 leading-relaxed">{task.description}</p>
                  </div>
                )}

                <div>
                  <p className="text-sm font-medium text-slate-700 mb-1">Deadline</p>
                  <p className={`text-sm ${isOverdue ? "text-red-500 font-medium" : "text-slate-600"}`}>
                    {deadline.toLocaleDateString("en-US", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>

                <div>
                  <p className="text-sm font-medium text-slate-700 mb-1">Status</p>
                  <p className="text-sm text-slate-600">
                    {task.isCompleted ? "Completed" : "In progress"}
                  </p>
                </div>
              </div>
            </Modal.Body>
            <Modal.Footer className="flex flex-col gap-2">
              <Button
                onPress={() => onToggle(task)}
                className={`w-full ${task.isCompleted ? "bg-amber-500 hover:bg-amber-600 text-white" : "bg-green-500 hover:bg-green-600 text-white"}`}
              >
                {task.isCompleted ? "Mark Incomplete" : "Mark Complete"}
              </Button>
              <div className="flex gap-2 w-full">
                <Button onPress={() => onEdit(task)} variant="secondary" className="flex-1">
                  Edit
                </Button>
                <Button onPress={() => onDelete(task)} className="flex-1 bg-red-500 text-white hover:bg-red-600">
                  Delete
                </Button>
              </div>
              <Button slot="close" variant="light" className="w-full text-slate-500">
                Close
              </Button>
            </Modal.Footer>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}
