// Import the components for both approaches
import DummyJsonTodos from "../components/DummyJsonTodos";

export default function Home() {
  return (
    <>
      {/* 
        Choose your approach by commenting/uncommenting one of the components below:
        
        1. JsonServerTodos: Uses local json-server (requires running 'npx json-server db.json --port 3001')
           - Pros: Full control, data persists locally, real CRUD operations
           - Cons: Requires setup, server dependency
        
        2. DummyJsonTodos: Uses external DummyJSON API (no setup required)
           - Pros: No setup, works immediately, no server needed
           - Cons: Changes are simulated only, data doesn't persist
      */}

      {/* Option 1: JSON-Server Approach (requires local server) */}
      {/* <JsonServerTodos /> */}

      {/* Option 2: DummyJSON Approach (no setup required) */}
      <DummyJsonTodos />
    </>
  );
}
