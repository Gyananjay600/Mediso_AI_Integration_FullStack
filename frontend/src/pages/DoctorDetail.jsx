import { Link, useParams } from "react-router-dom";
import PageHero from "../components/PageHero";
import { doctors } from "../data/content";

export default function DoctorDetail() {
  const { slug } = useParams();
  const doctor = doctors.find((d) => d.slug === slug);

  if (!doctor) {
    return (
      <div className="container-x py-24 text-center">
        <h1 className="text-2xl font-display font-semibold mb-4">Doctor not found</h1>
        <Link to="/doctors" className="btn-primary inline-flex">Back to Doctors</Link>
      </div>
    );
  }

  return (
    <div>
      <PageHero eyebrow={doctor.role} title={doctor.name} />
      <section className="container-x py-20 grid md:grid-cols-3 gap-10">
        <div className="card h-64 bg-primary/15 flex items-center justify-center text-primary font-display font-semibold text-4xl">
          {doctor.name.split(" ").map((n) => n[0]).join("")}
        </div>
        <div className="md:col-span-2">
          <h2 className="text-2xl font-display font-semibold mb-3">About Dr. {doctor.name}</h2>
          <p className="text-ink/60 leading-relaxed mb-4">
            Dr. {doctor.name} is a highly regarded {doctor.role.toLowerCase()} at Mediso, known
            for a compassionate, patient-first approach and years of clinical excellence.
          </p>
          <p className="text-ink/60 leading-relaxed mb-8">
            Book an appointment to discuss your care needs and get a personalized treatment plan.
          </p>
          <Link to="/contact" className="btn-primary">Book Appointment</Link>
        </div>
      </section>
    </div>
  );
}
