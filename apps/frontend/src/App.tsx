import { Button } from "@/components/ui/button";

function App() {
  return (
    <div className="flex flex-col items-center justify-center min-h-svh">
      <Button>Click me</Button>
      <Button variant="destructive">Error</Button>
    </div>
  );
}

export default App;
