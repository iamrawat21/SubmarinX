import { Layout } from './components/Layout';
import { Hero } from './components/Hero';
import { StorySection } from './components/StorySection';
import { ThreatMatrix } from './components/ThreatMatrix';
import { CommandCenter } from './components/CommandCenter';

export default function App() {
  return (
    <Layout>
      <Hero />
      <StorySection />
      <ThreatMatrix />
      <CommandCenter />
    </Layout>
  );
}
