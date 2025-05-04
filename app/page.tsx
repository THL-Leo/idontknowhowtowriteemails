import Link from "next/link";
import { LoginButton } from "@/components/auth/login-button";

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section style={{ padding: '5rem 0' }}>
        <div className="container">
          <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
            <h1 style={{ 
              fontSize: '2.5rem', 
              fontWeight: 'bold', 
              marginBottom: '1.5rem',
              color: 'var(--foreground)'
            }}>
              Write emails in your own style, powered by Claude
            </h1>
            <p style={{ 
              fontSize: '1.25rem', 
              marginBottom: '2rem',
              color: 'var(--muted-foreground)'
            }}>
              Craft personalized emails that sound authentically like you, saving time while maintaining your voice.
            </p>
            <div style={{ 
              display: 'flex', 
              gap: '1rem', 
              justifyContent: 'center',
              marginTop: '1rem' 
            }}>
              <LoginButton />
              <Link 
                href="#features" 
                className="button button-secondary"
                style={{ padding: '0.5rem 1.5rem', height: '2.5rem' }}
              >
                Learn more
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section id="features" style={{ 
        padding: '4rem 0',
        backgroundColor: 'var(--muted)',
      }}>
        <div className="container">
          <h2 style={{ 
            fontSize: '2rem', 
            fontWeight: 'bold', 
            textAlign: 'center',
            marginBottom: '3rem',
            color: 'var(--foreground)'
          }}>Features</h2>
          <div style={{ 
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '2rem'
          }}>
            <FeatureCard
              title="Personal Style"
              description="Our AI analyzes your writing samples to capture your unique tone, vocabulary, and structure."
            />
            <FeatureCard
              title="Save Time"
              description="Turn brief descriptions into complete, well-crafted emails in seconds."
            />
            <FeatureCard
              title="Easy Editing"
              description="Fine-tune generated content directly in our intuitive editor."
            />
          </div>
        </div>
      </section>
      
      {/* How It Works Section */}
      <section id="how-it-works" style={{ padding: '4rem 0' }}>
        <div className="container">
          <h2 style={{ 
            fontSize: '2rem', 
            fontWeight: 'bold', 
            textAlign: 'center',
            marginBottom: '3rem',
            color: 'var(--foreground)'
          }}>How It Works</h2>
          <div style={{ 
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
            gap: '2rem',
            maxWidth: '900px',
            margin: '0 auto'
          }}>
            <StepCard
              number={1}
              title="Provide Samples"
              description="Add 3-5 emails that represent your writing style."
            />
            <StepCard
              number={2}
              title="Describe Your Need"
              description="Briefly explain what email you need to write."
            />
            <StepCard
              number={3}
              title="Generate & Edit"
              description="Get your email draft and make any final adjustments."
            />
          </div>
        </div>
      </section>
    </div>
  );
}

function FeatureCard({ title, description }: { title: string; description: string }) {
  return (
    <div className="card">
      <h3 style={{ 
        fontSize: '1.25rem', 
        fontWeight: 'bold', 
        marginBottom: '0.75rem',
        color: 'var(--foreground)'
      }}>{title}</h3>
      <p style={{ color: 'var(--muted-foreground)' }}>{description}</p>
    </div>
  );
}

function StepCard({ number, title, description }: { number: number; title: string; description: string }) {
  return (
    <div style={{ 
      textAlign: 'center',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center' 
    }}>
      <div style={{ 
        width: '3rem',
        height: '3rem',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'var(--primary)',
        color: 'var(--primary-foreground)',
        marginBottom: '1rem',
        fontWeight: 'bold'
      }}>
        {number}
      </div>
      <h3 style={{ 
        fontSize: '1.25rem', 
        fontWeight: 'bold', 
        marginBottom: '0.5rem',
        color: 'var(--foreground)'
      }}>{title}</h3>
      <p style={{ color: 'var(--muted-foreground)' }}>{description}</p>
    </div>
  );
}