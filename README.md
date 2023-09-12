# ELIMU HUB

- Dawa sa hii ni to get my hands dirty to better and deeply hammer the concepts in! (Make perfect). I won't know if it works if i do not try it out.

# WHAT CHALLENGE WE ADDRESS

- Revision process - We gather necessary resources in one roof helping learners carry out their revision easily by providing the necessary materials including youtube videos , exam papers , class notes and additional lesson notes , course outline (Which guides revision.)

### DOES THIS PRODUCT HAVE THE ABILITY TO BE MONETIZED ?

- Yes , we place all resources needed to pass exams with updated materials all under one roof! Infact , we do not need to be content creators, we can just share what is out there , what is in youtube since it is our red university.
- Lecturers can get to recommend for their learners the best resources to use for their revision, including posting lesson notes and relevant materials for their learners to use.**_This is how we bring the lecturers on board._**
- With the ability to monetize this product , the source code will not be let out in the public domain. However , the product will be free to use for all learners for now as we polish up on our marketing skills.
- Using already pre-existing youtube videos , referencing authors correctly and only paying for space to store images and videos will really make the cost super low and sustainable
- State is very slippery mehn.... Once we navigate away state clear leading to some issues.

### PRODUCT EXTENSION

- The tutor can be renamed to a lecturer.
- There will be need to add an account for student content creators.

### PRODUCT REVIEW

- THE FUNCTIONALITES ARE A GO! PREPARE FRONTEND FOR RELEASE.
<!-- STYLING & LOGIC REFINE -->
- Test accordion items responsiveness to clicking.
<!-- INTERESTING QUESTIONS -->

- What happens mtu akinyimwa ruhusa ya kuupload custom video to youtube?
- Why am i using useEffect when i can use the query data immediately.... using the userQuery.data

<!-- RELEASE PREPARATION -->

- Refine messaging by allowing contact to autofill.We can use the userID to retrieve and display name.
- Refine queries to show the fancy message when no data is available . Ensure you handle .length properly instead of avoiding is using ?.
- SHARE FOR USER FEEDBACK TO LAWRENCE & THE TRANSFORMERS TEAM - We can create a link for admin account creation which just goes to the user form with the admin role.
- Release the learner account to the public only selected individuals and upon user request will i expose the admin and tutor accounts. Will include the registration process for user to have a feel of the messaging and emailing functionalities. Lets wrap up this project!

- <!-- SECONDARY -->
- Invalidate course update upon deletion
- I can add a resource count to the button
- Ensure account verification , add toggle button to enable and disable accounts
- Test youtube refresh token acquisition by inversing if logic
- Add control btns to the react player.
- Refine queries to display null when no data is available and eliminate .length when no data is available.
- Move to portfolio backend and frontend revamp (# simplification.)
- Separate the form CRUD logic.
- On clicking on a message , it shall be considered as read.
- Implement typescript with SWC.
- If need arises implement user tracking
- Comments section can be built
- Instead of sending errors to email directly we can read and write to the server file system. with the format that we want. And a daily report sent to user.

### USING COMPONENT LIBRARIES ( MY GOLDEN RULE )

- Importing simple components limits flexibility (Better to DIY) ... Saves lots of time for the complex ones eg calendars (Worth importing)

### KEY CONCEPTS LEARNT DURING THE BUILD

- Passing data via url is more stable state tends to be lost making it hard to navigate back.
- Who needs a table numbers when we have the search functionality at the convenience of phone rotation?
- The currentLesson context is being updated from two points only the accordion items and the contentsection (auto-navigate to first lesson.)
- The video player and the quill editor only read the currentLesson context and meaningful logic derived from this.
- The routes do not just flow naturally. I have the power to control them to be exactly what i want them to be.
- This will come in handy ` await Unit.deleteMany({ _id: { $in: unitIds } });`

- Rounding things up was the missing part of the table....Things look elegant.
- Overflow hidden can be used to hide stubborn borders.
- Here is how we can pass a body to a delete request

```js
const axios = require("axios");

const requestData = { id: 123, reason: "No longer needed" };
axios.delete("https://api.example.com/resource", { data: requestData });
```

- Use params accesses all params in the current url this is actually our key to solving the back btn dilemma ie where would the user wanna go back to? I provide a short circuit with the help of params in our url
- This data will be found in the req.body ie `const {id,reason} = req.body`
- Once we are able to deliver value , users will gladly register.
- Always ask the right questions while developing an elements logic eg what conditions should be met for the element to be displayed?
- Working with smaller files grouped by functionalities makes development simpler!
- It appears react router dom manages its states. I was able to update the chapter 4 accross rerenders.
- A grid is responsive by nature. Do not bother constraining its children's width...
- self-end class name gives a flex-item positioning independence.
- Use overflow-x-hidden hidden helps to hide the unwanted x direction scrollbar when overflow-y-auto is activated ( Clean trick )
- Router state has always been simply an object... You know that basic container with a key and a value which in my case was as simple as assigning a background `{ background: location }` and once present in the state activating the second set of routes.
- When an error occurs , the error code should be that of the error message... Not 400... Remember that axios is only successfull when a 2xx response is returned.... The rest automatically results into an error.
- React hooks are asynchronous nature. Use them sparingly. They can take time to update no wonder the null console.log on useState
- To handle dynamic routes correctly , set up the \_redirects file inside the public folder and add the following line : `/*    /index.html  200`. It works like magic.
- Let the browser do the scrolling for a whole page if you only need a section that might be a different story.
- Anything that is not in the useEffect runs twice due to react strict mode.Hence the double console.logs() and this is normal.
- Fetching an element in an arrya using `(roles?.includes("EM-203") || roles?.includes("EM-202")` instead of `(roles[0] === "EM-203" || roles[0] === "EM-202"` is bettter
- Never do javascript comparisons like this `(roles?.includes("EM-202" || "EM-203")) ` . Javascript excludes the second part hence causing an error interms of expected behaviour.
- For arrays check for length. An empty array will never return false as it is alway truthy.
- The handle logout is called because i pass the function instead of the reference. Therefore , ` onClick={() => {handleLogout()}}` should be replaced by ` onClick={handleLogout}`

### HANDLING COMMUNICATION

- There is no need of reinventing the wheel for technologies that are out there.
- For comments and questions they will be send via email and a discord channel set up to handle / grow the community.
- Email is the best and the cheapest mode of communication that i can use extensively for password reset , verification of credentials , user login , frequent updates and communication.
- SMS can be used for crucial services eg rapid payment responses.

### SENDING AND INTEPRETING STATUS AND ANY DATA FROM BACKEND

- Remember there are only two major sides to requests and responses..... For requests , our crucial information is in the `req.body` whereas for responses , our crucial information is in the `res.data` eg send ` res.status(201).json({ signedUrl, Key });` intepreted as `const { signedUrl, Key } = response.data`
- Usually i enjoy breaking out the data and status (if needed) from the response object as
  `const { data,status } = await axios.post("/file/", formData, config);`
- Config also comes in handly while troubleshooting ( We are able to pin down the exact request and its method)

### REFERENCES

1. Implementing [skeletons](https://dev.to/jobpick/how-to-create-a-skeleton-loader-in-tailwindcss-38gh)

2. Using [chartJS](https://react-chartjs-2.js.org/)
