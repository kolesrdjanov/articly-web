import { Routes, Route, Outlet, NavLink } from "react-router-dom"
import Categories from "./views/Categories.jsx"
import Articles from "./views/Articles.jsx"
import ArticleDetails from "./views/ArticleDetails.jsx"

export default function App() {
  return (
    <div>
      <Routes>
        <Route path="/" redirect='/categories' element={<Layout />}>
          <Route path="categories" element={<Categories />} />
          <Route path="articles" element={<Articles />} />
          <Route path="articles/new" element={<ArticleDetails />} />
          <Route path="articles/:id" element={<ArticleDetails />} />
          <Route path="*" element={<NoMatch />} />
        </Route>
      </Routes>
    </div>
  );
}

function Layout() {
  return (
    <div className="min-h-screen  flex flex-row">
      <nav className="navigation py-10">
        <ul className="flex flex-col">
          <li>
            <NavLink to="/categories">Categories</NavLink>
          </li>
          <li>
            <NavLink to="/articles">Articles</NavLink>
          </li>
        </ul>
      </nav>

      <div className="p-10 w-full">
        <Outlet />
      </div>
    </div>
  );
}

function NoMatch() {
  return (
    <div>
      <h2>Nothing to see here!</h2>
      <p>
        <NavLink to="/categories">Go to the home page</NavLink>
      </p>
    </div>
  );
}