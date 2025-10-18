// A mock feedback service for demonstration purposes.
// In a real application, this would send data to a backend server.

export type FeedbackRating = 'good' | 'bad';

export interface FeedbackData {
    feature: string;
    query?: string;
    response: string;
    rating: FeedbackRating;
    comment?: string;
    timestamp: string;
}

/**
 * "Submits" feedback. For this mock, it just logs to the console.
 * @param feedback - The feedback data object.
 * @returns A promise that resolves when the feedback is "sent".
 */
export const submitFeedback = (feedback: Omit<FeedbackData, 'timestamp'>): Promise<void> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const feedbackWithTimestamp: FeedbackData = {
                ...feedback,
                timestamp: new Date().toISOString(),
            };
            console.log('Feedback Submitted:', feedbackWithTimestamp);
            // Here you would typically make an API call, e.g.,
            // fetch('/api/feedback', {
            //     method: 'POST',
            //     headers: { 'Content-Type': 'application/json' },
            //     body: JSON.stringify(feedbackWithTimestamp),
            // });
            resolve();
        }, 500);
    });
};
