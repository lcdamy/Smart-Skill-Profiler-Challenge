'use client';
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useRouter } from 'next/navigation';
import { useResultStore } from '@/store/resultStore';




const formSchema = z.object({
    fullnames: z.string().min(1, "Full names are required"),
    email: z.string().email("Invalid email address"),
    skills: z.array(z.string().min(1, "Skill cannot be empty")).min(1, "At least one skill is required"),
    about: z.string().max(300, "About you must be 300 characters or less"),
})

function SkillData() {
    const setResult = useResultStore((state) => state.setResult);
    const clearResult = useResultStore((state) => state.clearResult);

    const router = useRouter();

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            fullnames: "",
            email: "",
            skills: [""],
            about: "",
        },
    });

    function onSubmit(data: z.infer<typeof formSchema>) {
        // Clear previous result before setting a new one
        clearResult();

        // Reset the form after submission
        form.reset({
            fullnames: "",
            email: "",
            skills: [""],
            about: "",
        });
        //call the API that is hosted on Netlify
        fetch('/.netlify/functions/profileFeedback', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then(response => response.json())
            .then(data => {
                const result = JSON.parse(data.text);
                setResult(result); // Save to Zustand
                router.push('/result-test');
            })
            .catch(error => {
                console.error("Error calling API:", error);
                // Handle any errors that occur during the fetch
            });
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen px-4 bg-background text-foreground transition-colors">
            <div className="container-surface shadow-2xl rounded-2xl p-8 w-full max-w-lg transition-colors">
                <h1 className="text-3xl font-extrabold text-indigo-700 dark:text-indigo-400 mb-2 text-center">Profile Details</h1>
                <p className="text-secondary mb-6 text-center">Fill in your information to get started</p>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <FormField
                            control={form.control}
                            name="fullnames"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-indigo-700 dark:text-indigo-400">Full Names</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="John Doe"
                                            className="focus:ring-2 focus:ring-indigo-400 dark:bg-[#23272f] dark:text-foreground"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormDescription className="text-xs text-secondary">
                                        Please enter your full names
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-indigo-700 dark:text-indigo-400">Email</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="email"
                                            placeholder="you@example.com"
                                            className="focus:ring-2 focus:ring-indigo-400 dark:bg-[#23272f] dark:text-foreground"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormDescription className="text-xs text-secondary">
                                        Please enter a valid email address
                                    </FormDescription>
                                    <FormMessage />

                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="skills"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-indigo-700 dark:text-indigo-400">Skills</FormLabel>
                                    <FormControl>
                                        <div>
                                            <div className="flex flex-wrap gap-2 mb-2">
                                                {field.value
                                                    .filter((skill: string) => skill.trim() !== "")
                                                    .map((skill: string, idx: number) => (
                                                        <span
                                                            key={idx}
                                                            className="flex items-center bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300 px-2 py-1 rounded-full text-sm"
                                                        >
                                                            {skill}
                                                            <button
                                                                type="button"
                                                                className="ml-1 text-indigo-500 dark:text-indigo-300 hover:text-red-500 dark:hover:text-red-400"
                                                                onClick={() => {
                                                                    const newSkills = field.value.filter(
                                                                        (_: string, i: number) => i !== idx
                                                                    );
                                                                    field.onChange(newSkills.length ? newSkills : [""]);
                                                                }}
                                                                aria-label={`Remove ${skill}`}
                                                            >
                                                                ×
                                                            </button>
                                                        </span>
                                                    ))}
                                            </div>
                                            <input
                                                type="text"
                                                className="border rounded px-2 py-1 focus:ring-2 focus:ring-indigo-400 w-full dark:bg-[#23272f] dark:text-foreground"
                                                placeholder="Type a skill and press Enter"
                                                onKeyDown={e => {
                                                    if (e.key === "Enter" || e.key === ",") {
                                                        e.preventDefault();
                                                        const input = (e.target as HTMLInputElement).value.trim();
                                                        if (input && !field.value.includes(input)) {
                                                            field.onChange([...field.value.filter((s: string) => s.trim() !== ""), input]);
                                                        }
                                                        (e.target as HTMLInputElement).value = "";
                                                    }
                                                }}
                                            />
                                        </div>
                                    </FormControl>
                                    <FormDescription className="text-xs text-secondary">
                                        Press Enter or comma to add a skill
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="about"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-indigo-700 dark:text-indigo-400">About You</FormLabel>
                                    <FormControl>
                                        <textarea
                                            maxLength={300}
                                            placeholder="Tell us about yourself (max 300 characters)"
                                            className="w-full border rounded p-2 focus:ring-2 focus:ring-indigo-400 dark:bg-[#23272f] dark:text-foreground"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormDescription className="text-xs text-secondary">
                                        {field.value?.length || 0}/300 characters
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="flex gap-4">
                            <Button
                                type="submit"
                                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded-lg transition dark:bg-indigo-500 dark:hover:bg-indigo-600"
                            >
                                Submit
                            </Button>
                            <Button
                                type="button"
                                variant="outline"
                                className="w-full border border-indigo-200 dark:border-indigo-700 bg-background dark:bg-[#23272f] text-indigo-700 dark:text-indigo-300 font-semibold py-2 rounded-lg transition hover:bg-indigo-50 dark:hover:bg-indigo-900"
                                onClick={() => form.reset()}
                                aria-label="Cancel and reset form"
                            >
                                Cancel
                            </Button>
                        </div>
                    </form>
                </Form>
            </div>
        </div>

    )
}

export default SkillData;