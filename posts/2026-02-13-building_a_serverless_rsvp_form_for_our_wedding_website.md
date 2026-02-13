---
date: '2026-02-13'
title: Building a Serverless RSVP Form Using Google Forms
description: How I built a custom RSVP form for our wedding website using Eleventy, Nunjucks macros, Cloudflare Turnstile, and Google Forms as a free serverless backend
---
## Building a Serverless RSVP Form Using Google Forms

When Kayelin and I started planning our wedding, one of the first things I knew I wanted to build myself was the website. I'm a software engineer -- of course I'm not going to use a template from The Knot. The site is built with [Eleventy](https://www.11ty.dev/) (11ty), a simple static site generator, and hosted on Cloudflare Pages. Most of the pages were straightforward, but the RSVP form was one of the most interesting pieces to build. I needed something that could collect guest responses reliably, didn't require me to run a backend server, and wouldn't cost me anything. Here's how I pulled it off.

### The Requirements

Our RSVP form needed to collect quite a bit of information:

- Email address and full names of everyone in the party
- Whether they're attending
- Group size, with conditional follow-up questions about children
- Hotel block preferences
- Dietary restrictions
- Song requests
- A fun "how excited are you?" rating

The form also needed to be smart about what it showed. If someone says they're not attending, there's no reason to ask them about hotel rooms. If someone is coming alone, asking about children doesn't make sense. And the whole thing needed to work without JavaScript for the basic structure, while using JS to enhance the experience.

### Google Forms as a Backend

I was initially inspired by [Formfacade](https://formfacade.com/), a service that lets you put a custom UI on top of Google Forms. It's a cool product, but I realized I could achieve the same thing myself without a third-party dependency. The key insight is that Google Forms accepts POST requests to a predictable URL. Each form field has an `entry.XXXXXXXXXX` ID, and you can submit data to the form's `formResponse` endpoint from anywhere. This means I could build a completely custom frontend while using Google Forms as a free, reliable data store with Google Sheets as the "database."

The JavaScript maps my HTML field names to Google Form entry IDs:

```javascript
var ENTRY = {
  attending:     'entry.1550349419',
  groupSize:     'entry.2007109543',
  names:         'entry.759833931',
  children:      'entry.1062559583',
  childrenMeals: 'entry.470400635',
  // ... and so on
};
```

On submit, the script builds a hidden form targeting a hidden iframe, maps all the values to their Google entry IDs, and submits it. This is necessary because of CORS (Cross-Origin Resource Sharing) -- a browser security mechanism that prevents JavaScript on your site from making requests to a different domain unless that domain explicitly allows it. Google Forms doesn't allow it, so you can't just `fetch()` the endpoint. But CORS only applies to JavaScript-initiated requests. A regular HTML form submission bypasses it entirely, even when targeting a hidden iframe. This gives us a custom UI with no cross-origin issues and no server-side proxy needed.

```javascript
var iframe = document.createElement('iframe');
iframe.name = 'rsvp-submit-frame';
iframe.style.display = 'none';
document.body.appendChild(iframe);

var gForm = document.createElement('form');
gForm.method = 'POST';
gForm.action = FORM_ACTION;
gForm.target = 'rsvp-submit-frame';
```

Since we can't read the cross-origin iframe response, there's a 3-second timeout fallback that assumes success. In practice, Google Forms is reliable enough that this works fine.

### Nunjucks Macros for DRY Form Fields

Rather than writing repetitive HTML for every form field, I built a set of Nunjucks macros that generate consistent markup. There are three macros: `textInput`, `selectInput`, and `radioGroup`. Each handles labels, required indicators, validation messages, and the various HTML attributes.

For example, adding a text input is as simple as:

```nunjucks
{{ textInput("email", "What is your email address?",
    type="email", required=true,
    validationMsg="Please enter a valid email address.") }}
```

The macro generates the label, input element, required asterisk, and validation message span. This kept the form template clean and made it trivial to add or modify fields. The radio group macro supports both simple string options and object options with separate values and labels, which I used for the excitement rating with its star emojis.

### Conditional Field Visibility

The form uses progressive disclosure -- fields appear only when they're relevant. This is handled entirely in vanilla JavaScript with no framework overhead:

- The "attending fields" section (group size, hotel, dietary, etc.) only appears when the guest selects "Yes" to attending
- The children question only appears when group size is greater than 1
- Children meal/age follow-ups only appear when they say "Yes" to bringing children
- Hotel room count only appears when they select one of the hotel blocks

Each toggle also manages the `required` attribute on its child fields, so the browser's native form validation doesn't block submission on hidden fields. When someone selects "No" to attending, the script fills in sensible defaults (group size 1, no hotel, dietary "N/A") so the Google Form still gets complete data.

### Bot Protection with Cloudflare Turnstile

Since this is a public-facing form, I needed some protection against spam submissions. I used [Cloudflare Turnstile](https://www.cloudflare.com/products/turnstile/), which I've used professionally as well. The form starts hidden, and only appears after Turnstile's invisible challenge completes:

```nunjucks
{% if env.turnstileSiteKey %}
  <script src="https://challenges.cloudflare.com/turnstile/v0/api.js" async defer></script>
  <div class="cf-turnstile"
       data-sitekey="{{ env.turnstileSiteKey }}"
       data-callback="onRsvpVerified"
       data-appearance="interaction-only"></div>
{% endif %}
```

The `interaction-only` appearance means most real users never see a challenge at all. The site key is injected at build time via environment variables, so the Turnstile integration is completely optional -- if the key isn't set, the form just works without it. This made local development painless.

### Automatic Deadline Enforcement

The form automatically closes after the RSVP deadline without any server-side logic. A small inline script checks the current timestamp against a hardcoded Unix epoch value:

```javascript
if (Date.now() / 1000 > 1797397200) {
  document.getElementById('rsvp-closed').style.display = '';
}
```

The JavaScript also checks this timestamp and hides the form entirely if the deadline has passed. No need to redeploy the site or flip a feature flag.

### Duplicate Submission Prevention

After a successful submission, the script sets a `localStorage` flag. On subsequent visits, instead of showing the form, it shows a "You've already RSVPed!" message with an option to submit a new response (which just clears the flag and reloads). This isn't bulletproof -- clearing browser data resets it -- but it prevents accidental double submissions from guests who might revisit the page.

### Testing

I created a separate test page at `/rsvp-test/` that points to a different Google Form. This let me hammer the form during development without polluting the real response sheet. The test page overrides the form action URL via a global variable:

```html
<script>
  window.RSVP_FORM_ACTION = 'https://docs.google.com/forms/d/.../formResponse';
</script>
```

The RSVP JavaScript checks for this global before falling back to the production URL, so the same script works for both environments.

### The Stack

For anyone curious about the full tech stack:

- **Static site generator**: Eleventy with Nunjucks templates
- **Hosting**: Cloudflare Pages
- **Form backend**: Google Forms + Google Sheets
- **Bot protection**: Cloudflare Turnstile
- **Form submission**: Hidden iframe POST (no CORS issues)
- **Conditional logic**: Vanilla JavaScript, no frameworks