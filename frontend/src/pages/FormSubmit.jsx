import { Link, useLocation } from "react-router-dom";
import { CheckCircle2 } from "lucide-react";

export default function FormSubmit() {
  const location = useLocation();
  const aiNote = location.state?.aiNote;

  return (
    <div className="container-x py-32 text-center">
      <CheckCircle2 size={56} className="text-primary mx-auto mb-6" />
      <h1 className="text-3xl font-display font-semibold mb-3">Thank you!</h1>
      <p className="text-ink/60 max-w-md mx-auto mb-8">
        {aiNote || "Your submission has been received and saved. Our team will get back to you shortly."}
      </p>
      <Link to="/" className="btn-primary">Back to Home</Link>
    </div>
  );
}
