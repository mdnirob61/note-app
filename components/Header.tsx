import Link from 'next/link';
import React from 'react';

const Header = () => {
    return (
        <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/90 backdrop-blur-md">
            <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8">
                <Link
                    href="/"
                    className="flex items-center gap-3"
                >
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-indigo-600 text-xl text-white shadow-lg shadow-indigo-200">
                        ✦
                    </div>

                    <div>
                        <h1 className="text-lg font-bold tracking-tight">
                            NoteSpace
                        </h1>
                        <p className="text-xs text-slate-500">
                            Your personal workspace
                        </p>
                    </div>
                </Link>

                <div className="flex items-center gap-3">
                    <Link
                        href="/notes"
                        className="hidden rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-100 hover:text-slate-900 sm:block"
                    >
                        All Notes
                    </Link>

                    <Link
                        href="/notes/new"
                        className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-md shadow-indigo-200 transition hover:bg-indigo-700"
                    >
                        <span className="text-lg">+</span>
                        <span>New Note</span>
                    </Link>
                </div>
            </nav>
        </header>
    );
};

export default Header;