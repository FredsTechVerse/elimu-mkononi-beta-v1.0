# elearning-beta-1.0

### DISCLAIMER

Chatgpt is a powerful tool but it is outsourcing its data from the internet.It will be misleading at times hence the need to crosscheck for one's self.
However , it's a great tool to kick start the projects.

### DISCOVERIES.

- In react-pdf the worker seems to be the issue.
- Do not trust all the garbage you pick from gpt. Making such dum errors.
- Here is how to implement [skeletons](https://dev.to/jobpick/how-to-create-a-skeleton-loader-in-tailwindcss-38gh)
- Use React query for quering and caching data. Complements axios as well!
- React hooks are **_asynchronous_** in nature. No wonder the console was returning null and on second trial. Returning the data which apparently is the old data which changes when we update state to something else as with the case with the accordion.
- **_Using useEffect hook and avoiding unecessary hooks will help us avoid lots unecessary issues_**
- Anything that is not in the useEffect runs twice due to react strict mode.Hence the double console.logs().
  `(roles?.includes("EM-203") || roles?.includes("EM-202")` upgrade from `(roles[0] === "EM-203" || roles[0] === "EM-202"`

- This code `(roles?.includes("EM-202" || "EM-203")) ` is incorrect . Javascript excludes the second part.
- If a prop is guaranteed to be there eg in `localStortage.getItem()`... No need for _optional chaining operator_
- You can check if an object is empty using `Object.keys(obj).length === 0`
- For arrays,checking for length is better than checking if null.
- The handle logout is called because i pass the function instead of the refence. Therefore , ` onClick={() => {handleLogout()}}` should be replaced by ` onClick={handleLogout}`
- Styling react-icons as text is neater and is what i have been doing!
- Simply set up the \_redirects file inside the public folder and add the following line : `/*    /index.html  200`

### WEEK OBJECTIVES

- Building the resources section to handle pdf & additional audio documents.
- Look for sustainable audio renderer.

### PERFOMANCE OPTIMIZATION

- Caching to avoid unecessary rerenders or data fetches especially when my data is not changing.
- Improving the audio player to be responsive to the controls.
