# Deploying Webhook functions to Netlify

- [ ] Install node/npm on Mac with Homebrew

```bash
/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/
Homebrew/install/master/install)"
brew update
brew install node
```

- [ ] Yarn install
I'm using `yarn` which you can install using npm `npm install --global yarn`.  The  build command is `yarn install`. 

You can use `npm`.  The NPM build command is `npm install`.


You can deploy async functions to netlify.  There are many options available for doing this.  We'll use the [Netlify CLI](https://docs.netlify.com/cli/get-started/).  Here is list of Netlify CLI commands for reference: [commands](https://cli.netlify.com/).

If you fork this repository or copy the functions in the `/functions` directory to your own repository, you can deploy them to Netlify by including a `netlify.toml` file in your root with the following information for building and specifying where to find the functions directory.

## Cloudinary
Sign up for a free Cloudinary account and copy the CLOUDINARY_URL into the `CLOUDINARY_URL` variable value.

## Sendgrid
If you want to send email notifications, sign up for a free [Sendgrid Account](https://sendgrid.com/go/email-smtp-service-signup).  Be sure to save our API_KEY somewhere. Create a registered sender and add to `FROM_VERIFIED_SENDER`.  Add a recipient email in `TO_RECIPIENT`.  Add the Sendgrid API_KEY to the `SENDGRID_API_KEY`.  

## Netlify 
We'll be calling lambda functions from other functions so you'll need your base directory.  If your netlify project is named `webhook`, the base directory will be `https://webhook.netlify.app/.netlify/functions/`.  This project name has to be unique so, you'll usually include your name in it.

## If you want to trigger lambda functions that process the Google Video Moderation Queue, 

- [ ] Setup `netlify.toml` file 

The `command` key tells Netlify to run `yarn install` which will install the NPM dependency packages.
The `publish` key  tells netlify that it can serve from the  `/public/` directory for this project.  
The `functions` key tells netlify that it can find the lambda functions in the `functions` directory of this project. 

```toml
[build]
  command = "yarn install"
  publish = "public"
  functions = "functions/"
```
- [ ] Create a local .env file
This file should be .gitignore'd.  
It should contain:

```bash
SENDGRID_API_KEY=SG.xxxxxxx
FROM_VERIFIED_SENDER=xxx@xxx.xxx
TO_RECIPIENT=xxx@xxx.xxx
CLOUDINARY_URL=cloudinary://API_KEY:API_SECRET@CLOUD_NAME
PROD_FN_PATH="https://<project name>.netlify.app/.netlify/functions/"
```

- [ ] Local testing
`yarn install` locally  
`yarn dev` to start servers locally
`yarn test` to run invoke the lambda functions locally for testing

- [ ] Install netlify cli  
`npm install netlify-cli`  

- [ ] Login to netlify
`netlify login`  
This will drop some authorization information in ~/Library/Preferences/netlify/config.json

If you need to login to a different account, log out first. 
`netlify logout`  

- [ ] Initialize Netlify Project and Connect to Github
`netlify init`  
Netlify should read your toml file for defaults. 
Choose the option to  `Create and configure new site`
Choose site name 
Command should be `yarn install` 
Deploy to `public` directory

You will probably need to `git push` after this.

- [ ] Public environment variables
You can push your environment variables out to netlify from the CLI. 

`netlify env:import .env` 

After you update environment variables you need to trigger a build for them to take affect.  Pushing to GitHub will do this. 
You can also use this CLI command: `netlify deploy --trigger`



## Test Email Notify Function

Modify the `use-cases/upload-video-eager.js` to use the full path to the notify email function for the webhook.  It will be something like `https://webhook.netlify.app/.netlify/functions/webhook_notify_email`

From the root, run `node use-cases/upload-video-eager.js`

## Test Moderation Functions



## Trouble Shoot

You can view logs most easily on the netlify website. Open the website. 

`netlify open` 

Then navigate to functions and choose the function you're interested it to see its logs.



