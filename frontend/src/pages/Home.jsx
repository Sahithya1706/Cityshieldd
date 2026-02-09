import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import FeatureCard from "../components/FeatureCard";

const Home = () => {
  return (
    <div className="page-bg">
      <div className="main-card">
        <Navbar />
        <Hero />

        {/* FEATURES SECTION */}
        <section className="features-section">
          <h2>How CityShield Helps</h2>
          <p className="features-sub">
            A smarter way to monitor, report, and respond to city safety issues
          </p>

          <div className="features-grid">
            <FeatureCard
              icon="📍"
              title="Report Issues"
              desc="Citizens can report civic and safety issues with location details."
            />

            <FeatureCard
              icon="🚨"
              title="Live Alerts"
              desc="Get real-time emergency alerts based on your area."
            />

            <FeatureCard
              icon="📊"
              title="City Dashboard"
              desc="Authorities track alerts, response status, and analytics."
            />

            <FeatureCard
              icon="🗺️"
              title="Safety Map"
              desc="Heatmap showing high-risk and safe zones across the city."
            />
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;
