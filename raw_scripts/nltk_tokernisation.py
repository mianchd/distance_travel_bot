# -*- coding: utf-8 -*-
import nltk

#sentence = "A big black fox jumps over a lazy dog"
sentence = input("You: ")

tokens = nltk.word_tokenize(sentence)
tagged = nltk.pos_tag(tokens)
entities = nltk.chunk.ne_chunk(tagged)
dir(entities)

print("You Said: " + str(tokens))


