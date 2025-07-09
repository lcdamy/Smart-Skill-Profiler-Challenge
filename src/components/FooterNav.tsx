import { MdKeyboardBackspace } from "react-icons/md"
import { useRouter } from "next/navigation"
import { CiShare2 } from "react-icons/ci";
import { useFooterStore } from "@/store/footerStore";
import toast, { Toaster } from 'react-hot-toast';

function Footer() {
    const router = useRouter()
    const footerLocation = useFooterStore((state) => state.location || 'take-test');

    return (
        <div className="flex flex-row justify-between gap-4 mt-8 w-full max-w-lg mx-auto mb-2">
            <button
                type="button"
                onClick={() => router.back()}
                className="flex items-center rounded-lg gap-2 button-tertiary"
                aria-label="Start Over"
            >
                <MdKeyboardBackspace className="text-2xl" />
                <span className="text-base">
                    {footerLocation === 'result-test' ? 'Start Over' : 'Back'}
                </span>
            </button>
            {footerLocation === 'result-test' && (
                <button
                    type="button"
                    className="flex items-center rounded-lg gap-2 button-secondary"
                    aria-label="Share"
                    onClick={() => toast("Share your results with others!")}
                >
                    <CiShare2 className="text-2xl" />
                    <span className="text-base">Share</span>
                </button>
            )}
            <Toaster position="bottom-right" reverseOrder={false} />

        </div>
    );
}

export default Footer;