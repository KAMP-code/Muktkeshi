# Muktkeshi

**Strum a song, fund a pad kit, heal a paw.**

Muktkeshi is a student-led fundraiser for two causes:

1. **Menstrual hygiene access**: sanitary pad kits for communities where pads are not government supplied.
2. **Injured and rescued animals**: vet care for injured street dogs and rescue animals.

Money comes from direct donations, sales of donated guitars ("Guitars for a Cause") and periodic student guitar concerts.

## The site

A static, mobile-first website in plain HTML, CSS and JavaScript. There is no backend and no build step.

| File | What it is |
|---|---|
| `index.html` | Page structure and copy |
| `styles.css` | Styles, light and dark themes |
| `script.js` | Impact numbers, guitar listings, concerts, footer year |
| `logo.png` / `logo.webp` | Full logo, transparent background |
| `logo-white-bg.png` / `.webp` | Full logo on white (used in the hero) |
| `logo-mark.png` | Round logo mark (header, social profile picture) |
| `favicon.png` | Browser tab icon |

## Run it locally

```bash
python3 -m http.server 8080
```

Then open http://localhost:8080.

## Things to edit before launch

- **Impact numbers, guitars and concerts:** the lists at the top of `script.js`.
- **Donation links:** the two `href="REPLACE_ME"` values in the Donate section of `index.html`.
- **Guitar listing links:** `url: "REPLACE_ME"` for each guitar in `script.js`.
- **Guitar photos:** the current photos are examples from Wikimedia Commons. Replace them with photos of your own donated guitars.
- **Story videos:** the `data-youtube-id="REPLACE_ME"` attributes in `index.html`.
- **Contact email:** `REPLACE_ME@example.com` in `index.html`.

## Hosting on AWS Amplify

The repo includes `amplify.yml`, so Amplify serves the files as they are, with no build step.

1. In the AWS Amplify console, choose **Create new app**, then **GitHub**, and authorize access.
2. Pick the `Muktkeshi` repository and the `main` branch.
3. Keep the detected build settings from `amplify.yml` and choose **Save and deploy**.

Every push to `main` redeploys the site automatically.
