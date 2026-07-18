"use client";

import { useState } from "react";
import { Modal, ModalContainer, ModalHeader, ModalHeading, ModalBody, ModalFooter, ModalCloseTrigger, Input, TextArea, Button } from "@heroui/react";

export default function TaskModal({ isOpen, onClose, task, onSave }) {
  const [name, setName] = useState(task?.name || "");
  const [deadline, setDeadline] = useState(task?.deadline ? task.deadline.slice(0, 10) : "");
  const [description, setDescription] = useState(task?.description || "");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await onSave({ name, deadline, description }, task?._id);
    setLoading(false);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={onClose}>
      <ModalContainer>
        <form onSubmit={handleSubmit}>
          <ModalHeader>
            <ModalHeading>{task ? "Edit Task" : "New Task"}</ModalHeading>
            <ModalCloseTrigger />
          </ModalHeader>
          <ModalBody className="flex flex-col gap-4">
            <Input label="Name" value={name} onValueChange={setName} isRequired />
            <Input label="Deadline" type="date" value={deadline} onValueChange={setDeadline} isRequired />
            <TextArea label="Description (optional)" value={description} onValueChange={setDescription} />
          </ModalBody>
          <ModalFooter>
            <Button variant="light" onPress={onClose}>Cancel</Button>
            <Button type="submit" color="primary" isLoading={loading}>
              {task ? "Save" : "Create"}
            </Button>
          </ModalFooter>
        </form>
      </ModalContainer>
    </Modal>
  );
}
