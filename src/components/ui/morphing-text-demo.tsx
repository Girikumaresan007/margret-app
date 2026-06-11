import { MorphingText } from "./morphing-text";

export default function DemoOne() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-black">
      <MorphingText 
        words={["incredible", "stunning", "powerful", "innovative", "beautiful"]}
        className="text-6xl"
      />
    </div>
  );
}
