import StoryHero from "./StoryHero";
import StoryTimeline from "./StoryTimeline";
import StoryToday from "./StoryToday";

export default function StoryIndex() {
  return (
    <div>
      <StoryHero />
      <StoryTimeline />
      <StoryToday />
    </div>
  );
}
