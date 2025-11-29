'use client'

import { useState, useEffect, useMemo } from 'react'

export default function TypewriterTitle() {
  const words = useMemo(() => ['I am Lora', 'A Software Engineer', 'A Developer'], [])
  const [currentWordIndex, setCurrentWordIndex] = useState(0)
  const [currentText, setCurrentText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)
  const [typingSpeed, setTypingSpeed] = useState(150)

  useEffect(() => {
    const currentWord = words[currentWordIndex]

    if (isDeleting) {
      if (currentText !== '') {
        const timeout = setTimeout(() => {
          setCurrentText(currentWord.substring(0, currentText.length - 1))
        }, typingSpeed)
        return () => clearTimeout(timeout)
      } else {
        setIsDeleting(false)
        setCurrentWordIndex((prev) => (prev + 1) % words.length)
      }
    } else {
      if (currentText !== currentWord) {
        const timeout = setTimeout(() => {
          setCurrentText(currentWord.substring(0, currentText.length + 1))
        }, typingSpeed)
        return () => clearTimeout(timeout)
      } else {
        // Pause at the end of the word before deleting
        const timeout = setTimeout(() => {
          setIsDeleting(true)
        }, 1000)
        return () => clearTimeout(timeout)
      }
    }
  }, [currentText, isDeleting, currentWordIndex, words, typingSpeed])

  return (
    <h1 className="font-sans text-3xl leading-9 font-extrabold tracking-tight text-gray-900 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14 dark:text-gray-100">
      {currentText}
      <span className="ml-1 animate-pulse">|</span>
    </h1>
  )
}
