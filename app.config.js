export default {
  "expo": {
    "name": "teammanagmentapp",
    "slug": "teammanagmentapp",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/icon.png",
    "userInterfaceStyle": "light",
    "splash": {
      "image": "./assets/splash.png",
      "resizeMode": "contain",
      "backgroundColor": "#ffffff"
    },
    "plugins": [
      "@react-native-google-signin/google-signin",
    ],
    "assetBundlePatterns": [
      "**/*"
    ],
    "ios": {
      "supportsTablet": true,
      "bundleIdentifier": "com.teammanagmentapp",
      "googleServicesFile": process.env.GOOGLE_SERVICES_INFOPLIST,
    },
    "android": {
      "adaptiveIcon": {
        "foregroundImage": "./assets/adaptive-icon.png",
        "backgroundColor": "#ffffff"
      },
      "package": "com.teammanagmentapp",
      "googleServicesFile": process.env.GOOGLE_SERVICES_JSON,
    },
    "web": {
      "favicon": "./assets/favicon.png"
    },
    "extra": {
      "eas": {
        "projectId": "66474d44-21d3-4157-aa18-0b7b9f600182"
      }
    }
  },
  "plugins": [
    [
      "expo-camera",
      {
        "cameraPermission": "Allow $(PRODUCT_NAME) to access your camera."
      }
    ]
  ]
}