// import React from "react";
// import { MagicCard } from "./magicui/magic-card";
// import { BoxReveal } from "./magicui/box-reveal";
// import { InteractiveHoverButton } from "./magicui/interactive-hover-button";
// import { RetroGrid } from "./magicui/retro-grid";
// import { Link } from "react-router-dom";

// // Component 1: How It Works
// const HowItWorks = () => {
//   const steps = [
//     {
//       number: 1,
//       title: "Create your geek profile",
//       description: "Share what drives you — not just what you look like.",
//     },
//     {
//       number: 2,
//       title: "Swipe on curiosity, not perfection",
//       description: "Find people who vibe with your logic and passion.",
//     },
//     {
//       number: 3,
//       title: "Spark real conversations",
//       description:
//         "Whether it's pair programming or late-night rants about JavaScript quirks.",
//     },
//   ];

//   return (
//     <section className="py-16 px-4 bg-base-200 relative overflow-hidden text-white">
//       <RetroGrid className="absolute inset-0 opacity-10" />

//       <div className="max-w-4xl mx-auto">
//         <BoxReveal boxColor="#5046e6" duration={0.5}>
//           <h2 className="text-3xl font-bold mb-12 flex items-center">
//             <span className="text-2xl mr-3">🛠️</span> How It Works
//           </h2>
//         </BoxReveal>

//         <div className="space-y-8 relative">
//           {steps.map((step, index) => (
//             <div key={index} className="flex items-start">
//               <div className="bg-base-300 w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 border-2 border-base-content/20">
//                 <span className="font-mono font-bold">{step.number}</span>
//               </div>
//               <div className="ml-6">
//                 <h3 className="text-xl font-semibold">{step.title}</h3>
//                 <p className="text-base-content/70 mt-2">{step.description}</p>
//               </div>
//             </div>
//           ))}

//           {/* Connecting line */}
//           <div className="absolute left-6 top-12 w-0.5 h-[calc(100%-24px)] bg-base-content/20 transform -translate-x-1/2 z-0"></div>
//         </div>
//       </div>
//     </section>
//   );
// };

// // Component 2: Built For
// const BuiltFor = () => {
//   const audiences = [
//     "Software Engineers",
//     "Designers & Creators",
//     "Tech YouTubers, Educators",
//     "Bootcamp grads, CS students",
//     'Anyone who speaks fluent "console.log"',
//   ];

//   return (
//     <section className="py-16 px-4 bg-base-300 text-white">
//       <MagicCard className="max-w-3xl mx-auto p-6 bg-base-200">
//         <div className="flex flex-col sm:flex-row items-start sm:items-center">
//           <div className="mb-6 sm:mb-0 sm:mr-8">
//             <div className="w-16 h-16 rounded-full bg-base-300 flex items-center justify-center">
//               <span className="text-3xl">❤️</span>
//             </div>
//           </div>

//           <div>
//             <h2 className="text-2xl font-bold mb-4">Built for:</h2>
//             <ul className="space-y-2">
//               {audiences.map((audience, index) => (
//                 <li key={index} className="flex items-center">
//                   <span className="mr-2 text-base-content/60">•</span>
//                   <span>{audience}</span>
//                 </li>
//               ))}
//             </ul>
//           </div>
//         </div>
//       </MagicCard>
//     </section>
//   );
// };

// // Component 3: Mindset Tagline
// const MindsetTagline = () => {
//   return (
//     <section className="py-20 px-4 bg-gradient-to-b from-base-300 to-base-200 text-center text-white">
//       <div className="max-w-3xl mx-auto">
//         <div className="mb-6">
//           <BoxReveal boxColor="#249fd9" duration={0.5}>
//             <div className="flex justify-center">
//               <div className="w-16 h-16 rounded-full bg-base-100 flex items-center justify-center">
//                 <span className="text-3xl">🧠</span>
//               </div>
//             </div>
//           </BoxReveal>
//         </div>

//         <h2 className="text-2xl font-bold mb-6">
//           Not Just a Match. A Mindset.
//         </h2>

//         <p className="text-xl mb-8 italic font-medium">
//           At TinderForGeeks, love isn't just a spark — it's a shared repo.
//         </p>

//         <p className="text-lg mb-10">
//           Whether you ship products or relationships — we help you find the
//           right one.
//         </p>

//         <Link to="/login">
//           <InteractiveHoverButton className="bg-base-100 hover:bg-base-300 text-base-content px-8 py-3">
//             Start Matching
//           </InteractiveHoverButton>
//         </Link>
//       </div>
//     </section>
//   );
// };

// // Export all components
// export { HowItWorks, BuiltFor, MindsetTagline };
