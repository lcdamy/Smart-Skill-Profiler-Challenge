'use client';
import { useResultStore } from '@/store/resultStore'
import { CiShare2 } from 'react-icons/ci';
import { MdKeyboardBackspace } from 'react-icons/md';
import { useRouter } from 'next/navigation';


function ResultTest() {
    const summary = useResultStore((state) => state.summary);
    const suggested_skills = useResultStore((state) => state.suggested_skills)
    const router = useRouter();
    return (
        <div className="flex flex-col items-center justify-center min-h-screen px-4 bg-background text-foreground transition-colors">
            <div className="max-w-xl mx-auto p-8 bg-gradient-to-br from-slate-50 to-slate-200 rounded-2xl shadow-lg font-sans">
                <h2 className="text-blue-600 mb-3 font-bold text-2xl">
                    Profile Summary
                </h2>
                <div className="bg-white rounded-lg p-5 mb-6 shadow">
                    <p className="m-0 text-base text-slate-800">
                        {summary}
                    </p>
                </div>
                <h3 className="text-slate-900 font-semibold text-xl mb-2.5">
                    Suggested Skills
                </h3>
                <ul className="pl-6 text-slate-800 text-base leading-relaxed">
                    {suggested_skills.map((skill, idx) => (
                        <li key={idx} className="mb-2.5">
                            {skill}
                        </li>
                    ))}
                </ul>
            </div>
            <div className="flex flex-col justify-between sm:flex-row gap-4 mt-8 w-full max-w-xl">
                <button
                    type="button"
                    onClick={() => router.back()}
                    className="flex items-center gap-2 px-5 py-3 rounded-lg"
                    aria-label="Start Over"
                >
                    <MdKeyboardBackspace className="text-2xl" />
                    <span className="text-base">Start Over</span>
                </button>
                <button
                    type="button"
                    className="flex items-center gap-2 px-5 py-3 rounded-lg "
                    aria-label="Share"
                >
                    <CiShare2 className="text-2xl" />
                    <span className="text-base">Share</span>
                </button>
            </div>
        </div>
    );
}

export default ResultTest;
