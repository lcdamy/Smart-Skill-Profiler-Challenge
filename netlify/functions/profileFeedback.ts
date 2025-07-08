import type { Handler } from '@netlify/functions';
import { CohereClient } from "cohere-ai";

const co = new CohereClient({
    token: process.env.COHERE_API_KEY
});

export const handler: Handler = async (event) => {
    // Parse form data from the request body
    let formData;
    try {
        formData = JSON.parse(event.body || '{}');
    } catch (e) {
        return {
            statusCode: 400,
            body: JSON.stringify({ error: "Invalid JSON in request body" })
        };
    }

    const response = await co.chat({
        model: "command-r-plus",
        message: `Evaluate the following profile and return structured feedback: ${JSON.stringify(formData)}.
                    Respond with:
                    1. A brief profile summary (2–3 sentences).
                    2. Exactly two new skill areas the user could consider learning, based on their current experience.`,
        responseFormat: {
            type: "json_object",
            schema: {
                type: "object",
                properties: {
                    summary: { type: "string" },
                    suggested_skills: {
                        type: "array",
                        items: { type: "string" }
                    }
                },
                required: ["summary", "suggested_skills"]
            }
        }
    });

    return {
        statusCode: 200,
        body: JSON.stringify(response)
    };
};