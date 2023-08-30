import { verifyAccess, renewToken, handleLogout } from "./AuthController";
import { messageUser, fetchMessageData } from "./Communication";
import {
  registerUser,
  loginUser,
  logoutUser,
  deleteUser,
  updateUser,
  verifyContact,
  updatePassword,
  confirmResetToken,
  fetchAllUsersData,
  fetchUsersAggregate,
  fetchUserDetails,
  fetchUsersData,
  fetchUserData,
} from "./UserController";
import {
  createCourse,
  fetchCourseData,
  fetchCoursesAggregate,
  fetchCoursesData,
  updateCourse,
  deleteCourse,
} from "./CourseConroller";

import {
  createUnit,
  fetchUnitData,
  fetchUnitsAggregate,
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
  handleLogout,
  messageUser,
  renewToken,
  registerUser,
  loginUser,
  logoutUser,
  deleteUser,
  createCourse,
  createUnit,
  createChapter,
  createLesson,
  createNotes,
  createResource,
  verifyAccess,
  verifyContact,
  updatePassword,
  confirmResetToken,
  getYoutubeAuthorizationURI,
  fetchMessageData,
  refreshYoutubeToken,
  fetchAllUsersData,
  fetchUsersAggregate,
  fetchCoursesData,
  fetchCoursesAggregate,
  fetchCourseData,
  fetchChapterData,
  fetchUnitData,
  fetchUnitsAggregate,
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
