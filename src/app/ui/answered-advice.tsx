'use client';
import React from "react";
import Link from "next/link";

const QuestionCard = ({ question, text }: { question: string; text: string }) => {
    return (
      <Link href="/Dashboard/Advice/Questions">
        <div className="bg-gray-200 rounded-lg shadow-lg p-4">
          <h1 className="text-lg font-bold mb-2">{question}</h1>
          <p>{text}</p>
        </div>
      </Link>
    );
  };

const AnsweredAdvice = () => {
  return (
    <div>
      <div className="flex flex-row gap-2 mb-4 mt-4 p-4 justify-content overflow-x-auto">
        <QuestionCard question="How do I prepare for a date?" text="Hello, I'm having trouble..." />
        <QuestionCard question="What do I wear to a date?" text="I don't know what to wear for my..." />
        <QuestionCard question="How do you know he/she is the right person" text="I'm starting to feel like I will never find the one..." />
        <QuestionCard question="Getting weird messages on here. Please Stop" text="I'm meeting a lot of creeps..." />
        <QuestionCard question="How do you talk to a guy?" text="I have social anxiety and don't know how to talk to anyone..." />
        <QuestionCard question="What are hints that a girl likes you?" text="There's this girl i met on here..." />
      </div>
    </div>
  );
};

export default AnsweredAdvice;
