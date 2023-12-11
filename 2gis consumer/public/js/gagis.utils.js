const gagisUtils = {
    convertTextToBalloon: (text) => {
        let description = "";
        for (let line of text.split('\n')) {
            if (line.trim().startsWith("#")) {
                description += `<strong>${line.trim().slice(1).trim()}</strong></br>`;
            } else if (line.trim().startsWith("*")) {
                description += `<i>${line.trim().slice(1).trim()}</i></br>`;
            } else {
                description += `<p>${line.trim()}</p>`;
            }
        }
        return description;
    },

};