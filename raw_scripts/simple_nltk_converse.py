from nltk.chat.util import Chat, reflections

pairs = [
    [
        r'hi',
        ['hello', 'HeyHey', 'Howdy!',]
    ],
]

def start_bot():
    print("Hi how can I help you today?")
    chat = Chat(pairs, reflections)
    chat.converse()

if __name__ == "__main__":
    start_bot()