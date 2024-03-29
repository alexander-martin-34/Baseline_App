# Baseline_App

2/20/2022 (Sprint 1 Discussion)
* See board for development
* Purple and White for colors
* Playfair Display for headers and Monserrrat for everything else

Sprint 1 Team Notes: 
---
Clayton (02/22/2022): 
---
I figure we could write notes about what we add to the ReadMe, and then we could choose to delete the notes
if we approach the end of the project and need to submit the github with our project. If anyone has any concerns 
about using the readMe this way, let me know and we'll do it differently. 

So after doing research on what housekeeping needed to be done to get us up and rolling, it seemed this tool
Expo was really commonly used. It's a pretty cool tool that allows you to simulate Android or iOS smartphones 
right in localhost (in your desktop browser, locally). It also generates a QR code you can scan on your phone
to see you app right on your own phone. It's pretty robust, but it's a pain to set up honestly. After looking into
our options, it seemed like the best choice so I figured out how to get it working. 
I used this video first, it shows how easy set up can be if you're working on Mac:
https://www.youtube.com/watch?v=0kL6nhutjQ8&ab_channel=MadeWithMatt

Since we're working with files already made, I imagine our process is going to be a bit different. 
Full disclosure, I've never worked collaboratively on a React project before, so I'm not sure what you need to do on your end to get all the necessary files.
I just pushed the whole directory.
I'd start by cloning the repo, or pulling the repo, running the terminal command '''npm install''', and then using the terminal command
'''expo start''' and seeing if that works. If not, you probably gotta run expo init but I don't know what that'll
do to our existing files. If anybody knows the right way to approach this, please correct me here in the ReadMe. 
I'm still kind of new to git so I may be making dumb mistakes here. This step will be a learning experience for me. 

When you want to start the development environment, use the command '''expo start'''. You must be in the client folder for this to work. 
There's a client folder because eventually we'll have a "server" folder too and I think we'll want to have those files seperated. 
In your terminal it'll say, "Developer tools running on http://localhost:19002" or some other port of localhost. Just type whatever it gives
you into your browser. You should be good from there. 

Generally, even when you get all the files situated and having the expo dev environment up and working (in localhost), there's going to be more stuff you 
need to install. 
Basically, the super in depth, everything you need video to get set up is this: 
- https://www.youtube.com/watch?v=0-S5a0eXPoc&t=502s&ab_channel=ProgrammingwithMosh
Remember that we're not using '''expo init''' unless we have to. I'm sorry the video's so long. 

My version of the instructions to get the smartphone simulators working: 
- For iOS
    - If you have Mac, you should able to download XCode and easily bring up an iOS simulator within the Expo dashboard.
    Your mileage may vary, I don't have a Mac. 
    - If you have an iPhone, you can download the Expo app, scan the QR code and view our app within their app. I got this working myself.
    - If you have neither a Mac nor an iPhone, the only option I know of available is running a Mac virtual machine. Sounds like a nightmare. 
        - If this is you, let the rest of us know, and we can just split testing between iOS and Android for the people who have access to each. 
- For Android: 
    - Full instructions from documentation: https://docs.expo.dev/workflow/android-studio-emulator
    - You probably should just follow the documentation or one of the videos, but I'll tell you what I did. 
    - Download Android Studio: https://developer.android.com/studio#downloads
    - Follow the installation wizard. 
    - Open up software, click on more actions. 
    - Go to Virtual Device Manager. 
    - Create device. Choose a device that has Google play. Choose a release that's as updated as possible. 
    - Finish the rest of the prompts. 
    - Click the play button next to the virtual device. 
    - Click open Android device/emulator on Expo Dashboard WHILE Android emulator is open and running. 
    - You should get an alert on your emulated phone asking if you want to allow USB debugging. Say yes. 
    - I still managed to get an error that "adb not found". It's 2:30 in the morning now, I'll revisit this and update the readme with what 
    I find out. 

If this setup turns out to be dumb we can change it later. Can't tell if I'm dumb for trying to use this setup
or dumb for having trouble understanding how to work it. Regardless, I think this beast is going to be a necessary evil
and worth the trouble once it's situated. I couldn't find any reasonable alternatives, and this should be enough to get us started, 
at the very least.

When it comes to my code, I got our background image from here: 
https://unsplash.com/photos
Totally okay with changing it later, it was just tough to find something decent that was royalty free. 
The color pallete I used is below. Again, open to change this, I just grabbed something purple.
https://i.pinimg.com/originals/c3/50/4a/c3504a05f2f77ce85f7a76c8e885d378.jpg
I made a basic home page with a photo background, title, and two buttons that will eventually redirect to two other pages: log in and registration. 

Basically everything in this commit is subject to change if we choose. We can even move away from Expo if we have a better alternative. Let's talk in
the Discord if we wanna move in a different direction in some major way. 

------------------
Clayton 3/22/2022:
------------------

Just had to stop here for today. @ me on Discord if you're trying to work on this before I update again. 

------------------
Clayton 4/7/2022:
------------------

1)
I see why working on the backend for the project was so confusing, that was my mistake. I forgot to commit the code I had worked on last week. 
That must've made things look way more confusing than necessary, that was totally my bad. I'm committing the code I wrote and added some 
comments where you have to change something in the frontend. I'll work on polishing the frontend up and outlining exactly what code we need to replace with 
backend calls. I'll try to have all of the frontend implementation for user login and registration completely done by tonight, but it'll take multiple 
breaks/commits. If you find any issues with the frontend, message me and I'll hop on it ASAP. 
2)
Ok, just finished up and tested Home.js and Register.js. You'll find comments in Register.js outlining what backend implementation needs to be done for 
the registration functionality. Going to try to complete login frontend by tonight but I need to take a break. You may want to wait until I finish that
before getting into it because it'll make testing easier. Regardless though, you should be good to start working on Registration.js whenever. 

-----------------
Clayton 4/10/2022: 
-----------------

1)
Cleaned up and tested LogIn.js. It all works as far as I can tell when saving and retrieving username locally in the frontend. Added a To-Do in that file 
where the backend needs to be called to check the database and see if the inputted and stored password matches. Left a comment in that file with more details.
Also worked on UserPage.js, figured out how to display the user's username on the page. Needed to figure that out because eventually we'll need to pull 
exercises from the backend and display them on-screen, but we're not quite ready for that back-end implementation yet. Will update the readme more when more 
commmits come. 
2) 
Implemented UserPage sound recording. Still need to implement playback. On my PC, UserPage.js says it has an error, but it doesn't - the error says it 
can't read typescript but it definitely is able to when the program is actually run. Idk if it will appear on all PCs but if you see it, don't be alarmed,
it runs fine. I'm hoping I can send one more commit by the end of today, but this may be it for me. My next steps will be implementing audio playback on 
user page and polishing up the aesthetics of all the current frontend pages. 

------------------
4/11/2022
------------------

1)
Cleaned up the front end of all the pages and tried to make them as pretty and presentable as possible, but I'm not an artist in the slightest. 
Added a log out button on the user page. Added redirects on the log in and registration pages that links them to each other. 
Still working on playing back recorded audio on the user page. 
2) 
Finally got the audio playback working. Sound is very quiet, but we'll work on that in a later commit. 

------------------
4/13/2022
------------------

Fixed the audio issue in a previous commit. Today's commit was mainly the implementation of a matching game that requires
the user to submit an audio recording to play. The idea is that the audio recording would be submitted to the speech therapist
once the backend is fully implemented. Probably won't get to that in the scope of this semester's project, but as a demonstration
of the larger idea, I think it is effective. 