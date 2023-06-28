import React, { Suspense } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import "./App.css";

import {
  HomePage,
  ContentPage,
  TutorUnitsPage,
  AdminDashboard,
  UsersPage,
  UsersLayout,
  DraftPage,
  CourseAdminPage,
  Forbidden,
  UnitOverview,
  CourseOverview,
  NotFound,
  TutorDashboard,
} from "./containers";
import {
  CourseForm,
  ChapterForm,
  LessonForm,
  UnitForm,
  RequireAuth,
  LogInForm,
  ResourceForm,
  RegistrationForm,
  QuillEditor,
  CommentsSection,
  ResourcesSection,
  Layout,
  AlertBox,
} from "./components";

function App() {
  const location = useLocation();
  const background = location.state && location.state.background;
  // AUTHENTICATION REFERENCE.
  // {
  //   student:"EM-201",
  //   tutor:"EM-202",
  //   admin :"EM-203",
  // }

  return (
    <div className="flex w-full h-screen">
      <AlertBox />
      <Routes location={background || location}>
        {/* GENERAL ROUTES */}
        <Route exact path="*" element={<NotFound />}></Route>
        <Route exact path="forbidden" element={<Forbidden />} />
        <Route path="/log-in" element={<LogInForm />} />
        <Route path="/draft" element={<DraftPage />} />
        <Route element={<UsersLayout />}>
          <Route exact path="/" element={<HomePage />}></Route>
          <Route
            exact
            path="new-student"
            element={<RegistrationForm role={"EM-201"} />}
          />
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

        <Route element={<RequireAuth allowedRoles={["EM-202"]} />}>
          <Route exact path="/tutor" element={<Layout role="EM-202" />}>
            <Route index element={<TutorDashboard />} />
            <Route exact path="units" element={<TutorUnitsPage />} />
            <Route exact path="chapter" element={<ChapterForm />} />
            <Route exact path="lesson" element={<LessonForm />} />
          </Route>
        </Route>

        <Route element={<RequireAuth allowedRoles={["EM-202"]} />}>
          <Route exact path="/tutor/unit/:unitID" element={<ContentPage />}>
            <Route index element={<QuillEditor />} />
            <Route exact path="comments" element={<CommentsSection />} />
            <Route exact path="resources" element={<ResourcesSection />} />
          </Route>
          <Route
            exact
            path="/tutor/unit/:unitID/resources/new-resource"
            element={<ResourceForm />}
          />
        </Route>

        {/* ADMIN ROUTES */}
        <Route element={<RequireAuth allowedRoles={["EM-203", "EM-201"]} />}>
          <Route exact path="/admin" element={<Layout role="EM-203" />}>
            <Route index element={<AdminDashboard />} />
            <Route exact path="course-form" element={<CourseForm />} />
            <Route exact path="unit-form" element={<UnitForm />} />
            <Route exact path=":role" element={<UsersPage />}></Route>
            <Route exact path="courses">
              <Route index element={<CourseAdminPage />}></Route>
              <Route
                exact
                path=":courseID"
                element={<CourseOverview />}
              ></Route>
            </Route>
          </Route>
        </Route>
      </Routes>

      {/* SECOND PAIR OF ROUTES. */}

      {background && (
        <Routes>
          <Route path="/log-in" element={<LogInForm />} />
          <Route
            exact
            path="/new-student"
            element={<RegistrationForm role={"EM-201"} />}
          />
          <Route
            exact
            path="/tutor/new-chapter/:unitID"
            element={<ChapterForm />}
          />

          <Route
            exact
            path="/tutor/unit/:unitID/resources/new-resource"
            element={<ResourceForm />}
          />
          <Route
            exact
            path="/tutor/new-lesson/:chapterID"
            element={<LessonForm />}
          />
          <Route
            exact
            path="/admin/courses/new-course"
            element={<CourseForm />}
          />

          <Route
            exact
            path="/course/:courseID/new-unit"
            element={<UnitForm />}
          />
          <Route
            exact
            path="/admin/students/new-student"
            element={<RegistrationForm role={"EM-201"} />}
          />
          <Route
            exact
            path="/admin/tutors/new-tutor"
            element={<RegistrationForm role={"EM-202"} />}
          />
          <Route
            exact
            path="/admin/admins/new-admin"
            element={<RegistrationForm role={"EM-203"} />}
          />
        </Routes>
      )}
    </div>
  );
}
``;
export default App;
