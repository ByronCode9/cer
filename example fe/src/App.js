import "./App.css";
import { MobileMenusProvider } from "./context/MobileMenuContext";
import AppRoutes from "./routes/AppRoutes";

function App() {
  return (
    <MobileMenusProvider>
      <div className="App">
        <AppRoutes />
      </div>
    </MobileMenusProvider>
  );
}

export default App;
