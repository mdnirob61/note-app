import React from 'react';
import NoteCard from '../../components/NoteCard';

const NotesPage = async () => {

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/notes`);
    const notes = await res.json();

    return (
        <div className='container mx-auto my-10'>
            <h2 className='font-bold text-2xl mb-7 text-indigo-600'>All Notes: {notes.length}</h2>
            <div className='grid grid-cols-4 gap-5'>
                {
                    notes.map(note => <NoteCard key={note._id} note={note}></NoteCard>)
                }
            </div>
        </div>
    );
};

export default NotesPage;