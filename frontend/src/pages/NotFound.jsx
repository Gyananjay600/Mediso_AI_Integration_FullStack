import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="container-x py-32 text-center">
      <h1 className="text-6xl font-display font-bold text-primary mb-4">404</h1>
      <h2 className="text-2xl font-display font-semibold mb-3">Page not found</h2>
      <p className="text-ink/60 max-w-md mx-auto mb-8">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Link to="/" className="btn-primary">Back to Home</Link>
    </div>
  );
}
