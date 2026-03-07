const allBtn = document.getElementById("all-job");
const interviewBtn = document.getElementById("interview-list");
const rejectBtn = document.getElementById("reject-list");

allBtn.onclick = function () {
    allBtn.classList.add("btn-active");
    interviewBtn.classList.remove("btn-active");
    rejectBtn.classList.remove("btn-active");
};

interviewBtn.onclick = function () {
    interviewBtn.classList.add("btn-active");
    allBtn.classList.remove("btn-active");
    rejectBtn.classList.remove("btn-active");
};

rejectBtn.onclick = function () {
    rejectBtn.classList.add("btn-active");
    allBtn.classList.remove("btn-active");
    interviewBtn.classList.remove("btn-active");
};
