### Source for Ben Thompson Portfolio Site

Deployed automatically from `main` via [GitHub Pages](https://pages.github.com/).

Currently live at [https://benthompson.party/](https://benthompson.party/)

### Development

The site is developed locally using docker. This is the only tool you'll need to install
in order to run the site. Install docker for your platform by following the guides at:
[https://docs.docker.com/get-started/](https://docs.docker.com/get-started/).

Once you've got docker installed and running, open a terminal and navigate to the directory
where this project is located. You can then run the following command to build and start the
container:

```shell
docker-compose up site
```

You should see some URLs appear in the terminal which means your local version of the site is
now running. Open these URLs in a browser just like a normal website.

Any changes you make to the project files in this directory will be automatically synchronised
to the container, and you'll just need to refresh the browser page to see them applied. Try
changing something in `index.html`, saving the file and refreshing the page you just opened to
check this is working.

After making some changes to project HTML, JS or CSS files, it's good practice to use a code
formatter to make sure your code is organised consistently. This saves you time when writing
code since you don't have to worry about the exact formatting of every line: just make the
changes you need and then run the auto-formatter. To do this, open another terminal and run
this command:

```shell
docker-compose run --rm site prettify
```

This will run through all the files in the project and show you what's changed.

#### Making Changes

The site currently only has three pages. These are defined in the HTML files:

- `index.html` (the homepage)
- `projects.html`
- `influences.html`

The accompanying JS and CSS files are located in the `src` directory. `common.js`
and `styles.css` are used on all pages. The projects and influences pages then have
their own additional styles and JS that load in addition to these.

All images and videos are located in the `assets` directory.

##### Common Elements

You'll find some elements are shared between all three pages. For example, the _Contact_
and _About_ popovers are identical in all three of the HTML files above. Remember to change
all three of them if you make any changes! Look for the elements with `id` values of `contact`
and `about` near the bottom of each page.

Similarly, the `nav` element is also present on all pages but is not identical. On the homepage
and Influences page, each link is pointing to the projects page eg. `/projects#pangaia`. But on
the projects page itself these links are only internal references so just look like `#pangaia`.
These IDs need to match the IDs of the project `article` elements themselves. Remember to update
all of these locations if you add / remove / rename projects.

##### Home Page

This page is pretty simple. You could update the video by adding a new video to the `assets`
directory and then changing the URL in the `.videoContainer` element.

##### Projects Page

This is a pretty big page and has a relatively complicated structure. Each project is an
`article` element which lives inside the main `.content` container. Each project has an `id`
which must match the links in the `nav` element on each page.

Inside each article, you'll find:

- An `h1` element which is the project title. Change the `.projectName` part of this for new
  projects.
- A `.copy` container which contains the copy and hero button if a given project has one.
  - The hero buttons are inline SVG (required to make the hover animation work), and are all different
    depending on the text and icon in the button. Just copy one from an existing project if you're
    adding a new one.
  - The copy itself is just `p` elements which may contain links and whatever else is needed.
- The main `.imagery` container which contains one or more imagery "cards" which contain:

  - A `div` element which can have one of the following types depending on how you want the content
    to be displayed. Inside this container is a `.clipBox` element which clips the edge of the background
    content to the size we want. Then inside this there are one or more `img` or `video` elements depending
    on what the card needs. To add a new card, you can simply copy the entire card element of whatever type
    you need, then update the asset URLs as needed.

    - `blurBorderImage`
    - `blurBorderImage fullWidth`
    - `blurBorderImage doubleMobile`
    - `videoWithBackgroundImage`
    - `fullWidthImage`

  - A `.caption` element which just contains the caption text

These might be intimidating to change, but just copy the structure from an existing project and it will all
work itself out.

##### Influences Page

The interesting part of this page is the `.cloudContainer` container. Inside this is the "image cloud" where
we put all of our influence images. Each image has a `style` attribute which looks like this:
`grid-column: 3 / 7; top: 20vh"`. The `grid-column` property means we want the image to go from the start of the 3rd
column and end at the start of the 7th column. You can turn the cloud grid on in your browser dev tools to make this
easier to understand. The `top` property is how far above or below the center line each image lives. Negative `vh`
values make the element go **up** while positive `vh` values make the element go down. You can experiment with this
in the browser dev tools and then come back to the HTML and set whatever values you like.

All elements in the image cloud must use this method of positioning in order to make the dragging work.

The rest of the copy on the page is simple and can be changed as needed.

#### Saving Changes

We use a tool called `git` to keep track of changes we make to all the files in this project. You probably
have this installed in your terminal already, but if not you'll need to install it for your platform.

Git does a lot of different stuff, but the very bare minimum commands you can run to save changes are as follows.
To run these commands, you'll want to be inside the directory where you cloned this project.

```shell
git add .     # The dot means "add everything"
git commit    # This will open a window where you can name your changes eg. "add new project X"
git push      # This will push your changes to GitHub where they'll be automatically deployed!
```

Be sure to check all your changes are working as expected by running the site locally before running this last
`push` command. GitHub doesn't do any tests or checks to make sure your site will work, so it's all on you if
you decide to push stuff live.

For making bigger changes, or collaborating with someone you probably want to create a new `branch` using Git.
Look up a basic git tutorial for how to do this, it's not complicated.

### Deployment

The site is deployed automatically when you push to the `main` branch. Yolo!
