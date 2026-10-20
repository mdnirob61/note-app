import Link from "next/link";
import Image from "next/image";

interface Note {
  _id?: string;
  id?: string | number;
  title: string;
  content: string;
  category?: string;
  image?: string;
  createdAt?: string;
}

const getNotes = async (): Promise<Note[]> => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/notes`, {
      cache: "no-store",
    });

    if (!res.ok) {
      return [];
    }

    return res.json();
  } catch (error) {
    console.error("Failed to fetch notes:", error);
    return [];
  }
};

const formatDate = (date?: string) => {
  if (!date) return "Recently created";

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return "Recently created";
  }

  return parsedDate.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

const HomePage = async () => {
  const notes = await getNotes();

  const categories = [
    {
      name: "Programming",
      icon: "💻",
      description: "Code snippets and programming ideas",
    },
    {
      name: "Learning",
      icon: "📚",
      description: "Things you're learning every day",
    },
    {
      name: "Personal",
      icon: "✍️",
      description: "Thoughts, plans, and reminders",
    },
  ];

  const recentNotes = [...notes]
    .sort((a, b) => {
      const dateA = new Date(a.createdAt || 0).getTime();
      const dateB = new Date(b.createdAt || 0).getTime();

      return dateB - dateA;
    })
    .slice(0, 6);

  return (
    <main className="min-h-screen bg-[#F8FAFC] text-slate-900">
          
      <div className="mx-auto max-w-7xl px-5 py-8 sm:px-8 sm:py-12">
        {/* Hero Section */}
        <section className="relative mb-10 overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-700 via-indigo-600 to-violet-600 p-7 text-white shadow-xl shadow-indigo-100 sm:p-10 lg:p-14">
          <div className="pointer-events-none absolute -right-16 -top-20 h-72 w-72 rounded-full border-[35px] border-white/10" />

          <div className="pointer-events-none absolute -bottom-28 right-32 h-64 w-64 rounded-full bg-violet-400/20 blur-3xl" />

          <div className="relative z-10 max-w-2xl">
            <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-semibold tracking-wide text-indigo-50">
              <span className="h-2 w-2 rounded-full bg-emerald-300" />
              YOUR IDEAS, ORGANIZED
            </span>

            <h2 className="text-3xl font-bold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
              A home for all
              <br className="hidden sm:block" /> your ideas.
            </h2>

            <p className="mt-5 max-w-xl text-sm leading-7 text-indigo-100 sm:text-base">
              Capture your thoughts, organize what you learn,
              and keep your important ideas within reach.
              Everything starts with a note.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/notes/new"
                className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 font-semibold text-indigo-700 shadow-lg transition hover:-translate-y-0.5 hover:bg-indigo-50"
              >
                <span className="text-xl">+</span>
                Create your first idea
              </Link>

              <Link
                href="/notes"
                className="rounded-xl border border-white/25 bg-white/10 px-5 py-3 font-semibold text-white transition hover:bg-white/20"
              >
                Explore notes →
              </Link>
            </div>
          </div>
        </section>

        {/* Statistics */}
        <section className="mb-12 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
            <div className="mb-4 flex items-center justify-between">
              <span className="text-sm font-medium text-slate-500">
                Total notes
              </span>
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-xl">
                📝
              </span>
            </div>

            <p className="text-3xl font-bold tracking-tight">
              {notes.length}
            </p>

            <p className="mt-2 text-xs text-slate-400">
              Notes in your collection
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
            <div className="mb-4 flex items-center justify-between">
              <span className="text-sm font-medium text-slate-500">
                Categories
              </span>
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-xl">
                🗂️
              </span>
            </div>

            <p className="text-3xl font-bold tracking-tight">
              {new Set(
                notes.map(
                  (note) => note.category || "Uncategorized"
                )
              ).size}
            </p>

            <p className="mt-2 text-xs text-slate-400">
              Different topics covered
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
            <div className="mb-4 flex items-center justify-between">
              <span className="text-sm font-medium text-slate-500">
                Latest note
              </span>
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 text-xl">
                ✨
              </span>
            </div>

            <p className="truncate text-xl font-bold tracking-tight">
              {recentNotes[0]?.title || "No notes yet"}
            </p>

            <p className="mt-2 text-xs text-slate-400">
              Your most recent creation
            </p>
          </div>
        </section>

        {/* Recent Notes */}
        <section className="mb-14">
          <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="mb-2 text-xs font-bold tracking-[0.2em] text-indigo-600">
                YOUR WORKSPACE
              </p>

              <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
                Recent notes
              </h2>

              <p className="mt-2 text-sm text-slate-500">
                Pick up where you left off.
              </p>
            </div>

            <Link
              href="/notes"
              className="text-sm font-semibold text-indigo-600 transition hover:text-indigo-800"
            >
              View all notes →
            </Link>
          </div>

          {recentNotes.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-50 text-3xl">
                📝
              </div>

              <h3 className="text-xl font-bold">
                Your workspace is waiting
              </h3>

              <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
                You haven&apos;t created any notes yet. Start
                capturing your ideas and they&apos;ll appear here.
              </p>

              <Link
                href="/notes/new"
                className="mt-6 inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700"
              >
                + Create your first note
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {recentNotes.map((note) => (
                <Link
                  key={note._id ?? note.id}
                  href={`/notes/${note._id ?? note.id}`}
                  className="group overflow-hidden rounded-2xl border border-slate-200 bg-white transition duration-300 hover:-translate-y-1 hover:border-indigo-200 hover:shadow-xl hover:shadow-slate-200/60"
                >
                  {note.image ? (
                    <div className="relative h-48 w-full overflow-hidden bg-slate-100">
                      <Image
                        src={note.image}
                        alt={note.title}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover transition duration-500 group-hover:scale-105"
                      />
                    </div>
                  ) : (
                    <div className="flex h-48 items-center justify-center bg-gradient-to-br from-indigo-50 to-violet-100 text-5xl">
                      📝
                    </div>
                  )}

                  <div className="p-5">
                    <div className="mb-3 flex items-center justify-between gap-3">
                      <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700">
                        {note.category || "Uncategorized"}
                      </span>

                      <span className="text-xs text-slate-400">
                        {formatDate(note.createdAt)}
                      </span>
                    </div>

                    <h3 className="line-clamp-1 text-lg font-bold text-slate-900 transition group-hover:text-indigo-600">
                      {note.title}
                    </h3>

                    <p className="mt-2 line-clamp-3 text-sm leading-6 text-slate-500">
                      {note.content}
                    </p>

                    <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">
                      <span className="text-xs font-medium text-slate-400">
                        Read note
                      </span>

                      <span className="text-lg text-indigo-600 transition group-hover:translate-x-1">
                        →
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </section>

        {/* Categories */}
        <section className="mb-10">
          <div className="mb-6">
            <p className="mb-2 text-xs font-bold tracking-[0.2em] text-indigo-600">
              STAY ORGANIZED
            </p>

            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Explore your topics
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              Give every idea a place to belong.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {categories.map((category) => {
              const count = notes.filter(
                (note) =>
                  note.category?.toLowerCase() ===
                  category.name.toLowerCase()
              ).length;

              return (
                <div
                  key={category.name}
                  className="rounded-2xl border border-slate-200 bg-white p-5 transition hover:border-indigo-200 hover:shadow-md"
                >
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-slate-50 text-2xl">
                    {category.icon}
                  </div>

                  <h3 className="font-bold text-slate-900">
                    {category.name}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-slate-500">
                    {category.description}
                  </p>

                  <p className="mt-4 text-xs font-semibold text-indigo-600">
                    {count} {count === 1 ? "note" : "notes"}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="flex flex-col items-start justify-between gap-5 rounded-3xl border border-indigo-100 bg-indigo-50 p-6 sm:flex-row sm:items-center sm:p-8">
          <div>
            <h2 className="text-xl font-bold text-slate-900 sm:text-2xl">
              Have another idea?
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-600">
              Don&apos;t let a good thought get away. Save it now.
            </p>
          </div>

          <Link
            href="/notes/new"
            className="shrink-0 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700"
          >
            Create a note →
          </Link>
        </section>
      </div>
    </main>
  );
};

export default HomePage;