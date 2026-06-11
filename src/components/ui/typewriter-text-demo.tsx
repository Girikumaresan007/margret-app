import { Typewriter } from "./typewriter-text";

export function DemoVariant1() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-black p-4">
      <Typewriter
        text={["Welcome to HextaUI", "Build awesome websites.", "hextaui.com"]}
        speed={100}
        loop={true}
        className="text-xl font-medium text-white"
      />
    </div>
  );
}
