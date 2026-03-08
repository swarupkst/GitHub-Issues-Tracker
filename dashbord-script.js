const allBtn = document.getElementById("all");
const openBtn = document.getElementById("open");
const rejectBtn = document.getElementById("close");

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
        <div class="bg-white rounded-xl py-5 px-5 space-y-4 border-t-4 ${statusColor}">
        
            <div class="flex justify-between">
                <img class="size-8" src="${statusIcon}">
                <span class="bg-gray-300 py-1 px-4 rounded-2xl">${issue.priority}</span>
            </div>

            <h2 class="font-bold text-2xl">${issue.title}</h2>

            <p class="text-gray-500">
                ${issue.description}
            </p>

            <div class="flex gap-3 text-sm font-normal ">
                <p class="bg-red-100 text-red-600 px-4 py-2 rounded-3xl font-semibold"> <i class="fa-solid fa-bug" style="color: rgb(246, 69, 69);"></i> ${issue.labels[0]}</p>
                <p class="bg-yellow-200 text-yellow-700 px-4 py-2 rounded-3xl font-semibold"> <i class="fa-solid fa-life-ring" style="color: rgb(170, 135, 11);"></i> ${issue.labels[1]}</p>

            </div>

            <hr class="border-gray-300">

            <p>#${issue.id} by ${issue.author}</p>
            <p>${issue.createdAt.slice(0, 10)}</p>

        </div>
        `;

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

loadIssues();