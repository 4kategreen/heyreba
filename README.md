# heyreba
`heyreba` assigns tasks to others do you don't have to do them

## Usage within Slack

### To assign a task:
`/heyreba assign @dash go get the paper`

`heyreba` will:
* Tell `@dash` to go get the paper
* Confirm to you that she told him

### To complete a task:
`/heyreba complete @kate got the paper`

`heyreba` will:
* Tell me that `@dash` got the paper
* Confirm to `@dash` that she told me

## Basic Implementation
This app is backed by a Netlify Function that handles all cases since it's so simple. I designed the UX after a basic CLI and tested the following cases:
* Message structure. Make sure to send an error message if the message doesn't match up correctly. 
* I sought to catch all potential error cases and provide the user with useful information and more in the logs.
* I used property-based testing to test random strings in the assignment to be sure my message parsing function handled long, short, and odd messages.

## Improvements
1. My main method of improvement would be to add a GUI to the interface. I value usability, so I would be sure to provide a good user experience. For that, I would want buttons and perhaps a modal. Since `/remind` is pretty good already, I'm not sure how far I'd go in this one, except to create some kind of amusing bot to celebrate my dog's usefulness (and she _does_ get the paper!).
1. I didn't test users that have spaces in their name (ie, `@Reba Puppypants`). Since I'm splitting the string by spaces, I decided to skip this. if this was required, I'd want to upgrade how the app was implemented.
1. Add a better packing and build process. It's a small app that was barely taking a half second to execute each call, so I didn't do anything fancy to minify or streamline the builds.

## Thanks!
It was fun. I've never made a Slackbot or app before, but I'm a discerning consumer of them, so it was a good exercise to create even the simplest of apps that would meet my standards. On the way I got to:
* Discover how easily I could deploy a Netlify Function
* Reimagine a way to use property-based testing
