const addSection = (text) => ({
    "type": "section",
    "text": {
        "type": "mrkdwn",
        "text": text
    }
});

const addDivider = () => ({
    "type": "divider"
});

const addSectionWithButton = (text, buttonText, buttonValue) => ({
    ...addSection(text),
    "accessory": {
        "type": "button",
        "text": {
            "type": "plain_text",
            "text": buttonText,
            "emoji": true
        },
        "value": buttonValue
    }
});

module.exports = {addDivider, addSection, addSectionWithButton};