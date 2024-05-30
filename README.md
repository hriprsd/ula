# Ula

==உலா : Ulā==

==*verb*: To commute==

*Ula* is a ride sharing application for people commuting to and from the same workplace.
The app intelligently lists colleagues travelling on the path intersecting with passengers requesting for ride.
Authentication is using office ID so that the app stays internal to the organizations and the rides are scheduled only with colleagues of the same org.

Project is written using nodeJS , to build the project run `npm install` and to run it locally, use `npm run serve`


# To build apk to run on android, follow the following steps:
## 1: Install Ionic
Ensure you have Node.js and npm installed. Then, install Ionic globally.

```
npm install -g @ionic/cli
```

## 2: Initialize Ionic in Your Vue.js App
Navigate to your Vue.js project directory in this case "ula" and initialize an Ionic project within it.

```
cd UI
ionic init
```

Follow the prompts to initialize Ionic in your existing Vue.js app.

## 3: Add Android Platform
Add the Android platform to your Ionic project. We're using capacitor to build on android platform.

```
npm install @capacitor/cli @capacitor/core
npx cap init ula com.example.ula
```

## 4: Install and configure android-sdk
Make sure the sdkmanager binary is used to accept all lisence terms.

## 6: Build node project using `npm install`

## 5: Build the Android APK

```
npm run build
ionic build
```
This command will generate the APK file in the platforms/android/app/build/outputs/apk/ directory.

## 6: To build apk using gradle, use the commands

```
npx cap add android # to add android platform to capacitor
./gradlew assembleDebug # to build debug apk for testing
./gradlew assembleRelease # to build release apk for production
```

The build apk can be copied over to a virtual device/simulator on IDE of choice or an android device to be installed and used. 

