import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Message from "./pages/Message/Message";
import Header from "./features/Header/Header";
import Layout from "./pages/Layout";
import Profile from "./pages/Profile";
import ChatAllUsers from "./features/chat/ChatAllUsers/ChatAllUsers";
import ChatSingleUser from "./features/chat/ChatSingleUser/ChatSingleUser";

export default function App() {
  return (
    <div className="flex flex-col min-h-screen  bg-zinc-950 text-zinc-100">
      <Header />

      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />

          <Route path="message" element={<Message />}>
            <Route index element={<ChatAllUsers />} />
            <Route path=":id" element={<ChatSingleUser />} />
          </Route>
          <Route path="message" />
          <Route path="profile" element={<Profile />} />
        </Route>
      </Routes>
    </div>
  );
}
