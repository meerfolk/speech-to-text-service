const btnEl = document.getElementById("recognize-btn");
btnEl.setAttribute("disabled", true);
const fileEl = document.getElementById("file");
let file = null;
fileEl.addEventListener("change", (e) => {
    file = e.target.files[0];
    btnEl.removeAttribute("disabled");
})
btnEl.addEventListener("click", async () => {
    await fetch('/', {
        method: 'POST',
        headers: {
            "Content-Type": "application/octet-stream",
        },
        body: file,
    });
    file = null;
    btnEl.setAttribute("disabled", true);
});

