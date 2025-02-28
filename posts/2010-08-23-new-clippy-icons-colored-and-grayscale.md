---
layout: post
status: publish
published: false
title: New Clippy Icons (Colored and Grayscale!)
author:
  display_name: Dylan Taylor
  login: dylanmtaylor
  email: dylan@dylanmtaylor.com
date: '2010-08-23 01:43:04 +0000'
date_gmt: '2010-08-23 01:43:04 +0000'
---

[![New Clippy Icon (Colored) Ultra-High Resolution](/images/blog/2010/08/grayscale-icon-vector-ultra-large-150x150.png){width="250" height="340" .alignleft}](/images/blog/2010/08/grayscale-icon-vector-ultra-large-150x150.png)

When I originally designed the Clippy [icon](http://en.wikipedia.org/wiki/Icon), I made it using a free, [open source](http://en.wikipedia.org/wiki/Open_source) [graphics editing program](http://en.wikipedia.org/wiki/Graphics_software) called [GIMP](http://www.gimp.org/), and saved it as a 720x720 [PNG](http://en.wikipedia.org/wiki/Portable_Network_Graphics) image. While 720x720 is a large resolution, large enough for almost anything I need to use my icon for, it's still a [raster image](http://en.wikipedia.org/wiki/Raster_graphics) format, and it doesn't scale well. This also results in it being more difficult to edit the image and make changes, such as editing colors, resizing it, etc. If you don't care about all the technical details, scroll down to the end of this post to check out the new icons. Otherwise, continue reading.

To solve this problem, I opened up the original image in [Inkscape](http://www.inkscape.org/), a free and open source *vector* graphics editing program, and traced the paths of the "clip" and the "writing" from the original clipboard image, converting them into vectorized paths. I used the "Exclusion" tool to create the hole in the clip. I then created a new rounded rectangle as the new 'base' of the clipboard, with a fill color that matched the inside color of the base in the raster image, and a stroke color that matched the color around the edge of the clipboard in the old raster image.

After making sure that I had the stroke width exactly the same length as the border of the base of the old image, I lined up the rounded rectangle with the upper left corner of the base of the old image, and resized it so that the bottom right corner lined up with the bottom right corner in the previous image. I then messed with the radius of the new base's corners until it lined up almost perfectly with what I had before.

At this point, I had the "writing" scribbles, the "clip", and the new clipboard base recreated in glorious [SVG](http://en.wikipedia.org/wiki/Scalable_Vector_Graphics) format. I then put all three parts on their own layers, organizing them (from top to bottom): "Clip", "Writing", "Board". Because I had the base of the clipboard done at this point, I locked that layer so I wouldn't accidentally mess it up, and then I selected all of the writing.

I then changed the fill color of all of the writing at once to match the fill color in the previous image. Since at this point I already had the "writing" exactly where I wanted it, and the writing was already in path form, I used the "Simplify" feature under the path menu, to clean up the paths of the writing a little bit, as it doesn't have to be exact, since the "writing" is only a bunch of wavy lines anyways.

Now that I had the "writing" taken care of, and the "board" complete, with their colors similar to what I had in my previous icon, I was mostly done. All I had to worry about now was shading the "clip" (at that point in time, I only had the outline of the clip, with no fill color), and recreating the "paper", for the "writing" to go on.

I used the "hide layer" function to get the clip out of the way for now, and I began creating a new rectangle (not rounded this time) with the exact same dimensions as the old image's "paper", by, once again, lining up the upper left and bottom right corners. After making sure that I had the border length exactly the same as the border length of the old "paper", and then I set the fill color and stroke color to match the colors in the original image. All that was left was filling in the "clip" with a gradient.

After playing around with the linear gradient settings for a while, I finally had something that I was satisfied with, and I truly believed that it might even be better than the original Clippy icon. Since the new icon came out so great, I figured that it would be a good idea to make a [grayscale](http://en.wikipedia.org/wiki/Grayscale) version of the icon, for things like the notification bar icon, which typically don't have any coloration.

So, I saved the colored image, and fired up Inkscape again, and got to work. Keeping all the sizes and positioning of the layers the same, I messed with the fill and stroke colors until I had a nice looking, Android-style grayscale image. Unfortunately, due to [Wordpress.com](http://wordpress.com/)'s [file type](http://en.wikipedia.org/wiki/File_format) limitations, I can't upload any SVG files, so, unfortunately, you won't be able to see these images in their original, lossless forms, but I can, however, upload [rasterized renderings](http://en.wikipedia.org/wiki/Rasterisation) of the images saved as PNG files.

To accurately show the difference between the new vector images and the old raster images, I rendered these images at a very [high resolution](http://en.wikipedia.org/wiki/Image_resolution). As you can clearly see, just by looking at the images, there is absolutely no loss of clarity in the vector image rendering, where the original raster image becomes significantly pixelated when scaled. Also, even though it's possible to scale the vector icons to almost any size without the quality degrading, their size is actually significantly less than the original raster images. Anyways, here are the links to the images, so you can check them out for yourself:

- [New Vector Clippy Icon (Colored) Ultra-High Resolution PNG](/images/blog/2010/08/color-icon-vector-ultra-large-new1-150x150.png)
- [New Vector Clippy Icon (Grayscale) Ultra-High Resolution PNG](/images/blog/2010/08/grayscale-icon-vector-ultra-large-new-150x150.png)
- [Previous Vector Clippy Icon (Colored) Ultra-High Resolution PNG](/images/blog/2010/08/color-icon-vector-ultra-large-150x150.png)
- [Previous Vector Clippy Icon (Grayscale) Ultra-High Resolution PNG](/images/blog/2010/08/grayscale-icon-vector-ultra-large-150x150.png)
- [Old Raster Clippy Icon (Colored) Scaled 7X PNG](/images/blog/2010/08/colored-icon-old-raster-scaled-7x-150x150.png)
- [Old Raster Clippy Icon (Colored) Original Resolution PNG](/images/blog/2010/08/colored-icon-old-raster-original-size-150x150.png)

Let me know what you think about the new icon by leaving a comment on this post!

**Note:** There is no "old" grayscale image, as I created it originally when I converted the colored image to SVG.

**UPDATE:** I made some slight changes to the gradient used in the 'clip' of the colored logo. It now looks shinier, and closer to the original raster image. Also, I slightly improved the subtle gradient used in the 'board' of both vector images. The images on this page are now updated to reflect that change.
