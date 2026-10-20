"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
    Field,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import Link from "next/link";

const NewNotePage = () => {
    const router = useRouter();

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState("");

    const handleAddNewNote = async (e) => {
        e.preventDefault();

        setIsSubmitting(true);
        setError("");

        try {
            const formData = new FormData(e.currentTarget);
            const newNote = Object.fromEntries(formData.entries());

            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/notes`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newNote),
            });

            if (!res.ok) {
                throw new Error("Failed to create your note.");
            }

            const result = await res.json();

            if (result.insertedId) {
                router.push("/notes");
                router.refresh();
            } else {
                throw new Error("The note could not be saved.");
            }
        } catch (err) {
            console.error("Error creating note:", err);

            setError(
                err instanceof Error
                    ? err.message
                    : "Something went wrong. Please try again."
            );
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <main className="min-h-screen bg-slate-50 px-4 py-10 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-5xl">

                {/* Back Navigation */}
                <Link
                    href="/notes"
                    className="mb-7 inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-indigo-600"
                >
                    <span aria-hidden="true">←</span>
                    Back to all notes
                </Link>

                {/* Page Header */}
                <div className="mb-8">
                    <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-indigo-50 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-indigo-700">
                        <span className="text-base">✦</span>
                        Your personal workspace
                    </div>

                    <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                        Create a New Note
                    </h1>

                    <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-500 sm:text-base">
                        Capture your thoughts, organize what you learn, and
                        keep your important information in one place.
                    </p>
                </div>

                {/* Form Layout */}
                <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-[1fr_280px]">

                    {/* Main Form */}
                    <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
                        <div className="border-b border-slate-100 px-6 py-5 sm:px-8">
                            <h2 className="text-lg font-bold text-slate-900">
                                Note Information
                            </h2>

                            <p className="mt-1 text-sm text-slate-500">
                                Fill in the details below to create your note.
                            </p>
                        </div>

                        <form
                            onSubmit={handleAddNewNote}
                            className="p-6 sm:p-8"
                        >
                            <FieldGroup className="gap-6">

                                {/* Title */}
                                <Field>
                                    <FieldLabel
                                        htmlFor="title"
                                        className="text-sm font-semibold text-slate-700"
                                    >
                                        Note Title
                                        <span className="ml-1 text-red-500">*</span>
                                    </FieldLabel>

                                    <Input
                                        id="title"
                                        name="title"
                                        placeholder="e.g. Learn JavaScript Array Methods"
                                        required
                                        maxLength={150}
                                        className="h-12 rounded-xl border-slate-200 bg-slate-50 px-4 transition focus-visible:bg-white focus-visible:ring-indigo-200"
                                    />

                                    <p className="text-xs text-slate-400">
                                        Choose a short, meaningful title.
                                    </p>
                                </Field>

                                {/* Content */}
                                <Field>
                                    <FieldLabel
                                        htmlFor="content"
                                        className="text-sm font-semibold text-slate-700"
                                    >
                                        Note Content
                                        <span className="ml-1 text-red-500">*</span>
                                    </FieldLabel>

                                    <textarea
                                        id="content"
                                        name="content"
                                        placeholder="Write your thoughts, ideas, or learning notes here..."
                                        required
                                        rows={7}
                                        className="w-full resize-y rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm leading-7 text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-indigo-400 focus:bg-white focus:ring-4 focus:ring-indigo-100"
                                    />

                                    <p className="text-xs text-slate-400">
                                        Add details that you want to remember.
                                    </p>
                                </Field>

                                {/* Category */}
                                <Field>
                                    <FieldLabel
                                        htmlFor="category"
                                        className="text-sm font-semibold text-slate-700"
                                    >
                                        Category
                                        <span className="ml-1 text-red-500">*</span>
                                    </FieldLabel>

                                    <Input
                                        id="category"
                                        name="category"
                                        placeholder="e.g. Programming, Personal, Learning"
                                        required
                                        className="h-12 rounded-xl border-slate-200 bg-slate-50 px-4 transition focus-visible:bg-white focus-visible:ring-indigo-200"
                                    />
                                </Field>

                                {/* Date and Image */}
                                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">

                                    <Field>
                                        <FieldLabel
                                            htmlFor="createdAt"
                                            className="text-sm font-semibold text-slate-700"
                                        >
                                            Created At
                                        </FieldLabel>

                                        <Input
                                            id="createdAt"
                                            name="createdAt"
                                            type="datetime-local"
                                            className="h-12 rounded-xl border-slate-200 bg-slate-50 px-3 transition focus-visible:bg-white focus-visible:ring-indigo-200"
                                        />

                                        <p className="text-xs text-slate-400">
                                            Optional date and time.
                                        </p>
                                    </Field>

                                    <Field>
                                        <FieldLabel
                                            htmlFor="image"
                                            className="text-sm font-semibold text-slate-700"
                                        >
                                            Cover Image URL
                                        </FieldLabel>

                                        <Input
                                            id="image"
                                            name="image"
                                            type="url"
                                            placeholder="https://example.com/image.jpg"
                                            className="h-12 rounded-xl border-slate-200 bg-slate-50 px-3 transition focus-visible:bg-white focus-visible:ring-indigo-200"
                                        />

                                        <p className="text-xs text-slate-400">
                                            Optional image link.
                                        </p>
                                    </Field>

                                </div>

                                {/* Error Message */}
                                {error && (
                                    <div
                                        role="alert"
                                        className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
                                    >
                                        {error}
                                    </div>
                                )}

                                {/* Form Actions */}
                                <div className="flex flex-col-reverse gap-3 border-t border-slate-100 pt-6 sm:flex-row sm:justify-end">
                                    <Button
                                        type="reset"
                                        variant="outline"
                                        disabled={isSubmitting}
                                        className="h-11 rounded-xl border-slate-200 px-6 font-semibold text-slate-600 hover:bg-slate-50"
                                    >
                                        Reset Form
                                    </Button>

                                    <Button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="h-11 rounded-xl bg-indigo-600 px-7 font-semibold text-white shadow-sm transition hover:bg-indigo-700"
                                    >
                                        {isSubmitting ? (
                                            <span className="flex items-center gap-2">
                                                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                                                Saving Note...
                                            </span>
                                        ) : (
                                            <>
                                                <span className="mr-2 text-lg">+</span>
                                                Create Note
                                            </>
                                        )}
                                    </Button>
                                </div>

                            </FieldGroup>
                        </form>
                    </section>

                    {/* Helpful Sidebar */}
                    <aside className="space-y-5">

                        {/* Tip Card */}
                        <div className="rounded-3xl border border-indigo-100 bg-gradient-to-br from-indigo-50 to-violet-50 p-6">
                            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-2xl shadow-sm">
                                💡
                            </div>

                            <h3 className="text-base font-bold text-slate-900">
                                Make your notes useful
                            </h3>

                            <p className="mt-3 text-sm leading-6 text-slate-600">
                                Give each note a clear title, organize it into
                                a category, and include enough detail to help
                                you understand it later.
                            </p>
                        </div>

                        {/* Checklist */}
                        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                            <h3 className="mb-5 font-bold text-slate-900">
                                Before you save
                            </h3>

                            <div className="space-y-4">
                                <div className="flex items-start gap-3">
                                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-xs font-bold text-emerald-600">
                                        1
                                    </span>

                                    <div>
                                        <p className="text-sm font-semibold text-slate-800">
                                            Add a clear title
                                        </p>
                                        <p className="mt-1 text-xs leading-5 text-slate-500">
                                            Make your note easy to find.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-xs font-bold text-emerald-600">
                                        2
                                    </span>

                                    <div>
                                        <p className="text-sm font-semibold text-slate-800">
                                            Write useful details
                                        </p>
                                        <p className="mt-1 text-xs leading-5 text-slate-500">
                                            Include the information you need.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-xs font-bold text-emerald-600">
                                        3
                                    </span>

                                    <div>
                                        <p className="text-sm font-semibold text-slate-800">
                                            Choose a category
                                        </p>
                                        <p className="mt-1 text-xs leading-5 text-slate-500">
                                            Keep related notes together.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </aside>
                </div>
            </div>
        </main>
    );
};

export default NewNotePage;