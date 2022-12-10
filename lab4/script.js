// demo1
function uniq(arr) {
    var ans;
    //TODO
    ans = [];
    for (let i = 0; i < arr.length; i++) {
        if (!ans.includes(arr[i])) {
            ans.push(arr[i])
        }
    }
    ans.sort();
    return ans;
}
uniq([1, 1, 1, 2, 3, 4, 9, 8, 7, 6, 4, 4])

// demo2
const materials = [
    'Hydrogen', 'Helium',
    'Lithium', 'Beryllium'];
console.log(materials.map(length = (arr) => arr.length))

// demo3
window.addEventListener("keydown", (event) => {
    const p = document.createElement("p");
    if (event.key == 's') {
        p.textContent = 's is the secret.'
    }
    else {
        p.textContent = 'This key is not the secret.'
    }
    document.getElementById("para").appendChild(p);

}, true);

const book = document.getElementById("book")

book.addEventListener('mouseover', (event) => {
    const p = document.createElement("p");
    p.textContent = 'The mouse is not the secret.'
    document.getElementById("para").appendChild(p);
    // setTimeout(() => {
    //     document.getElementById("para").removeChild(document.getElementById("para").firstChild)
    // }, 500)
}, false);

book.addEventListener('mouseout', (event) => {
    document.getElementById("para").removeChild(document.getElementById("para").firstChild)
}, false);
