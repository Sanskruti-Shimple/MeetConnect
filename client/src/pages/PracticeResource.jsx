import { useState, useMemo } from "react";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import Container from "../components/layout/Container";
import { FiChevronDown, FiChevronUp, FiAward } from "react-icons/fi";

const questionBank = {
  frontend: [
    { 
      q: "What is the Virtual DOM in React?", 
      a: "The Virtual DOM is a lightweight copy of the actual DOM in memory. React uses it to improve performance by calculating the difference (diffing) between the real DOM and the Virtual DOM, and then updating only the changed elements in the real DOM." 
    },
    { 
      q: "Explain React hooks.", 
      a: 'React hooks are functions that let you "hook into" React state and lifecycle features from functional components. Examples include useState for state management, useEffect for side effects, and useContext for Context API.' 
    },
    { 
      q: "What is useEffect used for?", 
      a: "useEffect is a React hook used to perform side effects in functional components, such as data fetching, subscriptions, or manually changing the DOM. It runs after the component renders." 
    },
    { 
      q: "Difference between state and props?", 
      a: "Props are read-only and passed down from parent to child components to configure them. State is managed within a component and holds data that can change over time, triggering a re-render when updated." 
    },
    { 
      q: "What is event bubbling?", 
      a: "Event bubbling is a concept in the DOM where an event triggered on an element first runs its handlers, then bubbles up to its parent element, and so on, all the way up to the document root." 
    },
    { 
      q: "Explain CSS specificity.", 
      a: "CSS specificity determines which CSS rule applies when multiple rules target the same element. It calculates weight based on ID selectors (highest), classes/attributes/pseudo-classes, and elements/pseudo-elements (lowest). Inline styles trump all." 
    },
    { 
      q: "What is responsive design?", 
      a: "Responsive design is an approach to web development that ensures web pages render well on a variety of devices and window sizes, typically achieved using CSS media queries and flexible grid layouts." 
    },
    { 
      q: "Difference between let, var, and const?", 
      a: "var is function-scoped and can be re-declared. let is block-scoped and can be updated but not re-declared. const is block-scoped and cannot be updated or re-declared, representing a constant reference." 
    },
    { 
      q: "What is JSX?", 
      a: "JSX stands for JavaScript XML. It is a syntax extension for React that allows developers to write HTML elements in JavaScript and place them in the DOM without using standard JavaScript createElement() functions." 
    },
    { 
      q: "Explain controlled components in React.", 
      a: "Controlled components are form elements whose value is dictated by the React component's state. The component renders the form and also controls what happens in that form on subsequent user input." 
    },
    { 
      q: "What is React reconciliation?", 
      a: "Reconciliation is React's process for updating the UI. When a component's state or props change, React creates a new Virtual DOM tree and compares it to the previous one to efficiently figure out how to update the real DOM." 
    },
    { 
      q: "Explain lazy loading in React.", 
      a: "Lazy loading in React (often via React.lazy and Suspense) is a technique where components or specific chunks of code are only loaded dynamically when they are needed, reducing the initial load time of the application." 
    },
    { 
      q: "What are keys in React?", 
      a: "Keys are special string attributes needed when rendering lists of elements. They help React identify which items have changed, been added, or been removed, ensuring efficient matching of Virtual DOM nodes." 
    },
    { 
      q: "What is debouncing?", 
      a: "Debouncing is a programming practice used to ensure that time-consuming tasks do not fire so often. It limits the rate at which a function is executed by delaying it until a certain amount of time has passed since it was last called." 
    }
  ],

  backend: [
    { 
      q: "What is a REST API?", 
      a: "REST (REpresentational State Transfer) is an architectural style for APIs that uses standard HTTP methods (GET, POST, PUT, DELETE) and treats data as resources, represented primarily via JSON." 
    },
    { 
      q: "Explain middleware in Express.", 
      a: "Middleware functions are functions in an Express app that have access to the request object (req), response object (res), and the next middleware function. They can execute code, modify requests/responses, and end the cycle." 
    },
    { 
      q: "What is JWT authentication?", 
      a: "JSON Web Token (JWT) is a standard for securely transmitting information between parties as a JSON object. In authentications, a server signs a token and issues it to a client, which includes it in subsequent requests to prove logged-in identity." 
    },
    { 
      q: "Difference between SQL and NoSQL?", 
      a: "SQL databases are relational and table-based with predefined schemas, ideal for complex queries. NoSQL databases are non-relational and document/key-value/graph-based with dynamic schemas, ideal for unstructured data and scaling." 
    },
    { 
      q: "What is indexing in a database?", 
      a: "Indexing is a data structure technique used to quickly locate and access data in a database table. It acts like the index of a book, speeding up SELECT queries at the cost of slower writes and more storage." 
    },
    { 
      q: "What is rate limiting?", 
      a: "Rate limiting is a strategy used to control the amount of incoming traffic to an API or network. It protects the backend from being overwhelmed by too many requests, whether from malicious DDoS attacks or bugs." 
    },
    { 
      q: "Explain MVC architecture.", 
      a: "MVC (Model-View-Controller) is a design pattern that separates an application into three main components: Models (data handling logic), Views (UI), and Controllers (handles input and transfers data between Model and View)." 
    },
    { 
      q: "What is CORS?", 
      a: "Cross-Origin Resource Sharing (CORS) is an HTTP-header based security mechanism that allows a server to indicate any origins (domain, scheme, or port) other than its own from which a browser should permit loading resources." 
    },
    { 
      q: "Explain hashing.", 
      a: "Hashing is the process of translating a given key or string into another fixed-length value. Unlike encryption, hashing is strictly a one-way mathematical function primarily used for safely storing passwords." 
    },
    { 
      q: "Difference between authentication and authorization?", 
      a: "Authentication verifies who a user is (e.g., login). Authorization verifies what resources a logged-in user is allowed to access or modify (e.g., admin permissions vs regular user)." 
    },
    { 
      q: "Explain the event loop in Node.js.", 
      a: "Node.js is single-threaded, but the event loop allows it to perform non-blocking I/O operations by offloading deep asynchronous operations to the system kernel whenever possible, continuing to execute normal code in the meantime." 
    },
    { 
      q: "Difference between PUT and PATCH?", 
      a: "In REST, PUT implies a complete replacement of a resource document, while PATCH implies a partial modification, updating only the specific fields provided in the body payload." 
    },
    { 
      q: "What is ORM?", 
      a: "Object-Relational Mapping (ORM) is a technique that lets you query and manipulate databases using an object-oriented paradigm. Examples include Prisma or Sequelize in Node.js, eliminating manual SQL string queries." 
    }
  ],

  fullstack: [
    { 
      q: "Explain the MERN architecture.", 
      a: "MERN is a full-stack JavaScript stack comprising MongoDB (NoSQL DB), Express.js (backend web framework), React (frontend library), and Node.js (JavaScript runtime engine server)." 
    },
    { 
      q: "How does the frontend communicate with the backend?", 
      a: "The frontend interacts with the backend by making HTTP requests (e.g., using Axios or Fetch APIs) to specific RESTful endpoints or GraphQL schemas hosted on the backend server, sending and receiving primarily JSON." 
    },
    { 
      q: "What is global state management?", 
      a: "State management refers to managing the data that dictates an application's behavior and rendering. Libraries like Redux, Zustand, or React Context provide centralized stores so data can be accessed deeply across the app." 
    },
    { 
      q: "Explain CI/CD.", 
      a: "Continuous Integration / Continuous Deployment is a DevOps practice where developers frequently merge code to a central branch, triggering automated tests (CI) and potentially automatic releases to production servers (CD)." 
    },
    { 
      q: "How do you secure APIs?", 
      a: "APIs are secured usingHTTPS, implementing strong authentication standards (like JWT or OAuth 2.0), validating/sanitizing inputs, enforcing rate limits, disabling CORS wide-open configurations, and using environment secrets." 
    },
    { 
      q: "Explain microservices architecture.", 
      a: "Microservices architecture separates an application into small, loosely coupled, independently deployable services that communicate over a network (like HTTP), in contrast to a tightly combined monolith application." 
    },
    { 
      q: "How do you optimally handle errors globally?", 
      a: "In the backend, write custom Express centralized error handling middleware. In the frontend, use Axios interceptors to trap 4xx/5xx responses globally and handle them using UI popups (toast notifications) or redirects, plus React Error Boundaries." 
    },
    { 
      q: "What is SSR vs CSR?", 
      a: "Client-Side Rendering (CSR) renders a blank page and uses JS to build the UI in the browser. Server-Side Rendering (SSR) compiles the initial HTML on the server and sends a fully baked page to the browser first, boosting SEO." 
    },
    { 
      q: "What are Docker containers?", 
      a: "Docker containers wrap an application and all its critical system dependencies into a single isolated package that guarantees standard, identical behavior across any operating system or hosting environment." 
    },
    { 
      q: "What is horizontal vs vertical scaling?", 
      a: "Vertical scaling refers to adding more power (CPU, RAM) to an existing machine to handle more load. Horizontal scaling means adding more concurrent machines (nodes/servers) and balancing traffic across them." 
    }
  ],

  behavioral: [
    { 
      q: "Tell me about yourself.", 
      a: "Focus on your recent professional timeline. Use the Present-Past-Future formula: what you currently do, how your past experiences led you there (high-level achievements), and what future goals align you with the company." 
    },
    { 
      q: "Describe a challenge you faced and how you overcame it.", 
      a: "Use the STAR method (Situation, Task, Action, Result). Outline a specific technical or professional crisis, detail the specific actions YOU took to formulate a solution, and quantify the positive end-result achieved." 
    },
    { 
      q: "How do you handle conflict with a coworker?", 
      a: "Highlight empathy, objective reasoning, and calm mediation. Explain that you strive to understand their perspective, rely on factual data or documentation instead of opinions, and bring in management lightly only as a final resort." 
    },
    { 
      q: "What are your weaknesses?", 
      a: "Pick a genuine but completely fixable weakness that isn't fatal to the role (e.g., getting too wrapped up in minor details, or struggling with public speaking). Most importantly, spend 80% of the answer explaining how you proactively work to improve it." 
    },
    { 
      q: "Why should we hire you?", 
      a: "Merge your technical specificities directly with their business needs. 'You are looking for someone to migrate your stack to React without downtime. Not only did I lead a similar migration at Company X, but I heavily admire your product pipeline." 
    },
    { 
      q: "Where do you see yourself in 5 years?", 
      a: "Employers want to see stability and ambition. Formulate an answer based on becoming a deep contributor or leader within their specific domain. E.g., 'I see myself as a senior architect leading a team to scale products just like yours.'" 
    },
    { 
      q: "Describe a difficult project.", 
      a: "Employers use this to gauge your definition of 'difficult'. Focus on a project that had shifting requirements or scale problems. Explain how you communicated with stakeholders, broke down the problem into smaller milestones, and delivered it anyway." 
    },
    { 
      q: "How do you accept critical feedback?", 
      a: "Show that you decouple your ego from your code. Emphasize that you value peer code-reviews and feedback because it prevents catastrophic bugs from reaching production and represents the fastest way to learn new paradigms." 
    }
  ]
};

const QuestionCard = ({ item, index }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`overflow-hidden rounded-2xl border transition-all duration-300 ${isOpen ? 'border-indigo-400 shadow-md ring-4 ring-indigo-50' : 'border-slate-200 shadow-sm bg-white hover:border-slate-300'}`}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full text-left p-6 flex justify-between items-start focus:outline-none transition-colors ${isOpen ? 'bg-indigo-50/50' : 'bg-white'}`}
      >
        <div className="flex items-start">
           <div className={`flex items-center justify-center font-bold h-8 w-8 rounded-full mr-4 shrink-0 transition-colors ${isOpen ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-500'}`}>
             {index + 1}
           </div>
           <h3 className={`text-lg font-bold pt-1 ${isOpen ? 'text-indigo-900' : 'text-slate-800'}`}>
             {item.q}
           </h3>
        </div>
        <div className={`p-2 rounded-full shrink-0 ml-4 ${isOpen ? 'bg-indigo-100 text-indigo-600' : 'bg-slate-50 text-slate-400'}`}>
          {isOpen ? <FiChevronUp /> : <FiChevronDown />}
        </div>
      </button>

      <div 
        className={`transition-all duration-300 ease-in-out px-6 border-t border-slate-100 bg-white
          ${isOpen ? 'max-h-96 opacity-100 py-6' : 'max-h-0 opacity-0 py-0 border-t-0'}`}
      >
        <div className="flex">
          <div className="w-8 mr-4 shrink-0 flex justify-center">
            <div className="w-0.5 h-full bg-indigo-100 pt-2"></div>
          </div>
          <div className="text-slate-600 leading-relaxed font-medium">
             <span className="text-indigo-600 font-bold block mb-1">Expert Answer:</span>
             {item.a}
          </div>
        </div>
      </div>
    </div>
  );
};

const PracticeResource = () => {
  const [category, setCategory] = useState("frontend");
  const [currentPage, setCurrentPage] = useState(1);
  const questionsPerPage = 6;

  // Since we replaced the array of strings with an array of objects ({q, a}),
  // we just return the items without needing a complex string shuffle right now.
  // Although we can still shuffle the objects if needed!
  const questions = useMemo(() => {
    return [...questionBank[category]];
    // .sort(() => 0.5 - Math.random()) // Optional shuffle if desired
  }, [category]);

  const handleCategoryChange = (cat) => {
    setCategory(cat);
    setCurrentPage(1);
  };

  const currentQuestions = questions.slice(
    (currentPage - 1) * questionsPerPage,
    currentPage * questionsPerPage
  );
  
  const totalPages = Math.ceil(questions.length / questionsPerPage);

  const categories = [
    { id: "frontend", label: "Frontend", color: "text-blue-600", bg: "bg-blue-50", border: "border-blue-200" },
    { id: "backend", label: "Backend", color: "text-emerald-600", bg: "bg-emerald-50", border: "border-emerald-200" },
    { id: "fullstack", label: "Full Stack", color: "text-purple-600", bg: "bg-purple-50", border: "border-purple-200" },
    { id: "behavioral", label: "Behavioral", color: "text-orange-600", bg: "bg-orange-50", border: "border-orange-200" }
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <Header />

      <main className="flex-grow py-12">
        <Container>

          <div className="bg-white rounded-3xl p-10 md:p-14 mb-10 shadow-sm border border-slate-200 text-center relative overflow-hidden">
             <div className="absolute top-0 right-0 p-8 transform translate-x-1/2 -translate-y-1/2">
                <div className="w-64 h-64 bg-indigo-50 rounded-full blur-3xl opacity-60"></div>
             </div>
             <div className="absolute bottom-0 left-0 p-8 transform -translate-x-1/2 translate-y-1/2">
                <div className="w-64 h-64 bg-blue-50 rounded-full blur-3xl opacity-60"></div>
             </div>
             
             <div className="relative z-10 max-w-3xl mx-auto">
                <span className="inline-block py-1.5 px-4 rounded-full bg-indigo-100 text-indigo-700 font-bold text-sm tracking-wide mb-6 uppercase">
                   Interview Prep
                </span>
                <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-6">
                  Master the top interview questions
                </h1>
                <p className="text-xl text-slate-500 leading-relaxed mb-10">
                  Select a targeted technical discipline below to practice real-world questions and study expertly crafted answers.
                </p>
                
                <div className="flex flex-wrap justify-center gap-4">
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => handleCategoryChange(cat.id)}
                      className={`px-6 py-3 rounded-xl font-bold transition-all text-sm md:text-base border ${
                        category === cat.id
                          ? `bg-indigo-600 text-white border-indigo-600 shadow-lg shadow-indigo-200 transform scale-105`
                          : `bg-white text-slate-600 border-slate-200 hover:border-slate-300 hover:bg-slate-50 hover:shadow-sm`
                      }`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>
             </div>
          </div>

          <div className="flex items-center justify-between mb-8">
             <h2 className="text-2xl font-bold text-slate-800 flex items-center capitalize">
               <FiAward className="text-indigo-500 mr-2" />
               {category} Module
             </h2>
             <p className="text-sm font-semibold text-slate-500 bg-white px-4 py-2 rounded-lg border border-slate-200 shadow-sm">
                {questions.length} Total Questions
             </p>
          </div>

          <div className="flex flex-col gap-5 mb-12">
            {currentQuestions.map((quizItem, index) => (
              <QuestionCard 
                key={index} 
                item={quizItem} 
                index={(currentPage - 1) * questionsPerPage + index} 
              />
            ))}
          </div>

          {totalPages > 1 && (
            <div className="flex justify-center items-center space-x-2 pb-10">
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`w-12 h-12 flex items-center justify-center font-bold rounded-2xl transition-all ${
                    currentPage === i + 1
                      ? "bg-indigo-600 text-white shadow-lg shadow-indigo-200 scale-110"
                      : "bg-white text-slate-600 border border-slate-200 hover:bg-indigo-50 hover:text-indigo-600"
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          )}

        </Container>
      </main>

      <Footer />
    </div>
  );
};

export default PracticeResource;