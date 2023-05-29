import "./App.css";
import {
  HomePage,
  TutorPage,
  ContentPage,
  TutorUnitsPage,
  AdminDashboard,
  StudentsPageAdmin,
  TutorsPageAdmin,
  TutorLayoutPage,
  AdminLayout,
  UsersLayout,
  AdminSection,
  DraftPage,
  UnitsOutline,
} from "./pages";
import {
  CourseForm,
  ChapterForm,
  LessonForm,
  UnitForm,
  RequireAuth,
  LogInForm,
  ResourceForm,
  AdminRegistrationForm,
  TutorRegistrationForm,
  StudentRegistrationForm,
  QuillEditorStudent,
  QuillEditorTutor,
  CommentsSection,
  ResourcesSection,
  TutorAccordionSmall,
} from "./components";
import { Routes, Route, useLocation } from "react-router-dom";
import Forbidden from "./pages/403";
import CoursesAdminPage from "./pages/Admin/CourseAdminPage";

function App() {
  const location = useLocation();
  const background = location.state && location.state.background; //If the first param is true , then the second param is assigned.Just like conditional operators.
  // console.log(import.meta.env.VITE_APP_BASE);
  // AUTHENTICATION REFERENCE.
  // {
  //   student:"EM-201",
  //   tutor:"EM-202",
  //   admin :"EM-203",
  // }

  return (
    <div className="flex w-full h-screen ">
      {/* <IdleTimer> */}
      {/* When there is a background object in the state upon render/re-render of the app component,we imperatively declare the route/component to show for the first pair of routes. */}
      <Routes location={background || location}>
        {/* By setting it to the previous page, we hinder any updates hence it still renders the previous page. */}
        {/* Student Protected Routes */}
        <Route exact path="*" element={<Forbidden />}></Route>
        <Route exact path="forbidden" element={<Forbidden />} />
        <Route path="/log-in" element={<LogInForm />} />
        <Route path="/draft" element={<DraftPage />} />

        {/* Should trigger a redirect to the dashboard. */}
        <Route element={<UsersLayout />}>
          {/* GENERAL ROUTES */}
          <Route exact path="/" element={<HomePage />}></Route>
          <Route
            exact
            path="new-student"
            element={<StudentRegistrationForm />}
          />
          {/* STUDENT ROUTES */}
          <Route
            element={
              <RequireAuth allowedRoles={["EM-201", "EM-202", "EM-203"]} />
            }
          >
            {/* COURSE VIEW [UNITS] */}
            <Route
              exact
              path="/course/:courseId"
              element={<UnitsOutline />}
            ></Route>
            {/* UNIT VIEW. [CHAPTERS & LESSONS] */}
            <Route exact path="/unit/:unitID" element={<ContentPage />}>
              <Route index element={<QuillEditorTutor />} />
              <Route exact path="nav" element={<TutorAccordionSmall />} />
              <Route exact path="comments" element={<CommentsSection />} />
              <Route exact path="resources" element={<ResourcesSection />} />
            </Route>
          </Route>
        </Route>

        {/* TUTOR ROUTES */}
        <Route element={<RequireAuth allowedRoles={["EM-202"]} />}>
          <Route exact path="/tutor" element={<TutorLayoutPage />}>
            <Route index element={<TutorPage />} />
            <Route exact path="units" element={<TutorUnitsPage />} />
            <Route exact path="chapter" element={<ChapterForm />} />
            <Route exact path="lesson" element={<LessonForm />} />
          </Route>
        </Route>

        <Route element={<RequireAuth allowedRoles={["EM-202"]} />}>
          <Route exact path="/tutor/unit/:unitID" element={<ContentPage />}>
            <Route index element={<QuillEditorTutor />} />
            <Route exact path="nav" element={<TutorAccordionSmall />} />
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
        <Route element={<RequireAuth allowedRoles={["EM-203", "EM-202"]} />}>
          <Route exact path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route exact path="course-form" element={<CourseForm />} />
            <Route exact path="unit-form" element={<UnitForm />} />
            <Route exact path="admins" element={<AdminSection />} />
            <Route exact path="tutors" element={<TutorsPageAdmin />}></Route>
            <Route
              exact
              path="students"
              element={<StudentsPageAdmin />}
            ></Route>
            <Route exact path="courses">
              <Route index element={<CoursesAdminPage />}></Route>
              <Route exact path=":courseId" element={<UnitsOutline />}></Route>
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
            element={<StudentRegistrationForm />}
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
          {/* <Route exact path="/admin/new-unit" element={<UnitForm />} /> */}
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
            path="/admin/courses/:courseId/new-unit"
            element={<UnitForm />}
          />
          <Route
            exact
            path="/admin/students/new-student"
            element={<StudentRegistrationForm />}
          />
          <Route
            exact
            path="/admin/tutors/new-tutor"
            element={<TutorRegistrationForm />}
          />
          <Route
            exact
            path="/admin/admins/new-admin"
            element={<AdminRegistrationForm />}
          />
        </Routes>
      )}
      {/* </IdleTimer> */}
    </div>
  );
}

export default App;
