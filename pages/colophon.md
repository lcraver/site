---
published: true
highlighting: true
title: Colophon - v3
description: The colophon contains the detailed and formal notes on the design and development of the third version of my personal website, blog, and portfolio.
hire: true
---
## Author's Statement
When I began work on the third version of site in October of 2013, I decided I would take a lightweight and fastidious approach to the design and development. In the past, my website has been more of a storefront for my services, but it failed to tell my story. I think a website should not just be your portfolio, but rather storage of intellectual property: your ideas, your writing, your thoughts, and your memories. The internet is young compared to other methods of recording information, like books, but it will be around in some form for the rest of our lives. This website will serve the means &mdash;in a combination of ways&mdash; for me to achieve the end of recording information.

## Design Notes
Because my site has a very clear focus on intellectual content, I wanted the design to be simple. Every property in the stylesheet and every pixel on the screen is planned out and exectuted in the most proficient manner. This design may not have the charisma of some websites, but that is the intent. My design does not have character, but rather it is transparent; the content has character. I am not trying to tell a story though pixels. I plan to do that through words.

### Typography
As if you were reading a book, typography to feel natural. For that reason, I went with a slightly off-white background and a light grey value for all text. Links are set in a light blue that flows with the "faded" shades of my color values. Only occasionally do I style type in other colors than grey. Most other typographic elements, such as horizontal rules, are also styled in a light grey. I do not use serif typefaces on my website, because even though the design does not necessarily have a distinct character, I feel sans-serifs are more suitable.

#### FF DIN
[!["FF DIN"](/assets/img/site/styleguide/FFDIN.png "FF DIN")](http://wikipedia.org/wiki/FF_DIN)

My primary typeface for headings is _FFDIN_ (sometimes known as DINPRO) in the weights of bold and light. A sans-serif, FF DIN was designed in 1994 by Albert-Jan Pool in San Francisco to revive the old German _DIN 1451_ typeface with greater weight distribution and character sets. In 2010, FF DIN Round was also released, but I do not use it on my site.

[DIN 1451](http://wikipedia.org/wiki/DIN_1451) is often used for traffic, administrative, and technical applications in Germany. It is actively defined by Deutches Institut fur Normung (DIN), the German Institute for Standardization, on the [standards sheet](http://wikipedia.org/wiki/List_of_DIN_standards#DIN_1000_to_DIN_1999) at DIN 1451-4. From 1956 to 200, DIN 1451 was used on German car number plates and the medium and condensed weights are still used on road signs throughout out Germany and other European countries; a more rare, condensed weight can be found on some older road signs from the 1980's.

Ultimately, I like the functional feel of the DIN typefaces &mdash;especially when in uppercase&mdash; and thus feel it is suitable for headings.

#### Open-Sans
[!["Open-Sans"](/assets/img/site/styleguide/Open-Sans.png "Open-Sans")](http://wikipedia.org/wiki/Open_Sans)

FF DIN is not the most readable font when smaller than 16px so I decided not to use it for the primary body font-family. Instead, I use _Open-Sans Regular and Italic_, humanist sans-serif designed by Steve Matteson and commissioned by Google. If you are familiar with the Droid Sans typeface, Open Sans is almost identical with the exception of wider characters and the inclusion of italic variants. As a typeface optimized for legibility across both print and web, Open-Sans was the best sans-serif choice. My typography falls back to Helvetica and Arial if either the font-files do not load or they are not supported.

#### Courier
> A letter... can be courier, which radiates dignity, prestige, and stability.
> <cite>Howard Kettler</cite>

To style code snippets using a slightly modified version of the Github Style by Vasily Polovnyov and [_Courier_](http://wikipedia.org/wiki/Courier_(typeface), a monospaced slab-serif typeface designed by Howard Kettler. The original Courier typeface was commissioned in 1955 by IBM to resemble the output from a strike-on typewriter and was [made free](http://www.ctan.org/tex-archive/fonts/psfonts/courier) in the 1990's. Courier New, a bolder variant of Courier, was introduced in Windows 3.1 and used by the US State Department as their standard typeface until 2004 (when it was replaced by Times New Roman); however, I prefer the style of the original Courier.

### Color &amp; Values
In order to stay consistent with my personal branding, I primarily use grey values on my site.

Limited to these three colors (in RGB) from my brand, I use color sparingly:
- <span style="color:rgb(230,84,87);">Red</span> (for design): `rgb(230,84,87)`
- <span style="color:rgb(179,255,198);">Green</span> (for video): `rgb(179,255,198)`
- <span style="color:rgb(0,218,255);">Blue</span> (for audio): `rgb(0,218,255)`

I use the following values for typography:
- Dark Grey: `rgb(70,72,74)`
- <span style="color:rgb(232,235,237);background:rgba(70,72,74,0.6);padding:3px;">Light Grey</span>: `rgb(232,235,237)`
- <span style="color:rgb(0,169,198);">Links</span>: `rgb(0,169,198)`

The white background of my site is `rgb(248,248,248)`.

## Development Notes
Aesthetics without functionality is art. Combine both qualities and the result is design: both aesthetics and functionality.

This idea is far more important for websites; a website with poorly written code is unacceptable. Therefore, the web adds a third quality to design: engineering &mdash;or development. Making development and design of a website are the same, these three qualities are forever tied together in a symbiotic relationship. I cannot make one decision in design without it effecting development and likewise. You could think of web design as the holy trinity. Just as the father, son and holy-spirit &mdash;they are three parts in one, aesthetics, functionality, and engineering are also three in one.

### Static Site Generator
My site is static and generated using [Assemble](http://assemble.io/) a plugin for [Grunt](http://gruntjs.com/). I write content in either Handlebars (.hbs) or Markdown (.md). I publish my code on Github as an open-source, but contrary to many static sites, my site is not hosted with Github pages. Instead, I host my site on Amazon Web Services. With smart use of the Cloudfront CDN and S3, am easily able to load about seventy-five percent of the pages on my site in less than a second. I monitor the status of my website using [Pingdom](http://tools.pingdom.com/fpt/#!/duUCz3/pburtchaell.com).

### JavaScript, Stylesheets, Images &amp; Other Assets
A complete list of client-side JavaScript plugins:
- [Echo.js]() &mdash;on the article pages, images are lazy-loaded
- [Headroom.js]() &mdash;hides the header when scrolling down
- [Responsive-Nav]() &mdash;responsive, off-canvas navigation
- <s>[Highlighter.js]() &mdash;syntax highlighting</s> Syntax highlighting is handled during the build of the site.

When gzipped at the highest compression level, file sizes are:
- styles.css: ~4.3kb
- components.js: ~3.6kb
- average HTML page: ~5.0kb
- average font: ~20kb (*4 total requests = ~80kb)

By utilizing compression, caching, and a content delivery network, my average response times (as of February 2014) are:
- New York, New York: 880ms
- Amsterdam, Netherlands: 1.64s
- Dallas, Texas: 681ms

As images and other binary files are lazy-loaded, I do not use small resolutions or bitrates (video only); most images are uploaded at full-size (200-300kb).

### Front-End Tools
I use Grunt as a taskrunner for my website and [Bower](http://bower.io/) for package management. To cover each plugin I use for Grunt would far beyond the scope of this document. You can find the gruntfile and a complete list of Grunt plugins in my [repository](http://github.com/pburtchaell/site-assemble/).

## Build Status
[Travis CI](https://travis-ci.org/pburtchaell/site) is used to test each commit on the master and dev (development) branches.

{{!-- TODO:

*Current Master Build Status*: [!["Travis CI Build"](http://img.shields.io/travis/pburtchaell/site/master.svg?style=flat)]()

*Current Developer Build Status*: [!["Travis CI Build"](http://img.shields.io/travis/pburtchaell/site/dev.svg?style=flat)]()

Thanks to [shields.io](http://shields.io/) for the flat badges.--}}
