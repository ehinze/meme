import { catsData } from './data.js'
// import { catsData } from './images'

const emotionRadios = document.getElementById('emotion-radios')
const getImageBtn = document.getElementById('get-image-btn')
const gift= document.getElementById('gifs-only-option')
const memeModalInner = document.getElementById('meme-modal-inner')
const memeModal = document.getElementById('meme-modal')
const memeModalCloseBtn = document.getElementById('meme-modal-close-btn')



emotionRadios.addEventListener('change', highlighted)

getImageBtn.addEventListener('click', renderCat)

memeModalCloseBtn.addEventListener('click', closeModal)


function highlighted(e){
    const radioo= document.getElementsByClassName('radio')
    for(let radio of radioo){
        radio.classList.remove('highlight')
    }
    document.getElementById(e.target.id).parentElement.classList.add('highlight')

}


function closeModal(){
    memeModal.style.display = 'none'
}


function renderCat(){
    const catObject = getSingleCatObject()
    console.log(catObject.image)
    memeModalInner.innerHTML = `
    <img 
    class="cat-img" 
    
    src= "${catObject.image}"
    alt="${catObject.alt}"
    >
    `
    memeModal.style.display = 'flex'
}


function getSingleCatObject(){
    const catsArray = getMatchingCatsArray()
    
    if (catsArray.length === 1){
        return(catsArray[0])
    }
    else {
        const randomNumber = Math.floor(Math.random() * catsArray.length)
        return catsArray[randomNumber]
    }
}



function getMatchingCatsArray(){   // this would check if at all the user selects an item in the first place
    
   if(document.querySelector('input[type="radio"]:checked')){
        const selectedEmotion = document.querySelector('input[type="radio"]:checked').value
        const isGif = gift.checked
        const matchingCatsArray = catsData.filter(function(cat){  // this use the filter function, it iterates through the cats array and give you want are looking for
        if(isGif){
            return cat.emotionTags.includes(selectedEmotion) && cat.isGif
        }
        else{
            return cat.emotionTags.includes(selectedEmotion)
        }
    }) 
      return matchingCatsArray
    }
}




 function getEmotionsArray(cats){
    const emotionsArray = []    
    for (let cat of cats){
        for (let emotion of cat.emotionTags){
            if (!emotionsArray.includes(emotion)){
                emotionsArray.push(emotion)
            }
        }
    }
    return emotionsArray
}


function renderEmotionsRadios(cats){
        
    let radioItems = ``
    const emotions = getEmotionsArray(cats)
    for (let emotion of emotions){
        radioItems += `
        <div class="radio">
            <label for="${emotion}">${emotion}</label>
            <input
            type="radio"
            id="${emotion}"
            value="${emotion}"
            name="emotions"
            >
        </div>`
    }
    emotionRadios.innerHTML = radioItems
}
renderEmotionsRadios(catsData)




