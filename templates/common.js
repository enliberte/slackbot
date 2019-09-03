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

const addSectionWithButton = (text, buttonText) => ({
    ...addSection(text),
    "accessory": {
        "type": "button",
        "text": {
            "type": "plain_text",
            "text": buttonText,
            "emoji": true
        },
        "value": "click_me_123"
    }
});

module.exports = {addDivider, addSection, addSectionWithButton};