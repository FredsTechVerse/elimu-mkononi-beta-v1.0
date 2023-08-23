import { verifyAccess, renewToken } from "./AuthController";

import {
  registerUser,
  loginUser,
  logoutUser,
  deleteUser,
  messageUser,
  updateUser,
  fetchAllUsersData,
  fetchUserDetails,
  fetchUsersData,
  fetchUserData,
} from "./UserController";
import {
  createCourse,
  fetchCourseData,
  fetchCoursesData,
  updateCourse,
  deleteCourse,
} from "./CourseConroller";

import {
  createUnit,
  fetchUnitData,
  updateUnit,
  deleteUnit,
} from "./UnitController";

import {
  createChapter,
  fetchChapterData,
  updateChapter,
  deleteChapter,
} from "./ChapterController";

import {
  createLesson,
  fetchLessonData,
  updateLesson,
  deleteLesson,
} from "./LessonController";

import {
  createNotes,
  fetchLessonNotes,
  updateNotes,
  deleteNotes,
} from "./NotesController";

import {
  createResource,
  updateResource,
  deleteResource,
} from "./ResourceController";

import {
  getYoutubeAuthorizationURI,
  refreshYoutubeToken,
  redirectToExternalLink,
  fetchPresignedUrl,
  uploadVideoToYoutube,
} from "./YoutubeController";

import { deleteFile } from "./FileController";
import { handleError } from "./ErrorController";

export {
  handleError,
  renewToken,
  registerUser,
  loginUser,
  logoutUser,
  deleteUser,
  messageUser,
  createCourse,
  createUnit,
  createChapter,
  createLesson,
  createNotes,
  createResource,
  verifyAccess,
  getYoutubeAuthorizationURI,
  refreshYoutubeToken,
  fetchAllUsersData,
  fetchCoursesData,
  fetchCourseData,
  fetchChapterData,
  fetchUnitData,
  fetchLessonData,
  fetchLessonNotes,
  fetchUserData,
  fetchUsersData,
  fetchUserDetails,
  updateCourse,
  updateUser,
  updateUnit,
  updateChapter,
  updateLesson,
  updateNotes,
  updateResource,
  deleteCourse,
  deleteUnit,
  deleteChapter,
  deleteLesson,
  deleteFile,
  deleteNotes,
  deleteResource,
  redirectToExternalLink,
  fetchPresignedUrl,
  uploadVideoToYoutube,
};
