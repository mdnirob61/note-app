"use client";
import {
    Card,
    CardContent,
    CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import UpdateNoteDialog from "./UpdateNoteDialog";

const NoteCard = ({ note }) => {
    const formattedDate = note.createdAt
        ? new Date(note.createdAt).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
        })
        : null;

    return (
        <Card className="group mx-auto flex h-full w-full max-w-sm flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white p-0 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-indigo-200 hover:shadow-xl hover:shadow-indigo-100/50">

            {/* Image */}
            <Link
                href={`/notes/${note._id}`}
                aria-label={`View ${note.title}`}
                className="block"
            >
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100">
                    {note.image ? (
                        <Image
                            src={note.image}
                            alt={note.title || "Note cover"}
                            fill
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                    ) : (
                        <div className="flex h-full items-center justify-center bg-gradient-to-br from-indigo-50 to-violet-100">
                            <span className="text-5xl">📝</span>
                        </div>
                    )}

                    {/* Image Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/50 via-transparent to-transparent" />

                    {/* Category Badge */}
                    <div className="absolute left-4 top-4">
                        <span className="inline-flex max-w-[220px] items-center gap-1.5 truncate rounded-full border border-white/30 bg-white/95 px-3 py-1.5 text-xs font-semibold text-indigo-700 shadow-sm backdrop-blur-sm">
                            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-500" />
                            {note.category || "Uncategorized"}
                        </span>
                    </div>

                    {/* Date */}
                    {formattedDate && (
                        <div className="absolute bottom-4 left-4 text-xs font-medium text-white drop-shadow">
                            {formattedDate}
                        </div>
                    )}
                </div>
            </Link>

            {/* Note Content */}
            <CardContent className="flex flex-1 flex-col py-2 px-5">
                <Link
                    href={`/notes/${note._id}`}
                    className="group/title"
                >
                    <h2 className="line-clamp-2 min-h-14 text-lg font-bold leading-7 tracking-tight text-slate-900 transition-colors group-hover/title:text-indigo-600">
                        {note.title || "Untitled Note"}
                    </h2>
                </Link>

                {/* Bottom Info */}
                <div className="flex items-center justify-between border-t border-slate-100 pt-2">
                    <span className="text-xs font-medium text-slate-400">
                        Personal Notes
                    </span>
                </div>
            </CardContent>

            {/* Actions */}
            <CardFooter className="flex items-center gap-2 border-t border-slate-100 bg-slate-50/80 p-4">
                <Link href={`/notes/${note._id}`} className="flex-1">
                    <Button className="h-10 w-full rounded-xl bg-indigo-600 text-sm font-semibold shadow-sm transition hover:bg-indigo-700">
                        Read Note   ↗
                    </Button>
                </Link>

                <UpdateNoteDialog note={note}></UpdateNoteDialog>
            </CardFooter>
        </Card>
    );
};

export default NoteCard;