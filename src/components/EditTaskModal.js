"use client";

import { useEffect, useState } from "react";
import { Button, Input, Label, Modal, Surface, TextArea, TextField } from "@heroui/react";

export default function EditTaskModal({ isOpen, onClose, task, onSave }) {
  const [name, setName] = useState("");
  const [deadline, setDeadline] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (task) {
      setName(task.name || "");
      setDeadline(task.deadline ? task.deadline.slice(0, 10) : "");
      setDescription(task.description || "");
    }
  }, [task]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await onSave({ name, deadline, description }, task?._id);
    setLoading(false);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={onClose}>
      <Modal.Backdrop>
        <Modal.Container placement="auto">
          <Modal.Dialog className="sm:max-w-md">
            <Modal.CloseTrigger />
            <Modal.Header>
              <Modal.Icon className="bg-accent-soft text-accent-soft-foreground">
                <svg className="size-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                </svg>
              </Modal.Icon>
              <Modal.Heading>Edit Task</Modal.Heading>
              <p className="mt-1.5 text-sm leading-5 text-muted">
                Update the details of your task below.
              </p>
            </Modal.Header>
            <Modal.Body className="p-6">
              <Surface variant="default">
                <form id="edit-task-form" onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <TextField className="w-full" name="name" type="text" variant="secondary">
                    <Label>Name</Label>
                    <Input
                      placeholder="What needs to be done?"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </TextField>
                  <TextField className="w-full" name="deadline" type="date" variant="secondary">
                    <Label>Deadline</Label>
                    <Input
                      value={deadline}
                      onChange={(e) => setDeadline(e.target.value)}
                      required
                    />
                  </TextField>
                  <TextField className="w-full" name="description" variant="secondary">
                    <Label>Description (optional)</Label>
                    <TextArea
                      placeholder="Add any extra details..."
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </TextField>
                </form>
              </Surface>
            </Modal.Body>
            <Modal.Footer>
              <Button slot="close" variant="secondary">
                Cancel
              </Button>
              <Button type="submit" form="edit-task-form" isDisabled={loading}>
                {loading ? "Saving..." : "Save"}
              </Button>
            </Modal.Footer>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}
