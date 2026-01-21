import { Gamepad2, Bitcoin, Clapperboard, Book, Quote } from "lucide-react";

export const life = {
  hobbies: [
    {
      name: "Black Myth: Wukong",
      description: "Destiny isn't given, it's taken. A dark, mythical journey to the West.",
      Icon: Gamepad2,
      className: "col-span-3 lg:col-span-1 text-white",
      href: "https://store.steampowered.com/app/2358720/Black_Myth_Wukong/",
      cta: "Play on Steam",
      background: "/images/life/wukong.jpg",
    },
    {
      name: "Ethereum",
      description: "The infinite garden of decentralized innovation and smart contracts.",
      Icon: Bitcoin,
      className: "col-span-3 lg:col-span-1 text-white",
      href: "https://ethereum.org",
      cta: "Explore Web3",
      background: "/images/life/ethereum.jpg",
    },
    {
      name: "The Shawshank Redemption",
      description: "Fear can hold you prisoner. Hope can set you free.",
      Icon: Clapperboard,
      className: "col-span-3 lg:col-span-1 text-white",
      href: "https://www.imdb.com/title/tt0111161/",
      cta: "Watch Trailer",
      background: "/images/life/shawshank.jpg", 
    },
    {
      name: "Steve Jobs",
      description: "The people who are crazy enough to think they can change the world are the ones who do.",
      Icon: Book,
      className: "col-span-3 lg:col-span-2 text-white",
      href: "https://www.amazon.com/Steve-Jobs-Walter-Isaacson/dp/1451648537",
      cta: "Read Biography",
      background: "/images/life/steve-jobs.jpg",
    },
    {
      name: "Bakuman",
      description: "Dreams are not something given by others, they are something you fulfill yourself.",
      Icon: Quote,
      className: "col-span-3 lg:col-span-1 text-white",
      href: "https://myanimelist.net/anime/7674/Bakuman",
      cta: "Read Manga",
      background: "/images/life/bakuman.jpg",
    },
  ],
  tweets: [
    {
      id: "1582807367988654081",
      name: "Andrej Karpathy",
      username: "karpathy",
      content: "The Transformer is a magnificent neural network architecture. It is a general-purpose computer that is differentiable and easily trainable on parallel hardware.",
      image: "/images/avatars/karpathy.jpg",
    },
    {
      id: "1472287874003333122",
      name: "Andrej Karpathy",
      username: "karpathy",
      content: "I often see people saying that AI is consolidating. I think the opposite is true. We are moving from a world where AI is a niche academic field to a world where AI is the fundamental fabric of all software.",
      image: "/images/avatars/karpathy.jpg",
    },
    {
      id: "1002103360646823936",
      name: "Naval",
      username: "naval",
      content: "Learn to sell. Learn to build. If you can do both, you will be unstoppable.",
      image: "/images/avatars/naval.jpg",
    }
  ],
  quotes: [
    {
      text: "Whatever you lose, you'll find it again. But what you throw away you'll never get back.",
      author: "Kenshin Himura",
      from: "Rurouni Kenshin",
    },
    {
      text: "If you don't take risks, you can't create a future.",
      author: "Monkey D. Luffy",
      from: "One Piece",
    },
    {
      text: "Simplicity is the easiest path to true beauty.",
      author: "Seishuu Handa",
      from: "Barakamon",
    },
    {
      text: "The world isn't perfect. But it's there for us, doing the best it can....that's what makes it so damn beautiful.",
      author: "Roy Mustang",
      from: "Fullmetal Alchemist",
    },
  ],
};
