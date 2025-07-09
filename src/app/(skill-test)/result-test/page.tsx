'use client';
import Footer from '@/components/FooterNav';
import { useResultStore } from '@/store/resultStore'
import { useFooterStore } from '@/store/footerStore';
import { CgProfile } from "react-icons/cg";
import { Separator } from "@/components/ui/separator"
import { motion } from 'framer-motion'

function ResultTest() {
    // Get the summary and suggested skills from the result store
    const summary = useResultStore((state) => state.summary);
    const suggested_skills = useResultStore((state) => state.suggested_skills);

    // Set the current location in the footer store
    const setLocation = useFooterStore((state) => state.setLocation);
    setLocation("result-test");

    return (
        <motion.div
            initial={{ opacity: 0, y: -100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -100 }}
            transition={{ duration: 0.7, type: "spring", stiffness: 80 }}
            id="result-test"
            className="flex flex-col items-center justify-center min-h-screen px-4 bg-background text-foreground transition-colors"
        >
            <Footer />
            <div className="container-surface shadow-2xl rounded-2xl p-8 w-full max-w-lg transition-colors my-4">
                <h1 className="flex justify-left gap-2 text-3xl font-extrabold text-indigo-700 dark:text-indigo-400 text-center mb-6">
                    <CgProfile className="relative top-1" />
                    <span>
                        Profile Analysis
                        <span className="hidden sm:inline text-sm font-normal text-indigo-500 dark:text-indigo-300"> (Cohere-AI Result)</span>
                    </span>
                </h1>
                <h3 className="font-semibold text-xl mb-2.5">
                    About:
                </h3>
                <Separator />
                <div className="  p-5 mb-6 ">
                    <blockquote className="border-l-4 border-indigo-500 bg-indigo-50 dark:bg-indigo-900/30 p-4 italic text-base text-indigo-800 dark:text-indigo-200">
                        {summary}
                    </blockquote>
                </div>
                <h3 className="font-semibold text-xl mb-2.5">
                    Suggested Skills:
                </h3>
                <Separator />
                <ol className="pl-6 text-sm text-secondary leading-relaxed mt-4 list-decimal">
                    {suggested_skills.map((skill, idx) => (
                        <li
                            key={idx}
                            className="mb-2.5 transition-colors duration-500 hover:text-black dark:hover:text-white hover:underline text-gray-700 dark:text-gray-200"
                        >
                            {skill}
                        </li>
                    ))}
                </ol>
            </div>

        </motion.div>
    );
}

export default ResultTest;
