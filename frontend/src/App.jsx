import Navbar from "./components/Navbar";
import StudentCard from "./components/StudentCard.jsx";
import Counter from "./components/Counter.jsx";
import LoginForm from "./components/LoginForm.jsx";
import Dashboard from "./components/Dashboard.jsx";

function App() {
  return (
      <div>
        <Navbar/>
        <LoginForm />
          <Dashboard />

        <StudentCard
            name="Rahul"
            department="CSE"
            cgpa="9.5"
        />

        <StudentCard
            name="Arjun"
            department="AIML"
            cgpa="9.1"
        />

        <StudentCard
            name="Manoj"
            department="AIML"
            cgpa="8.9"
        />

      </div>
  );
}


export default App
