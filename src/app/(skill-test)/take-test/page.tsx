'use client'

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
import { useRouter } from "next/navigation"
import { useResultStore } from "@/store/resultStore"
import { useFooterStore } from "@/store/footerStore"
import { ImProfile } from "react-icons/im";
import { useState } from "react"
import toast, { Toaster } from 'react-hot-toast';
import Footer from "@/components/FooterNav"

const formSchema = z.object({
    fullnames: z.string().min(1, "Full names are required"),
    email: z.string().email("Invalid email address"),
    skills: z
        .array(z.string().min(1, "Skill cannot be empty"))
        .min(1, "At least one skill is required"),
    about: z.string().min(1, "About you is required").max(300, "About you must be 300 characters or less"),
})

function SkillData() {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const setResult = useResultStore((state) => state.setResult)
    const clearResult = useResultStore((state) => state.clearResult)
    const setLocation = useFooterStore((state) => state.setLocation)
    setLocation("take-test")
    const router = useRouter()

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            fullnames: "",
            email: "",
            skills: [] as string[],
            about: "",
        },
    })

    const onSubmit = async (data: z.infer<typeof formSchema>) => {
        const isValid = await form.trigger("skills")
        if (!isValid) return

        setIsSubmitting(true)
        clearResult()

        try {
            const response = await fetch("/.netlify/functions/profileFeedback", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            })

            if (!response.ok) {
                const errorText = await response.text()
                throw new Error(errorText || "Failed to submit profile")
            }

            const responseData = await response.json()
            let result
            try {
                result = typeof responseData.text === "string"
                    ? JSON.parse(responseData.text)
                    : responseData.text
            } catch {
                result = responseData.text || responseData
            }
            setResult(result)
            toast.success("Profile submitted successfully!")
            form.reset()
            router.push("/result-test")
        } catch (error) {
            console.error("Error calling API:", error)
            toast.error("An unexpected error occurred")
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen px-4 bg-background text-foreground transition-colors">
            <div className="container-surface shadow-2xl rounded-2xl p-8 w-full max-w-lg transition-colors mt-8">
                <h1 className="flex items-center justify-center gap-2 text-3xl font-extrabold text-indigo-700 dark:text-indigo-400 text-center mb-6">
                   <ImProfile /> <span>Profile Details</span>
                </h1>
                <div className="mb-6 text-center">
                    <p className="text-secondary text-xs">
                        Please provide your profile details below. Your information helps us generate a tailored skill profile and deliver personalized feedback to support your growth.
                    </p>
                </div>
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
                                            className="focus:ring-2 dark:bg-[#23272f] dark:text-foreground"
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
                                            className="focus:ring-2 dark:bg-[#23272f] dark:text-foreground"
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
                                                {field.value.map((skill: string, idx: number) => (
                                                    <span
                                                        key={idx}
                                                        className="flex items-center bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 pl-3 pr-1 py-1 rounded-full text-sm shadow transition-all"
                                                    >
                                                        {skill}
                                                        <span
                                                            className="ml-2 rounded-full p-1 cursor-pointer bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400 focus:outline-none"
                                                            onClick={() => {
                                                                const newSkills = field.value.filter((_, i) => i !== idx)
                                                                field.onChange(newSkills)
                                                                form.trigger("skills")
                                                            }}
                                                            aria-label={`Remove ${skill}`}
                                                        >
                                                            <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                                            </svg>
                                                        </span>
                                                    </span>
                                                ))}
                                            </div>
                                            <input
                                                type="text"
                                                className="border border-gray-300 dark:border-none rounded-lg px-3 py-1.5 w-full dark:bg-[#23272f] dark:text-foreground transition focus:border-1 focus:border-indigo-400 "
                                                placeholder="Type a skill and press Enter"
                                                onKeyDown={(e) => {
                                                    if (e.key === "Enter" || e.key === ",") {
                                                        e.preventDefault()
                                                        const input = (e.target as HTMLInputElement).value.trim()
                                                        if (input && !field.value.includes(input)) {
                                                            const newSkills = [...field.value, input]
                                                            field.onChange(newSkills)
                                                            form.trigger("skills")
                                                        }
                                                        (e.target as HTMLInputElement).value = ""
                                                    }
                                                }}
                                            />
                                        </div>
                                    </FormControl>
                                    <FormDescription className="text-xs text-secondary mt-1">
                                        Press <span className="font-semibold text-indigo-600">Enter</span> or{" "}
                                        <span className="font-semibold text-indigo-600">comma</span> to add a skill
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
                                            className="w-full border rounded p-2 dark:bg-[#23272f] dark:text-foreground min-h-[160px]"
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
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? (
                                    <span className="flex items-center justify-center gap-2">
                                        <svg
                                            className="animate-spin h-4 w-4 text-white"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                        >
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                                        </svg>
                                        Submitting...
                                    </span>
                                ) : (
                                    "Submit"
                                )}
                            </Button>

                            <Button
                                type="button"
                                variant="outline"
                                className="w-full border border-indigo-200 dark:border-indigo-700 bg-gray-100 dark:bg-[#23272f] text-indigo-700 dark:text-indigo-300 font-semibold py-2 rounded-lg transition hover:bg-gray-200 dark:hover:bg-indigo-900"
                                onClick={() => form.reset()}
                                disabled={isSubmitting}
                            >
                                Cancel
                            </Button>
                        </div>
                    </form>
                </Form>
                <div>
                    <Toaster position="top-right" />
                </div>
            </div>
            
            <Footer  />

        </div>
    )
}

export default SkillData
