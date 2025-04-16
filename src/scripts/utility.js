const excludedGenres = [
    "Censored", "Hd", "Documentary", "Plot", "X-Ray", "Virgin", "Public Sex", "Pov", "Filmed", "Maid", "Glasses", "Swimsuit", "Uncensored", "Teacher", "Ugly Bastard",
    "Nurse", "Watersports"
];

const keywordReplacements = {
    "Oral": "Blow Job",
    "Bondage": "Bdsm"
};

const genres = [...document.querySelectorAll(".tags a")]
    .map(a => {
        let genre = a.textContent.trim().toLowerCase().replace(/\b\w/g, c => c.toUpperCase());

        // Replace specific keywords
        Object.keys(keywordReplacements).forEach(key => {
            if (genre === key) {
                genre = keywordReplacements[key];
            }
        });

        return genre;
    })
    .filter(genre =>
        !excludedGenres.includes(genre) &&  // Exclude specified genres
        !/^\d{4}$/.test(genre) // Exclude years (e.g., 1999, 2024)
    );

const jsonString = JSON.stringify(genres, null);
console.log(jsonString);

const textArea = document.createElement("textarea");
textArea.value = jsonString;
document.body.appendChild(textArea);
textArea.select();
document.execCommand("copy"); // Use execCommand to copy
document.body.removeChild(textArea);

console.log("✅ Data copied to clipboard!");



// ############################################################################################################# //

function scrapeAnimeData() {
    const getText = (selector) => document.querySelector(selector)?.innerText.trim() || "";

    const getTextFromLabel = (label) => {
        const element = [...document.querySelectorAll(".spaceit_pad")].find(el => el.innerText.includes(label));
        return element ? element.innerText.replace(label, "").trim() : "";
    };

    const getArrayFromLabel = (label) => {
        const element = [...document.querySelectorAll(".spaceit_pad")].find(el => el.innerText.includes(label));
        return element ? [...element.querySelectorAll("a")].map(a => a.innerText.trim()) : [];
    };

    const getDescriptionLines = () => {
        const description = getText("p[itemprop='description']");
        return description ? description.split("\n").map(line => line.trim()).filter(line => line.length > 0 && line !== "[Written by MAL Rewrite]") : [];
    };

    const animeData = {
        Title: getText("h1.title-name"),
        AlternateTitles: [
            getTextFromLabel("English:"),
            getTextFromLabel("Synonyms:"),
            getTextFromLabel("Japanese:")
        ].filter(Boolean),
        Descriptions: getDescriptionLines(),
        Episodes: Number(getTextFromLabel("Episodes:")) || 0,
        Aired: getTextFromLabel("Aired:"),
        Studios: getArrayFromLabel("Studios:"),
        Genre: getArrayFromLabel("Genre:").length ? getArrayFromLabel("Genre:") : getArrayFromLabel("Genres:"),
        Theme: getArrayFromLabel("Theme:").length ? getArrayFromLabel("Theme:") : getArrayFromLabel("Themes:"),
        Cover: "",
        Related: []
    };

    const jsonString = JSON.stringify(animeData, null, 2);
    console.log(jsonString);

    // ✅ Alternative Clipboard Method (Works Everywhere)
    const textArea = document.createElement("textarea");
    textArea.value = jsonString;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand("copy"); // Use execCommand to copy
    document.body.removeChild(textArea);

    console.log("✅ Data copied to clipboard!");
    return animeData;
}

// Run this in the browser console
scrapeAnimeData();