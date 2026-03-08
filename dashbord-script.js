const allBtn = document.getElementById("all");
const openBtn = document.getElementById("open");
const rejectBtn = document.getElementById("close");
const searchInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-btn");

allBtn.onclick = function () {
    allBtn.classList.add("btn-active");
    openBtn.classList.remove("btn-active");
    rejectBtn.classList.remove("btn-active");

    showAll();
};

openBtn.onclick = function () {
    openBtn.classList.add("btn-active");
    allBtn.classList.remove("btn-active");
    rejectBtn.classList.remove("btn-active");

    showOpen();
};

rejectBtn.onclick = function () {
    rejectBtn.classList.add("btn-active");
    allBtn.classList.remove("btn-active");
    openBtn.classList.remove("btn-active");

    showClosed();
};

//API

let allIssues = [];

const loadIssues = () => {
    toggleLoader(true);
    fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
        .then(res => res.json())
        .then(data => {
            setTimeout(() => {

                allIssues = data.data;

                displayIssues(allIssues);
                updateCount(allIssues);

                toggleLoader(false);

            },);
        });
};



const displayIssues = (issues) => {

    const container = document.getElementById("level-container");
    container.innerHTML = "";

    issues.forEach(issue => {

        const statusColor = issue.status === "open" ? "border-green-600" : "border-purple-600";
        const statusIcon = issue.status === "open" ? "./assets/Open-Status.png" : "./assets/Closed-Status.png";

        const card = document.createElement("div");

        card.innerHTML = `
<div class="bg-white rounded-xl py-5 px-5 space-y-4 border-t-4 ${statusColor} flex flex-col h-full">
        
    <div class="flex justify-between">
        <img class="size-8" src="${statusIcon}">
        <span class="bg-gray-300 py-1 px-4 rounded-2xl">${issue.priority}</span>
    </div>

    <h2 class="font-bold text-2xl">${issue.title}</h2>

    <p class="text-gray-500">
        ${issue.description}
    </p>

    <div class="flex gap-3 text-sm font-normal">

        ${
            issue.labels[0] 
            ? `<p class="bg-red-100 text-red-600 px-4 py-2 rounded-3xl font-semibold">
                <i class="fa-solid fa-bug"></i> ${issue.labels[0]}
               </p>`
            : ""
        }

        ${
            issue.labels[1] 
            ? `<p class="bg-yellow-200 text-yellow-700 px-4 py-2 rounded-3xl font-semibold">
                <i class="fa-solid fa-life-ring"></i> ${issue.labels[1]}
               </p>`
            : ""
        }

    </div>

    <hr class="border-gray-300">

    <p>#${issue.id} by ${issue.author}</p>
    <p>${issue.createdAt.slice(0, 10)}</p>

</div>
`;

card.addEventListener("click", () => {
    openModal(issue);
});

        container.appendChild(card);
    });
};

const toggleLoader = (show) => {
    const loader = document.getElementById("loader");

    if (show) {
        loader.classList.remove("hidden");
    } else {
        loader.classList.add("hidden");
    }
};



const updateCount = (issues) => {
    document.getElementById("issue-count").innerText = issues.length + " Issues";
};

const showAll = () => {
    displayIssues(allIssues);
    updateCount(allIssues);
};

const showOpen = () => {
    const openIssues = allIssues.filter(issue => issue.status === "open");
    displayIssues(openIssues);
    updateCount(openIssues);

};

const showClosed = () => {
    const closedIssues = allIssues.filter(issue => issue.status === "closed");
    displayIssues(closedIssues);
    updateCount(closedIssues);
};

//Search API call and function

const searchIssues = () => {

    const searchText = searchInput.value;

    toggleLoader(true);

    fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${searchText}`)
        .then(res => res.json())
        .then(data => {

            const issues = data.data;

            displayIssues(issues);
            updateCount(issues);

            toggleLoader(false);
        });
};
searchBtn.onclick = function () {
    searchIssues();
};

const openModal = (issue) => {

    // Title
    document.getElementById("modal-title").innerText = issue.title;

    // Status
    const statusEl = document.getElementById("modal-status");

    if (issue.status === "open") {
        statusEl.innerText = "Opened";
        statusEl.className = "px-3 py-1 rounded-full text-white text-sm bg-green-500";
    } else {
        statusEl.innerText = "Closed";
        statusEl.className = "px-3 py-1 rounded-full text-white text-sm bg-purple-500";
    }

    // Author
    document.getElementById("modal-author").innerText = issue.author;

    // Date
    document.getElementById("modal-date").innerText =
        issue.createdAt.slice(0, 10);

    // Description
    document.getElementById("modal-description").innerText =
        issue.description;

    // Assignee
    document.getElementById("modal-assignee").innerText =
        issue.author;

    // Priority
    const priorityEl = document.getElementById("modal-priority");
    priorityEl.innerText = issue.priority;

    if (issue.priority.toLowerCase() === "high") {
        priorityEl.className =
            "px-3 py-1 rounded-full text-white text-sm bg-red-500";
    } else if (issue.priority.toLowerCase() === "medium") {
        priorityEl.className =
            "px-3 py-1 rounded-full text-white text-sm bg-yellow-500";
    } else {
        priorityEl.className =
            "px-3 py-1 rounded-full text-white text-sm bg-green-500";
    }

    // Labels
    const labelsContainer = document.getElementById("modal-labels");
    labelsContainer.innerHTML = "";

    issue.labels.forEach(label => {
        const span = document.createElement("span");

        span.className =
            "px-3 py-1 rounded-full text-sm bg-gray-200 text-gray-700";

        span.innerText = label;

        labelsContainer.appendChild(span);
    });

    // Show modal
    document.getElementById("issueModal").showModal();
};

loadIssues();