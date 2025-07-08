import type { Handler } from '@netlify/functions';
import { CohereClient } from "cohere-ai";

// Initialize the Cohere client with the API key from environment variables
const co = new CohereClient({
    token: process.env.COHERE_API_KEY
});

// Netlify serverless function handler
export const handler: Handler = async (event) => {
    // Parse form data from the request body
    let formData;
    try {
        // Attempt to parse the incoming JSON body
        formData = JSON.parse(event.body || '{}');
    } catch (e) {
        // Return a 400 error if the JSON is invalid
        return {
            statusCode: 400,
            body: JSON.stringify({ error: "Invalid JSON in request body" })
        };
    }

    // Send the profile data to Cohere's chat API for evaluation
    const response = await co.chat({
        model: "command-r-plus",
        message: `Evaluate the following profile and return structured feedback: ${JSON.stringify(formData)}.
                    Respond with:
                    1. A brief profile summary (2–3 sentences).
                    2. Exactly two new skill areas the user could consider learning, based on their current experience.`,
        // Specify the expected response format and schema
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

    // Return the structured feedback as a JSON response
    return {
        statusCode: 200,
        body: JSON.stringify(response)
    };
};