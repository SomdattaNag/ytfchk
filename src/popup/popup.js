document.addEventListener("DOMContentLoaded", function () {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        const currentUrl = tabs[0]?.url || "";
        document.getElementById("video-url").value = currentUrl;
    });

    document.getElementById("report-form").addEventListener("submit", submission);
});

// Function to handle form submission and store data in chrome.storage
function submission(event) {
    event.preventDefault();
    
    const videoUrl = document.getElementById("video-url").value.trim();
    const issue = document.getElementById("issue").value.trim();
    const correctSource = document.getElementById("correct-source").value.trim();

    if (!videoUrl || !issue || !correctSource) {
        alert("All fields are required!");
        return;
    }

    // Create report object
    const report = {
        videoUrl,
        issue,
        correctSource,
        timestamp: new Date().toISOString(),
    };

    // Retrieve existing reports and update storage
    chrome.storage.local.get({ reports: [] }, function (data) {
        const reports = data.reports;
        reports.push(report);
        chrome.storage.local.set({ reports }, function () {
            alert("Report submitted successfully!");

            // Redirect to display page after submission
            window.location.href = "display.html";
        });
    });
}

