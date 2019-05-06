# 🎞 película

 > The ultimate PWA for movie night polls. 🍿

 [![Netlify Status](https://api.netlify.com/api/v1/badges/d5700271-4e53-4ded-8727-d3a895b12b17/deploy-status)](https://app.netlify.com/sites/pelicula/deploys)


Película is modern progressive web application aiming to simplify the process of selecting what film to watch during your next movie night with your friends.

## Self-Hosted

Perfect for tech startups who organize movie nights with the collegues. The open source version can be hosted on-premises or public cloud/CDN providers like Firabase and Netlify for free.

The initial version will use Firebase as the realtime backend provider, but with the community help it can be backend agnostic in the future.

## La Película 

SaaS offering hosted by us featuring recurrent movie nights, API integrations and AI-augmented suggestions based on previous choices, genres and critic scores.

> 🏗Expected: August, 2019

## Features

- [x] Based on [Nuxt](https://nuxtjs.org/): no need to eject, fully upgradable, modular and able to pre-render certain routes
- [ ] Backed by and hosted on: [Firebase](https://firebase.google.com/): authentication, Firestore realtime DB and CDN
- [ ] Backend agnostic: remove the usage of Firebase constraint and allow other realtime (deepstreamHub, Sockets.IO) and non-realtime (REST APIs, GraphQL) data sources


## Build Setup

``` bash
# install dependencies
$ yarn install

# serve with hot reload at localhost:3000
$ yarn run dev

# generate static project
$ yarn run generate
```

For detailed explanation on how things work, checkout [Nuxt.js docs](https://nuxtjs.org).
