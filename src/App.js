import TestButton from "./components/TestButton";
import { RenderRoutes, ROUTES } from "./routes/routes";
function App() {
  return (
    <>
      <div className="container mx-auto bg-gray-200 rounded-xl shadow border p-8 m-10">
        <TestButton />
        <p className="text-3xl text-gray-700 font-bold mb-5">Welcome!</p>
        <p className="text-gray-500 text-lg">
          React and Tailwind CSS in action
        </p>
      </div>
      <RenderRoutes routes={ROUTES} />
    </>
  );
}
export default App;
