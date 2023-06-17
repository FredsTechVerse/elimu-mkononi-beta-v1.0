# ELEARNING BETA V1.0

### EXTENDING APP FUNCTIONALITY BY MAKING USE OF AVAILABLE TECHNOLOGIES

- For comments and questions they will be send via email and a discord channel set up to handle / grow the community. No need of doing this on my end. Have cta-buttons after the lesson notes to lead to this sections.If any questions are there.... Or if the user has a comment.... Well the comments can be stored inside the database. But Questions will be answered via email.This eliminates lots of complexities.
- Extend functionalities of this website using available technologies instead of trying to recreate them. eg. Lecturers can be posting notes , arranging their sessions here etc

### KEY THINGS I HAVE LEARNT.

- **_Use react hooks sparingly. Their asynchronous nature can be decieving at time eg The useState hook which takes some time to update long after console.log has been fired._**
- In react-pdf the worker seems to be the issue.
- How to implement [skeletons](https://dev.to/jobpick/how-to-create-a-skeleton-loader-in-tailwindcss-38gh)
- Use React query for quering and caching data. Complements axios as well!
- React hooks are **_asynchronous_** in nature. No wonder the console was returning null and on second trial. Returning the data which apparently is the old data which changes when we update state to something else as with the case with the accordion.
- Anything that is not in the useEffect runs twice due to react strict mode.Hence the double console.logs().
  Solution : use`(roles?.includes("EM-203") || roles?.includes("EM-202")` instead of `(roles[0] === "EM-203" || roles[0] === "EM-202"`
- This code `(roles?.includes("EM-202" || "EM-203")) ` is incorrect . Javascript excludes the second part.
- If a prop is guaranteed to be there eg in `localStortage.getItem()`... No need for _optional chaining operator_
- Check if an object is empty using `Object.keys(obj).length === 0`
- For arrays,checking for length is better than checking if null.
- The handle logout is called because i pass the function instead of the refence. Therefore , ` onClick={() => {handleLogout()}}` should be replaced by ` onClick={handleLogout}`
- To refresh dynamic routes , set up the \_redirects file inside the public folder and add the following line : `/*    /index.html  200`. It works like magic.
  Chatgpt is a powerful tool but it is outsourcing its data from the internet.It will be misleading at times hence the need to crosscheck for one's self.
  However , it's a great tool to kick start the projects.

  ### INDEXED NAVIGATION

- I can simply get away with a for loop for looping over my chapter array , finding index of specific chapter that i need and be a headstart for teh content section which should never be called while my chapter is empty.... The unit overview page should ensure of this..... Code sample : -
  `const chapterNameToFind = "REW";

// Find the index of the chapter
const chapters = data.unitChapters;
let chapterIndex = -1;

for (let i = 0; i < chapters.length; i++) {
if (chapters[i].chapterName === chapterNameToFind) {
chapterIndex = i;
break;
}
}`

As i break out to the dashboard , I will recap on :- Array methods and context as i get to implement indexed course navigation....

### PERFOMANCE OPTIMIZATION

- Building the resources section to handle pdf & additional audio documents.
- Caching to cut on data fetches and save time.
- Effecting audio player that does not misbehave.
- Socials to be displayed absolutely as with my portfolio.

### WHERE THIS APP CAN BE USED

- This website will serve as a good reference point to all class notes and past papers issued. Our elearning platform is shitty i give you that for a fact... Find means ama reasons why a lecturer would want to use our application.... For one , having all your resources organized on the fly.... Resource handle page can emanate from this.

### USING REACT QUERY

- Its almost as if it is handling state for me! Coz once i update my chapter data, i also update my local copy hence the changes refelecting instataneously.
