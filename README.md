# ELIMU HUB

- Just like kina techbros who made it by being angular pioneers , i need to solidify an aspect of what I am doing , Tap into that which hasn't been tapped into.

### BULB THOUGHTS

- Keeping track of similar resources in each chapter can be cumbersome.Why not have them under the resources section at the end of a unit.
- In a similar manner , we should break out the course description making it accessible from anywhere.
- The reference material will form part of the resources at the end of the chapter.
- By using google authentication , we swiftly discourage password sharing , google accounts are personal and private. You just do not share ovyo ovyo.Has an extra security layer.On the other hand the redirect sucks plus people can just create a dummy account to access the resources. I will only use this if there is a way i can restrict the no of accounts logged in per email. This is better done personally by keeping track of the number of devices logged in.
- It would be beautiful to see this product being used out here. The user does not need to login , aim is to get a big user base then start monetizing some of the features with time.
- All resources will be free as i polish / ensure authentication works well.
- Student can sign in with registration no and a password eg their school email.
- A student should only have access to a specific course in the module.

# CHALLENGE WE ADDRESS

- We simply organize youtube resources to complement what learners learn in class.
- Revision process - We gather necessary resources in one roof helping learners carry out their revision easily by providing the necessary materials including youtube videos , exam papers , class notes and additional lesson notes , course outline (Which guides revision.)

### DOES THIS PRODUCT HAVE THE ABILITY TO BE MONETIZED ?

- We take our time and arrange resources relevant to specific units which allow students to have access to all the resources presented in class.
- For a start , it can be free , get user feedback and improve then with time we start charging access fee per course.
- The thing is we take our time to keep track of all resources eg cats , assignments and past papers in this place. They shall be downloadable but later we should consider prohibiting this option unless users pay for them.
- Yes , we place all resources needed to pass exams with updated materials all under one roof! Infact , we do not need to be content creators, we can just share what is out there , what is in youtube since it is our red university.
- Lecturers can get to recommend for their learners the best resources to use for their revision, including posting lesson notes and relevant materials for their learners to use.**_This is how we bring the lecturers on board._**
- With the ability to monetize this product , the source code will not be let out in the public domain. However , the product will be free to use for all learners for now as we polish up on our marketing skills.
- Using already pre-existing youtube videos , referencing authors correctly and only paying for space to store images and videos will really make the cost super low and sustainable
- State is very slippery mehn.... Once we navigate away state clear leading to some issues.

### PRODUCT EXTENSION

- The tutor can be renamed to a lecturer.
- There will be need to add an account for student content creators.

### PRODUCT REVIEW

- Notes section is stable and working well which is dope!
<!-- STYLING & LOGIC REFINE -->
- Test accordion items responsiveness to clicking.
<!-- INTERESTING QUESTIONS -->

- What happens mtu akinyimwa ruhusa ya kuupload custom video to youtube?
- Why am i using useEffect when i can use the query data immediately.... using the userQuery.data

<!-- RELEASE PREPARATION -->

- Requires a complete shift to nextjs but not before we are through with the portfolio cms and the church application.

<!-- CHUNK ONE : AUTHENTICATION CONCENRS -->

- Account for both confirmation codes not being valid by an else statement
- Test authentication with the new changes to how messages are sent.
- Message autofill does not work on submit, but message form is fine.
- Password Toggle password visibility by changing input type between password and text
- Image Optimizations - My images are too large.... I need to reduce or find some less than 500kb of data. And use modern .webp and .avf formats which provide better compression.

<!-- CHUNK TWO : UI SURVIVAL -->

- Add control btns to the react player.
- Add toggle btns to disable / enable user accounts... Can be as a status replacement. Also while at it , ensure delete operation confirmation b4 deleting.
- Reconstruct resource UI to cards with a ready to download button.
- Confirm data invalidation / refetch upon update and deletion , creation working well- Pay close attention to chapter form behaviour.Invalidate course update upon deletion

<!-- CHUNK 3 : BUILD FINNESS -->

- Migrate to NextJS with Typescript - Will involve minimal changes to the codebase, forms will be CSR , Routing will be simplified , speed would greatly increase.
- Try out google analytics to keep track of all errors and give reports on perfomance
- Configure the rate limiter to avoid abuse and CORS policy to only allow certain origins access to our backend.

<!-- THE PRODUCT SHOULD BE USABLE BY THIS STAGE. -->

<!-- FANCY FINISHES -->

- Common comment section can be incrementally adopted!
- User tracking has officially been scrapped off!
- Youtube content upload has been scrapped off!

<!-- DILEMMA -->
