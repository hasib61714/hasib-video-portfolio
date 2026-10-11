# Md. Hasibul Hasan · Video Portfolio

A static video portfolio. No build step, no framework: `index.html`, `styles.css`, `app.js`, and one content file.

The page follows the usual video-editor portfolio structure:

1. **Showreel** at the top, with a clickable cut list under it.
2. **Work by category**: Short-form, YouTube videos, Commercials and ads, Corporate and events.
3. **Before and after**: color grading, audio clean-up, VFX.
4. **About** and **Contact**.

A category or section with no content is hidden on the live site, so it never looks unfinished.

## Adding content

Everything is in **`content.js`**. Edit it, commit, push. Vercel redeploys on every push to `main`.

To see empty categories while you work, set `showEmptySections: true` at the top of `content.js`. Set it back to `false` before you share the link.

### Add a video

Put the file in `videos/` and a poster frame in `images/`, then add an entry to `work`:

```js
{
  category: "youtube",            // short | youtube | ads | events
  title: "Phone review, 3 minutes",
  src: "videos/phone-review.mp4",
  poster: "images/phone-review.jpg",
  ratio: "16:9",                  // or "9:16", "1:1", "4:5"
  duration: 184,                  // seconds
  badge: "Edited in CapCut",      // short label shown on the card
  description: "What the video is.",
  made: "How it was made: what you shot, what you edited, which tools."
}
```

For a long video, upload it to YouTube (Public or Unlisted) and use its ID instead of `src`:

```js
{ category: "youtube", title: "Vlog", youtube: "dQw4w9WgXcQ", ratio: "16:9", duration: 420, description: "...", made: "..." }
```

Make a poster frame from any video:

```bash
ffmpeg -ss 3 -i videos/phone-review.mp4 -frames:v 1 -q:v 3 images/phone-review.jpg
```

Keep each video file under about 25 MB. Bigger files belong on YouTube.

### Add a before / after

Put both files in `before-after/` and add an entry to `beforeAfter`:

```js
{ type: "image", skill: "Color grading",  title: "Street interview", before: "before-after/street-raw.jpg", after: "before-after/street-graded.jpg", note: "Shot flat on a phone, graded in DaVinci Resolve." },
{ type: "video", skill: "VFX / green screen", title: "Studio shot",  before: "before-after/green.mp4",      after: "before-after/keyed.mp4",          note: "Green screen removed, new background added." },
{ type: "audio", skill: "Audio clean-up", title: "Noisy voice-over", before: "before-after/vo-raw.mp3",     after: "before-after/vo-clean.mp3",       note: "Fan noise removed, voice levelled." }
```

Image and video pairs get a drag handle. The two files must have the same framing (and, for video, the same length). Only show real pairs: the "before" has to be the footage you actually started from.

### Replace the showreel

Export your new showreel as `videos/showreel.mp4` (16:9, 1080p), update `duration`, and rewrite `chapters` so each entry starts at the second of a cut. The guideline for a showreel is 1 to 2 minutes, best clips in the first 5 to 10 seconds, name and contact at the end. The current one is 30 seconds because that is all the finished work there is so far.

## Preview on your computer

```bash
npx serve .
```

## What is in here now

| Clip | Category | How it was made |
| --- | --- | --- |
| Personal intro reel | Short-form | AI-generated with Google Gemini from a portrait photo and a written prompt |
| Kinetic type intro | Short-form | Motion graphics animated in code (Python, FFmpeg) with AI tools |
| Building materials commercial | Commercials and ads | AI-generated with Google Gemini from a written shot list. Spec concept |
| Brand promo, motion graphics | Commercials and ads | Motion graphics animated in code. Spec concept |

The two commercials are spec concepts made for a job application to DJBM Building Materials. They are not official DJBM videos.

## Message to send with the link

English:

> Hello, I am Md. Hasibul Hasan, a software engineer now working on product content and video. I make AI video with Google Gemini and motion graphics with Python and FFmpeg, and I am learning timeline editing.
> Showreel (30 seconds): https://hasib-video-portfolio.vercel.app/#showreel
> Full portfolio: https://hasib-video-portfolio.vercel.app
> I would be glad to talk about your project. Thank you.

Bangla:

> হ্যালো, আমি Md. Hasibul Hasan। আমি একজন Software Engineer, এখন product content আর video নিয়ে কাজ করছি। আমি Google Gemini দিয়ে AI video এবং Python ও FFmpeg দিয়ে motion graphics বানাই, আর timeline editing শিখছি।
> শো-রিল (৩০ সেকেন্ড): https://hasib-video-portfolio.vercel.app/#showreel
> সম্পূর্ণ পোর্টফোলিও: https://hasib-video-portfolio.vercel.app
> আপনার প্রজেক্ট নিয়ে কথা বলতে পারলে খুশি হব। ধন্যবাদ।

Live site: https://hasib-video-portfolio.vercel.app
