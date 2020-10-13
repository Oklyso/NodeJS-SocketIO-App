const socket = io('http://localhost:3000')
const messageContainer = document.getElementById('message-container')
const messageForm = document.getElementById('send-container')
const messageInput = document.getElementById('message-input')
const messageSound = new Audio('Sounds/message.mp3')
const receivedSound = new Audio('Sounds/received.mp3')
const mutebutton = document.getElementById('mutebutton')
let muted = false;


const name = prompt("Enter a username: ")
appendMessage("You joined")
socket.emit('new-user',name)

socket.on('user-connected', name => {
    appendMessage(`${name} has joined.`)
    
    })

    socket.on('user-disconnected', name => {
        if(name != "null"){appendMessage(`${name} has left.`)}
        
        
        })

socket.on('chat-message', data => {
appendMessage(`${data.name}: ${data.message}`)
if(muted == false){
receivedSound.volume = 0.75
receivedSound.play()
  }
})


messageForm.addEventListener('keyup',e =>{
    e.preventDefault()
    if(e.keyCode == 13){
        messageForm.click()
    }

})
messageForm.addEventListener('submit', e =>{
    e.preventDefault()
    const message = messageInput.value
    if(message != ""){
        socket.emit('send-chat-message',message)
    appendMessage(`You: ${message}`)
       if(muted == false){
        messageSound.volume = 0.3
        messageSound.play()
       } 
       
    messageInput.value = ""
    }else{alert("Insert a message to send.")}
 
})


function appendMessage(message){
    const messageElement = document.createElement('div')
    messageElement.innerText = message
    messageContainer.append(messageElement)
}

mutebutton.addEventListener('change', e =>{
    
    if(muted == true){
        muted = false
    }
    else{ 
        muted = true
    }
    
})