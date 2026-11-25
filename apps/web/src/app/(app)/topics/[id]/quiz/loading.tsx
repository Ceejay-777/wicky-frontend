// The quiz is written after the page loads, so the server only holds the place.
export default function QuizLoading() {
  return <div className="min-h-dvh" aria-busy="true" aria-label="Loading quiz" />;
}
