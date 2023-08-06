# ELIMU HUB

- Looking forward to committing that s3 and youtube upload set up successfully!

# WHAT WE SOLVE

- Where we help learners carry out their revision for the units that they are taking in school.
- Exams are generally repeated questions over and over again over the course of time.Having this exam materials , class notes and additonal youtube videos (Youtube is the new university) gathered under one roof will help learners practise targeted revision and pass their exams with flying colours.
- In this application , I pull all resources necessary to help learner succeed in their studies right from the course outline.
- Having the course outline before playing any lesson is a really good reminder to learner to set his / her goals right.
- If we really deliver value , logging in to track progress will be a non issue with the users. However in my application , i do not need the user to log in , i only need to know in which school they are in and which course they are taking so that i can administer targeted resources for them.
- This is my niche.... Helping learners revise for their exams with ease and in a targeted manner and later at a low price.
- I need a navbar for dashboards asap!

### DOES THIS PRODUCT HAVE THE ABILITY TO BE MONETIZED ?

- Yes , we place all resources needed to pass exams with updated materials all under one roof! Infact , we do not need to be content creators, we can just share what is out there , what is in youtube since it is our red university.
- Lecturers can get to recommend for their learners the best resources to use for their revision, including posting lesson notes and relevant materials for their learners to use.**_This is how we bring the lecturers on board._**

- With the ability to monetize this product , the source code will not be let out in the public domain. However , the product will be free to use for all learners for now as we polish up on our marketing skills.
- Using already pre-existing youtube videos , referencing authors correctly and only paying for space to store images and videos will really make the cost super low and sustainable

  **KAPESHA NEVER PAID , BUT THE SEED SOWED CAN PAY A HUNDRED FOLD!**

  ### PRODUCT REDEFINATION

  - The tutor will officially be renamed as the lecturer.
  - There will be need to add an account for student content creators.

### POST RELEASE OPTIMIZATIONS

- Polish youtube data api uploads - I only need to toggle between uploading a link directly and uploading a video.
- Handle complete deletion and update of content eg if we delete a unit / we delete it and all of its children.
- Create an interface for viewing the resources
- Migrate to typescript using SWC compiler - It just enforces types thats it.
- Keeping track of user interaction and completion using document ids , arrays and array methods.(Backend need!)
- Fetching documents securely with the exclusion of images.(Backend need!)
- Inform user that his session has expired and that he needs to login again.

### KEY TIPS I HAVE PICKED UP ALONG THE JOURNEY

- SWC works well without hitches. Will use it when i migrate to typescript.
- Using overflow-s-hidden hidden helps to hide the unwanted x direction scrollbar when overflow auto is used.

- Router state has always been simply an object... You know that basic container with a key and a value which in my case was as simple as assigning a background `{ background: location }` and once present in the state activating the second set of routes.
- When an error occurs , the error code should be that of the error message... Not 400... Remember that axios is only successfull when a 2xx response is returned.... The rest automatically results into an error.

- **_react hooks are asynchronous nature. Use them sparingly. They can take time to update no wonder the null console.log on useState_**
- To refresh dynamic routes , set up the \_redirects file inside the public folder and add the following line : `/*    /index.html  200`. It works like magic.
- Let the browser do the scrolling for a whole page if you only need a section that might be a different story.
- Horizontal scroll issue might be as a result of 2 scrolls
- A grid is responsive by nature. Do not bother constraining its children's width...
- Anything that is not in the useEffect runs twice due to react strict mode.Hence the double console.logs() and this is normal.
- Fetching an element in an arrya using `(roles?.includes("EM-203") || roles?.includes("EM-202")` instead of `(roles[0] === "EM-203" || roles[0] === "EM-202"` is bettter
- Never do javascript comparisons like this `(roles?.includes("EM-202" || "EM-203")) ` . Javascript excludes the second part hence causing an error interms of expected behaviour.
- How to check if an object is empty`Object.keys(obj).length === 0`
- For arrays,check for length instead of checking if null.
- The handle logout is called because i pass the function instead of the refence. Therefore , ` onClick={() => {handleLogout()}}` should be replaced by ` onClick={handleLogout}`

### USING USEQUERY

- Adding the enabled prop prevents react query from running immediately! Turns out that it was not being triggered by the status check! It is just build to run immediately upon render.
- Suitable for handling any post and get requests in that it complements axios giving it superpowers as :-

- It eliminates the need for a try catch statements as it has its own eventHandlers for handling errors and loading states. eg onError , onLoading , onSuccess
- Integrating skeletons has never been easier as we know exactly when our data is loading.
- Error handling has also been simplified where we can use the `onError((error)=>{})`or the `isError` if we are just interested in the current state.
- queryFn using fetches make it easy to intergrate skeletons and error messages.The functions is automatically called when we involve the error and data props later down in the code.
- We also get instant updates when we use it to make a post request.

- I enjoy using the one line syntax when doing my fetches which follows the following rule of thumb , we have an array of keys , followed by the function in action and additional configs at the very end eg
  `const courseQuery = useQuery(
["courseData", courseID],
() => fetchCourseData(courseID),
{
onError: (error) => {
handleError(error, updateAlertBoxData);
      },
    }
);`

- Everything is within the code. However if no skeletons are involved , i can use the useEffect hook which runs once under the `   userDataQuery.refetch();` method
- Querying can be done while the static content has loaded... You know blending static content with skeletons instead of using skeletons alone is a good trick to make the user feel like the page is loading faster.

### HOW TO USE CHART JS

- With multiple datasets , we can have multiple charts in one chart eg With the three datasets , we have 3 charts inside one chart with additional props to define how things will look.

- Here are the steps to integrate charts easily :-

1. Install the react-chartjs-2 package `yarn add chart.js react-chartjs-2`

2. Import crucial ekements from chart.js via `import { Doughnut } from "react-chartjs-2";`

3. Import the chart we wanna use from react-chartjs-2 via `import { Doughnut } from "react-chartjs-2";`
4. Register the visitors with `ChartJS.register(ArcElement, Tooltip, Legend);`

5. We are set to go `<Doughnut data={chartJsData} options={options}  />`

- Use the sandbox to fetch any chart source code that you would like to use eg
  [LineChart](https://codesandbox.io/s/github/reactchartjs/react-chartjs-2/tree/master/sandboxes/line/default?from-embed=&file=/App.tsx:36-148)

  - [DoughnutChart](https://codesandbox.io/s/github/reactchartjs/react-chartjs-2/tree/master/sandboxes/doughnut/default?from-embed=&file=/App.tsx:217-242)
  - [BarChart]{https://codesandbox.io/s/github/reactchartjs/react-chartjs-2/tree/master/sandboxes/bar/vertical?from-embed=&file=/App.tsx:613-975}

  - The area chart differs from the line chart in that it has a filler component.

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

- Speaking of options , those that need embedding are well defined eg `animation.animateScale` and `animation.animateRotate`

### HOW TO UPLOAD VIDEOS VIA THE YOUTUBE DATA API

There are three major aspects to it:-

- We need a header, body/metadata and then we wait for the response which contains the location (presignedUrl) where we can upload the video file.
- While requesting for the presigned url,we only pass the access token and the content type which is application/json to the header.
- With the aid of a put request , presigned url and the body armed with snippet and status which are objects containing the title and description of the video , we can upload the video file to youtube.
- The keys , function and additional parameters are separated just as with the axios request methods.....

### HOW TO UPLOAD YOUTUBE VIDEO FROM FRONTEND USING THE ACCESS TOKEN OBTAINED VIA THE BACKEND BY SWAPPING CODE GENERATED WITH AN ACCESS TOKEN.

`
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

    // Handle success and display a success message to the user

} catch (error) {
// Handle error and display an error message to the user
}
};

// Example usage:
const accessToken = "<access_token>";
const videoFile = document.getElementById("video-file").files[0];
const title = "My Video Title";
const description = "My Video Description";

uploadVideo(accessToken, videoFile, title, description);

`

- The access token will be decyphered in its own page then a redirect to another page happens....

### EXTENDING APP FUNCTIONALITY BY MAKING USE OF AVAILABLE TECHNOLOGIES

- There is no need of reinventing the wheel for technologies that are out there.
- For comments and questions they will be send via email and a discord channel set up to handle / grow the community.
- Email is the best and the cheapest mode of communication that i can use extensively for password reset , verification of credentials , user login , frequent updates and communication.
- SMS can be used for crucial services eg rapid payment responses.

### SENDING AND INTEPRETING STATUS AND ANY DATA FROM BACKEND

- Remember there are only two major sides to requests and responses..... For requests , our crucial information is in the `req.body` whereas for responses , our crucial information is in the `res.data`

- What we send to the frontend will be found inside the response object under the data eg if we send ` res.status(201).json({ signedUrl, Key });` We shall destructure this props from the response.data as `const { signedUrl, Key } = response.data`
- Usually i enjoy breaking out the data and status (if needed) from the response object as
  `const { data,status } = await axios.post("/s3Direct/", formData, config);`

### REFERENCES

1. How to implement [skeletons](https://dev.to/jobpick/how-to-create-a-skeleton-loader-in-tailwindcss-38gh)

2. How [chartJS](https://react-chartjs-2.js.org/) works in a flush!
