"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface Note {
    _id: string;
    title: string;
}

interface DeleteNoteButtonProps {
    note: Note;
}

const DeleteNoteButton = ({ note }: DeleteNoteButtonProps) => {
    const router = useRouter();
    const [deleting, setDeleting] = useState(false);

    const handleDeleteNote = async () => {
        const confirmed = window.confirm(
            `Are you sure you want to delete "${note.title}"?`
        );

        if (!confirmed) return;

        try {
            setDeleting(true);

            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/notes/${note._id}`,
                {
                    method: "DELETE",
                }
            );

            if (!res.ok) {
                throw new Error("Failed to delete note");
            }

            const result = await res.json();

            if (result.deletedCount > 0) {
                router.push("/notes");
                router.refresh();
            } else {
                alert("Note was not found or has already been deleted.");
            }
        } catch (error) {
            console.error("Delete error:", error);
            alert("Failed to delete note. Please try again.");
        } finally {
            setDeleting(false);
        }
    };

    return (
        <Button
            type="button"
            onClick={handleDeleteNote}
            disabled={deleting}
            variant="destructive"
            className="px-6 py-5 font-semibold transition-colors duration-300"
        >
            {deleting ? "Deleting..." : "Delete Note"}
        </Button>
    );
};

export default DeleteNoteButton;