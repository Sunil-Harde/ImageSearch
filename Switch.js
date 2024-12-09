let search = ""
document.querySelector('.searchLogo').addEventListener('click', () => {
    search = document.getElementById("searchImg").value
    console.log("Search term:", search);
    apiFetch()
})

document.querySelectorAll('.tag h3').forEach((text)=>{
    text.addEventListener('click',()=>{
        search=text.textContent;
        apiFetch()
    })
})


const apiFetch = () => {


    let api = fetch(`https://pixabay.com/api/?key=41521122-52441f7d3ad875ffb51812a60&q=${search}&image_type=photo&pretty=true`);
    api.then((response) => {
        return response.json()
            .then((result) => {

                let imgDiv = document.querySelector(".imgSearch")
                let imgInsert = ''

                const randomIndex = Math.floor(Math.random() * result.hits.length);
                console.log(randomIndex);

                document.querySelector(".top").style.backgroundImage = `url('${result.hits[randomIndex].largeImageURL}')`;

                result.hits.map((element) => {
                    const names = ["row", "column", "none","column"];
                    const randomIndex = Math.floor(Math.random() * names.length);
                    const randomName = names[randomIndex];

                    imgInsert += `<div class="img ${randomName}"><img src="${element.webformatURL}"/></div>`
                });

                imgDiv.innerHTML = imgInsert

                document.querySelectorAll(".img img").forEach((largeImg, index) => {
                    largeImg.addEventListener('click', () => {
                        let largeImgUrl = result.hits[index].largeImageURL
                        document.querySelector('.imgpop').innerHTML = `<img src="${largeImgUrl}" class="largeImg"/>`
                        document.querySelector(".pop").style.display = 'flex';
                    })
                    document.querySelector('.cancel').addEventListener("click", () => {
                        document.querySelector('.pop').style.display = 'none'
                    })


                })

            })
    })


}
apiFetch()