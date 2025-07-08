'use client';
import { useResultStore } from '@/store/resultStore'


function ResultTest() {
    const summary = useResultStore((state) => state.summary);
    const suggested_skills = useResultStore((state) => state.suggested_skills)
    return (
        <div
            style={{
                maxWidth: 600,
                margin: "40px auto",
                padding: 32,
                background: "linear-gradient(135deg, #f8fafc 0%, #e0e7ef 100%)",
                borderRadius: 16,
                boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
                fontFamily: "Segoe UI, Arial, sans-serif",
            }}
        >
            <h2 style={{ color: "#2563eb", marginBottom: 12, fontWeight: 700, fontSize: 28 }}>
                Profile Summary
            </h2>
            <div
                style={{
                    background: "#fff",
                    borderRadius: 10,
                    padding: 20,
                    marginBottom: 24,
                    boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
                }}
            >
                <p style={{ margin: 0, fontSize: 16, color: "#334155" }}>
                    {summary}
                </p>
            </div>
            <h3 style={{ color: "#0f172a", fontWeight: 600, fontSize: 22, marginBottom: 10 }}>
                Suggested Skills
            </h3>
            <ul style={{ paddingLeft: 22, color: "#334155", fontSize: 16, lineHeight: 1.7 }}>
                {suggested_skills.map((skill, idx) => (
                    <li key={idx} style={{ marginBottom: 10 }}>
                        {skill}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ResultTest;
