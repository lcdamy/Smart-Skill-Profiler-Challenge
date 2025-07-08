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


const formSchema = z.object({
    fullnames: z.string().min(1, "Full names are required"),
    email: z.string().email("Invalid email address"),
    skills: z.array(z.string().min(1, "Skill cannot be empty")).min(1, "At least one skill is required"),
    about: z.string().max(300, "About you must be 300 characters or less"),
})

const Skillcheck = () => {
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
        // Handle form submission logic here
        console.log("Form submitted:", data);
        // You can send the data to an API or perform any other action
        alert("Form submitted successfully!");
    }


    return (
        <div className="flex flex-col items-center justify-center min-h-screen px-4">
            <div className=" shadow-xl rounded-2xl p-8 w-full max-w-lg">
                <h1 className="text-3xl font-extrabold text-indigo-700 mb-2 text-center">Profile Details</h1>
                <p className="text-gray-500 mb-6 text-center">Fill in your information to get started</p>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <FormField
                            control={form.control}
                            name="fullnames"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-indigo-700">Full Names</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="John Doe"
                                            className="focus:ring-2 focus:ring-indigo-400"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormDescription className="text-xs text-gray-400">
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
                                    <FormLabel className="text-indigo-700">Email</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="email"
                                            placeholder="you@example.com"
                                            className="focus:ring-2 focus:ring-indigo-400"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormDescription className="text-xs text-gray-400">
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
                                    <FormLabel className="text-indigo-700">Skills</FormLabel>
                                    <FormControl>
                                        <div>
                                            <div className="flex flex-wrap gap-2 mb-2">
                                                {field.value
                                                    .filter((skill: string) => skill.trim() !== "")
                                                    .map((skill: string, idx: number) => (
                                                        <span
                                                            key={idx}
                                                            className="flex items-center bg-indigo-100 text-indigo-700 px-2 py-1 rounded-full text-sm"
                                                        >
                                                            {skill}
                                                            <button
                                                                type="button"
                                                                className="ml-1 text-indigo-500 hover:text-red-500"
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
                                                className="border rounded px-2 py-1 focus:ring-2 focus:ring-indigo-400 w-full"
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
                                    <FormDescription className="text-xs text-gray-400">
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
                                    <FormLabel className="text-indigo-700">About You</FormLabel>
                                    <FormControl>
                                        <textarea
                                            maxLength={300}
                                            placeholder="Tell us about yourself (max 300 characters)"
                                            className="w-full border rounded p-2 focus:ring-2 focus:ring-indigo-400"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormDescription className="text-xs text-gray-400">
                                        {field.value?.length || 0}/300 characters
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="flex gap-4">
                            <Button
                                type="submit"
                                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded-lg transition"
                            >
                                Submit
                            </Button>
                            <Button
                                type="button"
                                variant="outline"
                                className="w-full"
                                onClick={() => form.reset()}
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

export default Skillcheck