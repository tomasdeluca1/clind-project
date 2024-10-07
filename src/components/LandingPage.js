import { Brain, CheckCircle, List, Target } from "lucide-react";
import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-16">
        <header className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-4">
            Welcome to <span className="text-primary">Clind</span>
          </h1>
          <p className="text-xl text-base-content/70">
            Clear Tasks, Clean Mind
          </p>
        </header>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h2 className="text-3xl font-semibold mb-6">
              Declutter Your Mind, One Task at a Time
            </h2>
            <p className="text-lg mb-6">
              Clind combines &quot;cl&quot; from &quot;clean&quot; and
              &quot;ind&quot; from &quot;mind&quot; to help you achieve mental
              clarity. Dump your tasks, prioritize effortlessly, and focus on
              what truly matters.
            </p>
            <Link href="/api/auth/login" className="btn btn-primary btn-lg">
              Start Clearing Your Mind
            </Link>
          </div>
          <div className="bg-base-300 p-4 rounded-lg shadow-lg">
            <p className="text-center text-base-content/70 italic">
              Video tutorial coming soon!
            </p>
            {/* Add your video component here */}
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <FeatureCard
            icon={<List className="w-12 h-12 text-primary" />}
            title="Brain Dump"
            description="Quickly jot down all your tasks without overthinking. Free your mind from the clutter of remembering everything."
          />
          <FeatureCard
            icon={<Target className="w-12 h-12 text-primary" />}
            title="Daily Focus"
            description="Choose up to 3 priority tasks each day. Stay focused on what's truly important without getting overwhelmed."
          />
          <FeatureCard
            icon={<CheckCircle className="w-12 h-12 text-primary" />}
            title="Sense of Achievement"
            description="Mark tasks as complete and watch your productivity soar. Celebrate the small wins that lead to big results."
          />
        </div>

        <div className="text-center">
          <h2 className="text-3xl font-semibold mb-6">
            Ready to Experience Mental Clarity?
          </h2>
          <p className="text-lg mb-8">
            Join Clind today and transform the way you manage your tasks and
            thoughts.
          </p>
          <Link href="/api/auth/login" className="btn btn-primary btn-lg">
            Get Started for Free
          </Link>
        </div>
      </div>
    </div>
  );
}

function FeatureCard({ icon, title, description }) {
  return (
    <div className="bg-base-200 p-6 rounded-lg shadow-md">
      <div className="flex justify-center mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2 text-center">{title}</h3>
      <p className="text-base-content/70 text-center">{description}</p>
    </div>
  );
}
