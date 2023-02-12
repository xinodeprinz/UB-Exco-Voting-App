import { createBrowserRouter } from "react-router-dom";
import Campaign from "../pages/campaign";
import Candidates from "../pages/candidates";
import Error from "../pages/error";
import Home from "../pages/home";
import Login from "../pages/login";
import Posts from "../pages/posts";
import About from '../pages/about'

const router = createBrowserRouter([{
  path: "/",
  element: < Login />,
  errorElement: < Error />
},
{
  path: "/posts",
  element: < Posts />,
},
{
  path: "/faculty/:post/candidates",
  element: < Candidates />,
},
{
  path: "/department/:post/candidates",
  element: < Candidates />,
},
{
  path: "/elections",
  element: < Candidates isElection={true}
  />,
},
{
  path: "/winners",
  element: < Candidates isWinner={true}
  />,
},
{
  path: "/campaign",
  element: < Campaign />,
},
{
  path: "/home",
  element: < Home />,
},
{
  path: "/:post/about",
  element: < About />,
},
]);

export default router;