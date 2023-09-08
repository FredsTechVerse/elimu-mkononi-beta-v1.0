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
  AdminSummary,
} from "./containers";
import {
  RequireAuth,
  LogInForm,
  UserForm,
  ResourcesSection,
  ContentSection,
  AlertBox,
  CourseForm,
  ChapterForm,
  LessonForm,
  UnitForm,
  ReactPdf,
  MessageForm,
  ResourceForm,
  ForgotPasswordForm,
  PasswordUpdateForm,
  ResetTokenVerificationForm,
  UserCredentialsConfirmationForm,
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
          <Route exact path="/new-user" element={<UserForm />} />
          <Route path="/log-in" element={<LogInForm />} />
          <Route path="/draft" element={<DraftPage />} />
          <Route path="/fetchToken" element={<TokenExchange />} />
          <Route exact path="/new-message" element={<MessageForm />} />

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

              <Route element={<ContentPage />}>
                <Route
                  exact
                  path="/unit-overview/:unitID"
                  element={<UnitOverview />}
                />
                <Route exact path="/unit/:unitID" element={<ContentSection />}>
                  <Route index element={<QuillEditor />} />
                  <Route exact path="comments" element={<CommentsSection />} />
                </Route>
                <Route
                  exact
                  path="/resources/:unitID"
                  element={<ResourcesSection />}
                />
              </Route>
            </Route>
          </Route>

          {/* TUTOR ROUTES */}
          {roles?.includes("EM-202") && (
            <Route element={<RequireAuth allowedRoles={["EM-202"]} />}>
              <Route exact path="/tutor" element={<TutorDashboard />} />
            </Route>
          )}

          {/* ADMIN ROUTES */}
          {roles?.includes("EM-203") && (
            <Route element={<RequireAuth allowedRoles={["EM-203"]} />}>
              <Route exact path="/admin" element={<AdminDashboard />}>
                <Route index element={<AdminSummary />} />
                <Route exact path=":role" element={<UsersPage />} />
                <Route exact path="courses" element={<CourseAdminPage />} />
              </Route>
            </Route>
          )}
        </Routes>
      </Suspense>

      {/* SECOND PAIR OF ROUTES - For anything needing a background */}

      {background && (
        <Routes>
          <Route path="/log-in" element={<LogInForm />} />
          <Route exact path="/new-user" element={<UserForm />} />
          <Route exact path="/new-course" element={<CourseForm />} />
          <Route exact path="/new-unit" element={<UnitForm />} />
          <Route exact path="/new-chapter" element={<ChapterForm />} />
          <Route exact path="/new-lesson" element={<LessonForm />} />
          <Route exact path="/new-resource" element={<ResourceForm />} />
          <Route exact path="/new-message" element={<MessageForm />} />
          <Route
            exact
            path="/view-resource/:resourceUrl"
            element={<ReactPdf />}
          />
          <Route
            exact
            path="/account-confirmation"
            element={<UserCredentialsConfirmationForm />}
          />
          <Route
            exact
            path="/forgot-password"
            element={<ForgotPasswordForm />}
          />
          <Route
            exact
            path="/reset-token"
            element={<ResetTokenVerificationForm />}
          />
          <Route
            exact
            path="/update-password"
            element={<PasswordUpdateForm />}
          />
        </Routes>
      )}
    </div>
  );
}
export default App;
