import Image from "next/image";
import Link from "next/link";
import DeleteNoteButton from "@/components/DeleteNoteButton";

const NoteDetailsPage = async ({ params }) => {
    const { noteId } = await params;

    const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/notes/${noteId}`,
        {
            cache: "no-store",
        }
    );

    if (res.status === 404) {
        return (
            <main className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
                <div className="text-center">
                    <h2 className="mb-3 text-2xl font-bold text-gray-900">
                        Note Not Found
                    </h2>

                    <p className="mb-5 text-gray-500">
                        This note may have been deleted or does not exist.
                    </p>

                    <Link
                        href="/notes"
                        className="rounded-xl bg-indigo-600 px-5 py-3 font-semibold text-white transition hover:bg-indigo-700"
                    >
                        Back to Notes
                    </Link>
                </div>
            </main>
        );
    }

    if (!res.ok) {
        throw new Error("Failed to fetch note details");
    }

    const note = await res.json();

    const formattedDate = note.createdAt
        ? new Date(note.createdAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
        })
        : "Date unavailable";

    return (
        <main className="min-h-screen bg-gray-50 px-4 py-10 sm:px-6 lg:px-8">
            <article className="mx-auto max-w-4xl">
                {/* Back Button */}
                <Link
                    href="/notes"
                    className="mb-8 inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm transition hover:bg-gray-100"
                >
                    <span aria-hidden="true">←</span>
                    Back to Notes
                </Link>

                {/* Note Card */}
                <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
                    {/* Cover Image */}
                    {note.image && (
                        <div className="relative h-64 w-full bg-gray-100 sm:h-80 md:h-96">
                            <Image
                                src={note.image}
                                alt={note.title || "Note cover image"}
                                fill
                                priority
                                sizes="(max-width: 768px) 100vw, 896px"
                                className="object-cover"
                            />
                        </div>
                    )}

                    {/* Note Content */}
                    <div className="p-6 sm:p-10">
                        {/* Category and Date */}
                        <div className="mb-5 flex flex-wrap items-center gap-3">
                            <span className="rounded-full bg-indigo-50 px-4 py-1.5 text-sm font-semibold text-indigo-700">
                                {note.category || "Uncategorized"}
                            </span>

                            <span className="text-sm text-gray-500">
                                {formattedDate}
                            </span>
                        </div>

                        {/* Title */}
                        <h1 className="mb-6 text-3xl font-bold leading-tight tracking-tight text-gray-900 sm:text-4xl">
                            {note.title}
                        </h1>

                        <div className="mb-8 h-px bg-gray-200" />

                        {/* Note Description */}
                        <h2 className="mb-4 text-lg font-semibold text-gray-800">
                            About this note
                        </h2>

                        <div className="whitespace-pre-wrap break-words text-base leading-8 text-gray-600 sm:text-lg">
                            {note.content}
                        </div>

                        {/* Footer and Delete Button */}
                        <div className="mt-10 flex flex-col justify-between gap-4 border-t border-gray-200 pt-5 sm:flex-row sm:items-center">
                            <p className="text-sm text-gray-400">
                                Note ID: {note._id ?? noteId}
                            </p>

                            <DeleteNoteButton note={note}></DeleteNoteButton>
                        </div>
                    </div>
                </div>
            </article>
        </main>
    );
};

export default NoteDetailsPage;