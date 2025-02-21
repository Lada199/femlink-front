import React from "react"
import { createRoot } from "react-dom/client"
import { Provider } from "react-redux"
import { store } from "./app/store"
import "./index.css"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { Auth } from "./pages/auth"
import { Layout } from "./components/layout"
import { Posts } from "./pages/posts"
import { CurrentPost } from "./pages/current-post"
import { UserProfile } from "./pages/user-profile"
import { AddEvent } from "./pages/add-event"
import { AuthGuard } from "./features/user/authGuard"


const container = document.getElementById("root")
const router = createBrowserRouter([
  {
    path: '/auth',
    element: <Auth />
  },
  {
    path: '/',
    element:<Layout />,
    children: [
      {
        path: "",
        element: <Posts />
      },
      {
        path: "add-event",
        element: <AddEvent />
      },
      {
        path: "posts/:id",
        element:  <CurrentPost />
      },
      {
        path: 'users/:id',
        element: <UserProfile />
      },
    ]
  }
])

if (container) {
  const root = createRoot(container)

  root.render(
    <React.StrictMode>
      <Provider store={store}>
        <AuthGuard>
        
        <RouterProvider router={router} />

        </AuthGuard>
      </Provider>
    </React.StrictMode>,
  )
} else {
  throw new Error(
    "Root element with ID 'root' was not found in the document. Ensure there is a corresponding HTML element with the ID 'root' in your HTML file.",
  )
}
