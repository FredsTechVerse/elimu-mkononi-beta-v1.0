### EXTENDING APP FUNCTIONALITY BY MAKING USE OF AVAILABLE TECHNOLOGIES

- There is no need of reinventing the wheel for technologies that are out there.
- For comments and questions they will be send via email and a discord channel set up to handle / grow the community.
- Email is the best and the cheapest mode of communication that i can use extensively for password reset , verification of credentials , user login , frequent updates and communication.
- SMS can be used for crucial services eg rapid payment responses.

### KEY THINGS I HAVE LEARNT.

- **_react hooks are asynchronous nature. Use them sparingly. They can take time to update no wonder the null console.log on useState_**
- To refresh dynamic routes , set up the \_redirects file inside the public folder and add the following line : `/*    /index.html  200`. It works like magic.
- Let the browser do the scrolling for a whole page if you only need a section that might be a different story
- Horizontal scroll issue might be as a result of 2 scrolls
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
- We can use useCallback to memoize functions and memo to memoize props all in an effort to hinder updates mostly cause by updating the parent components..
  Rebuilding it means even its functions change address causing even the children to rerender which can be solved by memoizing funtions using useCallback whose format is the same as useEffect in that we will have to put a dependency array at its end which will have nothing.

### WHERE THIS APP CAN BE USED

- This website will serve as a good reference point to all class notes and past papers issued. Our elearning platform is shitty i give you that for a fact... Find means ama reasons why a lecturer would want to use our application.... For one , having all your resources organized on the fly.... Resource handle page can emanate from this.

### USING REACT QUERY

- Its almost as if it is handling state for me! Coz once i update my chapter data, i also update my local copy hence the changes refelecting instataneously.

### CODE SPLITTING

- I am currently experiencing screen freeze and just too many barriers which can be solved by putting code splitting according to role..... With a tutor , the student and admin pages do not need to be loaded at first render...
- There must be a way to carry this optimization in react using vite.... Moving to a new metaframework for this is just too expensive....
- I need to find a balance as to what i code split and what i load at first render..... Coz remember even react-query has its way of showing skeletons while loading.

### HOW TO UPLOAD YOUTUBE VIDEO FROM FRONTEND USING THE ACCESS TOKEN OBTAINED VIA THE BACKEND BY SWAPPING CODE GENERATED WITH AN ACCESS TOKEN.

import axios from "axios";

const uploadVideo = async (accessToken, videoFile, title, description) => {
try {
const url = "https://www.googleapis.com/upload/youtube/v3/videos";

    const headers = {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    };

    const metadata = {
      snippet: {
        title: title,
        description: description,
      },
      status: {
        privacyStatus: "private",
      },
    };

    const response = await axios.post(url, metadata, {
      headers: headers,
      params: {
        uploadType: "resumable",
        part: "snippet,status",
      },
    });

    // Get the location header from the response
    const location = response.headers.location;

    // Upload the video file using a PUT request
    await axios.put(location, videoFile, {
      headers: {
        "Content-Type": videoFile.type,
      },
    });

    console.log("Video uploaded successfully");
    // Handle success and display a success message to the user

} catch (error) {
console.error("Error uploading video:", error);
// Handle error and display an error message to the user
}
};

// Example usage:
const accessToken = "<access_token>";
const videoFile = document.getElementById("video-file").files[0];
const title = "My Video Title";
const description = "My Video Description";

uploadVideo(accessToken, videoFile, title, description);

- The access token will be decyphered in its own page then a redirect to another page happens....

### SENDING AND INTEPRETING STATUS AND ANY DATA FROM BACKEND

- Its straightforward..... What we send to the frontend will be found inside the response object under the data.
  eg if we send ` res.status(201).json({ signedUrl, Key });` We shall destructure this props from the response.data as `const { signedUrl, Key } = response.data`
  Usually we start by breaking out the data and status (if needed) from the response object as
  `const { data,status } = await axios.post("/s3Direct/", formData, config);`

- Remember there are only two major sides to requests and responses..... For requests , our crucial information is in the `req.body` whereas for responses , our crucial information is in the `res.data`
