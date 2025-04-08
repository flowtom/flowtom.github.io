// kick-off-job.js
console.log("Kick Off Job script running");

// First, attempt to get the task label ("PLAN-774") from the referrer URL.
let taskLabel = "";
const referrerUrl = document.referrer;
if (referrerUrl && referrerUrl.includes("clickup.com/t/")) {
  // Assume the URL is formatted like "https://app.clickup.com/t/9014530508/PLAN-774"
  const parts = referrerUrl.split("/t/");
  if (parts.length > 1) {
    const subParts = parts[1].split("/");
    // subParts[0] is the numeric ID; subParts[1] should be "PLAN-774"
    if (subParts.length > 1) {
      taskLabel = subParts[1];
    }
  }
}

// You can also check if your URL contains any preset query parameters.
const urlParams = new URLSearchParams(window.location.search);
const passedTaskId = urlParams.get("task_id") || ""; // if you pass task_id manually
const passedTaskName = urlParams.get("task_name") || ""; // if you pass task_name manually

// Use the referrer data as the fallback if query parameters aren't provided.
const taskId = passedTaskId || "defaultTaskID"; 
const taskName = passedTaskName || (taskLabel || "DefaultJob");

// Your secret token can be hardcoded into the webhook URL if you choose.
const secretToken = "hI8KMpMG^YMmh&6^$*rJWd&SGHcD1BrD"; // Your secret token

// Construct the final URL that n8n will receive.
// Here, all parameters are added to the URL as a query string.
const redirectUrl = `https://newfangledstudios.app.n8n.cloud/webhook-test/kick-off?token=${encodeURIComponent(secretToken)}&task_id=${encodeURIComponent(taskId)}&task_name=${encodeURIComponent(taskName)}`;

// Redirect the browser to the n8n webhook endpoint (using a GET request)
window.location.href = redirectUrl;
