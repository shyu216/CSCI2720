function showhidden() {
    if (document.getElementById('hiddenBar').style.display == 'none') {
        document.getElementById('hiddenBar').style.display = ''
    }
    else {
        document.getElementById('hiddenBar').style.display = 'none'
    }

}


function loadfromfile() {
    fetch('comments.txt')
        .then(res => res.text())
        .then(txt => {
            let newComment = document.createElement("div");
            newComment.innerHTML = txt
            document.querySelector("#comments").appendChild(newComment)
        });
}

function savetofile(outerHTML) {
    fetch('comments.txt')
        .then(res => res.text())
        .then(txt => {
            fetch('comments.txt', {
                method: 'PUT',
                body: txt + outerHTML
            });
        });
}

function task1() {
    location.href = "#sections";

    document.getElementsByName("sectionTitle").forEach((v, i) => {
        if (v.classList.contains('text-start')) {
            v.classList.remove('text-start')
            v.classList.add('text-center')

        }
        else if (v.classList.contains('text-center')) {
            v.classList.remove('text-center')
            v.classList.add('text-end')

        }
        else if (v.classList.contains('text-end')) {
            v.classList.remove('text-end')
            v.classList.add('text-start')

        }
    })
}

function task2() {
    location.href = "#hobby";

    let hobby = window.prompt("What's your hobby?")
    let description
    if (hobby) {
        description = window.prompt("Please briefly describe")
        if (description) {
            let newhob = document.createElement("tr");
            let element = '<td>' + hobby + '</td><td>' + description + '</td>';
            newhob.innerHTML = element;
            document.getElementById("hobbies").appendChild(newhob);
        }
        else {
            window.alert("Enter nothing, disgarded.");
        }
    }
    else {
        window.alert("Enter nothing, disgarded.");
    }
}

function task3() {
    if (document.getElementById('progressBar').style.display == 'none') {
        document.getElementById('progressBar').style.display = ''

        document.addEventListener('scroll', function () {
            let num = parseInt(window.scrollY / (document.documentElement.scrollHeight - window.innerHeight) * 100);
            document.getElementById("progress").style.width = num + '%';
        });
    }
    else {
        document.getElementById('progressBar').style.display = 'none'
    }
}


/* <div class="card text-white bg-primary mt-3 ms-3 me-3"><div class="card-header">shyu0@qq.com</div><div class="card-body"><p class="card-text">What a great job!</p></div></div> */
function processform() {
    let email = document.querySelector("#new-email").value;
    let comment = document.querySelector("#new-comment").value;
    let color;

    if (email.match(/^\S+@\S+$/)) {
        document.querySelector("#new-email").classList.remove("is-invalid")
    }
    else {
        document.querySelector("#new-email").classList.add("is-invalid")
        return false
    }

    if (comment) {
        document.querySelector("#new-comment").classList.remove("is-invalid")
    }
    else {
        document.querySelector("#new-comment").classList.add("is-invalid")
        return false
    }

    if (document.querySelectorAll("input[name=new-color]:checked").length == 1) {
        document.querySelectorAll(".form-check-input").forEach((v, i) => {
            v.classList.remove("is-invalid")
        })
        color = document.querySelectorAll("input[name=new-color]:checked")[0].value
    }
    else {
        document.querySelectorAll(".form-check-input").forEach((v, i) => {
            v.classList.add("is-invalid")
        })
        return false
    }

    let element = '<div class="card-header">' + email + '</div><div class="card-body"><p class="card-text">' + comment + '</p></div></div>';
    let newComment = document.createElement("div");
    newComment.innerHTML = element;
    newComment.classList.add('card', color, 'mt-3', 'ms-3', 'me-3')

    document.querySelector("#comments").appendChild(newComment);
    savetofile(newComment.outerHTML);
    document.querySelector("form").reset();

}

loadfromfile();