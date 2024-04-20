export const runtime = 'edge';

export async function POST(request) {
    const {location1, location2} = await request.json();

    const CLOUDFLARE_ACCOUNT_ID = process.env.CLOUDFLARE_ACCOUNT_ID;
    const CLOUDFLARE_AUTH_TOKEN = process.env.CLOUDFLARE_AUTH_TOKEN;

    try {
        const response = await fetch(`https://api.cloudflare.com/client/v4/accounts/${CLOUDFLARE_ACCOUNT_ID}/ai/run/@cf/meta/llama-3-8b-instruct`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${CLOUDFLARE_AUTH_TOKEN}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "messages": [
                    {
                        "role": "system",
                        "content": "You will be presented two apartment location strings. Your task is to compare them and respond with whether they are the same apartment location. Users may format these apartment addresses/locations incorrectly or differently, so different strings may refer to the same apartment/location. Your response must be only json as either {\"equal\": true} or {\"equal\": false}. Do not include any other information in your response.",
                    },
                    {
                        "role": "user",
                        "content": `Location 1: ${location1}. Location 2: ${location2}`,
                    }
                ]
            }),
            duplex: 'half',
        });

        const data = await response.json();

        if (data.success === true) {
            return Response.json(JSON.parse(data.result.response), {status: 200});
        }

        console.error(data);
        return Response.json({error: 'An error occurred'}, {status: 500});
    } catch (error) {
        console.error(error);
        return Response.json({error: 'An error occurred'}, {status: 500});
    }
}


