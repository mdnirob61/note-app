"use client";

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Field, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";

const UpdateNoteDialog = ({ note }) => {
    const router = useRouter();

    const { _id } = note;

    const handleUpdateNote = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const updateNote = Object.fromEntries(formData.entries());

        console.log("update note", updateNote);

        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/notes/${_id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updateNote),
        });

        const result = await res.json();

        if (result.modifiedCount > 0) {
            router.refresh();
        }
    };

    return (
        <Dialog>
            {/* Edit Button */}
            <DialogTrigger
                render={
                    <Button
                        variant="outline"
                        className="h-10 rounded-xl border-slate-200 bg-white px-5 font-semibold text-slate-700 shadow-sm transition-all duration-200 hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-700"
                    >
                        Edit
                    </Button>
                }
            />

            {/* Dialog */}
            <DialogContent className="max-h-[90vh] overflow-y-auto rounded-3xl border border-slate-200 bg-white p-0 shadow-2xl sm:max-w-lg">
                <form onSubmit={handleUpdateNote}>
                    {/* Header */}
                    <DialogHeader className="border-b border-slate-100 bg-gradient-to-br from-indigo-50 via-white to-violet-50 px-6 py-6 sm:px-8">
                        <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-600 text-xl text-white shadow-lg shadow-indigo-200">
                            ✎
                        </div>

                        <DialogTitle className="text-2xl font-bold tracking-tight text-slate-900">
                            Edit Note
                        </DialogTitle>

                        <DialogDescription className="text-sm leading-6 text-slate-500">
                            Make changes to your note here. Click save when you&apos;re
                            done.
                        </DialogDescription>
                    </DialogHeader>

                    {/* Form Fields */}
                    <div className="px-6 py-6 sm:px-8">
                        <FieldGroup className="gap-5">
                            <Field className="gap-2">
                                <Label
                                    htmlFor="title"
                                    className="text-sm font-semibold text-slate-700"
                                >
                                    Note title
                                </Label>

                                <Input
                                    id="title"
                                    name="title"
                                    defaultValue={note.title}
                                    className="h-12 rounded-xl border-slate-200 bg-slate-50 px-4 text-slate-800 transition-all placeholder:text-slate-400 focus-visible:border-indigo-400 focus-visible:bg-white focus-visible:ring-4 focus-visible:ring-indigo-100"
                                />
                            </Field>

                            <Field className="gap-2">
                                <Label
                                    htmlFor="content"
                                    className="text-sm font-semibold text-slate-700"
                                >
                                    Note content
                                </Label>

                                <Input
                                    id="content"
                                    name="content"
                                    defaultValue={note.content}
                                    className="h-12 rounded-xl border-slate-200 bg-slate-50 px-4 text-slate-800 transition-all placeholder:text-slate-400 focus-visible:border-indigo-400 focus-visible:bg-white focus-visible:ring-4 focus-visible:ring-indigo-100"
                                />
                            </Field>

                            <Field className="gap-2">
                                <Label
                                    htmlFor="category"
                                    className="text-sm font-semibold text-slate-700"
                                >
                                    Category
                                </Label>

                                <Input
                                    id="category"
                                    name="category"
                                    defaultValue={note.category}
                                    className="h-12 rounded-xl border-slate-200 bg-slate-50 px-4 text-slate-800 transition-all focus-visible:border-indigo-400 focus-visible:bg-white focus-visible:ring-4 focus-visible:ring-indigo-100"
                                />
                            </Field>

                            <Field className="gap-2">
                                <Label
                                    htmlFor="createdAt"
                                    className="text-sm font-semibold text-slate-700"
                                >
                                    Created At
                                </Label>

                                <Input
                                    id="createdAt"
                                    name="createdAt"
                                    type="datetime-local"
                                    className="h-12 rounded-xl border-slate-200 bg-slate-50 px-4 text-slate-700 transition-all focus-visible:border-indigo-400 focus-visible:bg-white focus-visible:ring-4 focus-visible:ring-indigo-100"
                                />
                            </Field>

                            <Field className="gap-2">
                                <Label
                                    htmlFor="image"
                                    className="text-sm font-semibold text-slate-700"
                                >
                                    Image
                                </Label>

                                <Input
                                    id="image"
                                    name="image"
                                    type="url"
                                    defaultValue={note.image}
                                    className="h-12 rounded-xl border-slate-200 bg-slate-50 px-4 text-slate-800 transition-all focus-visible:border-indigo-400 focus-visible:bg-white focus-visible:ring-4 focus-visible:ring-indigo-100"
                                />
                            </Field>
                        </FieldGroup>
                    </div>

                    {/* Footer */}
                    <DialogFooter className="flex flex-col-reverse gap-3 border-t border-slate-100 bg-slate-50/80 px-6 py-5 sm:flex-row sm:justify-end sm:px-8">
                        <DialogClose
                            render={
                                <Button
                                    variant="outline"
                                    className="h-11 w-full rounded-xl border-slate-200 bg-white px-6 font-semibold text-slate-600 transition hover:bg-slate-100 sm:w-auto"
                                >
                                    Cancel
                                </Button>
                            }
                        />

                        <DialogClose
                            render={
                                <Button
                                    type="submit"
                                    className="h-11 w-full rounded-xl bg-indigo-600 px-7 font-semibold text-white shadow-sm transition-all duration-200 hover:bg-indigo-700 hover:shadow-md sm:w-auto"
                                >
                                    Save changes
                                </Button>
                            }
                        />
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default UpdateNoteDialog;