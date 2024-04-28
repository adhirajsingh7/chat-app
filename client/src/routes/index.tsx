import ErrorPage from "../pages/Error/Error.page.tsx";
import LoginPage from "../pages/Login/Login.page.tsx";
import ProtectedRoute from "../components/ProtectedRoute";
import SignupPage from "../pages/Signup/Signup.page.tsx";
import { Navigate, createBrowserRouter } from "react-router-dom";
import ChatPage from "../pages/Chat/Chat.page.tsx";
import ChatBoxComponent from "../components/ChatBox/ChatBox.component.tsx";
import TestChat from "../pages/TestChat/TestChat.page.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <ErrorPage />,
    element: <Navigate to="/chat" replace={true} />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/signup",
    element: <SignupPage />,
  },
  {
    path: "/chat",
    element: <ChatPage />,
    children: [
      {
        path: ":user_id",
        element: <ChatBoxComponent />,
      },
    ],
  },
]);

export default router;
