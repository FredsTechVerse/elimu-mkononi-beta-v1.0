### PERFOMANCE OPTIMIZATION

- Building the resources section to handle pdf & additional audio documents.
- Effecting audio & video player that does not misbehave.
- Socials to be displayed absolutely as with my portfolio.
- We can use useCallback to memoize functions and memo to memoize props all in an effort to hinder updates mostly cause by updating the parent components...
  Rebuilding it means even its functions change address causing even the children to rerender which can be solved by memoizing funtions using useCallback whose format is the same as useEffect in that we will have to put a dependency array at its end which will have nothing.

### KEY TIPS I HAVE PICKED UP ALONG THE JOURNEY

- Router state has always been simply an object... You know that basic container with a key and a value which in my case was as simple as assigning a background `{ background: location }` and once present in the state activating the second set of routes.

- Finishing takes a great deal of courgage..... I am terrified of fixing the last bit of the puzzle into place.... Video streaming with the youtube data api.

- **_react hooks are asynchronous nature. Use them sparingly. They can take time to update no wonder the null console.log on useState_**
- To refresh dynamic routes , set up the \_redirects file inside the public folder and add the following line : `/*    /index.html  200`. It works like magic.
- Let the browser do the scrolling for a whole page if you only need a section that might be a different story
- Horizontal scroll issue might be as a result of 2 scrolls
- A grid is responsive by nature. Do not bother constraining its children's width... Will do so automatically!
- Use React query for quering and caching data. Complements axios as well!
- Anything that is not in the useEffect runs twice due to react strict mode.Hence the double console.logs() and this is normal.
- Solution : use`(roles?.includes("EM-203") || roles?.includes("EM-202")` instead of `(roles[0] === "EM-203" || roles[0] === "EM-202"`
- This code `(roles?.includes("EM-202" || "EM-203")) ` is incorrect . Javascript excludes the second part.
- How to check if an object is empty`Object.keys(obj).length === 0`
- For arrays,checking for length is better than checking if null.
- The handle logout is called because i pass the function instead of the refence. Therefore , ` onClick={() => {handleLogout()}}` should be replaced by ` onClick={handleLogout}`
- CHATGPT is not there yet ... I have to complement / verify is brainstorming ideas with the real world. Google!

**INDEXED NAVIGATION** I can simply get away with a for loop for looping over my chapter array.

### USING USEQUERY

- Suitable for handling any post and get requests.
- Eliminates the need for a try catch statements as it has its own eventHandlers for handling errors and loading states. eg onError , onLoading , onSuccess
- I like using the one line syntax when doing my fetches which follows the following rule of thumb , we have an array of keys , followed by the function in action and additional configs at the very end eg
  `const courseQuery = useQuery(
["courseData", courseID],
() => fetchCourseData(courseID),
{
onError: (error) => {
handleError(error, updateAlertBoxData);
      },
    }
);`
- Integrating skeletons has never been easier as we know exactly when our data is loading.
- Error handling has also been simplified where we can use the `onError((error)=>{})`or the `isError` if we are just interested in the current state.
- queryFn using fetches make it easy to intergrate skeletons and error messages.The functions is automatically called when we involve the error and data props later down in the code.
- Everythis is within the code. However if no skeletons are involved , i can use the useEffect hook which runs once under the `   userDataQuery.refetch();` method
- We also get instant updates when we use it to make a post request.

### HOW TO USE CHART JS

- With multiple datasets , we can have multiple charts in one chart eg With the three datasets , we have 3 charts inside one chart with additional props to define how things will look.

- Here are the steps :-

1. Install the react-chartjs-2 package `yarn add chart.js react-chartjs-2`

2. Import crucial ekements from chart.js via `import { Doughnut } from "react-chartjs-2";`

3. Import the chart we wanna use from react-chartjs-2 via `import { Doughnut } from "react-chartjs-2";`
4. Register the visitors with `ChartJS.register(ArcElement, Tooltip, Legend);`

5. We are set to go `<Doughnut data={chartJsData} options={options}  />`

- Here is an example of the options and chartData objects that you will ever need :-
  const options = {
  borderRadius: 10,
  borderWidth: 1,
  spacing: 5,
  circumference: 360, => We can define a semicircle by using 180 etc .
  cutout: "70%", => The gist of the doughnut which defines the holloness of the piechart
  animation: { animateScale: true, animateRotate: true },

      plugins: {
        title: { display: true, text: "Distribution of Users" }, => Haven't seen its effect
        legend: { display: false }, =>Hiding the legend also gives us flexibility interms of creating our own map.
      },

};

const chartData = {
labels: ["Tutors", "Students", "Admin"],
datasets: [
{
label: "Poll",
data: [24, 3, 36],
backgroundColor: ["red", "green", "blue"],
borderColor: ["red", "green", "blue"],
},
{
label: "Poll",
data: [40, 30, 80],
backgroundColor: ["gray", "orange", "pink"],
borderColor: ["red", "green", "blue"],
},
{
label: "Poll",
data: [24, 72, 45],
backgroundColor: ["gray", "orange", "pink"],
borderColor: ["red", "green", "blue"],
},
],
};

- Speaking of options , they are all straight forward , those that need embedding zinajionyesha tu eg `animation.animateScale` and `animation.animateRotate`

### HOW TO UPLOAD VIDEOS VIA THE YOUTUBE DATA API

Wow! It is really not hard!
There are only three major aspects to it:-

- We need a headers , body/metadata and then we wait for the response.
- As for the header , we only pass the access token and the content type which is application/json
- For the body , we pass the snippet and status which are objects with their own properties.
- As for the response , we need to get the location header from the response and then upload the video file using a PUT request.
- In summary we make a post request to get the location url then make a put request to upload the resource to the specified location url. This really bring back the vibe of a presigned url .... We can think of the location url as a presigned url
- Therefore we first of all get the presigned url then paste data to this url.
- The keys , function and additional parameters are separated just as with the axios request methods.....

### EXTENDING APP FUNCTIONALITY BY MAKING USE OF AVAILABLE TECHNOLOGIES

- There is no need of reinventing the wheel for technologies that are out there.
- For comments and questions they will be send via email and a discord channel set up to handle / grow the community.
- Email is the best and the cheapest mode of communication that i can use extensively for password reset , verification of credentials , user login , frequent updates and communication.
- SMS can be used for crucial services eg rapid payment responses.

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

- Remember there are only two major sides to requests and responses..... For requests , our crucial information is in the `req.body` whereas for responses , our crucial information is in the `res.data`

- What we send to the frontend will be found inside the response object under the data eg if we send ` res.status(201).json({ signedUrl, Key });` We shall destructure this props from the response.data as `const { signedUrl, Key } = response.data`
- Usually i enjoy breaking out the data and status (if needed) from the response object as
  `const { data,status } = await axios.post("/s3Direct/", formData, config);`

### WHERE THIS APP CAN BE USED

- This website will serve as a good reference point to all class notes and past papers issued.
- Find means ama reasons why a lecturer would want to use our application eg having all your resources organized on the fly....
- We can also have a section for past papers and class notes which will be organized by year and semester.

### REFERENCES

1. How to implement [skeletons](https://dev.to/jobpick/how-to-create-a-skeleton-loader-in-tailwindcss-38gh)

2. How [chartJS](https://react-chartjs-2.js.org/) works in a flush!
