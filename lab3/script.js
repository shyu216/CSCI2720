function processform() {
    console.log("testing");



    let newComment = document.createElement("div");
    let element = '<div><svg height="100" width="100"><circle cx="50" cy="50" r="40"></svg></div><div><h5></h5><p></p></div>';
    newComment.innerHTML = element;

    newComment.className = "d-flex";
    newComment.querySelectorAll("div")[0].className = "flex-shrink-0"; // 1st div
    newComment.querySelectorAll("div")[1].className = "flex-grow-1"; // 2nd div

    let lastComment = document.querySelector("#comments").lastElementChild; // instead of lastChild for div element
    newComment.id = 'c' + (Number(lastComment.id.substr(1)) + 1);

    newComment.querySelector("h5").innerHTML = document.querySelector("#new-email").value;
    newComment.querySelector("p").innerHTML = document.querySelector("#new-comment").value;

    let color = document.querySelectorAll("input[name=new-color]:checked")[0].value; // look for checked radio buttons

    newComment.querySelector("circle").setAttribute("fill", color);

    document.querySelector("#comments").appendChild(newComment);

    document.querySelector("form").reset();

}


function loadfile() {

    fetch('file.txt')
        .then(res => res.text())
        .then(txt => console.log(txt))
}