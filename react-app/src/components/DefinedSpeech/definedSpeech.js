

export const getDefinedSpeech = (knownWords,currentLanguage) => {

    const wordTotal = Object.values(knownWords).filter(word => word.languageId === currentLanguage.id).length
            let speechLevel 


            if (wordTotal <= 650) {
                speechLevel = 'a1'
            }   else if (wordTotal <= 1800) {
                speechLevel = 'a2'
            }   else if (wordTotal <= 4000) {
                speechLevel = 'b1'
            }   else if (wordTotal <= 8000) {
                speechLevel = 'b2'
            }
    
    
    return speechLevel

}






const definedSpeech = {
    a1: `ChatGPT, please communicate with me at an A1 level according to the CEFR. This means using simple sentences and common phrases about familiar topics. Also, try to ask basic questions that require simple, direct responses."

    Example interactions could look like this:
    
    ChatGPT: "Hello! How are you today?"
    User: "I am good. And you?"
    ChatGPT: "I am doing well too, thank you. What is your favorite color?"
    User: "My favorite color is blue."
    ChatGPT: "Blue is a beautiful color. It is like the sky or the sea. Do you like the sea?`,

    a2: `ChatGPT, please communicate with me at an A2 level according to the CEFR. This means using simple sentences but also being able to discuss slightly more complex topics, expressing likes and dislikes, giving opinions and describing things in a basic way."

    An interaction might look like this:
    
    You: "Hello, ChatGPT."
    ChatGPT: "Hello! How are you doing today?"
    You: "I am doing well. I was reading a book."
    ChatGPT: "That's interesting! What kind of book was it? Do you enjoy reading often?"
    You: "Yes, I love reading. The book was a novel."
    ChatGPT: "Novels can be quite fascinating! They allow us to explore different worlds and perspectives. What do you like most about reading novels?`,

    b1: `ChatGPT, please communicate with me at a B1 level according to the CEFR. This implies using more complex sentences and being able to discuss a range of topics, express opinions, talk about future plans, past experiences, and hypothetical situations."

    An interaction might look like this:
    
    You: "Hello, ChatGPT."
    ChatGPT: "Hello! How are you today? Have you done anything interesting recently?"
    You: "Yes, I've been learning how to cook French cuisine. It's quite a challenge."
    ChatGPT: "That's impressive! French cuisine is known for its depth of flavor and culinary techniques. What motivated you to start learning it? And how are you finding the experience so far?`,


    b2: `ChatGPT, please communicate with me at a B2 level according to the CEFR. This means being able to discuss a wide range of topics, express detailed opinions, hypothesize, and discuss abstract concepts."

    A potential interaction might look like this:
    
    You: "Hello, ChatGPT."
    ChatGPT: "Hello! It's nice to see you again. Have you been pursuing any interesting thoughts or ideas lately?"
    You: "Yes, I've been contemplating the future of artificial intelligence and its impact on society."
    ChatGPT: "That's a profound topic indeed. The implications of artificial intelligence on society are vast and multifaceted. On one hand, it can lead to significant advancements in fields such as healthcare, education, and transportation. On the other, it could potentially raise ethical questions and impact labor markets. What specific aspect of this topic intrigues you the most, and why?`
}