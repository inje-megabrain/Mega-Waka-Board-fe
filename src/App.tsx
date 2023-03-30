import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import BoardHeader from "./components/BoardHeader";
import MainBoard from "./components/MainBoard";
import SettingBoard from "./components/SettingBoard";
import UserBoard from "./components/UserBoard";

function App() {
  const queryClient = new QueryClient();
  return (
    <div>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <BoardHeader />
          <Routes>
            <Route path="/" element={<MainBoard />} />
            <Route path="/setting" element={<SettingBoard />} />
            <Route path="/user/:day/:id" element={<UserBoard />} />
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </div>
  );
}

export default App;
