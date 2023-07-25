import React, { Suspense, lazy } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import "./App.css";

import {
  HomePage,
  ContentPage,
  Forbidden,
  UnitOverview,
  CourseOverview,
  NotFound,
  TokenExchange,
} from "./containers";
import {
  RequireAuth,
  LogInForm,
  RegistrationForm,
  ResourcesSection,
  Layout,
  AlertBox,
  CourseForm,
  ChapterForm,
  LessonForm,
  UnitForm,
  ResourceForm,
} from "./components";

// LAZY LOADED COMPONENTS.
const QuillEditor = lazy(() =>
  import("./components/MediaHandlers/QuillEditor.jsx")
);
const CommentsSection = lazy(() =>
  import("./components/Sections/CommentsSection.jsx")
);
const TutorDashboard = lazy(() =>
  import("./containers/Tutor/TutorDashboard.jsx")
);
const TutorUnitsPage = lazy(() =>
  import("./containers/Tutor/TutorUnitsPage.jsx")
);
const AdminDashboard = lazy(() =>
  import("./containers/Admin/AdminDashboard.jsx")
);
const UsersPage = lazy(() => import("./containers/Admin/UsersPage.jsx"));
const UsersLayout = lazy(() =>
  import("./containers/UsersPage/UsersLayout.jsx")
);
const DraftPage = lazy(() => import("./containers/DraftPage.jsx"));
const CourseAdminPage = lazy(() =>
  import("./containers/Admin/CourseAdminPage.jsx")
);

function App() {
  const location = useLocation();
  // const background = location.state && location.state.background;
  const background = location?.state?.background;
  const roles = JSON.parse(localStorage.getItem("roles"));

  // AUTHENTICATION REFERENCE.
  // {
  //   student:"EM-201",
  //   tutor:"EM-202",
  //   admin :"EM-203",
  // }

  return (
    <div className="flex w-full h-screen">
      <AlertBox />
      <Suspense
        fallback={
          <div className="fixed w-screen h-screen flex-col-centered bg-slate-300">
            <p className="phone:text-2xl tablet:text-4xl laptop:text-6xl uppercase font-bold font-sans text-slate-700">
              ELIMU HUB
            </p>
          </div>
        }
      >
        <Routes location={background || location}>
          {/* GENERAL ROUTES */}
          <Route exact path="*" element={<NotFound />}></Route>
          <Route exact path="forbidden" element={<Forbidden />} />
          <Route path="/log-in" element={<LogInForm />} />
          <Route path="/draft" element={<DraftPage />} />
          <Route path="/fetchToken" element={<TokenExchange />} />
          <Route exact path="/new-lesson" element={<LessonForm />} />

          <Route element={<UsersLayout />}>
            <Route exact path="/" element={<HomePage />}></Route>
            <Route
              element={
                <RequireAuth allowedRoles={["EM-201", "EM-202", "EM-203"]} />
              }
            >
              <Route
                exact
                path="/course/:courseID"
                element={<CourseOverview />}
              ></Route>
              <Route
                exact
                path="/unit-overview/:unitID"
                element={<UnitOverview />}
              />
              <Route exact path="/unit/:unitID" element={<ContentPage />}>
                <Route index element={<QuillEditor />} />
                <Route exact path="comments" element={<CommentsSection />} />
                <Route exact path="resources" element={<ResourcesSection />} />
              </Route>
            </Route>
          </Route>

          {/* TUTOR ROUTES */}

          {roles?.includes("EM-202") && (
            <Route element={<RequireAuth allowedRoles={["EM-202"]} />}>
              <Route exact path="/tutor" element={<Layout role="EM-202" />}>
                <Route index element={<TutorDashboard />} />
                <Route exact path="units" element={<TutorUnitsPage />} />
              </Route>

              <Route exact path="/tutor/unit/:unitID" element={<ContentPage />}>
                <Route index element={<QuillEditor />} />
                <Route exact path="comments" element={<CommentsSection />} />
                <Route exact path="resources" element={<ResourcesSection />} />
              </Route>
            </Route>
          )}

          {/* ADMIN ROUTES */}
          {roles?.includes("EM-203") && (
            <Route
              element={<RequireAuth allowedRoles={["EM-203", "EM-201"]} />}
            >
              <Route exact path="/admin" element={<Layout role="EM-203" />}>
                <Route index element={<AdminDashboard />} />
                <Route exact path=":role" element={<UsersPage />} />
                <Route exact path="courses">
                  <Route index element={<CourseAdminPage />} />
                  <Route
                    exact
                    path=":courseID"
                    element={<CourseOverview />}
                  ></Route>
                </Route>
              </Route>
            </Route>
          )}
        </Routes>
      </Suspense>

      {/* SECOND PAIR OF ROUTES - For anything needing a background */}

      {background && (
        <Routes>
          <Route path="/log-in" element={<LogInForm />} />
          <Route exact path="/new-user" element={<RegistrationForm />} />
          <Route exact path="/new-course" element={<CourseForm />} />
          <Route exact path="/new-unit" element={<UnitForm />} />
          <Route exact path="/new-chapter" element={<ChapterForm />} />
          <Route exact path="/new-lesson" element={<LessonForm />} />
          <Route exact path="/new-resource" element={<ResourceForm />} />
        </Routes>
      )}
    </div>
  );
}
export default App;
