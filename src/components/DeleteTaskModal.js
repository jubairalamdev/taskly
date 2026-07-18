"use client";

import { useState } from "react";
import { Button, Modal } from "@heroui/react";

export default function DeleteTaskModal({ isOpen, onClose, task, onConfirm }) {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    await onConfirm(task);
    setLoading(false);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={onClose}>
      <Modal.Backdrop>
        <Modal.Container>
          <Modal.Dialog className="sm:max-w-[360px]">
            <Modal.CloseTrigger />
            <Modal.Header>
              <Modal.Icon className="bg-red-100 text-red-600">
                <svg className="size-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                </svg>
              </Modal.Icon>
              <Modal.Heading>Delete Task</Modal.Heading>
            </Modal.Header>
            <Modal.Body>
              <p className="text-sm text-slate-600">
                Are you sure you want to delete <span className="font-medium text-slate-900">&ldquo;{task?.name}&rdquo;</span>? This action cannot be undone.
              </p>
            </Modal.Body>
            <Modal.Footer className="flex gap-2">
              <Button slot="close" variant="secondary" className="flex-1">
                Cancel
              </Button>
              <Button onPress={handleDelete} isDisabled={loading} className="flex-1 bg-red-500 text-white hover:bg-red-600">
                {loading ? "Deleting..." : "Delete"}
              </Button>
            </Modal.Footer>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}
