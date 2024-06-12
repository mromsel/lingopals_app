# lingopals_app
LingoPals App developed in Ionic with Angular

## How to launch local

Running this command will open a tab in your default browser in the url "localhost:8100":
```
ionic serve
```

If you want to deploy but not open the app automatically in the browser you must use:
```
ionic serve -b
```

## How to build app
- Build app with the following command:
```
ionic build
```

## How to deploy in android

- Add android platform
```
npx cap add android
```

- Copy project to android folder
```
npx cap copy
```

- Open app in Android Studio
```
npx cap open android
```

Now you can just use your favourite emulator in the IDE