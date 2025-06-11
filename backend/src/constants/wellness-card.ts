

export const WELLNESS_CARD_GENERATION_SCHEMA = JSON.stringify(
    {
        $defs: {

            title: 'WellnessCard',
            type: 'object',
            properties: {
                quote: {
                    title: 'Motivational Quote',
                    type: 'string',
                },
                action: {
                    title: 'Action Suggestion',
                    type: 'string',
                    description: 'One actionable mental wellness suggestion',
                },
                emoji: {
                    title: 'Emoji',
                    type: 'string',
                    description: 'Visual cue or emotion represented as an emoji',
                },
                category: {
                    title: 'Category',
                    type: 'string',
                    enum: ['anxiety', 'focus', 'motivation', 'calm', 'reflection'],
                },
                saveable: {
                    title: 'Can be saved?',
                    type: 'boolean',
                    default: true,
                },
            },
            required: ['quote', 'action', 'emoji', 'category'],
        },
        properties: {
            wellnessCard: {
                title: 'Wellness Card',
                type: 'array',
                items: {
                    $ref: '#/$defs/WellnessCard',
                },
                minItems: 3,
                maxItems: 10,
            },
        },
        required: ['wellnessCard'],
        title: 'WellnessCardPayload',
        type: 'object',
    },
    null,
    4
);
