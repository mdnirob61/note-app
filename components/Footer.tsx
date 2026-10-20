import React from 'react';

const Footer = () => {
    return (
        <footer className="border-t border-slate-200 bg-white">
            <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-5 py-6 text-center sm:flex-row sm:px-8 sm:text-left">
                <p className="font-bold text-slate-800">
                    ✦ NoteSpace
                </p>
                <p className="text-sm text-slate-500">
                    Your ideas deserve a home.
                </p>
                <p className="text-xs text-slate-400">
                    © 2026 NoteSpace. All rights reserved.
                </p>
            </div>
        </footer>
    );
};

export default Footer;