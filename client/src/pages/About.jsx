import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import Container from "../components/layout/Container";
import Accordion from "../components/ui/Accordion";
import Carousel from "../components/ui/Carousel";

const About = () => {
  return (
    <>
      <Header />

      <section className="bg-background py-20 min-h-screen">
        <Container>
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-brand mb-4">
              About MeetConnect
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              MeetConnect is a modern mock interview scheduling platform
              designed to help students practice, track, and improve their
              interview performance with structured guidance.
            </p>
          </div>

          {/* Features */}
          <div className="grid md:grid-cols-3 gap-8 mb-20">
            {[
              "Structured Interview Scheduling",
              "Performance Tracking",
              "Practice Resources",
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-xl shadow border border-borderColor text-center"
              >
                <h3 className="text-xl font-semibold mb-2">{feature}</h3>
                <p className="text-gray-500">
                  Designed with simplicity and efficiency in mind.
                </p>
              </div>
            ))}
          </div>

          {/* Testimonials Carousel */}
          <div className="mb-20">
            <h2 className="text-3xl font-bold mb-6 text-center">
              What Our Users Say
            </h2>
            <Carousel />
          </div>

          {/* Team Section */}
          <div className="text-center mb-20">
            <h2 className="text-3xl font-bold mb-10">Our Team</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { name: "Daniel Brown", image: "/images/daniel.png" },
                { name: "Miyang Chan", image: "/images/miyang.png" },
                { name: "Yash Gupta", image: "/images/yash.png" },
              ].map((member, index) => (
                <div
                  key={index}
                  className="bg-white p-6 rounded-xl shadow border border-borderColor transition-transform hover:-translate-y-1 hover:shadow-lg"
                >
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-24 h-24 object-cover rounded-full mx-auto mb-4 border-2 border-brand/20 shadow-sm"
                  />
                  <h3 className="font-bold text-lg mb-1">{member.name}</h3>
                  <p className="text-gray-500 text-sm font-medium">
                    Software Engineer
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* FAQ Section */}
          <div className="mt-20">
            <h2 className="text-3xl font-bold mb-6 text-center">FAQs</h2>
            <div className="max-w-3xl mx-auto">
              <Accordion
                question="How do I schedule an interview?"
                answer="Go to dashboard and fill the schedule form."
              />
              <Accordion
                question="Can I track completed interviews?"
                answer="Yes, go to My Interviews and filter by completed."
              />
              <Accordion
                question="Is MeetConnect free to use?"
                answer="Yes, MeetConnect is designed as a student-friendly platform."
              />
            </div>
          </div>
        </Container>
      </section>

      <Footer />
    </>
  );
};

export default About;
