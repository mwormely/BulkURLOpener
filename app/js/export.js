(() => {
    document.getElementById("closeModal").addEventListener('click', (e) => {
        if (checkHostType() === "firefox") {
            alert("Unable to close window due to Firefox security policy. Please close this window manually.");
            // window.close();
        } else if (checkHostType() === "chrome") {
            window.close();
        } else if (checkHostType() === "electron") {
            window.location.replace("popup.html");
        }
    });

    buildExportData();
})();

function buildExportData() {
    const exportTextArea = document.getElementById("exportTextArea");
    let exportData = {
        maxID: 0,
        lists: [],
        settings: {}
    };
    for (let i = 0; i < localStorage.length; i++) {
        const tempStorage = loadList(localStorage.key(i));
        const parsedJSON = JSON.parse(tempStorage);
        if (localStorage.key(i) === "settings") {
            exportData.settings = parsedJSON;
        } else if (parsedJSON.object_description === "list_storage") {
            exportData.lists.push(parsedJSON);
        } else if (localStorage.getItem("maxID") !== "NaN") {
            exportData.maxID = localStorage.getItem("maxID");
        }
    }
    exportData = JSON.stringify(exportData);
    exportTextArea.value = exportData;
    exportTextArea.select();
}