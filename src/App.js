import "./App.css";
import { Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from "./views/Login";
import Home from "./views/Home/Home";
import Profile from "./views/Profile/Profile";
import GroupsList from "./views/Groups/GroupsList";
import HomeGroup from "./views/Groups/HomeGroup";
import Chat from "./views/Chat/Chat";
import SingleGroup from "./views/Groups/SingleGroup";

function App() {
  // (!!): to convert the value to a boolean
  const isAuthenticated = !!localStorage.getItem('session');
  console.log(isAuthenticated);
  return (
    <Routes>
    {isAuthenticated ? (
        <Route path="/" element={<Home />} />
      ) : (
        <Route path="/" element={<Navigate replace to="/login" />} />
      )}
    <Route path="/login" element={<Login />} />
  </Routes>
    // <Home />
    // <Profile />
    // <GroupsList />
    // <HomeGroup />
    //<Chat />
    // <SingleGroup />

//     <Route
//   path="project/new"
//   action={async ({ request }) => {
//     const data = await request.formData();
//     const newProject = await createProject(data);
//     // it's common to redirect after actions complete,
//     // sending the user to the new record
//     return redirect(`/projects/${newProject.id}`);
//   }}
// />
  );
}

export default App;


//TODO: Add a 404 page
function NoMatch() {
  return (
    <div style={{ padding: 20 }}>
      <h2>404: Page Not Found</h2>
      <p>Lorem ipsum dolor sit amet, consectetur adip.</p>
    </div>
  );
}