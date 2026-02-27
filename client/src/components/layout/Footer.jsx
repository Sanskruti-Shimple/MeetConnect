import Container from "./Container";

const Footer = () => {
  return (
    <footer className="bg-white border-t border-borderColor py-10 mt-20">
      <Container>
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-bold mb-3">MeetConnect</h3>
            <p className="text-gray-500 text-sm">
              Modern interview preparation platform.
            </p>
          </div>

          <div>
            <h3 className="font-bold mb-3">Quick Links</h3>
            <ul className="text-gray-500 text-sm space-y-1">
              <li>Dashboard</li>
              <li>Practice</li>
              <li>Profile</li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold mb-3">Subscribe</h3>
            <input
              type="email"
              placeholder="Enter email"
              className="border border-borderColor p-2 rounded w-full"
            />
          </div>
        </div>

        <p className="text-center text-gray-400 text-sm mt-8">
          © 2026 MeetConnect. All Rights Reserved.
        </p>
      </Container>
    </footer>
  );
};

export default Footer;