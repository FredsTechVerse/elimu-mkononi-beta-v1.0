### EXTENDING APP FUNCTIONALITY BY MAKING USE OF AVAILABLE TECHNOLOGIES

- There is no need of reinventing the wheel for technologies that are out there.
- For comments and questions they will be send via email and a discord channel set up to handle / grow the community.
- Email is the best and the cheapest mode of communication that i can use extensively for password reset , verification of credentials , user login , frequent updates and communication.
- SMS can be used for crucial services eg rapid payment responses.

### KEY THINGS I HAVE LEARNT.

- **_react hooks are asynchronous nature. Use them sparingly. They can take time to update no wonder the null console.log on useState_**
- To refresh dynamic routes , set up the \_redirects file inside the public folder and add the following line : `/*    /index.html  200`. It works like magic.
- A grid is responsive by nature. Do not bother constraining its children's width... Will do so automatically!
- How to implement [skeletons](https://dev.to/jobpick/how-to-create-a-skeleton-loader-in-tailwindcss-38gh)
- Use React query for quering and caching data. Complements axios as well!
- Anything that is not in the useEffect runs twice due to react strict mode.Hence the double console.logs() and this is normal.
- Solution : use`(roles?.includes("EM-203") || roles?.includes("EM-202")` instead of `(roles[0] === "EM-203" || roles[0] === "EM-202"`
- This code `(roles?.includes("EM-202" || "EM-203")) ` is incorrect . Javascript excludes the second part.
- How to check if an object is empty`Object.keys(obj).length === 0`
- For arrays,checking for length is better than checking if null.
- The handle logout is called because i pass the function instead of the refence. Therefore , ` onClick={() => {handleLogout()}}` should be replaced by ` onClick={handleLogout}`
- CHATGPT is not there yet ... I have to complement / verify is brainstorming ideas with the real world. Google!

**INDEXED NAVIGATION** I can simply get away with a for loop for looping over my chapter array.

### PERFOMANCE OPTIMIZATION

- Building the resources section to handle pdf & additional audio documents.
- Caching to cut on data fetches and save time.
- Effecting audio & video player that does not misbehave.
- Socials to be displayed absolutely as with my portfolio.

### WHERE THIS APP CAN BE USED

- This website will serve as a good reference point to all class notes and past papers issued. Our elearning platform is shitty i give you that for a fact... Find means ama reasons why a lecturer would want to use our application.... For one , having all your resources organized on the fly.... Resource handle page can emanate from this.

### USING REACT QUERY

- Its almost as if it is handling state for me! Coz once i update my chapter data, i also update my local copy hence the changes refelecting instataneously.
